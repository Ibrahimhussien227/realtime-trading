# Real Time Trading Dashboard

A full-stack real-time trading dashboard with **React + Vite frontend** and **Node.js + Express backend**, connected via WebSockets and REST API. Dockerized for easy deployment.

---

## Mock Data

For testing purposes, the application uses mock user data. You can log in using the following credentials:

- **Email:** use@example.com  
- **Password:** password123

  ---

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [Docker Deployment](#docker-deployment)
- [GitHub Setup](#github-setup)

---

## Project Structure

```
realtime-trading/
├─ backend/ # Node.js backend
│ ├─ src/
│ │ ├─ controllers/
│ │ ├─ utils/
│ │ ├─ market/
│ │ ├─ middleware/
│ │ ├─ routes/
│ │ ├─ data/
│ │ ├─ types/
│ │ └─ websocket/
│ ├─ package.json
│ ├─ tsconfig.json
│ └─ Dockerfile
├─ frontend/ # React + Vite frontend
│ ├─ src/
│ │ ├─ api/
│ │ ├─ components/
│ │ ├─ hooks/
│ │ ├─ lib/
│ │ ├─ pages/
│ │ ├─ schemas/
│ │ └─ store/
│ ├─ package.json
│ ├─ tsconfig.json
│ ├─ Dockerfile
│ ├─ nginx.conf
│ └─ vite.config.ts
├─ docker-compose.yml
└─ README.md
```

---

## Features

- Real-time tickers via WebSocket
- Historical trading data
- User authentication & JWT-based auth
- RESTful API endpoints
- SPA routing with React + Vite
- Dockerized for local and production environments
- Nginx reverse proxy for frontend

---

## Environment Variables

Create a `.env` file in the root of your project (or in `backend` and `frontend` folders) with the following:

**Backend `.env`**:

```
PORT=4000
JWT_SECRET=your_super_secret_key
NODE_ENV=production
```

**Frontend `.env`**:

```
VITE_WS_URL=ws://localhost:4000/ws
VITE_API_URL=http://localhost:4000/api
```

---

## Local Development

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Server runs at `http://localhost:4000`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

---

## Docker Deployment

1. Build and start all containers:

```bash
docker compose up --build
```

2. Access the app in the browser:

- Frontend: `http://localhost:8080`
- Backend API: `http://localhost:4000/api`

**Notes:**

- Frontend container uses **Nginx** to serve static files.
- Backend container runs Node.js with compiled TypeScript (`dist`).
- Ensure `.env` values are correctly set before building images.

---

## Tips

- If using Docker on Linux, make sure your user is in the `docker` group:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

- Rebuild Docker images after `.env` changes:

```bash
docker compose build
docker compose up -d
```

- Access backend logs:

```bash
docker compose logs -f backend
```

- Access frontend logs:

```bash
docker compose logs -f frontend
```
