# seed_services.py - Script to seed services into MongoDB
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Services data (extracted from frontend)
all_services = {
    "electricite": [
        {"id": "prise_simple", "name": "Prise simple", "price": 45.0, "unit": "unite", "included": ["Pose", "Raccordement"], "excluded": ["Fourniture"], "duration": "30 min", "category": "electricite"},
        {"id": "prise_double", "name": "Prise double", "price": 55.0, "unit": "unite", "included": ["Pose", "Raccordement"], "excluded": ["Fourniture"], "duration": "30 min", "category": "electricite"},
        {"id": "interrupteur_simple", "name": "Interrupteur simple", "price": 35.0, "unit": "unite", "included": ["Pose", "Raccordement"], "excluded": ["Fourniture"], "duration": "20 min", "category": "electricite"},
        {"id": "interrupteur_va_et_vient", "name": "Interrupteur va-et-vient", "price": 50.0, "unit": "unite", "included": ["Pose", "Raccordement", "Cablage"], "excluded": ["Fourniture"], "duration": "40 min", "category": "electricite"},
        {"id": "tableau_electrique", "name": "Tableau electrique", "price": 450.0, "unit": "unite", "included": ["Installation", "Mise aux normes", "Etiquetage"], "excluded": ["Fourniture"], "duration": "4h", "popular": True, "category": "electricite"},
        {"id": "disjoncteur", "name": "Disjoncteur", "price": 35.0, "unit": "unite", "included": ["Pose", "Raccordement"], "excluded": ["Fourniture"], "duration": "20 min", "category": "electricite"},
        {"id": "borne_recharge_voiture", "name": "Borne recharge voiture", "price": 650.0, "unit": "unite", "included": ["Installation", "Test", "Mise en service"], "excluded": ["Borne"], "duration": "1 jour", "popular": True, "category": "electricite"},
        {"id": "mise_aux_normes", "name": "Mise aux normes NF C 15-100", "price": 800.0, "unit": "logement", "included": ["Travaux", "Diagnostic", "Rapport"], "excluded": ["Fournitures"], "duration": "2-3 jours", "popular": True, "category": "electricite"},
        {"id": "luminaire_plafonnier", "name": "Luminaire plafonnier", "price": 60.0, "unit": "unite", "included": ["Pose", "Raccordement"], "excluded": ["Luminaire"], "duration": "30 min", "category": "electricite"},
        {"id": "spot_encastrable", "name": "Spot encastrable", "price": 40.0, "unit": "unite", "included": ["Percage", "Pose", "Raccordement"], "excluded": ["Spot"], "duration": "25 min", "category": "electricite"},
        {"id": "applique_murale", "name": "Applique murale", "price": 55.0, "unit": "unite", "included": ["Pose", "Raccordement"], "excluded": ["Applique"], "duration": "30 min", "category": "electricite"},
        {"id": "variateur_lumiere", "name": "Variateur lumiere", "price": 65.0, "unit": "unite", "included": ["Pose", "Raccordement", "Programmation"], "excluded": ["Variateur"], "duration": "35 min", "category": "electricite"},
        {"id": "detecteur_mouvement", "name": "Detecteur mouvement", "price": 85.0, "unit": "unite", "included": ["Pose", "Reglages"], "excluded": ["Detecteur"], "duration": "40 min", "category": "electricite"},
        {"id": "sonnette", "name": "Sonnette", "price": 45.0, "unit": "unite", "included": ["Pose", "Raccordement"], "excluded": ["Sonnette"], "duration": "30 min", "category": "electricite"},
        {"id": "portier_video", "name": "Portier video", "price": 280.0, "unit": "unite", "included": ["Installation", "Cablage", "Parametrage"], "excluded": ["Portier"], "duration": "2h", "category": "electricite"}
    ],
    "plomberie": [
        {"id": "robinet_lavabo", "name": "Robinet lavabo", "price": 80.0, "unit": "unite", "included": ["Pose", "Raccordement", "Test"], "excluded": ["Fourniture"], "duration": "1h", "popular": True, "category": "plomberie"},
        {"id": "robinet_cuisine", "name": "Robinet cuisine", "price": 85.0, "unit": "unite", "included": ["Pose", "Raccordement", "Test"], "excluded": ["Fourniture"], "duration": "1h", "category": "plomberie"},
        {"id": "mitigeur_douche", "name": "Mitigeur douche", "price": 95.0, "unit": "unite", "included": ["Pose", "Raccordement", "Test"], "excluded": ["Fourniture"], "duration": "1h30", "category": "plomberie"},
        {"id": "mitigeur_baignoire", "name": "Mitigeur baignoire", "price": 110.0, "unit": "unite", "included": ["Pose", "Raccordement", "Test"], "excluded": ["Fourniture"], "duration": "1h30", "category": "plomberie"},
        {"id": "wc_suspendu", "name": "WC suspendu", "price": 250.0, "unit": "unite", "included": ["Pose", "Raccordement", "Bati support"], "excluded": ["WC", "Bati"], "duration": "3h", "popular": True, "category": "plomberie"},
        {"id": "wc_pose", "name": "WC a poser", "price": 150.0, "unit": "unite", "included": ["Pose", "Raccordement", "Joint"], "excluded": ["WC"], "duration": "2h", "category": "plomberie"},
        {"id": "lavabo", "name": "Lavabo", "price": 120.0, "unit": "unite", "included": ["Pose", "Raccordement", "Siphon"], "excluded": ["Lavabo"], "duration": "1h30", "category": "plomberie"},
        {"id": "evier_cuisine", "name": "Evier cuisine", "price": 135.0, "unit": "unite", "included": ["Pose", "Raccordement", "Siphon"], "excluded": ["Evier"], "duration": "2h", "category": "plomberie"},
        {"id": "douche_italienne", "name": "Douche italienne", "price": 2500.0, "unit": "unite", "included": ["Creation receveur", "Etancheite", "Carrelage", "Robinetterie"], "excluded": ["Paroi"], "duration": "3-4 jours", "popular": True, "category": "plomberie"},
        {"id": "baignoire", "name": "Baignoire", "price": 350.0, "unit": "unite", "included": ["Pose", "Raccordement", "Vidage"], "excluded": ["Baignoire"], "duration": "3h", "category": "plomberie"},
        {"id": "chauffe_eau_200l", "name": "Chauffe-eau 200L", "price": 400.0, "unit": "unite", "included": ["Installation", "Raccordement", "Mise en service"], "excluded": ["Chauffe-eau"], "duration": "3h", "popular": True, "category": "plomberie"},
        {"id": "chauffe_eau_300l", "name": "Chauffe-eau 300L", "price": 500.0, "unit": "unite", "included": ["Installation", "Raccordement", "Mise en service"], "excluded": ["Chauffe-eau"], "duration": "3h30", "category": "plomberie"},
        {"id": "debouchage_canalisation", "name": "Debouchage canalisation", "price": 120.0, "unit": "intervention", "included": ["Debouchage", "Inspection"], "excluded": ["Pieces"], "duration": "1-2h", "popular": True, "category": "plomberie"},
        {"id": "reparation_fuite", "name": "Reparation fuite", "price": 95.0, "unit": "heure", "included": ["Detection", "Reparation", "Test"], "excluded": ["Pieces"], "duration": "1h", "popular": True, "category": "plomberie"},
        {"id": "colonne_douche", "name": "Colonne douche", "price": 180.0, "unit": "unite", "included": ["Pose", "Raccordement"], "excluded": ["Colonne"], "duration": "2h", "category": "plomberie"}
    ],
    "chauffage": [
        {"id": "pac_air_air", "name": "PAC air/air", "price": 2250.0, "unit": "unite", "included": ["Installation", "Mise en service"], "excluded": ["PAC"], "duration": "1 jour", "popular": True, "category": "chauffage"},
        {"id": "pac_air_eau", "name": "PAC air/eau", "price": 3500.0, "unit": "unite", "included": ["Installation", "Reglage"], "excluded": ["PAC"], "duration": "2 jours", "popular": True, "category": "chauffage"},
        {"id": "clim_reversible", "name": "Climatisation reversible", "price": 1800.0, "unit": "unite", "included": ["Installation", "Test"], "excluded": ["Climatiseur"], "duration": "1 jour", "category": "chauffage"},
        {"id": "poele_bois", "name": "Poele a bois", "price": 800.0, "unit": "unite", "included": ["Installation", "Conduit", "Mise en service"], "excluded": ["Poele"], "duration": "1 jour", "popular": True, "category": "chauffage"},
        {"id": "poele_granules", "name": "Poele a granules", "price": 1000.0, "unit": "unite", "included": ["Installation", "Conduit", "Programmation"], "excluded": ["Poele"], "duration": "1 jour", "category": "chauffage"},
        {"id": "entretien_chaudiere", "name": "Entretien chaudiere", "price": 120.0, "unit": "intervention", "included": ["Nettoyage", "Reglages", "Test", "Attestation"], "excluded": [], "duration": "1h30", "popular": True, "category": "chauffage"},
        {"id": "chaudiere_gaz", "name": "Chaudiere gaz", "price": 1500.0, "unit": "unite", "included": ["Installation", "Raccordement", "Mise en service"], "excluded": ["Chaudiere"], "duration": "1-2 jours", "popular": True, "category": "chauffage"},
        {"id": "radiateur_electrique", "name": "Radiateur electrique", "price": 120.0, "unit": "unite", "included": ["Pose", "Raccordement"], "excluded": ["Radiateur"], "duration": "1h", "category": "chauffage"},
        {"id": "radiateur_eau", "name": "Radiateur a eau", "price": 180.0, "unit": "unite", "included": ["Pose", "Raccordement", "Purge"], "excluded": ["Radiateur"], "duration": "2h", "category": "chauffage"},
        {"id": "plancher_chauffant", "name": "Plancher chauffant", "price": 75.0, "unit": "m2", "included": ["Pose", "Isolation"], "excluded": ["Revetement"], "duration": "1 jour/20m2", "category": "chauffage"}
    ],
    "vmc": [
        {"id": "vmc_simple_flux", "name": "VMC simple flux", "price": 250.0, "unit": "unite", "included": ["Installation", "Reseau"], "excluded": ["VMC"], "duration": "1 jour", "popular": True, "category": "vmc"},
        {"id": "vmc_double_flux", "name": "VMC double flux", "price": 800.0, "unit": "unite", "included": ["Installation", "Reseau", "Parametrage"], "excluded": ["VMC"], "duration": "2 jours", "popular": True, "category": "vmc"},
        {"id": "vmc_hygro", "name": "VMC hygroreglable", "price": 350.0, "unit": "unite", "included": ["Installation", "Reglages"], "excluded": ["VMC"], "duration": "1 jour", "category": "vmc"},
        {"id": "entretien_vmc", "name": "Entretien VMC", "price": 85.0, "unit": "intervention", "included": ["Nettoyage", "Verification", "Test"], "excluded": [], "duration": "1h30", "popular": True, "category": "vmc"},
        {"id": "bouche_vmc", "name": "Bouche VMC", "price": 45.0, "unit": "unite", "included": ["Pose"], "excluded": ["Bouche"], "duration": "30 min", "category": "vmc"}
    ]
}


