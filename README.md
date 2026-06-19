# 🏋️ Gym Management System
Gym Management System is a full-stack fitness management application built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js).
It calculates user BMI and provides personalized diet recommendations based on fitness goals.
The system suggests customized workout plans and helps users track their fitness progress through an interactive dashboard.
Administrators can manage users, monitor fitness data, oversee diet and workout plans, and access gym analytics efficiently.

## 🚀 Features

### 🔐 Authentication & Authorization

* User Registration
* User Login
* Password Encryption using bcrypt
* Protected Routes
* JWT Authentication

### 👤 Member Management

* Add New Members
* View Member Details
* Update Member Information
* Delete Members
* Search Members

### 💳 Membership Management

* Track Membership Plans
* Membership Status
* Renewal Management

### 📊 Dashboard

* Total Members Count
* Active Members
* Expired Memberships
* Quick Statistics

### 🎨 Modern UI

* Responsive Design
* Mobile Friendly
* Clean User Interface
* React-Based Frontend

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcryptjs

---

## 📂 Project Structure

```
gym-management-system/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/
│   ├── models/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

git clone https://github.com/hujur-4/gym-management-system.git


### 2. Navigate to Project

cd gym-management-system

### 3. Install Backend Dependencies

```bash
cd server
npm install
```

### 4. Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

## 🔧 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

---

## ▶️ Run Application

### Start Backend

```bash
cd server
npm start
```

### Start Frontend

```bash
cd frontend
npm run dev
```

Application will run on:

```bash
Frontend: http://localhost:5173

Backend: http://localhost:5000
```

## 🔒 Security Features

* Password Hashing using bcryptjs
* JWT Token Authentication
* Protected API Routes
* Input Validation
* Secure Environment Variables

---

## 🎯 Future Enhancements

* Attendance Tracking
* Trainer Management
* Diet Plan Management
* Workout Plan Management
* Payment Integration
* Email Notifications
* Admin & Member Roles

---

## 👥 Contributors


### **Geethanjali**

**Full Stack Developer**

GitHub: https://github.com/Geetha123-hue

### **M Hujur Baig**

**Full Stack Developer**

GitHub: https://github.com/hujur-4

### **Konda Subhashini**

**Full Stack Developer**

GitHub: https://github.com/KONDA-SUBHASHINI

### **Kondepalli Nityasree**

**Full Stack Developer**

GitHub: https://github.com/kondepallinityasree

⭐ If you found this project useful, consider giving it a star on GitHub.
