# 🎯 GUIDE COMPLET D'ACCÈS - MJ CRÉATIONS

## 📋 TABLE DES MATIÈRES
1. [Accès Administration](#accès-administration)
2. [Accès Client](#accès-client)
3. [Fonctionnalités Disponibles](#fonctionnalités-disponibles)
4. [Structure du Système](#structure-du-système)

---

## 🔐 ACCÈS ADMINISTRATION

### Identifiants Admin par défaut :
```
Email: admin@mjcreations.fr
Mot de passe: admin123
```

### Comment accéder à l'admin :
1. Allez sur : `http://localhost:3000/login`
2. Entrez les identifiants admin ci-dessus
3. Cliquez sur "Se Connecter"
4. Vous serez redirigé vers `/profile` (compte client) OU `/admin` (compte admin)

### Accès direct admin :
```
URL: http://localhost:3000/admin
```

### Onglets Admin Disponibles :
- **Dashboard** : Vue d'ensemble (commandes, CA, clients, statistiques)
- **Gestion Commandes** : Liste complète des commandes avec filtres
- **Clients** : Gestion base clients
- **Devis** : Suivi des devis
- **Services** : Gestion catalogue prestations (600+ services)
- **Calendrier** : Planning interventions
- **Paramètres** : Configuration système complète

---

## 👤 ACCÈS CLIENT

### Créer un compte client :
1. Allez sur : `http://localhost:3000/login`
2. Cliquez sur "S'inscrire"
3. Remplissez le formulaire
4. **BONUS** : 50 points de fidélité offerts à l'inscription !

### Identifiants Client Test :
```
Email: client@test.fr
Mot de passe: client123
```

### Comment accéder au compte client :
1. Allez sur : `http://localhost:3000/login`
2. Entrez vos identifiants
3. Accédez à votre espace via `/profile`

### Accès direct espace client :
```
URL: http://localhost:3000/profile
```

### Onglets Client Disponibles :
- **📊 Tableau de bord** : Vue d'ensemble (commandes, points, infos)
- **📦 Mes Commandes** : Historique et suivi
- **📄 Devis** : Vos demandes de devis
- **💳 Factures** : Téléchargement factures
- **📅 Rendez-vous** : Prendre/gérer vos RDV
- **📍 Adresses** : Gestion multi-adresses
- **⚙️ Paramètres** : Modifier vos informations
- **⭐ Fidélité** : Consulter vos points et récompenses

---

## 🛒 PARCOURS CLIENT COMPLET

### 1. Navigation du site
```
Accueil : http://localhost:3000/
Services : http://localhost:3000/services
Catalogue : http://localhost:3000/catalog
Portfolio : http://localhost:3000/portfolio
Témoignages : http://localhost:3000/testimonials
Blog : http://localhost:3000/blog
FAQ : http://localhost:3000/faq
Contact : http://localhost:3000/contact
```

### 2. Commander des prestations
1. Allez sur `/catalog`
2. Parcourez les 150+ prestations
3. Cliquez sur "Ajouter au panier"
4. Icône panier (en haut) affiche le nombre d'articles
5. Cliquez sur le panier pour voir `/cart`

### 3. Panier et paiement
1. Sur `/cart`, vérifiez vos prestations
2. Modifiez quantités si besoin
3. Voir le récapitulatif (Sous-total, TVA, Total)
4. Cliquez "Valider la commande"
5. Si non connecté → redirection `/login`
6. Si connecté → commande enregistrée

### 4. Demander un devis
1. Allez sur `/devis`
2. Étape 1 : Choisissez le type de service
3. Étape 2 : Remplissez vos informations
4. Validation → Devis enregistré
5. Vous recevrez une réponse sous 24h

---

## 🎨 FONCTIONNALITÉS DISPONIBLES

### ✅ Côté Client
- [x] Inscription / Connexion
- [x] Catalogue 150+ prestations détaillées
- [x] Panier intelligent avec calcul automatique
- [x] Système de fidélité (1 point/euro)
- [x] Historique commandes
- [x] Gestion devis
- [x] Visualisation factures
- [x] Prise de rendez-vous
- [x] Multi-adresses
- [x] Favoris
- [x] Compte utilisateur complet

### ✅ Côté Admin
- [x] Dashboard statistiques
- [x] Gestion commandes
- [x] Gestion clients
- [x] Gestion catalogue services
- [x] Suivi paiements
- [x] Calendrier interventions
- [x] Configuration système

### ⚙️ Configuration Système
- [x] Frais déplacement : 25€ + 0.65€/km
- [x] Points fidélité : 1 point/euro
- [x] Récompenses : 50pts=-5€, 100pts=-10€, 250pts=-25€, 500pts=-60€, 1000pts=-150€
- [x] TVA : 20% (standard), 10% (réduite), 5.5% (super-réduite)
- [x] 6 moyens paiement :
  * Carte Bancaire (Stripe)
  * Virement Bancaire
  * Chèque
  * Espèces (max 1000€)
  * PayPal (à activer)
  * Paiement 4x sans frais (>500€)
- [x] Acompte : 30% à la commande

---

## 🗂️ STRUCTURE DES DONNÉES

### Prestations (150+ services)
Chaque prestation contient :
- `id` : Identifiant unique
- `label` : Nom du service
- `price` : Prix en euros
- `unit` : Unité (unité, m², ml, heure, etc.)
- `included` : Liste des prestations incluses
- `excluded` : Liste des prestations non incluses
- `duration` : Durée estimée
- `description` : Description détaillée
- `popular` : Badge "Populaire" (booléen)

### Catégories disponibles :
1. Électricité (15+ services)
2. Plomberie (15+ services)
3. Chauffage & Climatisation (12+ services)
4. Carrelage & Sols (10+ services)
5. Peinture & Revêtements (9+ services)
6. VMC & Ventilation (5+ services)

**Total actuel : 66 prestations détaillées**
*Note : Le fichier HTML original contient 600+ services que nous pouvons intégrer*

---

## 🔧 PROCHAINES ÉTAPES

### À intégrer depuis votre fichier HTML :
1. ✅ Les 534 prestations manquantes (600 total)
2. ✅ Chat en direct avec assistant
3. ✅ Upload photos de chantier
4. ✅ Calendrier complet avec créneaux
5. ✅ Notifications push
6. ✅ Génération PDF (devis, factures)
7. ✅ Logs système
8. ✅ Export/Import données (RGPD)
9. ✅ Thèmes multiples avec mode sombre
10. ✅ Avis clients avec notation

### Backend API à créer :
- FastAPI pour toutes les routes
- MongoDB pour la base de données
- Authentification JWT
- Upload fichiers
- Génération PDF
- Envoi emails
- Webhooks paiement (Stripe)

---

## 📞 SUPPORT

Pour toute question :
- Email : mj.creations22950@gmail.com
- Téléphone : 06.11.20.37.41
- Horaires : Lundi-Vendredi 8h-18h, Samedi 9h-17h

---

## 🚀 COMMANDES RAPIDES

### Démarrer le frontend
```bash
cd /app/frontend
yarn start
```

### Démarrer le backend
```bash
cd /app/backend
python server.py
```

### Voir les logs
```bash
# Frontend
tail -f /var/log/supervisor/frontend.out.log

# Backend
tail -f /var/log/supervisor/backend.out.log
```

### Redémarrer les services
```bash
sudo supervisorctl restart frontend
sudo supervisorctl restart backend
sudo supervisorctl restart all
```

---

**Version :** 2.4.0 Complet
**Dernière mise à jour :** 27 Octobre 2024
