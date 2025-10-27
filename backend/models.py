# models.py - Pydantic models for the application
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum
import uuid


# Base Model Configuration
def generate_uuid():
    return str(uuid.uuid4())


# Enums
class OrderStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class PaymentStatus(str, Enum):
    PENDING = "pending"
    PAID = "paid"
    FAILED = "failed"
    REFUNDED = "refunded"


class PaymentMethod(str, Enum):
    STRIPE = "stripe"
    BANK_TRANSFER = "bank_transfer"
    CHECK = "check"
    CASH = "cash"
    PAYPAL = "paypal"


class UserRole(str, Enum):
    CLIENT = "client"
    ADMIN = "admin"


# User Models
class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    phone: Optional[str] = None


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class User(UserBase):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=generate_uuid)
    role: UserRole = UserRole.CLIENT
    loyalty_points: int = 0
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    is_active: bool = True


class UserInDB(User):
    hashed_password: str


# Token Models
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


# Service Models
class Service(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str
    name: str
    price: float
    unit: str
    included: List[str]
    excluded: List[str]
    duration: str
    category: str
    popular: Optional[bool] = False
    description: Optional[str] = None


# Address Models
class Address(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=generate_uuid)
    user_id: str
    label: str  # "Home", "Work", etc.
    street: str
    city: str
    postal_code: str
    country: str = "France"
    is_default: bool = False


# Order Models
class OrderItem(BaseModel):
    service_id: str
    service_name: str
    quantity: int
    price: float


class OrderCreate(BaseModel):
    items: List[OrderItem]
    address_id: str
    notes: Optional[str] = None


class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=generate_uuid)
    user_id: str
    items: List[OrderItem]
    total_amount: float
    status: OrderStatus = OrderStatus.PENDING
    payment_status: PaymentStatus = PaymentStatus.PENDING
    payment_method: Optional[PaymentMethod] = None
    address_id: str
    notes: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


# Quote Models
class QuoteCreate(BaseModel):
    service_category: str
    description: str
    preferred_date: Optional[str] = None
    address_id: Optional[str] = None
    phone: str
    email: EmailStr


class Quote(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=generate_uuid)
    user_id: Optional[str] = None
    service_category: str
    description: str
    preferred_date: Optional[str] = None
    address_id: Optional[str] = None
    phone: str
    email: str
    status: str = "pending"  # pending, reviewed, quoted, accepted, rejected
    admin_response: Optional[str] = None
    quoted_amount: Optional[float] = None
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


# Payment Models
class PaymentTransaction(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=generate_uuid)
    order_id: Optional[str] = None
    user_id: Optional[str] = None
    session_id: str
    amount: float
    currency: str = "eur"
    payment_status: str = "pending"
    status: str = "pending"
    metadata: Optional[Dict[str, Any]] = {}
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


# Chat Models
class ChatMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=generate_uuid)
    session_id: str
    user_id: Optional[str] = None
    role: str  # "user" or "assistant"
    content: str
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class ChatMessageCreate(BaseModel):
    message: str
    session_id: Optional[str] = None


# Notification Models
class Notification(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=generate_uuid)
    user_id: str
    title: str
    message: str
    type: str = "info"  # info, success, warning, error
    is_read: bool = False
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


# Review Models
class ReviewCreate(BaseModel):
    service_id: str
    rating: int  # 1-5
    comment: str


class Review(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=generate_uuid)
    user_id: str
    service_id: str
    rating: int
    comment: str
    is_approved: bool = False
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


# Loyalty Points Models
class LoyaltyTransaction(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=generate_uuid)
    user_id: str
    points: int  # positive for earning, negative for spending
    reason: str
    order_id: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


# Appointment Models
class AppointmentCreate(BaseModel):
    service_id: str
    preferred_date: str
    preferred_time: str
    notes: Optional[str] = None


class Appointment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=generate_uuid)
    user_id: str
    service_id: str
    preferred_date: str
    preferred_time: str
    confirmed_date: Optional[str] = None
    confirmed_time: Optional[str] = None
    status: str = "pending"  # pending, confirmed, completed, cancelled
    notes: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


# Contact Form Model
class ContactFormSubmit(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str
