# Product Review System

A full-stack product review application built with NestJS (backend) and Next.js (frontend).

## Prerequisites

- Node.js (v20 or higher)
- npm (for backend)
- pnpm (for frontend)
- MongoDB database

## Getting Started

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory
   - Add your MongoDB connection string:

```
DATABASE_URL="your-mongodb-connection-string"
```

4. Generate Prisma client:

```bash
npx prisma generate
```

5. Start the development server:

````bash
npm run start:dev
```# Running Both Servers

Open two terminal windows:

**Terminal 1 (Backend):**

```bash
cd backend
npm run start:dev
````

**Terminal 2 (Frontend):**

```bash
cd frontend
pnpm dev
```

The backend server will start on `http://localhost:3001`.

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

The frontend application will start on `http://localhost:3000`

User Credentials For Login

Admin Login
email : john@gmail.com
password: password123

Associate Login
email: fahim@gmail.com
password: password123
