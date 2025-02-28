Voici la version en français du fichier README, réorganisée et améliorée pour une meilleure clarté et professionnalisme :

---

# 📦 StackShelf - Application Full Stack

**StackShelf** est une **application full stack** construite avec **React.js** pour le frontend et un **backend Symfony** hébergé sur Heroku. Elle permet aux utilisateurs de **gérer des produits et des catégories** avec des opérations CRUD complètes, du tri et une interface utilisateur intuitive.

---

## 🚀 Fonctionnalités Clés

- **Opérations CRUD Complètes** : Ajouter, modifier, supprimer des produits et des catégories.
- **Tri et Recherche** : Trier les produits par **prix** (croissant/décroissant) et les catégories **par ordre alphabétique**.
- **Gestion d'État avec Redux** : Gère efficacement l'état de l'application.
- **API RESTful avec Symfony** : Construite avec API Platform pour des endpoints structurés et évolutifs.
- **Intégration de Cloudinary** : Téléchargez et gérez facilement les images des produits.
- **UI Moderne avec Tailwind CSS** : Design épuré et responsive.
- **UI Animée** : Animations de texte fluides grâce à **Typed.js**.

---

## 🛠️ Technologies Utilisées

### **Frontend (React.js)**
- **React.js** (Vite)
- **Tailwind CSS** (styling)
- **Redux Toolkit** (gestion d'état)
- **Axios** (appels API)
- **Typed.js** (animations)
- **FontAwesome** (icônes)

---

## 🛠️ Installation & Configuration

### **Configuration du Frontend (React)**

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Thuthikaran/teachr-test-technique-react.git
   cd teachr-test-technique-react
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez les variables d'environnement :
   Créez un fichier `.env` à la racine du projet et ajoutez les informations suivantes :
   ```ini
   REACT_APP_API_URL=https://votre-url-heroku/api
   REACT_APP_CLOUDINARY_CLOUD_NAME=votre_nom_cloudinary
   REACT_APP_CLOUDINARY_API_KEY=votre_clé_api
   REACT_APP_CLOUDINARY_UPLOAD_PRESET=votre_préréglage_upload
   ```

4. Lancez le frontend :
   ```bash
   npm run dev
   ```

---

## 🔗 Points d'Accès de l'API

Le frontend React récupère les données du backend Symfony hébergé sur Heroku. Voici les endpoints disponibles :

| Méthode   | Endpoint               | Description                  |
|----------|------------------------|------------------------------|
| `GET`    | `/api/produit`         | Obtenir tous les produits    |
| `POST`   | `/api/produit`         | Ajouter un nouveau produit  |
| `PUT`    | `/api/produit/{id}`    | Mettre à jour un produit    |
| `DELETE` | `/api/produit/{id}`    | Supprimer un produit        |
| `GET`    | `/api/categorie`       | Obtenir toutes les catégories |
| `POST`   | `/api/categorie`       | Ajouter une nouvelle catégorie |
| `PUT`    | `/api/categorie/{id}`  | Mettre à jour une catégorie |
| `DELETE` | `/api/categorie/{id}`  | Supprimer une catégorie     |

---

## � Améliorations de l'Interface Utilisateur

- Arrière-plan dégradé avec motifs.
- Texte animé avec **Typed.js**.
- Effets de survol pour une meilleure expérience utilisateur.
- Boutons de tri pour le prix et les catégories.

---

## 📸 Captures d'Écran

Ajoutez des captures d'écran de l'interface utilisateur ici.

---

## ✅ Tests & Débogage

- **Tests de l'API** : Utilisez des outils comme **Postman** ou **Thunder Client** pour tester les endpoints de l'API.
- **Débogage du Frontend** : Ouvrez les DevTools du navigateur (`F12 > Console`) pour vérifier les erreurs.

---

## 🚀 Déploiement

### **Déploiement du Frontend (Netlify, Vercel, etc.)**
1. Compilez le projet :
   ```bash
   npm run build
   ```
2. Déployez le dossier `dist/` sur des plateformes comme **Vercel**, **Netlify** ou **Firebase Hosting**.

---

## � Améliorations Futures

- Ajouter une **authentification JWT** pour les rôles utilisateurs.
- Implémenter une **pagination** pour les grands ensembles de données.
- Améliorer l'UI/UX avec des animations et transitions supplémentaires.

---

## 📝 Auteur

Développé par **Votre Nom** pour le **test de recrutement Teach'r**.

📩 N'hésitez pas à me contacter pour toute question ou retour !

---

Cette version se concentre uniquement sur le **frontend React** et suppose que le backend est déjà hébergé sur Heroku. Faites-moi savoir si vous avez besoin d'autres ajustements ! 😊
