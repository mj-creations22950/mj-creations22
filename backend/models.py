from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime, date, time
import uuid

# User Models
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    phone: Optional[str] = None
    role: str = "client"  # client or admin

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    is_active: bool = True
    loyalty_points: int = 0
    created_at: str
    addresses: List[Dict[str, Any]] = []

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

# Address Models
class Address(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    label: str  # Home, Work, etc.
    street: str
    city: str
    postal_code: str
    country: str = "France"
    is_default: bool = False

class AddressCreate(BaseModel):
    label: str
    street: str
    city: str
    postal_code: str
    country: str = "France"
    is_default: bool = False

# Service Models
class Service(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    category: str
    sub_category: str
    name: str
    description: str
    price: float
    unit: str
    included: List[str] = []
    excluded: List[str] = []
    duration_hours: Optional[float] = None
    is_active: bool = True
    image_url: Optional[str] = None

class ServiceCreate(BaseModel):
    category: str
    sub_category: str
    name: str
    description: str
    price: float
    unit: str
    included: List[str] = []
    excluded: List[str] = []
    duration_hours: Optional[float] = None
    is_active: bool = True
    image_url: Optional[str] = None

# Cart & Order Models
class CartItem(BaseModel):
    service_id: str
    service_name: str
    quantity: int
    unit_price: float
    total_price: float

class Cart(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    items: List[CartItem] = []
    subtotal: float = 0.0
    travel_fee: float = 0.0
    total: float = 0.0
    updated_at: str

class OrderItem(BaseModel):
    service_id: str
    service_name: str
    quantity: int
    unit_price: float
    total_price: float

class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    user_email: str
    user_name: str
    items: List[OrderItem]
    subtotal: float
    travel_fee: float
    total: float
    status: str = "pending"  # pending, confirmed, in_progress, completed, cancelled
    payment_status: str = "unpaid"  # unpaid, paid, refunded
    payment_method: Optional[str] = None
    address_id: Optional[str] = None
    notes: Optional[str] = None
    created_at: str
    updated_at: str

class OrderCreate(BaseModel):
    items: List[OrderItem]
    address_id: str
    notes: Optional[str] = None

# Quote Models
class QuoteItem(BaseModel):
    service_id: str
    service_name: str
    quantity: int
    unit_price: float
    total_price: float

class Quote(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    user_email: str
    user_name: str
    items: List[QuoteItem]
    subtotal: float
    travel_fee: float
    total: float
    status: str = "draft"  # draft, sent, accepted, rejected, expired
    address_id: Optional[str] = None
    notes: Optional[str] = None
    valid_until: str
    created_at: str
    updated_at: str

class QuoteCreate(BaseModel):
    items: List[QuoteItem]
    address_id: str
    notes: Optional[str] = None
    description: str

class QuoteRequest(BaseModel):
    description: str
    address_id: str
    phone: str
    preferred_date: Optional[str] = None

# Appointment Models
class Appointment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    user_email: str
    user_name: str
    order_id: Optional[str] = None
    quote_id: Optional[str] = None
    service_type: str
    appointment_date: str
    appointment_time: str
    status: str = "scheduled"  # scheduled, confirmed, in_progress, completed, cancelled
    address_id: str
    notes: Optional[str] = None
    created_at: str

class AppointmentCreate(BaseModel):
    appointment_date: str
    appointment_time: str
    service_type: str
    address_id: str
    notes: Optional[str] = None

# Payment Models
class PaymentTransaction(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    order_id: Optional[str] = None
    session_id: Optional[str] = None
    payment_method: str  # stripe, paypal, bank_transfer, check, cash
    amount: float
    currency: str = "eur"
    status: str = "pending"  # pending, completed, failed, refunded
    payment_status: Optional[str] = None
    metadata: Dict[str, Any] = {}
    created_at: str
    updated_at: str

# Review Models
class Review(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    user_name: str
    order_id: str
    rating: int  # 1-5
    comment: str
    service_ids: List[str] = []
    created_at: str
    is_visible: bool = True

class ReviewCreate(BaseModel):
    order_id: str
    rating: int
    comment: str

# Notification Models
class Notification(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    title: str
    message: str
    type: str  # info, success, warning, error
    is_read: bool = False
    link: Optional[str] = None
    created_at: str

class NotificationCreate(BaseModel):
    user_id: str
    title: str
    message: str
    type: str = "info"
    link: Optional[str] = None

# Chat Models
class ChatMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    user_name: str
    message: str
    sender_type: str  # user or admin
    created_at: str
    is_read: bool = False

class ChatMessageCreate(BaseModel):
    message: str

# Document Models
class Document(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    type: str  # invoice, quote, contract, certificate
    title: str
    file_url: str
    order_id: Optional[str] = None
    quote_id: Optional[str] = None
    created_at: str

# Photo Upload Models
class PhotoUpload(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    order_id: Optional[str] = None
    file_url: str
    description: Optional[str] = None
    created_at: str

class PhotoUploadCreate(BaseModel):
    order_id: Optional[str] = None
    description: Optional[str] = None

# System Config Models
class SystemConfig(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    key: str
    value: Any
    description: Optional[str] = None
    updated_at: str
