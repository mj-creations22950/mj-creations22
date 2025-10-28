#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for MJ Créations
Tests all backend endpoints in priority order as specified in the review request.
"""

import requests
import json
import sys
from typing import Dict, Any, Optional

# Backend URL from frontend/.env
BASE_URL = "https://mjcreations-app.preview.emergentagent.com/api"

class MJCreationsAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.user_token = None
        self.admin_token = None
        self.test_user_id = None
        self.test_address_id = None
        self.test_service_id = None
        self.test_order_id = None
        self.session = requests.Session()
        
        # Test results tracking
        self.results = {
            "authentication": {"passed": 0, "failed": 0, "errors": []},
            "services": {"passed": 0, "failed": 0, "errors": []},
            "addresses": {"passed": 0, "failed": 0, "errors": []},
            "cart": {"passed": 0, "failed": 0, "errors": []},
            "orders": {"passed": 0, "failed": 0, "errors": []},
            "notifications": {"passed": 0, "failed": 0, "errors": []},
            "admin": {"passed": 0, "failed": 0, "errors": []}
        }

    def log_result(self, category: str, test_name: str, success: bool, error: str = None):
        """Log test result"""
        if success:
            self.results[category]["passed"] += 1
            print(f"✅ {test_name}")
        else:
            self.results[category]["failed"] += 1
            self.results[category]["errors"].append(f"{test_name}: {error}")
            print(f"❌ {test_name}: {error}")

    def make_request(self, method: str, endpoint: str, data: Dict = None, 
                    token: str = None, files: Dict = None) -> tuple:
        """Make HTTP request with error handling"""
        url = f"{self.base_url}{endpoint}"
        headers = {"Content-Type": "application/json"}
        
        if token:
            headers["Authorization"] = f"Bearer {token}"
        
        try:
            if method.upper() == "GET":
                response = self.session.get(url, headers=headers)
            elif method.upper() == "POST":
                if files:
                    # Remove Content-Type for file uploads
                    headers.pop("Content-Type", None)
                    response = self.session.post(url, headers=headers, files=files, data=data)
                else:
                    response = self.session.post(url, headers=headers, json=data)
            elif method.upper() == "PUT":
                response = self.session.put(url, headers=headers, json=data)
            elif method.upper() == "DELETE":
                response = self.session.delete(url, headers=headers)
            else:
                return False, f"Unsupported method: {method}"
            
            return True, response
        except Exception as e:
            return False, f"Request failed: {str(e)}"

    def test_authentication(self):
        """Test authentication endpoints (PRIORITY 1 - CRITICAL)"""
        print("\n🔐 Testing Authentication System...")
        
        # Test 1: Register new user
        user_data = {
            "email": "marie.dupont@test.fr",
            "full_name": "Marie Dupont",
            "phone": "0123456789",
            "password": "motdepasse123"
        }
        
        success, response = self.make_request("POST", "/auth/register", user_data)
        if success and response.status_code == 200:
            try:
                data = response.json()
                self.user_token = data["access_token"]
                self.test_user_id = data["user"]["id"]
                self.log_result("authentication", "POST /api/auth/register", True)
            except Exception as e:
                self.log_result("authentication", "POST /api/auth/register", False, f"Invalid response format: {e}")
        else:
            error_msg = f"Status: {response.status_code}" if success else str(response)
            self.log_result("authentication", "POST /api/auth/register", False, error_msg)

        # Test 2: Login with created user
        login_data = {
            "email": "marie.dupont@test.fr",
            "password": "motdepasse123"
        }
        
        success, response = self.make_request("POST", "/auth/login", login_data)
        if success and response.status_code == 200:
            try:
                data = response.json()
                self.user_token = data["access_token"]
                self.log_result("authentication", "POST /api/auth/login", True)
            except Exception as e:
                self.log_result("authentication", "POST /api/auth/login", False, f"Invalid response format: {e}")
        else:
            error_msg = f"Status: {response.status_code}" if success else str(response)
            self.log_result("authentication", "POST /api/auth/login", False, error_msg)

        # Test 3: Get user profile with token
        if self.user_token:
            success, response = self.make_request("GET", "/auth/me", token=self.user_token)
            if success and response.status_code == 200:
                try:
                    data = response.json()
                    if data.get("email") == "marie.dupont@test.fr":
                        self.log_result("authentication", "GET /api/auth/me", True)
                    else:
                        self.log_result("authentication", "GET /api/auth/me", False, "Wrong user data returned")
                except Exception as e:
                    self.log_result("authentication", "GET /api/auth/me", False, f"Invalid response format: {e}")
            else:
                error_msg = f"Status: {response.status_code}" if success else str(response)
                self.log_result("authentication", "GET /api/auth/me", False, error_msg)

    def test_services(self):
        """Test service endpoints (PRIORITY 2)"""
        print("\n🛍️ Testing Service Catalog...")
        
        # Test 1: Get all services
        success, response = self.make_request("GET", "/services")
        if success and response.status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list):
                    if len(data) > 0:
                        self.test_service_id = data[0]["id"]
                    self.log_result("services", "GET /api/services", True)
                else:
                    self.log_result("services", "GET /api/services", False, "Response is not a list")
            except Exception as e:
                self.log_result("services", "GET /api/services", False, f"Invalid response format: {e}")
        else:
            error_msg = f"Status: {response.status_code}" if success else str(response)
            self.log_result("services", "GET /api/services", False, error_msg)

        # Test 2: Get specific service (if we have a service ID)
        if self.test_service_id:
            success, response = self.make_request("GET", f"/services/{self.test_service_id}")
            if success and response.status_code == 200:
                try:
                    data = response.json()
                    if data.get("id") == self.test_service_id:
                        self.log_result("services", f"GET /api/services/{self.test_service_id}", True)
                    else:
                        self.log_result("services", f"GET /api/services/{self.test_service_id}", False, "Wrong service returned")
                except Exception as e:
                    self.log_result("services", f"GET /api/services/{self.test_service_id}", False, f"Invalid response format: {e}")
            else:
                error_msg = f"Status: {response.status_code}" if success else str(response)
                self.log_result("services", f"GET /api/services/{self.test_service_id}", False, error_msg)

    def test_addresses(self):
        """Test address management (PRIORITY 3)"""
        print("\n🏠 Testing Address Management...")
        
        if not self.user_token:
            self.log_result("addresses", "Address tests", False, "No user token available")
            return

        # Test 1: Create address
        address_data = {
            "label": "Domicile",
            "street": "123 Rue de la Paix",
            "city": "Paris",
            "postal_code": "75001",
            "country": "France",
            "is_default": True
        }
        
        success, response = self.make_request("POST", "/addresses", address_data, self.user_token)
        if success and response.status_code == 200:
            try:
                data = response.json()
                self.test_address_id = data["id"]
                self.log_result("addresses", "POST /api/addresses", True)
            except Exception as e:
                self.log_result("addresses", "POST /api/addresses", False, f"Invalid response format: {e}")
        else:
            error_msg = f"Status: {response.status_code}" if success else str(response)
            self.log_result("addresses", "POST /api/addresses", False, error_msg)

        # Test 2: Get addresses
        success, response = self.make_request("GET", "/addresses", token=self.user_token)
        if success and response.status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("addresses", "GET /api/addresses", True)
                else:
                    self.log_result("addresses", "GET /api/addresses", False, "Response is not a list")
            except Exception as e:
                self.log_result("addresses", "GET /api/addresses", False, f"Invalid response format: {e}")
        else:
            error_msg = f"Status: {response.status_code}" if success else str(response)
            self.log_result("addresses", "GET /api/addresses", False, error_msg)

    def test_cart(self):
        """Test cart management (PRIORITY 4)"""
        print("\n🛒 Testing Cart Management...")
        
        if not self.user_token:
            self.log_result("cart", "Cart tests", False, "No user token available")
            return

        # Test 1: Get empty cart
        success, response = self.make_request("GET", "/cart", token=self.user_token)
        if success and response.status_code == 200:
            try:
                data = response.json()
                if "items" in data and isinstance(data["items"], list):
                    self.log_result("cart", "GET /api/cart (empty)", True)
                else:
                    self.log_result("cart", "GET /api/cart (empty)", False, "Invalid cart structure")
            except Exception as e:
                self.log_result("cart", "GET /api/cart (empty)", False, f"Invalid response format: {e}")
        else:
            error_msg = f"Status: {response.status_code}" if success else str(response)
            self.log_result("cart", "GET /api/cart (empty)", False, error_msg)

        # Test 2: Add item to cart (if we have a service)
        if self.test_service_id:
            cart_item = {
                "service_id": self.test_service_id,
                "service_name": "Service de test",
                "quantity": 2,
                "unit_price": 50.0,
                "total_price": 100.0
            }
            
            success, response = self.make_request("POST", "/cart/items", cart_item, self.user_token)
            if success and response.status_code == 200:
                self.log_result("cart", "POST /api/cart/items", True)
            else:
                error_msg = f"Status: {response.status_code}" if success else str(response)
                self.log_result("cart", "POST /api/cart/items", False, error_msg)

            # Test 3: Get cart with items
            success, response = self.make_request("GET", "/cart", token=self.user_token)
            if success and response.status_code == 200:
                try:
                    data = response.json()
                    if len(data.get("items", [])) > 0:
                        self.log_result("cart", "GET /api/cart (with items)", True)
                    else:
                        self.log_result("cart", "GET /api/cart (with items)", False, "Cart should have items")
                except Exception as e:
                    self.log_result("cart", "GET /api/cart (with items)", False, f"Invalid response format: {e}")
            else:
                error_msg = f"Status: {response.status_code}" if success else str(response)
                self.log_result("cart", "GET /api/cart (with items)", False, error_msg)

    def test_orders(self):
        """Test order management (PRIORITY 5)"""
        print("\n📋 Testing Order Management...")
        
        if not self.user_token or not self.test_address_id or not self.test_service_id:
            self.log_result("orders", "Order tests", False, "Missing prerequisites (token, address, or service)")
            return

        # Test 1: Create order from cart
        order_data = {
            "items": [
                {
                    "service_id": self.test_service_id,
                    "service_name": "Service de test",
                    "quantity": 1,
                    "unit_price": 75.0,
                    "total_price": 75.0
                }
            ],
            "address_id": self.test_address_id,
            "notes": "Commande de test"
        }
        
        success, response = self.make_request("POST", "/orders", order_data, self.user_token)
        if success and response.status_code == 200:
            try:
                data = response.json()
                self.test_order_id = data["id"]
                self.log_result("orders", "POST /api/orders", True)
            except Exception as e:
                self.log_result("orders", "POST /api/orders", False, f"Invalid response format: {e}")
        else:
            error_msg = f"Status: {response.status_code}" if success else str(response)
            self.log_result("orders", "POST /api/orders", False, error_msg)

        # Test 2: Get user orders
        success, response = self.make_request("GET", "/orders", token=self.user_token)
        if success and response.status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("orders", "GET /api/orders", True)
                else:
                    self.log_result("orders", "GET /api/orders", False, "Response is not a list")
            except Exception as e:
                self.log_result("orders", "GET /api/orders", False, f"Invalid response format: {e}")
        else:
            error_msg = f"Status: {response.status_code}" if success else str(response)
            self.log_result("orders", "GET /api/orders", False, error_msg)

    def test_notifications(self):
        """Test notification system (PRIORITY 6)"""
        print("\n🔔 Testing Notifications...")
        
        if not self.user_token:
            self.log_result("notifications", "Notification tests", False, "No user token available")
            return

        # Test: Get notifications
        success, response = self.make_request("GET", "/notifications", token=self.user_token)
        if success and response.status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("notifications", "GET /api/notifications", True)
                else:
                    self.log_result("notifications", "GET /api/notifications", False, "Response is not a list")
            except Exception as e:
                self.log_result("notifications", "GET /api/notifications", False, f"Invalid response format: {e}")
        else:
            error_msg = f"Status: {response.status_code}" if success else str(response)
            self.log_result("notifications", "GET /api/notifications", False, error_msg)

    def test_admin_endpoints(self):
        """Test admin endpoints (PRIORITY 7)"""
        print("\n👑 Testing Admin Endpoints...")
        
        # Test 1: Admin login
        admin_login = {
            "email": "admin@mjcreations.fr",
            "password": "admin123"
        }
        
        success, response = self.make_request("POST", "/auth/login", admin_login)
        if success and response.status_code == 200:
            try:
                data = response.json()
                self.admin_token = data["access_token"]
                self.log_result("admin", "POST /api/auth/login (admin)", True)
            except Exception as e:
                self.log_result("admin", "POST /api/auth/login (admin)", False, f"Invalid response format: {e}")
        else:
            error_msg = f"Status: {response.status_code}" if success else str(response)
            self.log_result("admin", "POST /api/auth/login (admin)", False, error_msg)

        if not self.admin_token:
            self.log_result("admin", "Admin tests", False, "No admin token available")
            return

        # Test 2: Get admin stats
        success, response = self.make_request("GET", "/admin/stats", token=self.admin_token)
        if success and response.status_code == 200:
            try:
                data = response.json()
                required_fields = ["total_users", "total_orders", "total_revenue", "pending_quotes"]
                if all(field in data for field in required_fields):
                    self.log_result("admin", "GET /api/admin/stats", True)
                else:
                    self.log_result("admin", "GET /api/admin/stats", False, "Missing required fields in stats")
            except Exception as e:
                self.log_result("admin", "GET /api/admin/stats", False, f"Invalid response format: {e}")
        else:
            error_msg = f"Status: {response.status_code}" if success else str(response)
            self.log_result("admin", "GET /api/admin/stats", False, error_msg)

        # Test 3: Get all orders (admin)
        success, response = self.make_request("GET", "/admin/orders", token=self.admin_token)
        if success and response.status_code == 200:
            try:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("admin", "GET /api/admin/orders", True)
                else:
                    self.log_result("admin", "GET /api/admin/orders", False, "Response is not a list")
            except Exception as e:
                self.log_result("admin", "GET /api/admin/orders", False, f"Invalid response format: {e}")
        else:
            error_msg = f"Status: {response.status_code}" if success else str(response)
            self.log_result("admin", "GET /api/admin/orders", False, error_msg)

    def run_all_tests(self):
        """Run all tests in priority order"""
        print(f"🚀 Starting MJ Créations Backend API Tests")
        print(f"🌐 Backend URL: {self.base_url}")
        print("=" * 60)
        
        # Run tests in priority order
        self.test_authentication()      # PRIORITY 1 - CRITICAL
        self.test_services()           # PRIORITY 2
        self.test_addresses()          # PRIORITY 3
        self.test_cart()              # PRIORITY 4
        self.test_orders()            # PRIORITY 5
        self.test_notifications()     # PRIORITY 6
        self.test_admin_endpoints()   # PRIORITY 7
        
        # Print summary
        self.print_summary()

    def print_summary(self):
        """Print test results summary"""
        print("\n" + "=" * 60)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 60)
        
        total_passed = 0
        total_failed = 0
        critical_failures = []
        
        for category, results in self.results.items():
            passed = results["passed"]
            failed = results["failed"]
            total_passed += passed
            total_failed += failed
            
            status = "✅" if failed == 0 else "❌"
            print(f"{status} {category.upper()}: {passed} passed, {failed} failed")
            
            # Track critical failures
            if category in ["authentication", "services", "cart", "orders"] and failed > 0:
                critical_failures.extend(results["errors"])
            
            # Print errors for this category
            if results["errors"]:
                for error in results["errors"]:
                    print(f"   ⚠️  {error}")
        
        print("-" * 60)
        print(f"TOTAL: {total_passed} passed, {total_failed} failed")
        
        if critical_failures:
            print(f"\n🚨 CRITICAL ISSUES FOUND ({len(critical_failures)}):")
            for error in critical_failures:
                print(f"   • {error}")
        
        if total_failed == 0:
            print("\n🎉 ALL TESTS PASSED! Backend API is working correctly.")
        elif len(critical_failures) == 0:
            print("\n✅ Core functionality working. Minor issues detected.")
        else:
            print(f"\n❌ {len(critical_failures)} critical issues need attention.")

def main():
    """Main test execution"""
    tester = MJCreationsAPITester()
    tester.run_all_tests()
    
    # Return exit code based on critical failures
    critical_categories = ["authentication", "services", "cart", "orders"]
    has_critical_failures = any(
        tester.results[cat]["failed"] > 0 
        for cat in critical_categories
    )
    
    return 1 if has_critical_failures else 0

if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)