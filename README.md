# auth_project  --Google & Normal Login with Cookie-Based Authentication

This project is a complete authentication system built with **React**, **Node.js**, **Express**, and **MongoDB**, featuring:

- 🔐 **Normal Login/Register (Email & Password)**
- 🔑 **Google Sign-In Integration**
- 🍪 **Secure Cookie-based Authentication (HTTP-only cookies)**
- 🧱 **Reusable Authentication Components** for future projects

---

## 🚀 Features

- User Registration and Login (with Role Selection)
- Google OAuth 2.0 Login via Google Identity Services
- Access Token stored in memory, Refresh Token in HTTP-only cookie
- Role-based UI: Displays different messages for Admin/User
- React Context + useReducer for global auth state
- Axios instance with interceptors for automatic token refresh
- Protected routes using React Router v6
- User Preferences stored in cookies (theme, language, favorite number)


## 📦 Tech Stack

**Frontend:**
- React
- Material UI
- Axios
- React Router
- Google Identity Services

**Backend:**
- Node.js
- Express
- MongoDB + Mongoose
- JWT (access & refresh tokens)
- Cookie-parser & CORS

## 🧩 Reusability

This project was built with **reusability in mind**. All authentication components, context, reducers, and Axios setup can be reused in other MERN projects with minimal changes.

## 🛠️ Setup Instructions

npm install
Create a .env file and add:
        MONGO_URI=your_mongo_uri
        ACCESS_TOKEN_SECRET=your_access_secret
        REFRESH_TOKEN_SECRET=your_refresh_secret
        GOOGLE_CLIENT_ID=your_google_client_id
        FRONTEND_URL=http://localhost:3000





