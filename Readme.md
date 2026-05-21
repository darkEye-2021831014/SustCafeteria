# SUST Cafeteria Management System

A full-stack web-based cafeteria management system designed for the operational workflow of the SUST cafeteria. The system provides role-based access for staff and managers to manage menu items, inventory, attendance, orders, staff information, and operational reports.

## Live Demo

Website: https://tinyurl.com/sust-cafeteria
Prototype: https://tinyurl.com/sustcafeterianew  
Presentation: https://tinyurl.com/sust-cafeteria-presentation

---

# Features

## Authentication & Authorization

- JWT-based authentication
- Role-based access control (Admin / Staff)
- Protected API routes
- Secure password hashing using bcrypt

## Menu Management

- Add, edit, and delete menu items
- Upload food item images
- Real-time item preview
- Category-based filtering

## Inventory Management

- Track inventory stock levels
- Low stock alerts
- Add and remove inventory items
- Usage tracking and wastage monitoring

## Staff Management

- Register new staff members
- Edit staff roles
- Release/remove staff
- Detailed staff profile view

## Attendance System

- Daily attendance tracking
- Present / Absent / Late status
- Attendance reports by month
- Time-restricted attendance marking

## Reporting Module

- Sales reports
- Inventory reports
- Attendance reports
- Printable reports

## Order Management

- Create customer orders
- Generate printable receipts
- Track order history

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Context API

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt
- Multer
- Swagger UI

## Database & Hosting

- TiDB Cloud (Production MySQL Hosting)
- MariaDB (Docker Local Deployment)
- Vercel (Frontend Hosting)
- Render (Backend Hosting)
- Docker
- Adminer

---

# Live Deployment

| Service      | URL                                             |
| ------------ | ----------------------------------------------- |
| Prototype    | https://tinyurl.com/sustcafeterianew            |
| Presentation | https://tinyurl.com/sust-cafeteria-presentation |
| Frontend     | https://tinyurl.com/sust-cafeteria              |
| Backend      | Hosted on Render                                |
| Database     | Hosted on TiDB Cloud                            |

---

# Project Structure Overview

```txt
SustCafeteria/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── swagger.js
│   ├── server.js
│   └── Dockerfile
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

# Environment Variables

## Backend

Create `Backend/.env`

```env
PORT=8000

DB_HOST=db
DB_PORT=3306
DB_USER=user
DB_PASSWORD=pass
DB_NAME=sust_cafeteria

JWT_SECRET=secret_key

HOST_URL=http://localhost:8000
CLIENT_URL=http://localhost:5173
```

## Frontend

Create `Frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_IMAGE_UPLOAD_URL=https://api.cloudinary.com/v1_1/dyufllkvw/image/upload
```

---

# Docker Deployment

## Run with Docker Compose

```bash
docker compose up -d
```

---

# Production Docker Compose

```yaml
services:
  db:
    image: mariadb:11
    container_name: mysql_db
    restart: unless-stopped

    environment:
      MARIADB_ROOT_PASSWORD: root
      MARIADB_DATABASE: sust_cafeteria
      MARIADB_USER: user
      MARIADB_PASSWORD: pass

    ports:
      - "3306:3306"

    volumes:
      - mysql_data:/var/lib/mysql

    healthcheck:
      test: ["CMD", "mariadb-admin", "ping", "-h", "localhost", "-proot"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    image: voideye/sustcafe-backend
    container_name: backend
    restart: unless-stopped

    ports:
      - "8000:8000"

    environment:
      PORT: 8000
      DB_HOST: db
      DB_PORT: 3306
      DB_USER: user
      DB_PASSWORD: pass
      DB_NAME: sust_cafeteria
      JWT_SECRET: secret_key
      HOST_URL: http://localhost:8000
      CLIENT_URL: http://localhost:5173

    depends_on:
      db:
        condition: service_healthy

  frontend:
    image: voideye/sustcafe-frontend
    container_name: frontend
    restart: unless-stopped

    ports:
      - "5173:3000"

    environment:
      VITE_API_BASE_URL: http://localhost:8000
      VITE_IMAGE_UPLOAD_URL: https://api.cloudinary.com/v1_1/dyufllkvw/image/upload

    depends_on:
      - backend

  phpmyadmin:
    image: phpmyadmin:latest
    container_name: phpmyadmin
    restart: unless-stopped

    ports:
      - "8080:80"

    environment:
      PMA_HOST: db
      PMA_PORT: 3306

    depends_on:
      - db

volumes:
  mysql_data:
```

---

# Docker Images

| Image    | Docker Hub                  |
| -------- | --------------------------- |
| Backend  | `voideye/sustcafe-backend`  |
| Frontend | `voideye/sustcafe-frontend` |

---

# Local Development Setup

## Clone Repository

```bash
git clone https://github.com/darkEye-2021831014/SustCafeteria
cd SustCafeteria
```

---

## Install Dependencies

### Backend

```bash
cd Backend
npm install
```

### Frontend

```bash
cd Frontend
npm install
```

---

# Run Development Servers

## Backend

```bash
npm run dev
```

## Frontend

```bash
npm run dev
```

---

# API Documentation

Swagger API documentation is integrated into the backend server.

Example route:

```txt
http://localhost:8000/api-docs
```

---

# Database Management

Adminer is included in the Docker deployment.

Access:

```txt
http://localhost:8080
```

Login Credentials:

```txt
Server: db
Username: user
Password: pass
```

---

# Security Features

- JWT Authentication
- Password hashing using bcrypt
- Protected routes
- Role-based authorization
- Environment variable configuration

---

# Testing

The application was tested using:

- Swagger UI
- Postman
- Manual feature testing
- Cross-browser testing

Browsers tested:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge

---

# Future Improvements

- Payment gateway integration
- Mobile application support
- Real-time notifications
- Advanced analytics dashboards
- Customer-facing ordering portal
- Graph-based reports and visualizations

---

# Authors

Developed as a full-stack web application project for SUST cafeteria management digitization.

---

# License

This project is intended for educational and academic purposes.
