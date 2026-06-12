<div align="center">

# 🏋️ IronLog

### A full-stack fitness workout tracking application

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python)](https://www.python.org/)

*Log every rep. Track every PR. Own your gains.*

</div>

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Running the App](#running-the-app)
- [App Pages & Workflows](#app-pages--workflows)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## About

**IronLog** is a full-stack fitness workout tracking application that gives athletes a structured, intuitive way to log training sessions, monitor personal records (PRs), and visualise consistency over time.

The frontend is a **Next.js 16 / React 19** mobile-first web app. The backend is a **FastAPI + PostgreSQL** REST API that handles authentication, session persistence, and automatic PR detection.

---

## Features

| Feature | Description |
|---|---|
| 🔐 **Auth** | Sign up / log in with email & password. JWT-protected sessions (24h expiry). |
| 📋 **Workout Logging** | Structure workouts into Muscle Groups → Exercises → Sets (weight + reps). |
| 📅 **Calendar View** | Visual monthly calendar highlighting completed and missed workout days. |
| 🏅 **Auto Personal Records** | PRs are detected and updated automatically on every session save. |
| 👤 **Profile Management** | Edit display name, age, gender, weight, height with real-time stats. |
| 📊 **Activity Stats** | Total workouts, total exercises, and all-time PR table per exercise. |

---

## Tech Stack

### Frontend

| Technology | Version | Role |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.2.4 | Full-stack React framework (App Router) |
| [React](https://react.dev/) | 19.2.4 | UI library |
| TypeScript | 5.x | Type safety |
| CSS Modules | — | Scoped component styling |

### Backend

| Technology | Version | Role |
|---|---|---|
| [FastAPI](https://fastapi.tiangolo.com/) | ≥ 0.104.0 | Async REST API framework |
| [SQLAlchemy](https://docs.sqlalchemy.org/en/20/) | ≥ 2.0.0 | ORM (async sessions) |
| [Alembic](https://alembic.sqlalchemy.org/) | ≥ 1.12.0 | Database migrations |
| [PostgreSQL](https://www.postgresql.org/) | 14+ | Relational database |
| [pydantic-settings](https://docs.pydantic.dev/latest/concepts/pydantic_settings/) | ≥ 2.0.0 | Environment config |
| [python-jose](https://python-jose.readthedocs.io/) | ≥ 3.3.0 | JWT generation & validation |
| [passlib\[bcrypt\]](https://passlib.readthedocs.io/) | ≥ 1.7.4 | Password hashing (cost factor 12) |
| [Uvicorn](https://www.uvicorn.org/) | ≥ 0.23.0 | ASGI server |
| [pytest](https://pytest.org/) | — | Test runner |

---

## Project Structure

```
ironlog/
├── src/                            # Next.js frontend source
│   ├── app/
│   │   ├── login/                  # Login page
│   │   ├── create-account/         # Registration page
│   │   ├── forgot-password/        # Password reset
│   │   └── (main)/                 # Protected routes (requires auth)
│   │       ├── logs/               # Calendar + workout history
│   │       ├── create/             # New workout session logger
│   │       └── profile/            # User profile & stats
│   ├── components/
│   │   └── Navbar/                 # Bottom navigation bar
│   ├── api/                        # API client functions
│   ├── constants/                  # UI text, labels, API URLs
│   ├── contexts/                   # React context providers
│   └── types/                      # Shared TypeScript interfaces
│
├── backend/                        # FastAPI backend source
│   ├── app/
│   │   ├── main.py                 # FastAPI app entry point & middleware
│   │   ├── config.py               # Environment settings (Pydantic)
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── auth.py         # POST /auth/{signup,login,logout}
│   │   │       ├── users.py        # GET/PUT /users/me
│   │   │       ├── sessions.py     # CRUD /sessions
│   │   │       └── logs.py         # GET /logs/calendar, /logs/date/{date}
│   │   ├── models/                 # SQLAlchemy ORM models
│   │   ├── schemas/                # Pydantic request/response schemas
│   │   ├── services/               # Business logic layer
│   │   ├── core/
│   │   │   ├── security.py         # JWT helpers, password utils
│   │   │   └── exceptions.py       # Custom AppError class
│   │   └── db/                     # Alembic migration scripts
│   ├── Docs/
│   │   ├── SYSTEM_ANALYSIS.md      # Full architecture analysis
│   │   ├── API_CONTRACT.md         # Complete API specification
│   │   ├── BACKEND_QUICK_REFERENCE.md
│   │   └── API_LIST.md
│   ├── requirements.txt
│   ├── alembic.ini
│   ├── main.py                     # Uvicorn entry point
│   └── .env                        # Backend environment variables
│
├── public/                         # Static assets
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json
```

---

## Getting Started

### Prerequisites

Make sure the following are installed on your machine:

| Tool | Minimum Version | Install |
|---|---|---|
| Node.js | 18.x | [nodejs.org](https://nodejs.org/) |
| npm | 9.x | Bundled with Node.js |
| Python | 3.10 | [python.org](https://www.python.org/) |
| PostgreSQL | 14 | [postgresql.org](https://www.postgresql.org/download/) |

---

### Frontend Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ironlog.git
cd ironlog

# 2. Install Node.js dependencies
npm install

# 3. (Optional) Create a frontend env file if needed
# The frontend reads the backend URL from src/constants/url.constants.ts
```

---

### Backend Setup

```bash
# 1. Enter the backend directory
cd backend

# 2. Create a Python virtual environment
python -m venv venv

# On Linux/macOS:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Create the PostgreSQL database
createdb ironlog

# 5. Configure environment variables (see section below)
cp .env.example .env   # then edit .env with your values

# 6. Run database migrations
alembic upgrade head
```

> **Note:** If `createdb` is not available, create the database manually via `psql`:
> ```sql
> CREATE DATABASE ironlog;
> ```

---

## Running the App

### Start the Backend (FastAPI)

```bash
# From the /backend directory with your virtualenv active:
uvicorn app.main:app --reload

# The API will be available at:
#   http://localhost:8000
#
# Interactive API docs (Swagger UI):
#   http://localhost:8000/docs
#
# Alternative docs (ReDoc):
#   http://localhost:8000/redoc
```

### Start the Frontend (Next.js)

```bash
# From the project root:
npm run dev

# Open in your browser:
#   http://localhost:3000
```

Both servers must be running simultaneously for the full app to work.

---

## App Pages & Workflows

### 1. 🔑 Authentication (`/login`, `/create-account`)

- Enter your **email** and **password** to sign in.
- New users can register with email, username, password and display name.
- On success, a **JWT token** (valid 24 hours) is stored and included automatically in all subsequent requests.
- **Password requirements:** Minimum 8 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special character.

---

### 2. 📅 Logs & Calendar (`/logs`)

The main landing page after login. Shows a **monthly calendar** where each day is coloured:

- 🟢 **Active Day** — you logged a workout
- 🔴 **Missed Day** — past day with no workout
- ⬜ **Future Day** — not yet evaluated

Click any active day to see a **Workout Detail** panel listing all muscle groups, exercises, set counts, and PR values for that session. Use the **prev/next** arrows to navigate months.

---

### 3. ✍️ Create Workout (`/create`)

Log a new workout session step by step:

```
1. Click "Add Muscle Group"  → e.g. "Chest"
2. Click "Add Exercise"      → e.g. "Barbell Bench Press"
3. Enter sets: weight (kg) + reps
4. Repeat for other muscle groups (e.g. "Back", "Legs")
5. Click "LOG SESSION"       → Saves & redirects to /logs
```

**Validations enforced:**
- Weight and reps must be positive numbers.
- You cannot delete the last exercise in a group or the last set in an exercise without a confirmation prompt.

> **Personal Records** are automatically updated by the backend whenever a new session is saved.

---

### 4. 👤 Profile (`/profile`)

View your full fitness profile:

- **Hero section** — display name, age, gender, weight, height, avatar
- **Activity Stats** — total workouts logged, total exercises performed
- **Personal Records table** — best weight per exercise, across all muscle groups

Click **Edit Profile** to update: display name, age, gender, weight (lbs/kg toggle), and height.

---

## API Reference

**Base URL (dev):** `http://localhost:8000/api/v1`  
**Auth header:** `Authorization: Bearer <your_jwt_token>`

All responses follow this envelope:

```json
{
  "status": "success",
  "data": { ... },
  "meta": { "timestamp": "2026-05-25T12:00:00Z" }
}
```

Error responses:
```json
{
  "status": "error",
  "status_code": 422,
  "message": "Validation failed",
  "errors": [{ "field": "email", "message": "Invalid email format", "code": "INVALID_EMAIL" }],
  "meta": { "timestamp": "2026-05-25T12:00:00Z" }
}
```

---

### Authentication

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/auth/signup` | ❌ | Register a new user |
| `POST` | `/auth/login` | ❌ | Login and receive JWT token |
| `POST` | `/auth/logout` | ✅ | Logout (invalidate token) |

**Signup request body:**
```json
{
  "email": "alex@example.com",
  "username": "alex_miller",
  "password": "SecurePass123!",
  "display_name": "Alex Miller"
}
```

**Login request body:**
```json
{
  "email": "alex@example.com",
  "password": "SecurePass123!"
}
```

---

### User Profile

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/users/me` | ✅ | Get current user's profile + stats + PRs |
| `PUT` | `/users/me` | ✅ | Update profile fields |

**Update profile request body** (all fields optional):
```json
{
  "display_name": "Alex Miller",
  "age": 29,
  "gender": "Male",
  "weight": 195,
  "weight_unit": "lbs",
  "height": "6'1\""
}
```

> `username` is immutable after account creation. Any `username` field sent to `PUT /users/me` is silently ignored.

---

### Workout Sessions

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/sessions` | ✅ | Create a new workout session |
| `GET` | `/sessions` | ✅ | List all sessions (paginated) |
| `GET` | `/sessions/{id}` | ✅ | Get full session details |
| `PUT` | `/sessions/{id}` | ✅ | Update a session |
| `DELETE` | `/sessions/{id}` | ✅ | Delete a session |

**Create session request body:**
```json
{
  "workout_date": "2026-05-25",
  "notes": "Great chest day!",
  "muscle_groups": [
    {
      "name": "Chest",
      "order": 1,
      "exercises": [
        {
          "name": "Barbell Bench Press",
          "order": 1,
          "sets": [
            { "weight": 225, "reps": 5, "order": 1 },
            { "weight": 215, "reps": 7, "order": 2 }
          ]
        }
      ]
    }
  ]
}
```

**List sessions query parameters:**
- `page` (default: 1), `limit` (default: 20, max: 100)
- `date_from`, `date_to` (ISO dates, optional)
- `sort`: `"asc"` or `"desc"` (default: `"desc"`)

---

### Calendar & Logs

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/logs/calendar?year=2026&month=5` | ✅ | Get active/missed days for a month |
| `GET` | `/logs/date/2026-05-25` | ✅ | Get workout + calendar for a specific date |

**Calendar response:**
```json
{
  "status": "success",
  "data": {
    "month": "May",
    "year": 2026,
    "active_days": [1, 3, 5, 7, 8],
    "missed_days": [2, 4, 6]
  }
}
```

---

### HTTP Status Codes

| Code | Meaning |
|---|---|
| `200` | OK — successful request |
| `201` | Created — resource successfully created |
| `400` | Bad Request — invalid data (e.g., future workout date) |
| `401` | Unauthorized — missing or expired token |
| `403` | Forbidden — you don't own this resource |
| `404` | Not Found — resource doesn't exist |
| `422` | Unprocessable Entity — Pydantic validation failed |
| `429` | Too Many Requests — rate limit exceeded |
| `500` | Internal Server Error — retry later |

---

## Database Schema

```
users
  ├── id (UUID, PK)
  ├── username (unique)
  ├── email (unique)
  ├── password_hash
  ├── display_name
  ├── age, gender, weight, weight_unit, height
  ├── avatar_url
  └── created_at, updated_at

workout_sessions
  ├── id (UUID, PK)
  ├── user_id (FK → users)
  ├── workout_date           ← One session per user per date
  ├── notes
  └── created_at, updated_at

muscle_groups
  ├── id (UUID, PK)
  ├── session_id (FK → workout_sessions, CASCADE)
  ├── name
  └── order_index

exercises
  ├── id (UUID, PK)
  ├── muscle_group_id (FK → muscle_groups, CASCADE)
  ├── name
  └── order_index

exercise_sets
  ├── id (UUID, PK)
  ├── exercise_id (FK → exercises, CASCADE)
  ├── weight (decimal, kg)
  ├── reps (int)
  └── order_index

personal_records
  ├── id (UUID, PK)
  ├── user_id (FK → users)
  ├── muscle_group
  ├── exercise
  ├── value (decimal)
  ├── unit (lbs | kg)
  ├── reps
  └── updated_at            ← Auto-updated on each new session
```

> **Key constraint:** A user can only have one workout session per calendar date. Attempting to create a second session on the same date will return a `400` error.

---

## Testing

### Backend Tests

```bash
# From /backend with virtualenv active:

# Run all tests
pytest

# With coverage report
pytest --cov=app tests/

# Run a specific test file
pytest tests/test_auth.py

# Run a specific test case
pytest tests/test_auth.py::test_signup
```

### Code Quality

```bash
# Format code (Black)
black app/ tests/

# Lint (Flake8)
flake8 app/ tests/

# Type check (Mypy)
mypy app/
```

---

## Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and ensure tests pass.
4. Commit with a clear message: `git commit -m "feat: add exercise library"`
5. Push to your fork: `git push origin feature/your-feature-name`
6. Open a **Pull Request** against `main`.

Please follow the existing code style (Black for Python, ESLint for TypeScript).

---

## License

This project is open source. See [LICENSE](./LICENSE) for details.

---

<div align="center">

Built with 💪 by the IronLog team · *Every rep counts.*

</div>
