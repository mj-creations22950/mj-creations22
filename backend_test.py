#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for MJ Créations Application
Tests all backend endpoints using the production URL from frontend/.env
"""

import asyncio
import aiohttp
import json
from datetime import datetime
import uuid

# Backend URL from frontend/.env
BACKEND_URL = "https://mj-artisan.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.session = None
        self.auth_token = None
        self.admin_token = None
        self.test_user_id = None
        self.test_order_id = None
        self.test_address_id = None
        self.test_session_id = None
        self.results = {}
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    def log_result(self, test_name, success, details="", error=None):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
        if error:
            print(f"   Error: {error}")
        
        self.results[test_name] = {
            "success": success,
            "details": details,
            "error": str(error) if error else None
        }
    
    async def make_request(self, method, endpoint, data=None, headers=None, auth_required=False):
        """Make HTTP request with error handling"""
        url = f"{BACKEND_URL}{endpoint}"
        
        # Add auth header if required
        if auth_required and self.auth_token:
            if not headers:
                headers = {}
            headers["Authorization"] = f"Bearer {self.auth_token}"
        
        try:
            async with self.session.request(method, url, json=data, headers=headers) as response:
                response_text = await response.text()
                try:
                    response_data = json.loads(response_text) if response_text else {}
                except json.JSONDecodeError:
                    response_data = {"raw_response": response_text}
                
                return {
                    "status": response.status,
                    "data": response_data,
                    "success": 200 <= response.status < 300
                }
        except Exception as e:
            return {
                "status": 0,
                "data": {"error": str(e)},
                "success": False,
                "exception": e
            }
    
    async def test_health_check(self):
        """Test basic health endpoints"""
        print("\n=== HEALTH CHECK ===")
        
        # Test root endpoint
        result = await self.make_request("GET", "/")
        self.log_result(
            "Root Endpoint", 
            result["success"], 
            f"Status: {result['status']}, Response: {result['data']}"
        )
        
        # Test health endpoint
        result = await self.make_request("GET", "/health")
        self.log_result(
            "Health Check", 
            result["success"], 
            f"Status: {result['status']}, Response: {result['data']}"
        )
    
    async def test_authentication(self):
        """Test authentication system"""
        print("\n=== AUTHENTICATION SYSTEM ===")
        
        # Generate unique test user
        timestamp = str(int(datetime.now().timestamp()))
        test_email = f"testuser{timestamp}@mjcreations.fr"
        test_password = "TestPassword123!"
        
        # Test signup
        signup_data = {
            "email": test_email,
            "password": test_password,
            "first_name": "Jean",
            "last_name": "Dupont",
            "phone": "0123456789"
        }
        
        result = await self.make_request("POST", "/auth/signup", signup_data)
        if result["success"]:
            self.test_user_id = result["data"].get("id")
            self.log_result("User Signup", True, f"Created user: {test_email}")
        else:
            self.log_result("User Signup", False, f"Status: {result['status']}", result["data"])
            return False
        
        # Test login
        login_data = {
            "email": test_email,
            "password": test_password
        }
        
        result = await self.make_request("POST", "/auth/login", login_data)
        if result["success"]:
            self.auth_token = result["data"].get("access_token")
            self.log_result("User Login", True, "Token received")
        else:
            self.log_result("User Login", False, f"Status: {result['status']}", result["data"])
            return False
        
        # Test get current user
        result = await self.make_request("GET", "/auth/me", auth_required=True)
        self.log_result(
            "Get Current User", 
            result["success"], 
            f"User ID: {result['data'].get('id', 'N/A')}" if result["success"] else f"Status: {result['status']}"
        )
        
        return True
    
    async def test_admin_authentication(self):
        """Test admin authentication"""
        print("\n=== ADMIN AUTHENTICATION ===")
        
        # Test admin login
        admin_login_data = {
            "email": "admin@mjcreations.fr",
            "password": "admin123"
        }
        
        result = await self.make_request("POST", "/auth/login", admin_login_data)
        if result["success"]:
            self.admin_token = result["data"].get("access_token")
            self.log_result("Admin Login", True, "Admin token received")
            return True
        else:
            self.log_result("Admin Login", False, f"Status: {result['status']}", result["data"])
            return False
    
    async def test_services_api(self):
        """Test services API"""
        print("\n=== SERVICES API ===")
        
        # Test get all services
        result = await self.make_request("GET", "/services")
        if result["success"]:
            services_count = len(result["data"])
            self.log_result("Get All Services", True, f"Retrieved {services_count} services")
        else:
            self.log_result("Get All Services", False, f"Status: {result['status']}", result["data"])
        
        # Test get services by category
        result = await self.make_request("GET", "/services/category/electricite")
        if result["success"]:
            category_services = len(result["data"])
            self.log_result("Get Services by Category", True, f"Retrieved {category_services} electrical services")
        else:
            self.log_result("Get Services by Category", False, f"Status: {result['status']}", result["data"])
        
        # Test get specific service
        result = await self.make_request("GET", "/services/prise_simple")
        self.log_result(
            "Get Specific Service", 
            result["success"], 
            f"Service: {result['data'].get('name', 'N/A')}" if result["success"] else f"Status: {result['status']}"
        )
    
    async def test_addresses(self):
        """Test address management"""
        print("\n=== ADDRESS MANAGEMENT ===")
        
        if not self.auth_token:
            self.log_result("Address Tests", False, "No auth token available")
            return
        
        # Create address
        address_data = {
            "street": "123 Rue de la Paix",
            "city": "Rennes",
            "postal_code": "35000",
            "country": "France",
            "is_default": True
        }
        
        result = await self.make_request("POST", "/addresses", address_data, auth_required=True)
        if result["success"]:
            self.test_address_id = result["data"].get("id")
            self.log_result("Create Address", True, f"Address ID: {self.test_address_id}")
        else:
            self.log_result("Create Address", False, f"Status: {result['status']}", result["data"])
        
        # Get addresses
        result = await self.make_request("GET", "/addresses", auth_required=True)
        self.log_result(
            "Get User Addresses", 
            result["success"], 
            f"Found {len(result['data'])} addresses" if result["success"] else f"Status: {result['status']}"
        )
    
    async def test_orders_system(self):
        """Test orders system"""
        print("\n=== ORDERS SYSTEM ===")
        
        if not self.auth_token or not self.test_address_id:
            self.log_result("Orders Tests", False, "Missing auth token or address ID")
            return
        
        # Create order
        order_data = {
            "items": [
                {
                    "service_id": "prise_simple",
                    "service_name": "Installation prise simple",
                    "quantity": 2,
                    "price": 45.0
                },
                {
                    "service_id": "interrupteur_simple",
                    "service_name": "Installation interrupteur simple",
                    "quantity": 1,
                    "price": 35.0
                }
            ],
            "address_id": self.test_address_id,
            "notes": "Installation dans le salon"
        }
        
        result = await self.make_request("POST", "/orders", order_data, auth_required=True)
        if result["success"]:
            self.test_order_id = result["data"].get("id")
            total_amount = result["data"].get("total_amount")
            self.log_result("Create Order", True, f"Order ID: {self.test_order_id}, Total: €{total_amount}")
        else:
            self.log_result("Create Order", False, f"Status: {result['status']}", result["data"])
            return
        
        # Get user orders
        result = await self.make_request("GET", "/orders", auth_required=True)
        self.log_result(
            "Get User Orders", 
            result["success"], 
            f"Found {len(result['data'])} orders" if result["success"] else f"Status: {result['status']}"
        )
        
        # Get specific order
        if self.test_order_id:
            result = await self.make_request("GET", f"/orders/{self.test_order_id}", auth_required=True)
            self.log_result(
                "Get Specific Order", 
                result["success"], 
                f"Order status: {result['data'].get('status', 'N/A')}" if result["success"] else f"Status: {result['status']}"
            )
    
    async def test_stripe_payments(self):
        """Test Stripe payment integration"""
        print("\n=== STRIPE PAYMENT INTEGRATION ===")
        
        if not self.auth_token or not self.test_order_id:
            self.log_result("Payment Tests", False, "Missing auth token or order ID")
            return
        
        # Create checkout session
        checkout_data = {
            "order_id": self.test_order_id,
            "origin_url": "https://mj-artisan.preview.emergentagent.com"
        }
        
        result = await self.make_request("POST", "/payments/checkout/session", checkout_data, auth_required=True)
        if result["success"]:
            session_id = result["data"].get("session_id")
            checkout_url = result["data"].get("checkout_url")
            self.log_result("Create Checkout Session", True, f"Session ID: {session_id}")
            
            # Test checkout status
            if session_id:
                result = await self.make_request("GET", f"/payments/checkout/status/{session_id}", auth_required=True)
                self.log_result(
                    "Get Checkout Status", 
                    result["success"], 
                    f"Status: {result['data'].get('status', 'N/A')}" if result["success"] else f"HTTP Status: {result['status']}"
                )
        else:
            self.log_result("Create Checkout Session", False, f"Status: {result['status']}", result["data"])
    
    async def test_quotes_system(self):
        """Test quote request system"""
        print("\n=== QUOTE REQUEST SYSTEM ===")
        
        # Test anonymous quote request
        quote_data = {
            "service_category": "Plomberie",
            "description": "Réparation fuite d'eau dans la salle de bain",
            "phone": "0987654321",
            "email": "marie.martin@example.com",
            "preferred_date": "2024-02-15"
        }
        
        result = await self.make_request("POST", "/quotes", quote_data)
        self.log_result(
            "Create Anonymous Quote", 
            result["success"], 
            f"Quote ID: {result['data'].get('id', 'N/A')}" if result["success"] else f"Status: {result['status']}"
        )
        
        # Test authenticated quote request
        if self.auth_token:
            quote_data["description"] = "Installation nouveau chauffage"
            result = await self.make_request("POST", "/quotes", quote_data, auth_required=True)
            self.log_result(
                "Create Authenticated Quote", 
                result["success"], 
                f"Quote ID: {result['data'].get('id', 'N/A')}" if result["success"] else f"Status: {result['status']}"
            )
            
            # Get user quotes
            result = await self.make_request("GET", "/quotes", auth_required=True)
            self.log_result(
                "Get User Quotes", 
                result["success"], 
                f"Found {len(result['data'])} quotes" if result["success"] else f"Status: {result['status']}"
            )
    
    async def test_chat_assistant(self):
        """Test Claude Sonnet 4 chat assistant"""
        print("\n=== CHAT ASSISTANT (CLAUDE SONNET 4) ===")
        
        # Generate session ID
        self.test_session_id = f"test_session_{int(datetime.now().timestamp())}"
        
        # Test chat message
        chat_data = {
            "message": "Bonjour, quels sont vos services de plomberie disponibles?",
            "session_id": self.test_session_id
        }
        
        result = await self.make_request("POST", "/chat", chat_data)
        if result["success"]:
            response_content = result["data"].get("content", "")
            self.log_result("Send Chat Message", True, f"Response length: {len(response_content)} chars")
            
            # Test chat history
            result = await self.make_request("GET", f"/chat/history/{self.test_session_id}")
            self.log_result(
                "Get Chat History", 
                result["success"], 
                f"Found {len(result['data'])} messages" if result["success"] else f"Status: {result['status']}"
            )
        else:
            self.log_result("Send Chat Message", False, f"Status: {result['status']}", result["data"])
    
    async def test_notifications(self):
        """Test notifications system"""
        print("\n=== NOTIFICATIONS SYSTEM ===")
        
        if not self.auth_token:
            self.log_result("Notifications Tests", False, "No auth token available")
            return
        
        # Get notifications
        result = await self.make_request("GET", "/notifications", auth_required=True)
        self.log_result(
            "Get User Notifications", 
            result["success"], 
            f"Found {len(result['data'])} notifications" if result["success"] else f"Status: {result['status']}"
        )
        
        # Get unread count
        result = await self.make_request("GET", "/notifications/unread/count", auth_required=True)
        self.log_result(
            "Get Unread Count", 
            result["success"], 
            f"Unread: {result['data'].get('count', 'N/A')}" if result["success"] else f"Status: {result['status']}"
        )
    
    async def test_user_profile(self):
        """Test user profile management"""
        print("\n=== USER PROFILE MANAGEMENT ===")
        
        if not self.auth_token:
            self.log_result("Profile Tests", False, "No auth token available")
            return
        
        # Get profile
        result = await self.make_request("GET", "/profile", auth_required=True)
        self.log_result(
            "Get User Profile", 
            result["success"], 
            f"User: {result['data'].get('first_name', 'N/A')} {result['data'].get('last_name', 'N/A')}" if result["success"] else f"Status: {result['status']}"
        )
        
        # Update profile
        update_data = {
            "phone": "0123456789",
            "first_name": "Jean-Updated"
        }
        
        result = await self.make_request("PUT", "/profile", update_data, auth_required=True)
        self.log_result(
            "Update User Profile", 
            result["success"], 
            f"Updated name: {result['data'].get('first_name', 'N/A')}" if result["success"] else f"Status: {result['status']}"
        )
    
    async def test_reviews_system(self):
        """Test reviews system"""
        print("\n=== REVIEWS SYSTEM ===")
        
        if not self.auth_token:
            self.log_result("Reviews Tests", False, "No auth token available")
            return
        
        # Create review
        review_data = {
            "service_id": "prise_simple",
            "rating": 5,
            "comment": "Excellent service, très professionnel et rapide!",
            "order_id": self.test_order_id
        }
        
        result = await self.make_request("POST", "/reviews", review_data, auth_required=True)
        self.log_result(
            "Create Review", 
            result["success"], 
            f"Review ID: {result['data'].get('id', 'N/A')}" if result["success"] else f"Status: {result['status']}"
        )
        
        # Get service reviews
        result = await self.make_request("GET", "/reviews/service/prise_simple")
        self.log_result(
            "Get Service Reviews", 
            result["success"], 
            f"Found {len(result['data'])} reviews" if result["success"] else f"Status: {result['status']}"
        )
    
    async def test_admin_dashboard(self):
        """Test admin dashboard APIs"""
        print("\n=== ADMIN DASHBOARD APIs ===")
        
        if not self.admin_token:
            await self.test_admin_authentication()
        
        if not self.admin_token:
            self.log_result("Admin Tests", False, "No admin token available")
            return
        
        # Use admin token for admin requests
        original_token = self.auth_token
        self.auth_token = self.admin_token
        
        # Get admin stats
        result = await self.make_request("GET", "/admin/stats", auth_required=True)
        self.log_result(
            "Get Admin Stats", 
            result["success"], 
            f"Users: {result['data'].get('total_users', 'N/A')}, Orders: {result['data'].get('total_orders', 'N/A')}" if result["success"] else f"Status: {result['status']}"
        )
        
        # Get all orders
        result = await self.make_request("GET", "/admin/orders", auth_required=True)
        self.log_result(
            "Get All Orders (Admin)", 
            result["success"], 
            f"Found {len(result['data'])} orders" if result["success"] else f"Status: {result['status']}"
        )
        
        # Get all users
        result = await self.make_request("GET", "/admin/users", auth_required=True)
        self.log_result(
            "Get All Users (Admin)", 
            result["success"], 
            f"Found {len(result['data'])} users" if result["success"] else f"Status: {result['status']}"
        )
        
        # Get all quotes
        result = await self.make_request("GET", "/admin/quotes", auth_required=True)
        self.log_result(
            "Get All Quotes (Admin)", 
            result["success"], 
            f"Found {len(result['data'])} quotes" if result["success"] else f"Status: {result['status']}"
        )
        
        # Update order status
        if self.test_order_id:
            status_data = {"status": "in_progress"}
            result = await self.make_request("PUT", f"/admin/orders/{self.test_order_id}/status", status_data, auth_required=True)
            self.log_result(
                "Update Order Status (Admin)", 
                result["success"], 
                "Status updated to in_progress" if result["success"] else f"Status: {result['status']}"
            )
        
        # Restore original token
        self.auth_token = original_token
    
    async def test_contact_form(self):
        """Test contact form"""
        print("\n=== CONTACT FORM ===")
        
        contact_data = {
            "name": "Pierre Durand",
            "email": "pierre.durand@example.com",
            "phone": "0145678901",
            "subject": "Demande d'information",
            "message": "Bonjour, j'aimerais avoir des informations sur vos services de chauffage."
        }
        
        result = await self.make_request("POST", "/contact", contact_data)
        self.log_result(
            "Submit Contact Form", 
            result["success"], 
            f"Message: {result['data'].get('message', 'N/A')}" if result["success"] else f"Status: {result['status']}"
        )
    
    async def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Comprehensive Backend API Testing for MJ Créations")
        print(f"Backend URL: {BACKEND_URL}")
        print("=" * 80)
        
        # Run tests in order
        await self.test_health_check()
        
        # Authentication is required for most tests
        auth_success = await self.test_authentication()
        
        # Core services
        await self.test_services_api()
        
        # User-related features (require auth)
        if auth_success:
            await self.test_addresses()
            await self.test_orders_system()
            await self.test_stripe_payments()
            await self.test_user_profile()
            await self.test_notifications()
            await self.test_reviews_system()
        
        # Features that work with or without auth
        await self.test_quotes_system()
        await self.test_chat_assistant()
        await self.test_contact_form()
        
        # Admin features
        await self.test_admin_dashboard()
        
        # Print summary
        self.print_summary()
    
    def print_summary(self):
        """Print test results summary"""
        print("\n" + "=" * 80)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 80)
        
        total_tests = len(self.results)
        passed_tests = sum(1 for result in self.results.values() if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests*100):.1f}%")
        
        if failed_tests > 0:
            print("\n🔍 FAILED TESTS:")
            for test_name, result in self.results.items():
                if not result["success"]:
                    print(f"  ❌ {test_name}")
                    if result["error"]:
                        print(f"     Error: {result['error']}")
        
        print("\n" + "=" * 80)

async def main():
    """Main test runner"""
    async with BackendTester() as tester:
        await tester.run_all_tests()

if __name__ == "__main__":
    asyncio.run(main())