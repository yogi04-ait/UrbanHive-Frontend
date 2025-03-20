# 🛍️ URBANHIVE E-Commerce Clothing Platform - (Frontend)

## 📌 Project Overview

This is the **frontend** for the **UrbanHive multi-seller e-commerce clothing platform**, built using **React.js** and **Tailwind CSS**. The platform provides a seamless shopping experience where users can browse products, manage their carts, place orders, and track deliveries. Sellers can list and manage their products and orders efficiently.

## 🏗️ Tech Stack

- **Frontend Framework:** React.js
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **API Handling:** Axios
- **Authentication:** JWT-based authentication

---

## 🚀 Features

### ✅ User Features

- **User Signup/Login** (JWT Authentication)
- **Browse Products** (Category-wise sorting and searching)
- **Add/Remove Wishlist Items**
- **Sort and Filter Products** (Price, category, ratings, etc.)
- **Cart Management** (Add, update, and remove items from the cart)
- **Order Placement** (Supports multiple sellers in a single order)
- **Order Tracking** (Check order status and history)
- **Manage Addresses** (Add, edit, and delete saved addresses)

### ✅ Seller Features

- **Product Management** (Add, Edit, Delete products)
- **Order Management** (View and update order status)

---

## 📂 Folder Structure

```
frontend/
│── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Pages for different views
│   ├── redux/          # Redux store, slices, and actions
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Helper functions
│   │   ├── appStore.js     # Redux store configuration
│   │   ├── cartSlice.js    # Cart state management
│   │   ├── wishlistSlice.js # Wishlist state management
│   │   ├── userSlice.js # user state management
│   │   ├── sellerSlice.js # seller state management
│   │   ├── constants.js # constant values and functions 
│   ├── assets/         # Static images and icons
│   ├── App.js          # Main application file
│── public/             # Public assets
│── .env                # Environment variables
│── package.json        # Dependencies and scripts
```

---

## 🔧 Installation & Setup

1. Clone the repository
   ```sh
   git clone https://github.com/yogi04-ait/UrbanHive-Frontend.git
   cd UrbanHive-Frontend
   ```
2. Install dependencies
   ```sh
   npm install
   ```
3. Set up environment variables in `.env`
   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```
4. Start the development server
   ```sh
   npm start
   ```

---

## 🔗 Backend Integration

This frontend connects to the **UrbanHive Backend** API to handle authentication, product fetching, cart management, and order processing. Make sure the backend is running before testing the frontend.

🔗 [UrbanHive Backend Repository](https://github.com/yogi04-ait/UrbanHive-Backend)

---

## 📌 Future Enhancements

✅ **Dark Mode Support** 
✅ **Product Review & Customer Support** 
✅ **Online Payment Integration** (Razorpay integration planned) 
✅ **SEO Improvements** (Meta tags, structured data)

---

## 🚧 Development Status

This project is **actively being developed**, with continuous improvements and new features being added. Stay tuned for updates!

### 🚀 Happy Coding!

