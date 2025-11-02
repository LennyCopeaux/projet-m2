# Backend - API d'authentification

API Node.js avec Express et PostgreSQL pour l'authentification des utilisateurs.

## Installation

```bash
npm install
```

## Configuration

Créez un fichier `.env` à la racine du projet avec :

```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key-change-this-in-production
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## Démarrage

### Mode développement
```bash
npm run dev
```

### Mode production
```bash
npm run build
npm start
```

## API Routes

### POST /api/auth/register
Inscription d'un nouvel utilisateur

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Inscription réussie",
  "token": "jwt-token",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### POST /api/auth/login
Connexion d'un utilisateur

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Connexion réussie",
  "token": "jwt-token",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### GET /health
Vérification de l'état du serveur et de la connexion à la base de données

