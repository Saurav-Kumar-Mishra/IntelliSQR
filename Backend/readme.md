# Backend - IntelliSQR Auth API

This is the backend for the IntelliSQR Authentication system built using **Express.js** and **TypeScript**. It handles user registration, login, and protected routes with JWT-based authentication.

---

## ✨ Tech Stack

-   **Node.js**
-   **Express.js**
-   **TypeScript**
-   **MongoDB** with Prisma ORM
-   **JWT** for authentication
-   **dotenv** for environment variables
-   **Custom Error Handling**

---

## 📁 Project Structure

```
backend/
├── controllers/            # Request handlers (register, login)
├── middleware/             # Auth middleware and error handlers
├── routes/                 # API route definitions
├── prisma/                 # Prisma schema and client
├── CustomErrorHandler/     # custom errors
├── server.ts               # Entry point
└── .env                    # Environment variables
```

---

## 🛠️ Setup Instructions

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure `.env`

Create a `.env` file in the root:

```env
PORT=5000
DATABASE_URL=mongodb+srv://<your-mongo-url>
ACCESS_TOKEN_SECRET=your_jwt_secret_here
```

---

## 🔧 Prisma Setup

### 1. Generate Prisma Client

```bash
npx prisma generate
```

### 2. Push Prisma Schema to DB

```bash
npx prisma db push
```

---

## 🥪 Run Locally

```bash
npm run dev
```

This uses `ts-node-dev` to run the server in development mode.

---

## 🔐 Authentication

-   Login and Register APIs
-   JWT Token in Cookies
-   `authorizationCheck` middleware to protect routes
-   Custom errors (`AuthenticationError`, `ValidationError`)

---

## 📡 API Endpoints

### POST `/api/register`

-   Registers a new user
-   Request Body:
    ```json
    {
        "email": "user@example.com",
        "password": "securepassword"
    }
    ```

### POST `/api/login`

-   Logs in a user
-   Request Body:
    ```json
    {
        "email": "user@example.com",
        "password": "securepassword"
    }
    ```

### GET `/api/home`

-   Protected route to fetch the logged-in user's email
-   Requires valid JWT token in cookies

---

## 📬 Contact

Open to suggestions or improvements!
