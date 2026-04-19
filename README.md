
```md
# StreetStyleX - MERN Stack eCommerce Website

A full-stack eCommerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).  
It includes user authentication, product management, cart functionality, order placement, admin dashboard, and payment integration (Stripe & Razorpay).

---

## 🚀 Live Demo
- Frontend: https://streetstylex.vercel.app/
- Backend: https://streetstylex-backend.vercel.app/

---

## 📌 Features

### 👤 User Features
- User registration and login
- Browse products with filtering and sorting
- View product details
- Add products to cart with size/variant selection
- Place orders with delivery address
- View order history
- Online payment (Stripe & Razorpay)
- Cash on Delivery option

### 🛠️ Admin Features
- Secure admin login
- Add / delete / manage products
- View all orders
- Manage inventory
- Admin dashboard for full control

---

## 🧑‍💻 Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS / CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- REST API

### Payments
- Stripe API
- Razorpay API

### Deployment
- Vercel (Frontend + Backend)

---

## 📁 Project Structure

```

/frontend
├── components
├── pages
├── assets
├── context
├── App.js

/backend
├── models
├── routes
├── controllers
├── middleware
├── server.js

````

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/salmanmd123/streetstylex.git
````

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
RAZORPAY_KEY=your_razorpay_key
```

Run backend:

```bash
npm start
```

---

### 3. Setup Frontend

```bash
cd frontend
npm install
npm start 
```

---

## 💳 Payment Integration

* Stripe is used for international card payments
* Razorpay is used for Indian payment methods
* Cash on Delivery supported as fallback option

---

## 🔐 Authentication

* JWT-based authentication
* Protected routes for users and admin
* Secure login & registration system

---

## 📦 API Features

* RESTful API architecture
* Product APIs
* User APIs
* Order APIs
* Admin APIs

---

## 📊 Key Learnings

* Full-stack MERN development workflow
* Authentication and authorization handling
* Payment gateway integration
* API development and integration
* Deployment using Vercel

---

## ⚠️ Challenges Faced

* Managing frontend-backend data flow
* Handling payment gateway verification
* Structuring MongoDB database efficiently
* Securing admin routes
* Deployment configuration on Vercel

---

## 👨‍💻 Author

*Mohammed Salman**

* GitHub: https://github.com/salmanmd123
* LinkedIn: https://www.linkedin.com/in/mohammed-salman-b5989b297

---

## 📜 License

This project is licensed under the MIT License.

```

