# 🌾 Soil Farming Agent - MERN Stack Web Application

**Soil Farming Agent** is a modern web application designed to provide users with essential soil and crop distributor information based on soil types and crop requirements. Developed using the **MERN stack**, the platform supports data management by Admins and information access for Users in an intuitive and responsive interface.

---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✅ Features

- Admin login and secure access
- Post and manage:
  - 🧪 Soil information (Type, pH, Description, Crops)
  - 🚚 Distributor information (Name, Location, Crops, Contact)
- Users can:
  - Register & login
  - Search and view soil details
  - Browse distributors by crop/location
- Search functionality with filters
- Responsive UI with TailwindCSS
- Charts and analytics in Admin Dashboard using Chart.js
- Clean code structure and modular backend
- Logging, error handling, and database indexing

## Link Link

- The project live [link]()

## 🧰 Tech Stack

### Frontend

- React.js
- TailwindCSS
- React Router DOM
- Axios
- Chart.js (`react-chartjs-2`)

### Backend

- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JWT (for authentication)
- Morgan & Custom Logging

## 📁 Project Structure

```ini
soil-farming-agent/
├── frontend/ # React frontend
│ ├── components/ # Reusable components (Cards, Forms, Header, Footer)
│ ├── pages/ # Route-based components (Home, Login, Dashboard)
| ├── utils/ # Utility components (Instance, Tokens)
│ ├── App.jsx
│ └── main.jsx
├── backend/ # Express backend
│ ├── controllers/ # Soil & Distributor logic
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API route handlers
│ ├── middlewares/
| |── .env
│ └── server.js
└── README.md
```

## 🛠️ Installation

1. **Clone the repo**

```bash
git clone https://github.com/GJ40/soil-farming-agent.git
cd soil-farming-agent
```

2. **Install backend**

```bash
cd backend
npm install
```

3. **Install frontend**

```bash
cd frontend
npm install
```

4. **Set Environment Variables**

- Create a .env file in /backend:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

```

5. **Run the App**

- Run in dev mode

```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm run dev
```

- Run in production mode

```bash
# Backend
cd backend
npm run start

# Frontend
cd ../frontend
npm run build

```

## 🔌 API Endpoints

- Soil Routes
  POST /soils/addSoil
  POST /soils/getSoils (Search by type, description, pH)
  GET /soils
  GET /soils/:id
  PUT /soils/update/:id
  DELETE //soils/delete/:id

- Distributor Routes
  POST /distributors/addDist
  POST /distributors/getDists (Search by crop, location)
  GET /distributors/:id
  GET /distributors
  PUT /distributors/update/:id
  DELETE /distributors/delete/:id

## 🚀 Usage

- Admin Role: Log in to manage soils & distributors via the dashboard.

- User Role: Register and browse soil types or locate distributors.

- Search using filters and view details using responsive cards.

- View analytics and charts (admin only) for insights into usage patterns.

## 🤝 Contributing

1. Fork the repository

2. Create your feature branch: git checkout -b feature/new-feature

3. Commit your changes: git commit -am 'Add new feature'

4. Push to the branch: git push origin feature/new-feature

5. Create a Pull Request
