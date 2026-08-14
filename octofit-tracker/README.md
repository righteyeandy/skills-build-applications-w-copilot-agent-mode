# OctoFit Tracker - Multi-Tier Application

A modern full-stack fitness tracking application built with React 19, Vite, Node.js, Express, TypeScript, and MongoDB.

## Project Structure

```
octofit-tracker/
├── frontend/           # React 19 + Vite frontend (Port 5173)
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore
├── backend/            # Node.js + Express + TypeScript backend (Port 8000)
│   ├── src/
│   │   └── server.ts
│   ├── tsconfig.json
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
```

## Ports

- **Frontend**: http://localhost:5173 (React + Vite dev server)
- **Backend**: http://localhost:8000 (Express API)
- **MongoDB**: localhost:27017

## Frontend Setup

### Requirements
- Node.js 18+
- npm or yarn

### Installation & Development
```bash
cd octofit-tracker/frontend
npm install        # Already done during setup
npm run dev        # Start Vite dev server on port 5173
npm run build      # Build for production
npm run preview    # Preview production build
```

### Stack
- React 19.2.8
- Vite 8.2.0
- Oxlint for code linting
- TypeScript support via Vite

## Backend Setup

### Requirements
- Node.js 18+
- npm or yarn
- MongoDB running on localhost:27017

### Installation & Development
```bash
cd octofit-tracker/backend
npm install        # Already done during setup
npm run dev        # Start development server with hot reload
npm run build      # Compile TypeScript to JavaScript
npm start          # Run compiled server
```

### Stack
- Express 5.2.1 - Web framework
- Mongoose 9.9.2 - MongoDB ODM
- TypeScript 7.0.2 - Type safety
- Nodemon 3.1.14 - Development auto-reload
- ts-node - Run TypeScript directly

### Environment Variables
Create a `.env` file in the backend directory (see `.env.example`):
```env
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
PORT=8000
NODE_ENV=development
```

### Available Endpoints
- `GET /api/health` - Health check endpoint

## Getting Started

### Start MongoDB
```bash
# If using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or if MongoDB is installed locally
mongod
```

### Start Backend Server
```bash
cd octofit-tracker/backend
npm run dev
# Server will be available at http://localhost:8000
```

### Start Frontend Dev Server
In a new terminal:
```bash
cd octofit-tracker/frontend
npm run dev
# App will be available at http://localhost:5173
```

## Development Workflow

1. Frontend code changes in `frontend/src/` automatically reload via Vite HMR
2. Backend code changes in `backend/src/` automatically reload via Nodemon
3. All TypeScript files are type-checked and compiled to JavaScript
4. Use `npm run build` in backend to compile before deployment

## Building for Production

### Frontend
```bash
cd octofit-tracker/frontend
npm run build    # Creates dist/ with optimized build
```

### Backend
```bash
cd octofit-tracker/backend
npm run build    # Compiles TypeScript to dist/
npm start        # Runs compiled server
```
