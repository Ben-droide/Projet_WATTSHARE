# ⚡ WattShare - Carte des Bornes de Recharge & Chat Communautaire

**WattShare** est une application web en temps réel permettant de localiser les bornes de recharge électrique en France et de discuter en direct avec d'autres utilisateurs de la communauté.

---

## 🚀 Fonctionnalités

* **Carte Interactive** : Visualisation des bornes de recharge via OpenStreetMap et Leaflet.
* **Recherche Dynamique** : Géocodage pour centrer la carte sur une ville spécifique.
* **Données Réelles** : Intégration de l'API *Open Charge Map* pour des informations à jour.
* **Chat en Temps Réel** : Système de messagerie instantanée propulsé par Socket.io.
* **Sécurité** : Gestion des variables d'environnement pour la protection des clés API.

---

## 🛠️ Technologies Utilisées

**Frontend :**
* React.js
* Leaflet & React-Leaflet (Cartographie)
* Socket.io-client (Communication temps réel)

**Backend :**
* Node.js & Express
* Socket.io (Serveur WebSocket)
* CORS (Gestion des accès)

---

## ⚙️ Installation et Lancement

### 1. Prérequis
* [Node.js](https://nodejs.org/) installé sur votre machine.
* Une clé API [Open Charge Map](https://openchargemap.org/).

### 2. Configuration
Créez un fichier `.env` dans le dossier `client/` :
```env
REACT_APP_CHARGE_KEY=VOTRE_CLE_API_ICI