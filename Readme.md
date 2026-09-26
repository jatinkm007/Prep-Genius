# ⚡ Prep Genius

> An AI-powered placement intelligence platform engineered to help software engineering candidates crack technical assessments, optimize resumes, and master high-stakes interview rounds.

---

## 🚀 Overview

Prep Genius is a modern, modular web platform designed with a **$0-cost architecture** using open APIs and performant cloud services. It bridges the gap between passive tutorial watching and deliberate interview readiness by integrating sandboxed code execution, Socratic AI debugging guidance, and automated ATS analysis.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (Modern Engine)
- **Icons & UI:** Lucide React
- **State & Routing:** Context API (`AuthContext`), React Router DOM v6
- **HTTP Client:** Axios (with Bearer token request interceptors)

### Backend
- **Runtime:** Node.js & Express.js (ES Modules)
- **Database:** MongoDB Atlas (Cloud NoSQL)
- **Object Modeling:** Mongoose ODM
- **Authentication:** Stateless JSON Web Tokens (JWT) & `bcryptjs` password hashing

### Infrastructure & External Services
- **Code Execution:** Piston API (Multi-language sandboxed runner)
- **AI Intelligence:** Google AI Studio / Groq Cloud APIs (High-speed inference)
- **Deployment Targets:** Vercel (Client) & Render (API Server)

---

## 📐 Project Structure

```text
prep-genius/
├── client/                     # Vite + React Frontend
│   ├── src/
│   │   ├── api/                # Axios instance & domain API wrappers
│   │   ├── components/         # Atomic UI & ProtectedRoute guards
│   │   ├── context/            # React AuthProvider & session state
│   │   ├── pages/              # Auth & Dashboard screens
│   │   ├── App.jsx             # Route orchestrator
│   │   └── main.jsx            # Application entrypoint
│   └── package.json
│
├── server/                     # Node.js + Express Backend
│   ├── src/
│   │   ├── config/             # MongoDB Atlas connection
│   │   ├── controllers/        # Request handling logic
│   │   ├── middleware/         # Auth verification & error handling
│   │   ├── models/             # Mongoose schemas (User, Problem, Submission)
│   │   ├── routes/             # Express API routers
│   │   ├── app.js              # Express app middleware configuration
│   │   └── server.js           # Server bootstrap
│   └── package.json
└── README.md