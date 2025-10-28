"""
Script to initialize the database with sample data
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from pathlib import Path
import json

# Load environment
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

async def init_database():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print("🚀 Initializing MJ Créations database...")
    
    # Create admin user
    admin_exists = await db.users.find_one({"email": "admin@mjcreations.fr"})
    if not admin_exists:
        from auth import hash_password
        from utils import get_current_timestamp
        import uuid
        
        admin_user = {
            "id": str(uuid.uuid4()),
            "email": "admin@mjcreations.fr",
            "full_name": "Admin MJ Créations",
            "phone": "0123456789",
            "role": "admin",
            "hashed_password": hash_password("admin123"),
            "is_active": True,
            "loyalty_points": 0,
            "addresses": [],
            "created_at": get_current_timestamp()
        }
        await db.users.insert_one(admin_user)
        print("✅ Admin user created: admin@mjcreations.fr / admin123")
    else:
        print("ℹ️  Admin user already exists")
    
    # Create sample services
    services_count = await db.services.count_documents({})
    if services_count == 0:
        from utils import get_current_timestamp
        import uuid
        
        sample_services = [
            # Plomberie
            {
                "id": str(uuid.uuid4()),
                "category": "Plomberie",
                "sub_category": "Installation",
                "name": "Installation robinet",
                "description": "Installation complète d'un robinet",
                "price": 89.0,
                "unit": "unité",
                "included": ["Fourniture du robinet", "Installation", "Test d'étanchéité"],
                "excluded": ["Modifications de la tuyauterie existante"],
                "duration_hours": 1.5,
                "is_active": True,
                "image_url": None
            },
            {
                "id": str(uuid.uuid4()),
                "category": "Plomberie",
                "sub_category": "Réparation",
                "name": "Débouchage canalisation",
                "description": "Débouchage professionnel de canalisation",
                "price": 120.0,
                "unit": "intervention",
                "included": ["Diagnostic", "Débouchage", "Nettoyage"],
                "excluded": ["Remplacement de canalisation"],
                "duration_hours": 1.0,
                "is_active": True,
                "image_url": None
            },
            # Chauffage
            {
                "id": str(uuid.uuid4()),
                "category": "Chauffage",
                "sub_category": "Entretien",
                "name": "Entretien chaudière",
                "description": "Entretien annuel de chaudière gaz",
                "price": 150.0,
                "unit": "intervention",
                "included": ["Nettoyage complet", "Vérification sécurité", "Attestation"],
                "excluded": ["Pièces de rechange"],
                "duration_hours": 2.0,
                "is_active": True,
                "image_url": None
            },
            {
                "id": str(uuid.uuid4()),
                "category": "Chauffage",
                "sub_category": "Installation",
                "name": "Installation radiateur",
                "description": "Installation d'un radiateur électrique",
                "price": 180.0,
                "unit": "unité",
                "included": ["Installation", "Raccordement électrique", "Mise en service"],
                "excluded": ["Fourniture du radiateur"],
                "duration_hours": 2.5,
                "is_active": True,
                "image_url": None
            },
            # Électricité
            {
                "id": str(uuid.uuid4()),
                "category": "Électricité",
                "sub_category": "Installation",
                "name": "Installation prise électrique",
                "description": "Installation d'une prise électrique murale",
                "price": 75.0,
                "unit": "unité",
                "included": ["Fourniture de la prise", "Installation", "Test"],
                "excluded": ["Saignée dans le mur"],
                "duration_hours": 1.0,
                "is_active": True,
                "image_url": None
            },
            {
                "id": str(uuid.uuid4()),
                "category": "Électricité",
                "sub_category": "Dépannage",
                "name": "Dépannage électrique d'urgence",
                "description": "Intervention d'urgence pour panne électrique",
                "price": 95.0,
                "unit": "intervention",
                "included": ["Diagnostic", "Réparation simple"],
                "excluded": ["Remplacement tableau électrique"],
                "duration_hours": 1.5,
                "is_active": True,
                "image_url": None
            },
            # VMC
            {
                "id": str(uuid.uuid4()),
                "category": "VMC",
                "sub_category": "Installation",
                "name": "Installation VMC simple flux",
                "description": "Installation complète d'une VMC simple flux",
                "price": 890.0,
                "unit": "installation",
                "included": ["Fourniture VMC", "Installation", "Raccordement", "Mise en service"],
                "excluded": ["Gaines de ventilation supplémentaires"],
                "duration_hours": 6.0,
                "is_active": True,
                "image_url": None
            },
            {
                "id": str(uuid.uuid4()),
                "category": "VMC",
                "sub_category": "Entretien",
                "name": "Entretien VMC",
                "description": "Entretien et nettoyage de VMC",
                "price": 120.0,
                "unit": "intervention",
                "included": ["Nettoyage filtres", "Vérification moteur", "Nettoyage bouches"],
                "excluded": ["Remplacement pièces"],
                "duration_hours": 1.5,
                "is_active": True,
                "image_url": None
            }
        ]
        
        await db.services.insert_many(sample_services)
        print(f"✅ {len(sample_services)} sample services created")
    else:
        print(f"ℹ️  {services_count} services already in database")
    
    # Create system config
    config_exists = await db.system_config.find_one({"key": "travel_fee"})
    if not config_exists:
        from utils import get_current_timestamp
        import uuid
        
        configs = [
            {
                "id": str(uuid.uuid4()),
                "key": "travel_fee",
                "value": 50.0,
                "description": "Frais de déplacement par défaut",
                "updated_at": get_current_timestamp()
            },
            {
                "id": str(uuid.uuid4()),
                "key": "loyalty_rate",
                "value": 0.01,
                "description": "Taux de fidélité (1% par défaut)",
                "updated_at": get_current_timestamp()
            },
            {
                "id": str(uuid.uuid4()),
                "key": "quote_validity_days",
                "value": 30,
                "description": "Validité des devis en jours",
                "updated_at": get_current_timestamp()
            }
        ]
        await db.system_config.insert_many(configs)
        print("✅ System configuration created")
    else:
        print("ℹ️  System configuration already exists")
    
    print("\n✨ Database initialization complete!")
    print("\n📝 Admin credentials:")
    print("   Email: admin@mjcreations.fr")
    print("   Password: admin123")
    print("\n⚠️  Please change the admin password after first login!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(init_database())
