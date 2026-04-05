# FinanceHub 💰

FinanceHub is a professional, full-stack financial management dashboard designed to help users track their income, expenses, and overall financial health in real-time.

## 🚀 Live Demo & API Docs

- **Live Application:** [FinanceHub Demo](https://financehub-3dc32.web.app/)
- **Interactive API Documentation:** [Swagger UI](https://financehubservice.onrender.com/api-docs/)

## ✨ Features

### 🔐 Role-Based Access Control (RBAC)
The application implements a strict permission hierarchy to ensure data security:
- **Admin:** Full control over the system. Can manage user roles, update account statuses, and perform all CRUD operations on transactions.
- **Analyst:** Can view all financial data and user profiles but cannot modify roles or delete records.
- **Viewer:** Read-only access to transactions. Ideal for stakeholders who only need to monitor financial health.

### 📊 Real-Time Financial Dashboard
- **Instant Summaries:** Automatically calculates Net Balance, Total Income, and Total Expenses.
- **Visual Analytics:** Category-wise breakdown of expenses to help identify spending patterns.
- **Search Support:** Quickly find specific transactions using the integrated search bar.
- **Type Filtering:** Easily filter transactions by type (Income or Expense) to narrow down your view.
- **Live Updates:** UI reflects database changes instantly without page refreshes using Firestore listeners.

### 🛡️ Validation and Error Handling

The application demonstrates robust validation and error handling across both the frontend and backend:

### Backend (Express & Firestore)
- **Input Validation:** The `POST /api/transactions` endpoint in `server.ts` validates all incoming data (amount, type, category) before processing.
- **Backend Guardrails:** Express server validates all API inputs, returning meaningful error messages and appropriate HTTP status codes.
- **Status Codes:** Uses appropriate HTTP status codes (e.g., `400 Bad Request` for validation errors, `201 Created` for success, `500 Internal Server Error` for unexpected issues).
- **Security Rules:** Firebase `firestore.rules` provide a second layer of protection, enforcing data types, required fields, and role-based access control (RBAC) at the database level.
- **Protection Against Invalid Operations:** Prevents unauthorized users from modifying data they don't own or don't have the role to access.

### Frontend (React)
- **Form Validation:** Uses real-time feedback to prevent users from submitting incomplete or incorrect data.
- **Graceful Error Handling:** Displays user-friendly error messages when API calls or authentication fails.

### 🗄️ Data Persistence

This project uses **Firebase Firestore** as its primary data persistence layer.

- **Type:** NoSQL Document Database.
- **Persistence:** All user transactions, profiles, and settings are stored in Firestore, ensuring data is persisted across sessions and devices.
- **Real-time Updates:** The application uses Firestore's real-time listeners (`onSnapshot`) to provide instant UI updates when data changes.
- **Schema:** The data structure is defined in `firebase-blueprint.json` and secured via `firestore.rules`.

### 🚀 Developer-First Features
- **Swagger API Documentation:** Fully interactive API docs available at `/api-docs` for easy testing and integration.
- **Full-Stack Architecture:** A seamless integration of a React frontend and a Node.js/Express backend.
- **Professional Design:** A polished "Professional Slate" aesthetic built with Tailwind CSS and Lucide icons.

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Lucide React, Motion.
- **Backend:** Node.js, Express, Swagger (swagger-ui-express, swagger-jsdoc).
- **Database & Auth:** Firebase Firestore, Firebase Authentication.
- **Language:** TypeScript.

## 💻 Local Development Setup

To run this project on your local machine, follow these steps:

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### 2. Installation

Clone the repository and install the dependencies:

```bash
git clone <your-github-repo-url>
cd finance-hub
npm install
```

### 3. Firebase Configuration

For local development, you will need your own Firebase project:

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new project and enable **Firestore Database** and **Google Authentication**.
3.  Add a Web App to your project and copy the configuration object.
4.  Update the `firebase-applet-config.json` file in the root directory with your own credentials:

```json
{
  "apiKey": "YOUR_API_KEY",
  "authDomain": "YOUR_AUTH_DOMAIN",
  "projectId": "YOUR_PROJECT_ID",
  "storageBucket": "YOUR_STORAGE_BUCKET",
  "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
  "appId": "YOUR_APP_ID",
  "firestoreDatabaseId": "(default)"
}
```

### 4. Running the Application

Start the development server:

```bash
npm run dev
```

- **Application:** Open [http://localhost:3000](http://localhost:3000) in your browser.
- **API Docs:** Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs) for the Swagger UI.

