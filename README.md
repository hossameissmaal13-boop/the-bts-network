# The BTS Network

Une plateforme éducative complète pour les étudiants BTS avec application mobile Android, dashboard web admin et serveur backend.

## 🎯 Description du Projet

"The BTS Network" est une plateforme éducative moderne conçue pour les étudiants BTS, offrant :
- **Application Mobile Android** pour les étudiants
- **Dashboard Web Admin** pour la gestion
- **Serveur Backend** avec base de données MongoDB

## 📱 Types de Comptes Étudiants

### 1. BTS Connecté (Étudiants Officiels)
- Accès complet : cours, assistant IA, communication
- Vérification par l'admin via le dashboard
- Système de messagerie actif

### 2. BTS Libre (Étudiants Non-Officiels)
- Accès limité : cours et assistant IA
- Communication désactivée
- Pas de vérification requise

## 🏗️ Architecture du Projet

```
TheBTSNetwork/
├── backend/              # Serveur Node.js + Express + TypeScript
├── mobile-app/           # Application React Native
└── admin-dashboard/      # Dashboard React + Vite + TypeScript
```

## 🚀 Technologies Utilisées

### Backend
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Socket.IO (messagerie temps réel)
- Nodemailer (emails)

### Application Mobile
- React Native (Expo)
- TypeScript
- React Navigation
- Axios
- Socket.IO Client
- AsyncStorage

### Dashboard Admin
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

## 📦 Installation

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Configurer les variables d'environnement dans .env
npm run dev
```

Variables d'environnement requises :
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bts-network
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
ADMIN_EMAIL=admin@btsnetwork.com
```

### 2. Application Mobile

```bash
cd mobile-app
npm install
npm start
# Puis appuyez sur 'a' pour Android ou 'i' pour iOS
```

### 3. Dashboard Admin

```bash
cd admin-dashboard
npm install
npm run dev
```

## 🎨 Design & UI/UX

### Palette de Couleurs
- **Primaire (Bleu)** : `#0A1AFF` - Boutons principaux
- **Secondaire (Jaune)** : `#FFD43B` - Actions secondaires
- **Fond (Gris Clair)** : `#F5F5F5`
- **Texte (Gris Foncé)** : `#333333`
- **Erreur (Rouge)** : `#FF4C4C`
- **Succès (Vert)** : `#4CAF50`

### Navigation Mobile
- Home (Accueil)
- Courses (Cours)
- Communication (BTS Connecté uniquement)
- AI (Assistant IA)
- Profile (Profil)

## 📚 Fonctionnalités

### Application Mobile Étudiante

#### Authentification
- ✅ Inscription par Gmail et mot de passe
- ✅ Connexion sécurisée
- ✅ Gestion de profil

#### Cours
- ✅ Organisation : Département → Année → Matière → Chapitre → Leçon/Exercices/Examens
- ✅ Affichage des cours selon département et année
- ✅ Accès aux leçons, exercices et examens
- ⏳ Téléchargement PDF des leçons
- ⏳ Accès hors ligne

#### Assistant IA
- ✅ Chat avec historique
- ✅ Explications et solutions
- ⏳ Intégration API IA (OpenAI/Claude)

#### Communication (BTS Connecté)
- ✅ Système de messagerie type WhatsApp
- ✅ Statut de lecture des messages
- ⏳ Notifications push
- ⏳ Options de mute

#### Profil
- ✅ Modification Gmail et mot de passe
- ✅ Affichage du type de compte
- ✅ Statut d'approbation

### Dashboard Web Admin

#### Gestion des Utilisateurs
- ✅ Liste des demandes BTS Connecté
- ✅ Approbation/Rejet des comptes
- ⏳ Gestion de la liste officielle

#### Gestion des Cours
- ✅ Ajout/Modification/Suppression de matières
- ⏳ Gestion complète des chapitres
- ⏳ Gestion des leçons, exercices, examens
- ⏳ Upload de fichiers PDF

#### Autres
- ⏳ Envoi d'annonces
- ⏳ Monitoring d'activité
- ⏳ Gestion des rapports de problèmes

### Backend

#### API REST
- ✅ Authentication (register, login, profile)
- ✅ User management (approve, reject)
- ✅ Course management (CRUD)
- ✅ Messaging system
- ✅ AI chat history
- ✅ Notifications
- ✅ Reports

#### Sécurité
- ✅ JWT Authentication
- ✅ Bcrypt password hashing
- ✅ Protected routes
- ✅ Role-based access control

#### Base de Données
- ✅ User model avec génération auto d'ID (8 chiffres)
- ✅ Course structure complète
- ✅ Message model
- ✅ Chat history model
- ✅ Notification model
- ✅ Report model

## 🔐 Sécurité

- Authentification JWT
- Mots de passe hashés avec bcrypt
- Messages chiffrés
- Anti-spam
- Options de signalement
- Validation des données
- Protection CORS

## 📱 Fonctionnalités Supplémentaires

### À Implémenter
- ⏳ Support multi-langues
- ⏳ Mode sombre
- ⏳ Accès hors ligne au contenu
- ⏳ Téléchargement PDF
- ⏳ Recherche globale
- ⏳ Notifications push
- ⏳ Statistiques et analytics

## 🎯 Workflow de Développement

### 1. Démarrer le Backend
```bash
cd backend
npm run dev
```

### 2. Démarrer le Dashboard Admin
```bash
cd admin-dashboard
npm run dev
```

### 3. Démarrer l'Application Mobile
```bash
cd mobile-app
npm start
```

## 📝 Notes Importantes

1. **MongoDB** doit être installé et en cours d'exécution
2. Configurer les variables d'environnement avant de démarrer
3. L'email admin doit correspondre à `ADMIN_EMAIL` dans `.env`
4. Les changements dans le dashboard admin sont instantanés dans l'app mobile
5. Socket.IO gère la messagerie en temps réel

## 🔄 Prochaines Étapes

1. Intégrer une vraie API d'IA (OpenAI, Claude, etc.)
2. Implémenter l'upload de fichiers PDF
3. Ajouter les notifications push
4. Développer le mode hors ligne
5. Ajouter le support multi-langues
6. Implémenter le mode sombre
7. Ajouter des tests unitaires et d'intégration
8. Déployer sur des serveurs de production

## 👥 Support

Pour toute question ou problème, utilisez le formulaire de rapport dans l'application mobile qui enverra un email à l'admin.

## 📄 Licence

MIT

---

**Développé pour les étudiants BTS - The BTS Network © 2026**
