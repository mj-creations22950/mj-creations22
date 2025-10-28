# 🚀 Guide de Déploiement Production - MJ Créations

## ✅ Checklist Pré-Déploiement

### 1. Configuration Sécurité Backend

**⚠️ OBLIGATOIRE AVANT PRODUCTION:**

```bash
cd /app/backend

# 1. Générer un JWT secret sécurisé
python3 -c "import secrets; print('JWT_SECRET_KEY=' + secrets.token_urlsafe(32))"

# 2. Copier le résultat dans .env
nano .env
# Remplacer JWT_SECRET_KEY=... avec la valeur générée
```

**Éditer `/app/backend/.env`:**
```env
# Changer ces valeurs:
JWT_SECRET_KEY=VOTRE_CLE_SECRETE_GENEREE_ICI
STRIPE_API_KEY=sk_live_VOTRE_CLE_STRIPE_PRODUCTION
CORS_ORIGINS=https://votre-domaine.com,https://www.votre-domaine.com

# MongoDB (si hébergé ailleurs):
MONGO_URL=mongodb://votre-serveur-mongo:27017
DB_NAME=mjcreations_prod
```

### 2. Configuration Frontend

**Éditer `/app/frontend/.env`:**
```env
REACT_APP_BACKEND_URL=https://api.votre-domaine.com/api
```

### 3. Changer le Mot de Passe Admin

```bash
cd /app/backend
python3 << 'EOF'
from motor.motor_asyncio import AsyncIOMotorClient
from auth import hash_password
import asyncio
import os

async def change_admin_password():
    client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    db = client[os.environ['DB_NAME']]
    
    # Nouveau mot de passe fort
    new_password = "VotreMotDePasseFortIci123!"
    hashed = hash_password(new_password)
    
    result = await db.users.update_one(
        {"email": "admin@mjcreations.fr"},
        {"$set": {"hashed_password": hashed}}
    )
    
    print(f"✅ Mot de passe admin changé: {result.modified_count} document(s)")
    client.close()

asyncio.run(change_admin_password())
EOF
```

### 4. Supprimer les Données de Test (Optionnel)

```bash
cd /app/backend
python3 << 'EOF'
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
import os

async def clean_demo_data():
    client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    db = client[os.environ['DB_NAME']]
    
    # Supprimer les services d'exemple
    result = await db.services.delete_many({})
    print(f"✅ Services supprimés: {result.deleted_count}")
    
    # Garder uniquement l'admin
    result = await db.users.delete_many({"role": {"$ne": "admin"}})
    print(f"✅ Utilisateurs test supprimés: {result.deleted_count}")
    
    client.close()

asyncio.run(clean_demo_data())
EOF
```

## 📦 Options de Déploiement

### Option A: Déploiement sur Serveur VPS (Ubuntu/Debian)

```bash
# 1. Installer les dépendances
sudo apt update
sudo apt install -y python3.11 python3-pip nodejs npm mongodb nginx

# 2. Cloner/Copier votre projet
scp -r /app votre-serveur:/var/www/mjcreations

# 3. Backend
cd /var/www/mjcreations/backend
pip3 install -r requirements.txt

# 4. Frontend
cd /var/www/mjcreations/frontend
npm install
npm run build

# 5. Configurer Nginx
sudo nano /etc/nginx/sites-available/mjcreations
```

**Configuration Nginx:**
```nginx
server {
    server_name votre-domaine.com www.votre-domaine.com;
    
    # Frontend
    location / {
        root /var/www/mjcreations/frontend/build;
        try_files $uri /index.html;
    }
    
    # Backend API
    location /api {
        proxy_pass http://localhost:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/votre-domaine.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/votre-domaine.com/privkey.pem;
}
```

```bash
# 6. Activer et redémarrer Nginx
sudo ln -s /etc/nginx/sites-available/mjcreations /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 7. Démarrer le backend avec systemd
sudo nano /etc/systemd/system/mjcreations-backend.service
```

**Service systemd:**
```ini
[Unit]
Description=MJ Creations Backend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/mjcreations/backend
Environment="PATH=/usr/bin"
ExecStart=/usr/bin/python3 -m uvicorn server:app --host 0.0.0.0 --port 8001
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
# 8. Activer et démarrer
sudo systemctl enable mjcreations-backend
sudo systemctl start mjcreations-backend
sudo systemctl status mjcreations-backend
```

### Option B: Déploiement Docker

**Créer `/app/docker-compose.yml`:**
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    restart: always
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=mjcreations_prod
    ports:
      - "27017:27017"

  backend:
    build: ./backend
    restart: always
    ports:
      - "8001:8001"
    environment:
      - MONGO_URL=mongodb://mongodb:27017
      - DB_NAME=mjcreations_prod
    depends_on:
      - mongodb
    env_file:
      - ./backend/.env

  frontend:
    build: ./frontend
    restart: always
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

**Créer `/app/backend/Dockerfile`:**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8001

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
```

**Créer `/app/frontend/Dockerfile`:**
```dockerfile
FROM node:18 AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Déployer:**
```bash
docker-compose up -d
```

### Option C: Déploiement Cloud (Heroku, Render, etc.)

Voir la documentation spécifique de chaque plateforme.

## 🔒 Sécurité Production

### SSL/HTTPS
```bash
# Installer Certbot pour Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com
```

### Firewall
```bash
sudo ufw allow 22/tcp  # SSH
sudo ufw allow 80/tcp  # HTTP
sudo ufw allow 443/tcp # HTTPS
sudo ufw enable
```

### Backup Base de Données
```bash
# Script de backup automatique
cat > /usr/local/bin/backup-mjcreations.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --db mjcreations_prod --out /backups/mongo_$DATE
find /backups -mtime +7 -delete
EOF

chmod +x /usr/local/bin/backup-mjcreations.sh

# Cron job (tous les jours à 2h)
crontab -e
# Ajouter: 0 2 * * * /usr/local/bin/backup-mjcreations.sh
```

## ✅ Vérification Post-Déploiement

```bash
# 1. Vérifier backend
curl https://api.votre-domaine.com/api/

# 2. Vérifier frontend
curl https://votre-domaine.com

# 3. Tester login admin
curl -X POST https://api.votre-domaine.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mjcreations.fr","password":"VotreNouveauMotDePasse"}'

# 4. Vérifier logs
tail -f /var/log/nginx/access.log
sudo journalctl -u mjcreations-backend -f
```

## 🎯 Checklist Finale

- [ ] JWT secret changé
- [ ] Clés Stripe production configurées
- [ ] CORS configuré avec domaines spécifiques
- [ ] Mot de passe admin changé
- [ ] Données de test supprimées
- [ ] SSL/HTTPS activé
- [ ] Firewall configuré
- [ ] Backup automatique configuré
- [ ] Monitoring configuré
- [ ] Tests de charge effectués

## 📞 Support

En cas de problème:
1. Vérifier les logs backend: `sudo journalctl -u mjcreations-backend -f`
2. Vérifier les logs Nginx: `tail -f /var/log/nginx/error.log`
3. Tester la connexion MongoDB: `mongo mjcreations_prod --eval "db.users.count()"`

---

**Version:** 1.0.0  
**Dernière mise à jour:** 28 Octobre 2025
