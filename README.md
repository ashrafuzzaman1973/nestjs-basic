<div align="center">

<img src="https://nestjs.com/img/logo-small.svg" width="120"/>

# NestJS Basic API

### 🚀 A Production-Ready REST API built with NestJS, TypeScript & PostgreSQL

[![NestJS](https://img.shields.io/badge/NestJS-v11-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![NodeJS](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A beginner-friendly yet production-ready REST API demonstrating modern backend development using **NestJS**, **TypeScript**, **JWT Authentication**, **PostgreSQL**, and **TypeORM**.

</div>

---

# 📖 Overview

This project demonstrates how to build a scalable backend using NestJS best practices.

It includes:

- JWT Authentication
- User Management
- Profile Management
- Tweet CRUD APIs
- Hashtag Module
- PostgreSQL Database
- TypeORM Relationships
- DTO Validation
- Exception Handling
- Authentication Guards
- Complete Postman Collection

---

# ✨ Features

## Authentication

- User Signup
- User Login
- JWT Authentication
- Protected Routes
- Password Hashing (bcrypt)

---

## User Module

- Create User
- Get All Users
- Get User By ID
- Delete User

---

## Profile Module

- Create Profile
- Get Profiles

---

## Tweet Module

- Create Tweet
- Get All Tweets
- Update Tweet
- Delete Tweet

---

## Hashtag Module

- Create Hashtag
- Delete Hashtag
- Soft Delete Hashtag

---

## Validation

- DTO Validation
- class-validator
- class-transformer
- Global Validation Pipe

---

## Database

- PostgreSQL
- TypeORM
- Entity Relationships
- Soft Deletes
- Timestamp Columns

---

# 🛠 Tech Stack

| Technology | Version |
|------------|----------|
| NestJS | Latest |
| TypeScript | Latest |
| Node.js | 18+ |
| PostgreSQL | Latest |
| TypeORM | Latest |
| Passport JWT | Latest |
| JWT | Latest |
| class-validator | Latest |
| bcrypt | Latest |
| Postman | Latest |

---

# 📂 Project Structure

```
src
│
├── auth
│   ├── controllers
│   ├── dto
│   ├── guards
│   ├── strategies
│   └── services
│
├── user
│
├── profile
│
├── tweet
│
├── hashtag
│
├── common
│
├── database
│
└── main.ts
```

---

# 🔐 Authentication

This project uses **JWT Authentication**.

### Register

```
POST /auth/signup
```

### Login

```
POST /auth/login
```

After login you'll receive:

```json
{
    "access_token":"YOUR_JWT_TOKEN"
}
```

Use the token:

```
Authorization

Bearer YOUR_JWT_TOKEN
```

---

# 📬 API Endpoints

## Auth

| Method | Endpoint |
|---------|----------|
| POST | /auth/signup |
| POST | /auth/login |

---

## User

| Method | Endpoint |
|---------|----------|
| GET | /user |
| GET | /user/:id |
| POST | /user |
| DELETE | /user/:id |

---

## Profile

| Method | Endpoint |
|---------|----------|
| GET | /profile |

---

## Tweet

| Method | Endpoint |
|---------|----------|
| POST | /tweet |
| GET | /tweet |
| PATCH | /tweet/:id |
| DELETE | /tweet/:id |

---

## Hashtag

| Method | Endpoint |
|---------|----------|
| POST | /hashtag |
| DELETE | /hashtag/:id |
| DELETE | /hashtag/soft-delete/:id |

---

# 📮 Postman Collection

The repository includes a complete Postman collection.

Features tested:

- Signup
- Login
- JWT Authentication
- User APIs
- Profile APIs
- Tweet APIs
- Hashtag APIs

Simply import the collection and start testing.

---

# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/ashrafuzzaman1973/nestjs-basic.git
```

Go inside the project

```bash
cd nestjs-basic
```

Install packages

```bash
npm install
```

---

# ▶ Running the Application

Development

```bash
npm run start:dev
```

Production

```bash
npm run start:prod
```

Watch Mode

```bash
npm run start
```

---

# 🗄 Environment Variables

Create a `.env` file.

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=nestjs_basic

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

---

# 📸 Screenshots

## Postman

- JWT Authentication
- CRUD APIs
- Protected Routes
- Validation

(Add your Postman screenshots here)

---

# 🚀 Future Improvements

- Refresh Token
- Swagger Documentation
- File Upload
- Role Based Authorization
- Email Verification
- Docker Support
- CI/CD Pipeline
- Unit Testing
- E2E Testing
- Redis Caching

---

# 🎯 Learning Outcomes

This project demonstrates:

- NestJS Fundamentals
- Modular Architecture
- REST API Design
- JWT Authentication
- Guards
- DTO Validation
- TypeORM Relations
- Dependency Injection
- Exception Filters
- PostgreSQL Integration

---

# 🙏 Acknowledgements

Special thanks to **Procademy** for their outstanding **A Complete Nest JS Course** playlist.

📺 https://www.youtube.com/@procademy

The course helped me build a strong understanding of:

- NestJS
- Authentication
- TypeORM
- PostgreSQL
- JWT
- Best Practices
- Project Structure

Highly recommended for anyone starting with NestJS.

---

# 👨‍💻 Author

**Ashrafuzzaman**

GitHub

https://github.com/ashrafuzzaman1973

LinkedIn

(Add your LinkedIn Profile)

---

# ⭐ Support

If you found this project helpful,

⭐ Star this repository

🍴 Fork it

📢 Share it with others

---

# 📄 License

This project is licensed under the MIT License.
