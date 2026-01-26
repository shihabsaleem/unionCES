# 🗳️ UnionCES Voting System

**UnionCES** is a secure, modern, and feature-rich digital voting platform designed for College Election Systems. It allows voters to cast their ballots online while providing Election Officers (Admins) with real-time dashboards to manage candidates and view results.

## 🚀 Technology Stack

### Frontend
- **React.js**: Core framework for a dynamic SPA (Single Page Application).
- **Tailwind CSS**: Utility-first CSS framework for modern, responsive styling.
- **React Router**: For seamless feature-based navigation.
- **React Select**: Enhanced dropdown components.

### Backend
- **Django**: Robust Python web framework.
- **Django REST Framework (DRF)**: API development and serialization.
- **SQLite**: Lightweight database for development.

---

## ✨ Features

### 👤 Voter Portal
- **Secure Login**: Access the platform with verified credentials.
- **Dashboard**: View election status (Live/Closed) and candidate stats.
- **Cast Vote**: Intuitive digital ballot for all positions (Chairman, Vice Chairman, etc.).
- **Live Results**: Read-only view of the current election standings.

### 🛡️ Admin (Election Officer) Portal
- **Dashboard**: Real-time overview of total candidates and active votes.
- **Candidate Registry**: Add, remove, and manage candidate nominations.
- **Voter List**: View the complete registry of eligible voters.
- **Admin Control**: Monitor election integrity and system status.

---

## 🛠️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [Python](https://www.python.org/) (v3.10+)

### 1. Backend Setup (Django)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # Mac/Linux:
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the backend server:
   ```bash
   python manage.py runserver
   ```
   *The API will be available at `http://localhost:8000/api/`.*

### 2. Frontend Setup (React)

1. Navigate to the project root (if not already there):
   ```bash
   cd unionCES
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   *The app will open at `http://localhost:3000`.*

---

## 📂 Project Structure

```text
unionCES/
├── backend/                 # Django Backend
│   ├── api/                 # API Views, Models, Serializers
│   └── ...
├── src/                     # React Frontend
│   ├── assets/              # Images, Logos, Icons
│   ├── components/          # Shared UI (Navbar, Sidebar)
│   ├── features/            # Feature Modules
│   │   ├── auth/            # Login, Signup
│   │   ├── admin/           # Admin Dashboard & Tools
│   │   └── voter/           # Voter Dashboard & Casting
│   ├── utils/               # API Helpers
│   └── App.js               # Main Router
└── ...
```

## 📝 License
This project is for educational and organizational use within CES. All rights reserved.
