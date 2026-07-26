# TaskFlow – MERN Task Manager with CI/CD

A beginner-to-practical MERN stack project: React + Node.js + Express + MongoDB,
containerized with Docker, orchestrated with Docker Compose, and automated with
GitHub Actions CI/CD.

## Getting started (local, no Docker yet)

### Backend
```
cd backend
npm install
npm run dev
```
Runs on http://localhost:5000

### Frontend
```
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173

Make sure MongoDB is running locally before starting the backend
(`MONGO_URI` in `backend/.env` points to `mongodb://localhost:27017/taskflow`).

## Tech stack
- React (Vite)
- Node.js + Express
- MongoDB (Mongoose)
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Docker Hub
- AWS EC2 + Nginx (planned)
