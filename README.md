# 🌿 HerbVerse – Virtual Herbal Garden

HerbVerse is a **Virtual Herbal Garden** web application that provides an immersive way to explore medicinal plants using **3D models**, detailed botanical information, and curated **virtual tours**.  
Built with the **MERN stack** and **Three.js (React Three Fiber)**, it is designed for education, awareness, and digital preservation of herbal knowledge (AYUSH-focused).

---

## ✨ Features

### 🌱 Plant Exploration
- Detailed plant profiles (Botanical name, common names, habitat, medicinal uses, cultivation)
- High-quality plant images
- Interactive **3D GLB plant models**

### 🧭 Virtual Tours
- Auto-rotating 3D plant models
- Timed transitions between plants
- Themed tours with duration control

### 👤 Role-Based Access
- **Guest**: View plants & tours
- **User**: Explore full content
- **Admin**:
  - Add / edit / delete plants
  - Manage users
  - Create and manage virtual tours

### 🎨 UI / UX
- Nature-inspired green theme
- Responsive design (mobile, tablet, desktop)
- Smooth hover effects, shadows, and animations
- Clean admin dashboards

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Three Fiber
- Drei
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (image & GLB uploads)

---

## 📁 Project Structure

HerbVerse/
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ └── App.jsx
│ └── dist/ # Vite production build
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ └── server.js
│
└── README.md


---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/USERNAME/HerbVerse.git
cd HerbVerse

```Backend Setup
cd backend
npm install

```Create .env file 
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

```Run backend
nodemon server.js

```Frontend Setup
cd frontend
npm install
npm run dev


###  📸 Screens & Media

3D plant visualization using .glb files

Images stored via backend uploads

Optimized loading & rendering

### 🔐 Authentication

JWT-based authentication

Protected admin routes

Secure CRUD operations

### 🎯 Future Enhancements

Search & filter plants

AR / VR tour support

Multilingual plant descriptions

User bookmarks & favorites

###👩‍💻 Author

Sangeeta Kundu
MERN Stack Developer | Virtual Garden Project
🌱 Passionate about tech + nature






