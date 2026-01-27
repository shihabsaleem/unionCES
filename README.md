# 🗳️ UnionCES Voting System

**UnionCES** is a secure, modern, and feature-rich digital voting platform designed for College Election Systems. It allows voters to cast their ballots online while providing Election Officers (Admins) with real-time dashboards to manage candidates, track turnout, and control election flow.

---

## 🏗️ Architecture Overview

The project follows a standard **Client-Server Architecture**:

- **Frontend**: A React.js Single Page Application (SPA) that handles the user interface, routing, and real-time data visualization.
- **Backend**: A Django REST Framework (DRF) API that manages authentication, database interactions, and election logic.
- **Database**: SQLite (default for development) storing Users, Candidates, Vote Records, and Election Settings.
- **Authentication**: Token-based authentication (Knox/DRF) ensuring secure access for both Voters and Admins.

---

## ✨ Key Features

### 🛡️ Admin (Election Officer) Portal
*   **Control Center**:
    *   **Start/Stop Polling**: Open or close the election with a click.
    *   **Publish/Hide Results**: Control when voters can see the final tally.
    *   **Live Analytics**: View real-time "Votes Cast" and "Voter Turnout" percentage.
*   **Candidate Management**:
    *   **Add Candidate**: Seamless form to register new candidates. **Locks automatically** when polling is active.
    *   **Live Registry**: Auto-updating table of all registered candidates (Votes hidden for privacy).
*   **Voter Registry**:
    *   **Full List**: View all eligible student voters.
    *   **Status Tracking**: See who has voted and who hasn't in real-time.
    *   **Search**: Quickly find specific students.
*   **Results & Reports**:
    *   **Visual Charts**: Bar charts showing vote distribution per candidate.
    *   **Leader Cards**: Highlighted leading candidates for each position.
    *   **Export**: Download results as **PDF** (formatted report) or **Excel** (raw data).

### 👤 Voter Portal
*   **Secure Access**: Login with unique credentials.
*   **Election Dashboard**:
    *   **Polling Timer**: Visual progress bar showing election duration (9 AM - 5 PM).
    *   **Status Indicators**: Clear messages if polling is active, stopped, or not started.
*   **Cast Vote**: Intuitive interface to select candidates for all positions (Chairman, Vice Chairman, etc.).
*   **Live Results**:
    *   **Conditional Visibility**: Charts are hidden until the Admin explicitly publishes them.
    *   **Real-time Updates**: Data refreshes automatically every 30 seconds.

---

## 🚀 Technology Stack

### Frontend
*   **React.js** (v18): UI Library
*   **Tailwind CSS**: Styling & Design System
*   **React Router**: Navigation
*   **Recharts**: Data Visualization (Bar/Area Charts)
*   **Resouces**: `jspdf`, `xlsx`, `file-saver` (Export functionality)
*   **Axios**: API Requests

### Backend
*   **Python** (v3.10+)
*   **Django** (v4.0+): Web Framework
*   **Django REST Framework**: API Construction
*   **Django CORS Headers**: Cross-Origin Resource Sharing

---

## 🔌 API Reference

The backend exposes the following key endpoints (Prefix: `/api/`):

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/login` | POST | Authenticate user & get token |
| `/polling_status` | GET | Get election status (`active`, `published`) |
| `/control` | POST | Admin: Start/Stop election or Show/Hide results |
| `/turnout` | GET | Admin: Get total voters vs votes cast |
| `/voters` | GET | Admin: Get list of all voters + status |
| `/table` | GET | Get all candidates + vote counts |
| `/result` | GET | Get winning candidates per seat |
| `/addcandidate` | POST | Admin: Register a new candidate |
| `/vote` | POST | Voter: Submit ballot |

---

## 🛠️ Setup & Installation

### Prerequisites
*   Node.js (v16+) & npm
*   Python (v3.10+)

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    pip install django djangorestframework django-cors-headers
    ```
3.  Run database migrations:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```
4.  Create an Admin account (Election Officer):
    ```bash
    python manage.py createsuperuser
    ```
5.  Start the server:
    ```bash
    python manage.py runserver
    ```
    *Server runs on `http://localhost:8000`*

### 2. Frontend Setup

1.  Open a new terminal and navigate to the project root:
    ```bash
    cd unionCES
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the React app:
    ```bash
    npm start
    ```
    *App opens at `http://localhost:3000`*

---

## 📂 Project Structure

```text
unionCES/
├── backend/                 # Django API
│   ├── api/                 # Views, Models, URLs
│   ├── union/               # Project Settings
│   └── manage.py
├── src/                     # React Frontend
│   ├── components/          # Layouts (Sidebar, Navbar)
│   ├── features/
│   │   ├── admin/           # Admin Pages (Dashboard, Add, Voters, Results)
│   │   ├── voter/           # Voter Pages (Dashboard, Cast, Results)
│   │   └── auth/            # Login/Signup
│   ├── utils/               # api.js, exportUtils.js
│   └── App.js               # Route Definitions
└── package.json
```

## 📝 License
Proprietary software for College Election Systems.
