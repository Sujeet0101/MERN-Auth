# MERN-Auth
🔐 Complete MERN Authentication System with Email Verification, OTP-based Password Reset, and Secure JWT Login — built using MongoDB, Express, React, Node.js, and Tailwind CSS.


# 🔐 MERN Authentication System with Email Verification & OTP Password Reset

A complete **Authentication System** built with the **MERN Stack (MongoDB, Express, React, Node.js)** featuring:
- Secure **JWT-based authentication**
- **Email verification** for new users
- **Password reset** using a 6-digit OTP sent to the user’s email
- Fully responsive frontend with **React + Tailwind CSS**

---

## 🚀 Features

✅ User Registration with email verification  
✅ Login with JWT token authentication  
✅ Secure Password Hashing using bcrypt  
✅ Forgot Password flow with OTP verification  
✅ Password Reset using verified OTP  
✅ Protected Routes (Frontend + Backend)  
✅ Responsive UI with Tailwind CSS  
✅ Clean Folder Structure for scalability  

---

## 🏗️ Tech Stack

**Frontend:**
- React (Vite)
- Axios
- Tailwind CSS
- React Router DOM

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- Nodemailer for sending OTP emails
- dotenv for environment variables

---

## ⚙️ Installation and Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/mern-auth-system.git
cd mern-auth-system


2️⃣ Backend Setup

cd server
npm install

Create a .env file in the server folder and add:

PORT=4000
MONGO_URI=mongodb+srv://<your-mongo-uri>
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
CLIENT_URL=http://localhost:5173

Then start the backend server:

npm run dev


3️⃣ Frontend Setup

cd ../client
npm install
npm run dev


📧 Email & OTP Flow

When a user registers, an email with a 6-digit verification OTP is sent.
The account becomes active only after successful OTP verification.
For password reset, the same OTP flow is used to securely verify ownership before changing the password.

🛡️ Security Highlights

JWT tokens stored in HTTP headers for authentication
bcrypt password hashing
Input validation for all routes
OTP expiration and single-use mechanism


💡 Future Enhancements

Google & GitHub OAuth Login
Role-based access control
Refresh token implementation
Email templates for better UX