async def seed_services():
    """Seed services into the database."""
    print("Starting service seeding...")
    
    # Clear existing services
    await db.services.delete_many({})
    print("Cleared existing services")
    
    # Flatten all services
    all_services_list = []
    for category, services in all_services.items():
        all_services_list.extend(services)
    
    # Insert services
    if all_services_list:
        await db.services.insert_many(all_services_list)
        print(f"Inserted {len(all_services_list)} services")
    
    # Create indexes
    await db.services.create_index("id")
    await db.services.create_index("category")
    await db.services.create_index("name")
    print("Created indexes")
    
    print("Service seeding complete!")


async def create_admin_user():
    """Create a default admin user."""
    from auth import get_password_hash
    
    admin_email = "admin@mjcreations.fr"
    existing_admin = await db.users.find_one({"email": admin_email})
    
    if not existing_admin:
        admin_user = {
            "id": "admin_user_1",
            "email": admin_email,
            "first_name": "Admin",
            "last_name": "MJ Créations",
            "phone": "06.11.20.37.41",
            "role": "admin",
            "loyalty_points": 0,
            "created_at": "2024-01-01T00:00:00",
            "is_active": True,
            "hashed_password": get_password_hash("admin123")  # Change this in production!
        }
        await db.users.insert_one(admin_user)
        print(f"Created admin user: {admin_email} / admin123")
    else:
        print("Admin user already exists")


async def main():
    """Main seeding function."""
    try:
        await seed_services()
        await create_admin_user()
        print("\n✅ Database seeding completed successfully!")
    except Exception as e:
        print(f"\n❌ Error during seeding: {e}")
    finally:
        client.close()


if __name__ == "__main__":
    asyncio.run(main())
