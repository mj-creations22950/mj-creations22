# server.py - Main FastAPI application with all routes
from fastapi import FastAPI, APIRouter, Depends, HTTPException, status, Request, Header
from fastapi.security import HTTPAuthorizationCredentials
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime, timedelta

# Import models
from models import (
    User, UserCreate, UserLogin, Token, Service, Order, OrderCreate,
    Quote, QuoteCreate, PaymentTransaction, ChatMessage, ChatMessageCreate,
    Notification, Review, ReviewCreate, Address, Appointment, AppointmentCreate,
    ContactFormSubmit, OrderStatus, PaymentStatus, UserRole
)

# Import auth utilities
from auth import (
    get_password_hash, verify_password, create_access_token,
    get_current_user, get_current_user_required, require_admin, security
)

# Import integrations
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionRequest, CheckoutSessionResponse
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="MJ Créations API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Stripe configuration
STRIPE_API_KEY = os.environ.get("STRIPE_API_KEY", "sk_test_emergent")

# LLM configuration
EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY")


# ============================================================================
# AUTHENTICATION ROUTES
# ============================================================================

@api_router.post("/auth/signup", response_model=User)
async def signup(user_create: UserCreate):
    """Register a new user."""
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user_create.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    user_dict = user_create.model_dump()
    hashed_password = get_password_hash(user_dict.pop("password"))
    
    user = User(**user_dict)
    user_in_db = user.model_dump()
    user_in_db["hashed_password"] = hashed_password
    
    await db.users.insert_one(user_in_db)
    return user


@api_router.post("/auth/login", response_model=Token)
async def login(user_login: UserLogin):
    """Authenticate user and return JWT token."""
    user_dict = await db.users.find_one({"email": user_login.email})
    if not user_dict:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    if not verify_password(user_login.password, user_dict["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": user_login.email})
    return Token(access_token=access_token, token_type="bearer")


