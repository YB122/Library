# Library Management System - Backend

A RESTful API backend for a library management system built with Node.js, Express, and MongoDB. It supports user authentication, book management, and borrow/return transactions with role-based access control.

---

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens) + bcrypt
- **Validation**: Joi
- **Deployment**: Vercel-ready configuration

---

## Project Structure

```
├── config/
│   └── env.service.js          # Environment variables loader
├── src/
│   ├── main.js                 # Entry point (Vercel export)
│   ├── app.controller.js       # Express app setup & routing
│   ├── common/
│   │   ├── middleware/         # Auth & validation middleware
│   │   └── utils/              # Helper utilities
│   ├── database/
│   │   ├── connection.js       # MongoDB connection
│   │   └── model/              # Mongoose models
│   │       ├── book.model.js
│   │       ├── transaction.model.js
│   │       └── user.model.js
│   └── module/
│       ├── books/              # Book CRUD & ban/unban
│       ├── transactions/       # Borrow & return logic
│       └── users/              # Auth, register, ban/unban
├── API_ENDPOINTS.md            # Full API documentation
├── vercel.json                 # Vercel deployment config
└── package.json
```

---

## Features

- **User Authentication**: Register/Login with JWT tokens
- **Role-Based Access Control**: Admin vs Member signatures
- **Book Management**: Create, edit, search, delete, ban/unban books
- **Transaction System**: Borrow and return books with availability tracking
- **User Management**: Ban/unban users (Admin only)
- **CORS Enabled**: Configured for cross-origin requests

---

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB instance (local or cloud e.g. MongoDB Atlas)

### Installation

```bash
# Install dependencies
npm install
```

### Environment Variables

Create `config/.env` file with the following variables:

```env
PORT=3000
HASH=10
BASE_URL=http://localhost:3000
SIGNATURE_ADMIN=your_admin_secret
SIGNATURE_MEMBER=your_member_secret
ACCESS_TOKEN=your_access_token_secret
DATA_BASE_URL_MY=mongodb+srv://... or mongodb://localhost:27017/library
VERIFY_SIGNATURE_MY=your_verify_secret
```

### Running the App

```bash
# Development (with auto-reload on Node.js --watch)
npm run dev

# Production
npm start
```

The server will start at `http://localhost:3000`.

---

## API Overview

| Module | Base Path | Key Endpoints |
|--------|-----------|---------------|
| Users | `/api/users` | register, login, get users, ban/unban |
| Books | `/api/books` | CRUD, search, ban/unban |
| Transactions | `/api/transactions` | borrow, return, get user/admin transactions |

See [`API_ENDPOINTS.md`](API_ENDPOINTS.md) for complete request/response examples.

---

## Deployment

The project includes a `vercel.json` configuration for seamless deployment on [Vercel](https://vercel.com). The `src/main.js` file exports the Express app as the serverless function entry point.

---

## Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `node ./src/main.js` | Run production server |
| `dev` | `node --watch ./src/main.js` | Run development server with watch mode |
