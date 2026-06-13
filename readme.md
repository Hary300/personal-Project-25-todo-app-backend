<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d6efd,100:00c6ff&height=200&section=header&text=Backend%20API%20Service&fontSize=40&fontColor=ffffff" />
</p>

<p align="center">Backend REST API untuk authentication (register, login, profile)</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/API-REST-orange?style=for-the-badge" />
</p>

---

## 📦 Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
   <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
   <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens" />
  <img src="https://img.shields.io/badge/bcrypt-ffcc00?style=for-the-badge" />
  <img src="https://img.shields.io/badge/dotenv-8DD6F9?style=for-the-badge" />
  <img src="https://img.shields.io/badge/CORS-FF6B6B?style=for-the-badge" />
</p>

---

## 📁 Project Structure

```
src/
│── config/ # konfigurasi (db, env, dll)
│── controllers/ # logic request & response
│── helpers/ # utility function reusable
│── middlewares/ # middleware express (auth, error handler)
│── models/ # mongoose models
│── routes/ # API routes
│── schemas/ # mongoose schema
│── types/ # custom types
│── validators/ # validasi input (zod)
│── index.ts # entry point
```

---

## ⚙️ Installation

### 1. Clone repo

```bash
git clone https://github.com/Hary300/personal-Project-25-todo-app-backend

cd personal-Project-25-todo-app-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Running the Application

Development Mode

```bash
npm run dev
```

Production Build

```bash
npm run build
npm start
```

### 5. Authentication Flow 🔐

Register User

```
POST /api/auth/register
```

Login User

```
POST /api/auth/login
```

Get Profile (Protected)

```
GET /api/auth/profile
Authorization: Bearer <token>
```

### 6. Security 🛡️

- Password hashing using bcrypt
- Authentication via JWT
- Protected routes using middleware
- Input validation using Zod
- CORS policy configuration

### 7. CORS Policy 🌐

Development:

```typescript
app.use(cors());
```

Production:

```typescript
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
```

### 8. Database 🗄️

MongoDB Atlas is used as the primary database.

Collections

- users

### 9. API Response Format 📡

Success Response

```json
{
  "success": true,
  "message": "Success message",
  "data": {}
}
```

Error Response

```json
{
  "success": false,
  "message": "Error message",
  "error": {}
}
```
