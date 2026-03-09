# ARiSE Fitness AI (Full-Stack RPG Workout App)

A production-style monorepo for a **gamified fitness platform** inspired by RPG progression systems.

## Tech Stack
- **Frontend:** React + Vite (mobile-first dark UI)
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT, Email/Password, Google OAuth (Passport)
- **AI:** OpenAI-powered workout generation with deterministic fallback

## Project Structure
```text
ARiSE-FITNESS-Ai/
├── backend/
│   ├── src/
│   │   ├── config/        # env, db, passport
│   │   ├── controllers/   # route handlers
│   │   ├── middleware/    # auth/admin guards
│   │   ├── models/        # users, workouts, progress, achievements
│   │   ├── routes/        # REST routes
│   │   ├── services/      # AI, gamification, notifications
│   │   ├── utils/         # token utilities
│   │   └── server.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env.example
└── package.json
```

## Core Features Implemented
- Registration/login + JWT auth
- Google OAuth login
- User profile fields (name, goal, level)
- Dashboard (level, XP, streak, daily workout)
- Workout system with completion flow and timer-ready schema
- Gamification engine (XP, level every 500 XP, streaks, badges)
- Weekly history + chart UI + animated XP bar
- AI-generated daily workout by goal + level
- Admin panel for workout CRUD + video upload endpoint
- Daily reminder notification cron job (SMTP)

## MongoDB Collections
- `users`
- `workouts`
- `progress`
- `achievements`

## API Overview
### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/google`
- `GET /api/auth/google/callback`

### User
- `GET /api/user/me`
- `PUT /api/user/me`

### Workouts
- `GET /api/workouts/today`
- `POST /api/workouts/:workoutId/complete`
- `GET /api/workouts/history`

### Admin
- `POST /api/admin/workouts`
- `PUT /api/admin/workouts/:id`
- `DELETE /api/admin/workouts/:id`
- `POST /api/admin/videos`

## Setup Instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure backend env:
   ```bash
   cp backend/.env.example backend/.env
   ```
3. Configure frontend env:
   ```bash
   cp frontend/.env.example frontend/.env
   ```
4. Start MongoDB locally (or set `MONGO_URI` to Atlas).
5. Run app:
   ```bash
   npm run dev
   ```
6. Frontend: `http://localhost:5173`, Backend: `http://localhost:5000`.

## Production Notes
- Add HTTPS and secure cookie/session handling if moving from bearer token localStorage.
- Add schema-level rate limiting, audit logging, and robust input sanitization.
- Add separate role model rather than `ADMIN_EMAIL` shortcut for enterprise-grade admin access.
