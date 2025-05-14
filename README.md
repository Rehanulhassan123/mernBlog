## 📝 **Full Stack MERN Blog Application**

### **Overview**

mernBlog is a full-stack blog application built using the MERN stack (MongoDB, Express.js, React, and Node.js) with modern tools and best practices. It provides a clean, user-friendly interface for writing, managing, and viewing blog posts with secure authentication and role-based access. This project was developed as a real-world blogging platform, supporting rich text editing, Google OAuth, protected routes, and more.

---

### 📚 **Table of Contents**

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

  - [Frontend](#frontend)
  - [Backend](#backend)

---

### 🚀 **Features**

#### User Features

- User Registration and Login: Secure authentication with Passport.js and JWT. Passwords are hashed using bcrypt.js.
- Google Sign-In: Users can authenticate via Google OAuth.
- Write Blog Posts: Authenticated users can write and submit posts using a rich text editor (TinyMCE).
- View Posts: Users can view blogs posted by others in a clean and responsive layout.
- Protected Routes: Certain pages (like writing blogs) are protected and accessible only to authenticated users.
- Persistent Login: User sessions persist using Redux Persist.
- Responsive UI: Mobile-first and modern interface built with Tailwind CSS.

### ⚙️ **Technologies Used**

#### Frontend

- **React.js** – UI development
- **Redux Toolkit + RTK Query** – State management and API interaction
- **Tailwind CSS** – Styling
- **React Router DOM** – Client-side routing
- **React Hook Form** – Form handling
- **TinyMCE** – Rich text editor
- **Framer Motion** – Animations
- **React Toastify** _(planned)_ – Notifications
- **React Top Loading Bar / Spinner** – Feedback on async actions
- **Redux Persist** – Persistent state

#### Backend

- **Node.js & Express.js** – RESTful API backend
- **MongoDB + Mongoose** – Data storage and schema modeling
- **Passport.js** – Authentication strategies (JWT & Google OAuth)
- **JWT** – Token-based authentication
- **bcrypt.js** – Password hashing
- **Joi** – Input validation
- **Cloudinary + Multer** – _(planned)_ for media uploads

---

### 🛠️ **Installation**

Follow these steps to set up the project locally.

#### 1. Clone the Repository

```bash
git clone https://github.com/Rehanulhassan123/mernBlog.git
cd mernBlog
```

#### 2. Install Backend Dependencies

```bash
cd backEnd
npm install
```

#### 3. Install Frontend Dependencies

```bash
cd ../frontEnd
npm install
```

#### 4. Set Up Environment Variables

Create `.env` files in both `frontEnd` and `backEnd` directories with appropriate environment variables.

#### 5. Run Backend Server

```bash
cd backEnd
npm run dev
```

#### 6. Run Frontend Server

Open a new terminal:

```bash
cd frontEnd
npm run dev
```

---

### 💡 **Usage**

#### Frontend

- **Login/Register** – Authenticate with email or Google
- **Write Post** – Create blogs using the rich editor (protected route)
- **View Blogs** – Explore published blog posts
- **Persistent Auth** – Stay logged in across sessions

#### Backend

- Exposes a secure REST API for user authentication and blog management.
