from fastapi import FastAPI, APIRouter, Depends, HTTPException, status, Request, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime, timezone, timedelta
import shutil

# Import models
from models import (
    User, UserCreate, UserLogin, Token,
    Address, AddressCreate,
    Service, ServiceCreate,
    Cart, CartItem,
    Order, OrderCreate, OrderItem,
    Quote, QuoteCreate, QuoteRequest, QuoteItem,
    Appointment, AppointmentCreate,
    PaymentTransaction,
    Review, ReviewCreate,
    Notification, NotificationCreate,
    ChatMessage, ChatMessageCreate,
    Document, PhotoUpload, PhotoUploadCreate,
    SystemConfig
)
from auth import (
    hash_password, verify_password, create_access_token,
    get_current_user, get_current_admin
)
from utils import prepare_for_mongo, get_current_timestamp

# Import Stripe integration
from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout, CheckoutSessionResponse, 
    CheckoutStatusResponse, CheckoutSessionRequest
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Stripe setup
STRIPE_API_KEY = os.environ.get('STRIPE_API_KEY', 'sk_test_emergent')

# Create the main app
app = FastAPI(title="MJ Créations API")

# Create API router
api_router = APIRouter(prefix="/api")

# Create uploads directory
upload_dir = Path("/app/backend/uploads")
upload_dir.mkdir(exist_ok=True)

# Mount uploads directory
app.mount("/uploads", StaticFiles(directory=str(upload_dir)), name="uploads")

# ============================================================================
# AUTH ROUTES
# ============================================================================

@api_router.post("/auth/register", response_model=Token)
async def register(user_data: UserCreate):
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user
    user_dict = user_data.model_dump(exclude={"password"})
    user_dict["hashed_password"] = hash_password(user_data.password)
    user_dict["created_at"] = get_current_timestamp()
    user_dict["is_active"] = True
    user_dict["loyalty_points"] = 0
    user_dict["addresses"] = []
    
    user_obj = User(**{k: v for k, v in user_dict.items() if k != "hashed_password"})
    doc = prepare_for_mongo(user_obj.model_dump())
    doc["hashed_password"] = user_dict["hashed_password"]
    
    await db.users.insert_one(doc)
    
    # Create access token
    access_token = create_access_token(data={"sub": user_obj.id, "email": user_obj.email, "role": user_obj.role})
    
    return Token(access_token=access_token, token_type="bearer", user=user_obj)