@api_router.get("/auth/me", response_model=User)
async def get_me(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current user information."""
    current_user = await get_current_user_required(credentials, db)
    return current_user


# ============================================================================
# SERVICES ROUTES
# ============================================================================

@api_router.get("/services", response_model=List[Service])
async def get_services(category: Optional[str] = None, search: Optional[str] = None):
    """Get all services or filter by category/search."""
    query = {}
    if category:
        query["category"] = category
    if search:
        query["name"] = {"$regex": search, "$options": "i"}
    
    services = await db.services.find(query, {"_id": 0}).to_list(1000)
    return services


@api_router.get("/services/{service_id}", response_model=Service)
async def get_service(service_id: str):
    """Get a specific service by ID."""
    service = await db.services.find_one({"id": service_id}, {"_id": 0})
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service


@api_router.get("/services/category/{category}", response_model=List[Service])
async def get_services_by_category(category: str):
    """Get services by category."""
    services = await db.services.find({"category": category}, {"_id": 0}).to_list(1000)
    return services


# ============================================================================
# ORDERS ROUTES
# ============================================================================

@api_router.post("/orders", response_model=Order)
async def create_order(
    order_create: OrderCreate,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Create a new order."""
    current_user = await get_current_user_required(credentials, db)
    
    # Calculate total
    total = sum(item.price * item.quantity for item in order_create.items)
    
    order = Order(
        user_id=current_user.id,
        items=[item.model_dump() for item in order_create.items],
        total_amount=total,
        address_id=order_create.address_id,
        notes=order_create.notes
    )
    
    order_dict = order.model_dump()
    await db.orders.insert_one(order_dict)
    
    # Create notification
    notification = Notification(
        user_id=current_user.id,
        title="Nouvelle commande",
        message=f"Votre commande #{order.id[:8]} a été créée avec succès",
        type="success"
    )
    await db.notifications.insert_one(notification.model_dump())
    
    return order


@api_router.get("/orders", response_model=List[Order])
async def get_orders(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get all orders for current user."""
    current_user = await get_current_user_required(credentials, db)
    orders = await db.orders.find({"user_id": current_user.id}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return orders


@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(
    order_id: str,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get a specific order."""
    current_user = await get_current_user_required(credentials, db)
    order = await db.orders.find_one({"id": order_id, "user_id": current_user.id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


# ============================================================================
# PAYMENT ROUTES (STRIPE)
# ============================================================================

@api_router.post("/payments/checkout/session", response_model=CheckoutSessionResponse)
async def create_checkout_session(
    request: Request,
    checkout_data: dict,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Create a Stripe checkout session for an order."""
    current_user = await get_current_user_required(credentials, db)
    
    # Get order
    order = await db.orders.find_one({"id": order_id, "user_id": current_user.id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order["payment_status"] == "paid":
        raise HTTPException(status_code=400, detail="Order already paid")
    
    # Initialize Stripe
    host_url = origin_url
    webhook_url = f"{host_url}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    # Create checkout session
    success_url = f"{origin_url}/payment/success?session_id={{{{CHECKOUT_SESSION_ID}}}}"
    cancel_url = f"{origin_url}/payment/cancel"
    
    checkout_request = CheckoutSessionRequest(
        amount=float(order["total_amount"]),
        currency="eur",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={
            "order_id": order_id,
            "user_id": current_user.id,
            "user_email": current_user.email
        }
    )
    
    session = await stripe_checkout.create_checkout_session(checkout_request)
    
    # Store payment transaction
    payment_transaction = PaymentTransaction(
        order_id=order_id,
        user_id=current_user.id,
        session_id=session.session_id,
        amount=float(order["total_amount"]),
        currency="eur",
        metadata={"order_id": order_id}
    )
    await db.payment_transactions.insert_one(payment_transaction.model_dump())
    
    return session


@api_router.get("/payments/checkout/status/{session_id}")
async def get_checkout_status(
    session_id: str,
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
):
    """Check the status of a checkout session."""
    current_user = await get_current_user(credentials, db) if credentials else None
    
    # Get payment transaction
    transaction = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
    if not transaction:
        raise HTTPException(status_code=404, detail="Payment transaction not found")
    
    # Check if already processed
    if transaction["payment_status"] == "paid":
        return {
            "status": "complete",
            "payment_status": "paid",
            "amount_total": int(transaction["amount"] * 100),
            "currency": transaction["currency"],
            "metadata": transaction["metadata"]
        }
    
    # Initialize Stripe and check status
    host_url = "https://example.com"  # Won't be used for status check
    webhook_url = f"{host_url}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    checkout_status = await stripe_checkout.get_checkout_status(session_id)
    
    # Update transaction
    await db.payment_transactions.update_one(
        {"session_id": session_id},
        {"$set": {
            "payment_status": checkout_status.payment_status,
            "status": checkout_status.status,
            "updated_at": datetime.utcnow().isoformat()
        }}
    )
    
    # If payment successful and not already processed, update order
    if checkout_status.payment_status == "paid":
        order_id = transaction.get("order_id")
        if order_id:
            order = await db.orders.find_one({"id": order_id}, {"_id": 0})
            if order and order["payment_status"] != "paid":
                # Update order
                await db.orders.update_one(
                    {"id": order_id},
                    {"$set": {
                        "payment_status": "paid",
                        "payment_method": "stripe",
                        "status": "confirmed",
                        "updated_at": datetime.utcnow().isoformat()
                    }}
                )
                
                # Award loyalty points (1% of order total)
                points = int(order["total_amount"] * 0.01)
                await db.users.update_one(
                    {"id": order["user_id"]},
                    {"$inc": {"loyalty_points": points}}
                )
                
                # Create loyalty transaction
                from models import LoyaltyTransaction
                loyalty_trans = LoyaltyTransaction(
                    user_id=order["user_id"],
                    points=points,
                    reason=f"Order #{order_id[:8]}",
                    order_id=order_id
                )
                await db.loyalty_transactions.insert_one(loyalty_trans.model_dump())
                
                # Create notification
                notification = Notification(
                    user_id=order["user_id"],
                    title="Paiement réussi",
                    message=f"Votre paiement pour la commande #{order_id[:8]} a été confirmé. Vous avez gagné {points} points de fidélité!",
                    type="success"
                )
                await db.notifications.insert_one(notification.model_dump())
    
    return checkout_status.model_dump()


@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request, stripe_signature: Optional[str] = Header(None)):
    """Handle Stripe webhooks."""
    body_bytes = await request.body()
    
    # Initialize Stripe
    host_url = str(request.base_url)
    webhook_url = f"{host_url}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    try:
        webhook_response = await stripe_checkout.handle_webhook(body_bytes, stripe_signature)
        
        # Process webhook event
        if webhook_response.payment_status == "paid":
            session_id = webhook_response.session_id
            metadata = webhook_response.metadata
            
            # Update payment transaction
            await db.payment_transactions.update_one(
                {"session_id": session_id},
                {"$set": {
                    "payment_status": "paid",
                    "status": "complete",
                    "updated_at": datetime.utcnow().isoformat()
                }}
            )
            
            logger.info(f"Webhook processed: {webhook_response.event_type} - {session_id}")
        
        return {"status": "success"}
    except Exception as e:
        logger.error(f"Webhook error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


# ============================================================================
# QUOTES ROUTES
# ============================================================================

@api_router.post("/quotes", response_model=Quote)
async def create_quote(
    quote_create: QuoteCreate,
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
):
    """Create a new quote request."""
    current_user = await get_current_user(credentials, db) if credentials else None
    
    quote = Quote(
        user_id=current_user.id if current_user else None,
        **quote_create.model_dump()
    )
    
    quote_dict = quote.model_dump()
    await db.quotes.insert_one(quote_dict)
    
    # Create notification for user if authenticated
    if current_user:
        notification = Notification(
            user_id=current_user.id,
            title="Demande de devis",
            message=f"Votre demande de devis pour {quote.service_category} a été enregistrée",
            type="info"
        )
        await db.notifications.insert_one(notification.model_dump())
    
    return quote


@api_router.get("/quotes", response_model=List[Quote])
async def get_quotes(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get all quotes for current user."""
    current_user = await get_current_user_required(credentials, db)
    quotes = await db.quotes.find({"user_id": current_user.id}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return quotes


# ============================================================================
# CHAT ROUTES (CLAUDE)
# ============================================================================

@api_router.post("/chat", response_model=ChatMessage)
async def send_chat_message(
    chat_create: ChatMessageCreate,
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
):
    """Send a message to the chat assistant."""
    current_user = await get_current_user(credentials, db) if credentials else None
    
    # Generate or use existing session_id
    session_id = chat_create.session_id or f"session_{datetime.utcnow().timestamp()}"
    
    # Store user message
    user_message = ChatMessage(
        session_id=session_id,
        user_id=current_user.id if current_user else None,
        role="user",
        content=chat_create.message
    )
    await db.chat_messages.insert_one(user_message.model_dump())
    
    # Initialize LLM chat
    llm_chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=session_id,
        system_message="Tu es l'assistant virtuel de MJ Créations, une entreprise spécialisée en plomberie, chauffage, électricité et VMC en Bretagne. Tu es professionnel, courtois et tu aides les clients avec leurs questions sur nos services."
    ).with_model("anthropic", "claude-3-7-sonnet-20250219")
    
    # Send message and get response
    llm_user_message = UserMessage(text=chat_create.message)
    response_text = await llm_chat.send_message(llm_user_message)
    
    # Store assistant message
    assistant_message = ChatMessage(
        session_id=session_id,
        user_id=current_user.id if current_user else None,
        role="assistant",
        content=response_text
    )
    await db.chat_messages.insert_one(assistant_message.model_dump())
    
    return assistant_message


@api_router.get("/chat/history/{session_id}", response_model=List[ChatMessage])
async def get_chat_history(session_id: str):
    """Get chat history for a session."""
    messages = await db.chat_messages.find({"session_id": session_id}, {"_id": 0}).sort("created_at", 1).to_list(1000)
    return messages


# ============================================================================
# NOTIFICATIONS ROUTES
# ============================================================================

@api_router.get("/notifications", response_model=List[Notification])
async def get_notifications(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get all notifications for current user."""
    current_user = await get_current_user_required(credentials, db)
    notifications = await db.notifications.find({"user_id": current_user.id}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return notifications


@api_router.put("/notifications/{notification_id}/read")
async def mark_notification_read(
    notification_id: str,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Mark a notification as read."""
    current_user = await get_current_user_required(credentials, db)
    result = await db.notifications.update_one(
        {"id": notification_id, "user_id": current_user.id},
        {"$set": {"is_read": True}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Notification not found")
    return {"status": "success"}


@api_router.get("/notifications/unread/count")
async def get_unread_count(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
):
    """Get count of unread notifications."""
    current_user = await get_current_user(credentials, db) if credentials else None
    if not current_user:
        return {"count": 0}
    count = await db.notifications.count_documents({"user_id": current_user.id, "is_read": False})
    return {"count": count}


# ============================================================================
# USER PROFILE & ADDRESSES ROUTES
# ============================================================================

@api_router.get("/profile", response_model=User)
async def get_profile(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get user profile."""
    current_user = await get_current_user_required(credentials, db)
    return current_user


@api_router.put("/profile", response_model=User)
async def update_profile(
    updates: dict,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Update user profile."""
    current_user = await get_current_user_required(credentials, db)
    
    # Remove fields that shouldn't be updated
    updates.pop("id", None)
    updates.pop("role", None)
    updates.pop("created_at", None)
    updates.pop("hashed_password", None)
    
    await db.users.update_one(
        {"id": current_user.id},
        {"$set": updates}
    )
    
    # Get updated user
    user_dict = await db.users.find_one({"id": current_user.id}, {"_id": 0})
    return User(**user_dict)


@api_router.get("/addresses", response_model=List[Address])
async def get_addresses(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get all addresses for current user."""
    current_user = await get_current_user_required(credentials, db)
    addresses = await db.addresses.find({"user_id": current_user.id}, {"_id": 0}).to_list(100)
    return addresses


@api_router.post("/addresses", response_model=Address)
async def create_address(
    address_data: dict,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Create a new address."""
    current_user = await get_current_user_required(credentials, db)
    address = Address(user_id=current_user.id, **address_data)
    await db.addresses.insert_one(address.model_dump())
    return address


# ============================================================================
# REVIEWS ROUTES
# ============================================================================

@api_router.post("/reviews", response_model=Review)
async def create_review(
    review_create: ReviewCreate,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Create a new review."""
    current_user = await get_current_user_required(credentials, db)
    review = Review(
        user_id=current_user.id,
        **review_create.model_dump()
    )
    await db.reviews.insert_one(review.model_dump())
    return review


@api_router.get("/reviews/service/{service_id}", response_model=List[Review])
async def get_service_reviews(service_id: str):
    """Get approved reviews for a service."""
    reviews = await db.reviews.find({"service_id": service_id, "is_approved": True}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return reviews


# ============================================================================
# ADMIN ROUTES
# ============================================================================

@api_router.get("/admin/stats")
async def get_admin_stats(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get admin dashboard statistics."""
    current_user = await get_current_user_required(credentials, db)
    admin = await require_admin(current_user)
    
    total_users = await db.users.count_documents({"role": "client"})
    total_orders = await db.orders.count_documents({})
    total_revenue = await db.orders.aggregate([
        {"$match": {"payment_status": "paid"}},
        {"$group": {"_id": None, "total": {"$sum": "$total_amount"}}}
    ]).to_list(1)
    
    revenue = total_revenue[0]["total"] if total_revenue else 0
    
    return {
        "total_users": total_users,
        "total_orders": total_orders,
        "total_revenue": revenue,
        "pending_quotes": await db.quotes.count_documents({"status": "pending"})
    }


@api_router.get("/admin/orders", response_model=List[Order])
async def get_all_orders(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get all orders (admin only)."""
    current_user = await get_current_user_required(credentials, db)
    admin = await require_admin(current_user)
    
    orders = await db.orders.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return orders


@api_router.get("/admin/users", response_model=List[User])
async def get_all_users(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get all users (admin only)."""
    current_user = await get_current_user_required(credentials, db)
    admin = await require_admin(current_user)
    
    users = await db.users.find({"role": "client"}, {"_id": 0, "hashed_password": 0}).to_list(1000)
    return users


@api_router.get("/admin/quotes", response_model=List[Quote])
async def get_all_quotes(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get all quotes (admin only)."""
    current_user = await get_current_user_required(credentials, db)
    admin = await require_admin(current_user)
    
    quotes = await db.quotes.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return quotes


@api_router.put("/admin/orders/{order_id}/status")
async def update_order_status(
    order_id: str,
    status_update: dict,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Update order status (admin only)."""
    current_user = await get_current_user_required(credentials, db)
    admin = await require_admin(current_user)
    
    result = await db.orders.update_one(
        {"id": order_id},
        {"$set": {"status": status_update["status"], "updated_at": datetime.utcnow().isoformat()}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"status": "success"}


# ============================================================================
# CONTACT FORM ROUTE
# ============================================================================

@api_router.post("/contact")
async def submit_contact_form(contact: ContactFormSubmit):
    """Submit contact form."""
    contact_dict = contact.model_dump()
    contact_dict["created_at"] = datetime.utcnow().isoformat()
    contact_dict["id"] = f"contact_{datetime.utcnow().timestamp()}"
    
    await db.contact_submissions.insert_one(contact_dict)
    
    logger.info(f"Contact form submitted: {contact.email} - {contact.subject}")
    
    return {"status": "success", "message": "Votre message a été envoyé avec succès"}


# ============================================================================
# HEALTH CHECK
# ============================================================================

@api_router.get("/")
async def root():
    return {"message": "MJ Créations API", "version": "1.0", "status": "running"}


@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}


# Include the router in the main app
app.include_router(api_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