@api_router.post("/auth/login", response_model=Token)
async def login(credentials: UserLogin):
    # Find user
    user_doc = await db.users.find_one({"email": credentials.email}, {"_id": 0})
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Verify password
    if not verify_password(credentials.password, user_doc["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Create user object
    user_obj = User(**{k: v for k, v in user_doc.items() if k != "hashed_password"})
    
    # Create access token
    access_token = create_access_token(data={"sub": user_obj.id, "email": user_obj.email, "role": user_obj.role})
    
    return Token(access_token=access_token, token_type="bearer", user=user_obj)

@api_router.get("/auth/me", response_model=User)
async def get_me(current_user: dict = Depends(get_current_user)):
    user_doc = await db.users.find_one({"id": current_user["sub"]}, {"_id": 0, "hashed_password": 0})
    if not user_doc:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**user_doc)

# ============================================================================
# ADDRESS ROUTES
# ============================================================================

@api_router.post("/addresses", response_model=Address)
async def create_address(address_data: AddressCreate, current_user: dict = Depends(get_current_user)):
    address_dict = address_data.model_dump()
    address_dict["user_id"] = current_user["sub"]
    
    address_obj = Address(**address_dict)
    doc = prepare_for_mongo(address_obj.model_dump())
    
    await db.addresses.insert_one(doc)
    return address_obj

@api_router.get("/addresses", response_model=List[Address])
async def get_addresses(current_user: dict = Depends(get_current_user)):
    addresses = await db.addresses.find({"user_id": current_user["sub"]}, {"_id": 0}).to_list(100)
    return [Address(**addr) for addr in addresses]

@api_router.put("/addresses/{address_id}", response_model=Address)
async def update_address(address_id: str, address_data: AddressCreate, current_user: dict = Depends(get_current_user)):
    address = await db.addresses.find_one({"id": address_id, "user_id": current_user["sub"]})
    if not address:
        raise HTTPException(status_code=404, detail="Address not found")
    
    update_data = prepare_for_mongo(address_data.model_dump())
    await db.addresses.update_one({"id": address_id}, {"$set": update_data})
    
    updated = await db.addresses.find_one({"id": address_id}, {"_id": 0})
    return Address(**updated)

@api_router.delete("/addresses/{address_id}")
async def delete_address(address_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.addresses.delete_one({"id": address_id, "user_id": current_user["sub"]})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Address not found")
    return {"message": "Address deleted"}

# ============================================================================
# SERVICE ROUTES
# ============================================================================

@api_router.get("/services", response_model=List[Service])
async def get_services(
    category: Optional[str] = None,
    search: Optional[str] = None,
    skip: int = 0,
    limit: int = 100
):
    query = {"is_active": True}
    if category:
        query["category"] = category
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    services = await db.services.find(query, {"_id": 0}).skip(skip).limit(limit).to_list(limit)
    return [Service(**svc) for svc in services]

@api_router.get("/services/{service_id}", response_model=Service)
async def get_service(service_id: str):
    service = await db.services.find_one({"id": service_id}, {"_id": 0})
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return Service(**service)

@api_router.post("/services", response_model=Service)
async def create_service(service_data: ServiceCreate, current_user: dict = Depends(get_current_admin)):
    service_obj = Service(**service_data.model_dump())
    doc = prepare_for_mongo(service_obj.model_dump())
    await db.services.insert_one(doc)
    return service_obj

@api_router.put("/services/{service_id}", response_model=Service)
async def update_service(service_id: str, service_data: ServiceCreate, current_user: dict = Depends(get_current_admin)):
    service = await db.services.find_one({"id": service_id})
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    update_data = prepare_for_mongo(service_data.model_dump())
    await db.services.update_one({"id": service_id}, {"$set": update_data})
    
    updated = await db.services.find_one({"id": service_id}, {"_id": 0})
    return Service(**updated)

@api_router.delete("/services/{service_id}")
async def delete_service(service_id: str, current_user: dict = Depends(get_current_admin)):
    result = await db.services.delete_one({"id": service_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"message": "Service deleted"}

# ============================================================================
# CART ROUTES
# ============================================================================

@api_router.get("/cart", response_model=Cart)
async def get_cart(current_user: dict = Depends(get_current_user)):
    cart = await db.carts.find_one({"user_id": current_user["sub"]}, {"_id": 0})
    if not cart:
        # Create empty cart
        cart_obj = Cart(user_id=current_user["sub"], updated_at=get_current_timestamp())
        doc = prepare_for_mongo(cart_obj.model_dump())
        await db.carts.insert_one(doc)
        return cart_obj
    return Cart(**cart)

@api_router.post("/cart/items")
async def add_to_cart(item: CartItem, current_user: dict = Depends(get_current_user)):
    cart = await db.carts.find_one({"user_id": current_user["sub"]})
    
    if not cart:
        cart_obj = Cart(user_id=current_user["sub"], items=[item], updated_at=get_current_timestamp())
        cart_obj.subtotal = item.total_price
        cart_obj.total = cart_obj.subtotal + cart_obj.travel_fee
        doc = prepare_for_mongo(cart_obj.model_dump())
        await db.carts.insert_one(doc)
    else:
        # Update existing cart
        items = cart.get("items", [])
        # Check if item exists
        found = False
        for i, existing_item in enumerate(items):
            if existing_item["service_id"] == item.service_id:
                items[i] = item.model_dump()
                found = True
                break
        if not found:
            items.append(item.model_dump())
        
        subtotal = sum(i["total_price"] for i in items)
        total = subtotal + cart.get("travel_fee", 0)
        
        await db.carts.update_one(
            {"user_id": current_user["sub"]},
            {"$set": {"items": items, "subtotal": subtotal, "total": total, "updated_at": get_current_timestamp()}}
        )
    
    return {"message": "Item added to cart"}

@api_router.delete("/cart/items/{service_id}")
async def remove_from_cart(service_id: str, current_user: dict = Depends(get_current_user)):
    cart = await db.carts.find_one({"user_id": current_user["sub"]})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    items = [item for item in cart.get("items", []) if item["service_id"] != service_id]
    subtotal = sum(i["total_price"] for i in items)
    total = subtotal + cart.get("travel_fee", 0)
    
    await db.carts.update_one(
        {"user_id": current_user["sub"]},
        {"$set": {"items": items, "subtotal": subtotal, "total": total, "updated_at": get_current_timestamp()}}
    )
    
    return {"message": "Item removed from cart"}

@api_router.delete("/cart")
async def clear_cart(current_user: dict = Depends(get_current_user)):
    await db.carts.update_one(
        {"user_id": current_user["sub"]},
        {"$set": {"items": [], "subtotal": 0, "total": 0, "updated_at": get_current_timestamp()}}
    )
    return {"message": "Cart cleared"}

# ============================================================================
# ORDER ROUTES
# ============================================================================

@api_router.post("/orders", response_model=Order)
async def create_order(order_data: OrderCreate, current_user: dict = Depends(get_current_user)):
    user = await db.users.find_one({"id": current_user["sub"]}, {"_id": 0})
    
    subtotal = sum(item.total_price for item in order_data.items)
    travel_fee = 50.0  # Fixed for now, can be made dynamic
    
    order_dict = order_data.model_dump()
    order_dict["user_id"] = current_user["sub"]
    order_dict["user_email"] = user["email"]
    order_dict["user_name"] = user["full_name"]
    order_dict["subtotal"] = subtotal
    order_dict["travel_fee"] = travel_fee
    order_dict["total"] = subtotal + travel_fee
    order_dict["created_at"] = get_current_timestamp()
    order_dict["updated_at"] = get_current_timestamp()
    
    order_obj = Order(**order_dict)
    doc = prepare_for_mongo(order_obj.model_dump())
    await db.orders.insert_one(doc)
    
    # Clear cart
    await db.carts.update_one(
        {"user_id": current_user["sub"]},
        {"$set": {"items": [], "subtotal": 0, "total": 0, "updated_at": get_current_timestamp()}}
    )
    
    # Create notification
    notification = Notification(
        user_id=current_user["sub"],
        title="Nouvelle commande",
        message=f"Votre commande #{order_obj.id[:8]} a été créée avec succès",
        type="success",
        created_at=get_current_timestamp()
    )
    await db.notifications.insert_one(prepare_for_mongo(notification.model_dump()))
    
    return order_obj

@api_router.get("/orders", response_model=List[Order])
async def get_orders(current_user: dict = Depends(get_current_user)):
    orders = await db.orders.find({"user_id": current_user["sub"]}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return [Order(**order) for order in orders]

@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str, current_user: dict = Depends(get_current_user)):
    order = await db.orders.find_one({"id": order_id, "user_id": current_user["sub"]}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return Order(**order)

@api_router.put("/orders/{order_id}/status")
async def update_order_status(order_id: str, status: str, current_user: dict = Depends(get_current_admin)):
    order = await db.orders.find_one({"id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    await db.orders.update_one(
        {"id": order_id},
        {"$set": {"status": status, "updated_at": get_current_timestamp()}}
    )
    
    # Create notification for user
    notification = Notification(
        user_id=order["user_id"],
        title="Mise à jour de commande",
        message=f"Votre commande #{order_id[:8]} est maintenant: {status}",
        type="info",
        created_at=get_current_timestamp()
    )
    await db.notifications.insert_one(prepare_for_mongo(notification.model_dump()))
    
    return {"message": "Order status updated"}

# Admin: Get all orders
@api_router.get("/admin/orders", response_model=List[Order])
async def get_all_orders(current_user: dict = Depends(get_current_admin)):
    orders = await db.orders.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [Order(**order) for order in orders]

# ============================================================================
# QUOTE ROUTES
# ============================================================================

@api_router.post("/quotes/request")
async def request_quote(quote_request: QuoteRequest, current_user: dict = Depends(get_current_user)):
    user = await db.users.find_one({"id": current_user["sub"]}, {"_id": 0})
    
    quote_dict = {
        "user_id": current_user["sub"],
        "user_email": user["email"],
        "user_name": user["full_name"],
        "description": quote_request.description,
        "address_id": quote_request.address_id,
        "phone": quote_request.phone,
        "preferred_date": quote_request.preferred_date,
        "status": "pending",
        "created_at": get_current_timestamp()
    }
    
    await db.quote_requests.insert_one(quote_dict)
    
    # Create notification
    notification = Notification(
        user_id=current_user["sub"],
        title="Demande de devis",
        message="Votre demande de devis a été envoyée. Nous vous répondrons sous 24h",
        type="success",
        created_at=get_current_timestamp()
    )
    await db.notifications.insert_one(prepare_for_mongo(notification.model_dump()))
    
    return {"message": "Quote request submitted"}

@api_router.post("/quotes", response_model=Quote)
async def create_quote(quote_data: QuoteCreate, current_user: dict = Depends(get_current_admin)):
    user = await db.users.find_one({"id": current_user["sub"]}, {"_id": 0})
    
    subtotal = sum(item.total_price for item in quote_data.items)
    travel_fee = 50.0
    
    valid_until = (datetime.now(timezone.utc) + timedelta(days=30)).isoformat()
    
    quote_dict = quote_data.model_dump()
    quote_dict["user_id"] = current_user["sub"]
    quote_dict["user_email"] = user["email"]
    quote_dict["user_name"] = user["full_name"]
    quote_dict["subtotal"] = subtotal
    quote_dict["travel_fee"] = travel_fee
    quote_dict["total"] = subtotal + travel_fee
    quote_dict["valid_until"] = valid_until
    quote_dict["created_at"] = get_current_timestamp()
    quote_dict["updated_at"] = get_current_timestamp()
    
    quote_obj = Quote(**quote_dict)
    doc = prepare_for_mongo(quote_obj.model_dump())
    await db.quotes.insert_one(doc)
    
    return quote_obj

@api_router.get("/quotes", response_model=List[Quote])
async def get_quotes(current_user: dict = Depends(get_current_user)):
    quotes = await db.quotes.find({"user_id": current_user["sub"]}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return [Quote(**quote) for quote in quotes]

@api_router.get("/quotes/{quote_id}", response_model=Quote)
async def get_quote(quote_id: str, current_user: dict = Depends(get_current_user)):
    quote = await db.quotes.find_one({"id": quote_id, "user_id": current_user["sub"]}, {"_id": 0})
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    return Quote(**quote)

# ============================================================================
# APPOINTMENT ROUTES
# ============================================================================

@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(appointment_data: AppointmentCreate, current_user: dict = Depends(get_current_user)):
    user = await db.users.find_one({"id": current_user["sub"]}, {"_id": 0})
    
    appointment_dict = appointment_data.model_dump()
    appointment_dict["user_id"] = current_user["sub"]
    appointment_dict["user_email"] = user["email"]
    appointment_dict["user_name"] = user["full_name"]
    appointment_dict["created_at"] = get_current_timestamp()
    
    appointment_obj = Appointment(**appointment_dict)
    doc = prepare_for_mongo(appointment_obj.model_dump())
    await db.appointments.insert_one(doc)
    
    # Create notification
    notification = Notification(
        user_id=current_user["sub"],
        title="Rendez-vous confirmé",
        message=f"Votre rendez-vous pour {appointment_data.appointment_date} à {appointment_data.appointment_time} est confirmé",
        type="success",
        created_at=get_current_timestamp()
    )
    await db.notifications.insert_one(prepare_for_mongo(notification.model_dump()))
    
    return appointment_obj

@api_router.get("/appointments", response_model=List[Appointment])
async def get_appointments(current_user: dict = Depends(get_current_user)):
    appointments = await db.appointments.find({"user_id": current_user["sub"]}, {"_id": 0}).sort("appointment_date", -1).to_list(100)
    return [Appointment(**appt) for appt in appointments]

@api_router.get("/admin/appointments", response_model=List[Appointment])
async def get_all_appointments(current_user: dict = Depends(get_current_admin)):
    appointments = await db.appointments.find({}, {"_id": 0}).sort("appointment_date", 1).to_list(1000)
    return [Appointment(**appt) for appt in appointments]

# ============================================================================
# PAYMENT ROUTES (Stripe)
# ============================================================================

@api_router.post("/payments/stripe/checkout", response_model=CheckoutSessionResponse)
async def create_stripe_checkout(
    order_id: str,
    origin_url: str,
    current_user: dict = Depends(get_current_user)
):
    # Get order
    order = await db.orders.find_one({"id": order_id, "user_id": current_user["sub"]})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order["payment_status"] == "paid":
        raise HTTPException(status_code=400, detail="Order already paid")
    
    # Initialize Stripe
    host_url = origin_url
    webhook_url = f"{host_url}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    # Create checkout session
    success_url = f"{origin_url}/order-success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin_url}/cart"
    
    checkout_request = CheckoutSessionRequest(
        amount=float(order["total"]),
        currency="eur",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={
            "order_id": order_id,
            "user_id": current_user["sub"]
        }
    )
    
    session = await stripe_checkout.create_checkout_session(checkout_request)
    
    # Create payment transaction
    payment = PaymentTransaction(
        user_id=current_user["sub"],
        order_id=order_id,
        session_id=session.session_id,
        payment_method="stripe",
        amount=float(order["total"]),
        currency="eur",
        status="pending",
        metadata={"session_id": session.session_id},
        created_at=get_current_timestamp(),
        updated_at=get_current_timestamp()
    )
    await db.payment_transactions.insert_one(prepare_for_mongo(payment.model_dump()))
    
    return session

@api_router.get("/payments/stripe/status/{session_id}", response_model=CheckoutStatusResponse)
async def get_stripe_checkout_status(
    session_id: str,
    current_user: dict = Depends(get_current_user)
):
    # Get payment transaction
    payment = await db.payment_transactions.find_one({"session_id": session_id, "user_id": current_user["sub"]})
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    
    # Initialize Stripe
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url="")
    
    # Get checkout status
    checkout_status = await stripe_checkout.get_checkout_status(session_id)
    
    # Update payment transaction
    if checkout_status.payment_status == "paid" and payment["status"] != "completed":
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {"$set": {
                "status": "completed",
                "payment_status": checkout_status.payment_status,
                "updated_at": get_current_timestamp()
            }}
        )
        
        # Update order
        await db.orders.update_one(
            {"id": payment["order_id"]},
            {"$set": {
                "payment_status": "paid",
                "payment_method": "stripe",
                "updated_at": get_current_timestamp()
            }}
        )
        
        # Add loyalty points
        order = await db.orders.find_one({"id": payment["order_id"]})
        points = int(order["total"] * 0.01)  # 1% in points
        await db.users.update_one(
            {"id": current_user["sub"]},
            {"$inc": {"loyalty_points": points}}
        )
    
    return checkout_status

@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    body = await request.body()
    signature = request.headers.get("Stripe-Signature")
    
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url="")
    
    try:
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        if webhook_response.event_type == "checkout.session.completed":
            # Update payment and order
            payment = await db.payment_transactions.find_one({"session_id": webhook_response.session_id})
            if payment and payment["status"] != "completed":
                await db.payment_transactions.update_one(
                    {"session_id": webhook_response.session_id},
                    {"$set": {
                        "status": "completed",
                        "payment_status": webhook_response.payment_status,
                        "updated_at": get_current_timestamp()
                    }}
                )
                
                await db.orders.update_one(
                    {"id": payment["order_id"]},
                    {"$set": {
                        "payment_status": "paid",
                        "payment_method": "stripe",
                        "updated_at": get_current_timestamp()
                    }}
                )
        
        return {"status": "success"}
    except Exception as e:
        logging.error(f"Webhook error: {e}")
        raise HTTPException(status_code=400, detail="Webhook processing failed")

# ============================================================================
# REVIEW ROUTES
# ============================================================================

@api_router.post("/reviews", response_model=Review)
async def create_review(review_data: ReviewCreate, current_user: dict = Depends(get_current_user)):
    user = await db.users.find_one({"id": current_user["sub"]}, {"_id": 0})
    order = await db.orders.find_one({"id": review_data.order_id, "user_id": current_user["sub"]})
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    review_dict = review_data.model_dump()
    review_dict["user_id"] = current_user["sub"]
    review_dict["user_name"] = user["full_name"]
    review_dict["service_ids"] = [item["service_id"] for item in order["items"]]
    review_dict["created_at"] = get_current_timestamp()
    
    review_obj = Review(**review_dict)
    doc = prepare_for_mongo(review_obj.model_dump())
    await db.reviews.insert_one(doc)
    
    return review_obj

@api_router.get("/reviews", response_model=List[Review])
async def get_reviews(limit: int = 50):
    reviews = await db.reviews.find({"is_visible": True}, {"_id": 0}).sort("created_at", -1).limit(limit).to_list(limit)
    return [Review(**review) for review in reviews]

# ============================================================================
# NOTIFICATION ROUTES
# ============================================================================

@api_router.get("/notifications", response_model=List[Notification])
async def get_notifications(current_user: dict = Depends(get_current_user)):
    notifications = await db.notifications.find({"user_id": current_user["sub"]}, {"_id": 0}).sort("created_at", -1).limit(50).to_list(50)
    return [Notification(**notif) for notif in notifications]

@api_router.put("/notifications/{notification_id}/read")
async def mark_notification_read(notification_id: str, current_user: dict = Depends(get_current_user)):
    await db.notifications.update_one(
        {"id": notification_id, "user_id": current_user["sub"]},
        {"$set": {"is_read": True}}
    )
    return {"message": "Notification marked as read"}

# ============================================================================
# CHAT ROUTES
# ============================================================================

@api_router.post("/chat/messages", response_model=ChatMessage)
async def send_chat_message(message_data: ChatMessageCreate, current_user: dict = Depends(get_current_user)):
    user = await db.users.find_one({"id": current_user["sub"]}, {"_id": 0})
    
    message_dict = message_data.model_dump()
    message_dict["user_id"] = current_user["sub"]
    message_dict["user_name"] = user["full_name"]
    message_dict["sender_type"] = "user"
    message_dict["created_at"] = get_current_timestamp()
    
    message_obj = ChatMessage(**message_dict)
    doc = prepare_for_mongo(message_obj.model_dump())
    await db.chat_messages.insert_one(doc)
    
    return message_obj

@api_router.get("/chat/messages", response_model=List[ChatMessage])
async def get_chat_messages(current_user: dict = Depends(get_current_user)):
    messages = await db.chat_messages.find({"user_id": current_user["sub"]}, {"_id": 0}).sort("created_at", 1).to_list(100)
    return [ChatMessage(**msg) for msg in messages]

# ============================================================================
# PHOTO UPLOAD ROUTES
# ============================================================================

@api_router.post("/photos/upload")
async def upload_photo(
    file: UploadFile = File(...),
    order_id: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    current_user: dict = Depends(get_current_user)
):
    # Save file
    file_extension = Path(file.filename).suffix
    file_name = f"{current_user['sub']}_{get_current_timestamp().replace(':', '-').replace('.', '-')}{file_extension}"
    file_path = upload_dir / file_name
    
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Create photo record
    photo = PhotoUpload(
        user_id=current_user["sub"],
        order_id=order_id,
        file_url=f"/uploads/{file_name}",
        description=description,
        created_at=get_current_timestamp()
    )
    await db.photo_uploads.insert_one(prepare_for_mongo(photo.model_dump()))
    
    return {"message": "Photo uploaded", "file_url": photo.file_url}

@api_router.get("/photos")
async def get_photos(current_user: dict = Depends(get_current_user)):
    photos = await db.photo_uploads.find({"user_id": current_user["sub"]}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return [PhotoUpload(**photo) for photo in photos]

# ============================================================================
# ADMIN DASHBOARD ROUTES
# ============================================================================

@api_router.get("/admin/stats")
async def get_admin_stats(current_user: dict = Depends(get_current_admin)):
    total_users = await db.users.count_documents({"role": "client"})
    total_orders = await db.orders.count_documents({})
    total_revenue = 0
    
    orders = await db.orders.find({"payment_status": "paid"}, {"_id": 0, "total": 1}).to_list(10000)
    total_revenue = sum(order.get("total", 0) for order in orders)
    
    pending_quotes = await db.quote_requests.count_documents({"status": "pending"})
    
    return {
        "total_users": total_users,
        "total_orders": total_orders,
        "total_revenue": total_revenue,
        "pending_quotes": pending_quotes
    }

@api_router.get("/admin/users")
async def get_all_users(current_user: dict = Depends(get_current_admin)):
    users = await db.users.find({"role": "client"}, {"_id": 0, "hashed_password": 0}).sort("created_at", -1).to_list(1000)
    return [User(**user) for user in users]

# ============================================================================
# SYSTEM CONFIG ROUTES
# ============================================================================

@api_router.get("/config/{key}")
async def get_config(key: str):
    config = await db.system_config.find_one({"key": key}, {"_id": 0})
    if not config:
        # Return defaults
        defaults = {
            "travel_fee": 50.0,
            "loyalty_rate": 0.01,
            "quote_validity_days": 30
        }
        return {"key": key, "value": defaults.get(key, None)}
    return config

# ============================================================================
# Root route
# ============================================================================

@api_router.get("/")
async def root():
    return {"message": "MJ Créations API - Bienvenue!"}

# Include router
app.include_router(api_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
