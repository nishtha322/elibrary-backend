# E-Library Management System

A backend system for an E-Library Management System built using Node.js, Express.js and MySQL.

The system allows users to access and manage a digital book collection with authentication, book management, protected PDF downloads, reading support, bookmarks, highlights, wishlist, reviews, ratings, user dashboard and AI-powered book summaries.

---

# How to Run

## Prerequisites

- Node.js 18+
- npm
- MySQL 8+
- Git

## 1. Clone Repository

```bash
git clone https://github.com/nishtha322/elibrary-backend.git
cd elibrary-backend
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Database Setup

Create the database:

```sql
CREATE DATABASE e_library;
```

## 4. Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=e_library

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h

AI_API_TOKEN=sk-0d2e211d182a431b837f73f986fb0e78
```



## 5. Run Migration

```bash
npm run migrate
```

## 6. Sample Books

Sample PDFs are included in:

```text
files/
└── books/
    ├── pride-and-prejudice.pdf
    └── adventures-of-sherlock-holmes.pdf
```

The corresponding file path stored for a book should be:

```text
books/pride-and-prejudice.pdf
```

## 7. Start the Server

Development:

```bash
npm run dev
```

Normal:

```bash
npm start
```

Server:

```text
http://localhost:5000
```

---

# Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - REST API framework
- **MySQL** - Relational database
- **mysql2** - MySQL driver
- **JWT** - Authentication and authorization
- **bcryptjs** - Password hashing
- **Axios** - External AI API communication
- **pdf-lib** - PDF processing and watermark generation
- **dotenv** - Environment configuration
- **CORS** - Cross-origin request handling

---

# Architecture / Approach

The project follows a layered backend architecture:

```text
Client
  |
Routes
  |
Controllers
  |
Services
  |
Repositories
  |
MySQL Database
```

## Routes Layer

- Defines API endpoints
- Applies authentication middleware
- Applies role-based authorization

## Controllers Layer

- Handles HTTP requests
- Validates request data
- Calls the appropriate service
- Sends HTTP responses

Controllers do not directly access the database.

## Services Layer

Contains the main business logic, including:

- Authentication
- Book operations
- Category validation
- Reviews and ratings
- Wishlist management
- Bookmarks and highlights
- PDF watermark generation
- AI summary generation

## Repository Layer

Responsible for database communication:

- SQL queries
- CRUD operations
- Reading and writing data in MySQL

## Middleware

Used for:

- JWT authentication
- Admin authorization
- Global error handling
- JSON/request error handling

---

# Implemented Features

## Authentication

- User registration and login
- JWT-based authentication
- bcrypt password hashing
- Password validation
- User and Admin roles
- Protected user APIs

## Admin Features

Admins can:

- Create books
- Update books
- Delete books
- Create categories
- Delete categories

### Creating an Admin User for Testing

Register a normal user first using the registration API.

Then open MySQL and change that user's role to `admin`:

```sql
USE e_library;

UPDATE users
SET role = 'admin'
WHERE email = 'test@gmail.com';
```

Verify the role:

```sql
SELECT id, name, email, role
FROM users
WHERE email = 'test@gmail.com';
```

The user's role should now be:

```text
admin
```

Login again after changing the role and use the newly generated JWT token when testing admin-only APIs.

Admin authorization is enforced through middleware.

## Book Management

- View all books
- View a single book
- Search books
- Admin book creation
- Admin book update
- Admin book deletion
- Category management

## Reading Features

- Authenticated book reading
- Reading bookmarks
- Text highlights with notes

## PDF Downloads

- Protected PDF downloads
- User-specific PDF watermarking
- Download history

## Reviews and Ratings

- Users can rate books
- Users can submit reviews
- Users can update their own reviews
- Users can delete their own reviews
- Average rating statistics

## Wishlist

- Add books to wishlist
- Remove books from wishlist
- View wishlist

## User Dashboard

The dashboard provides:

- Download statistics
- Bookmark statistics
- Highlight statistics
- Wishlist statistics
- Recent user activity

## AI Book Summary

The system can generate a book summary using an external AI API.

The AI request can use:

- Book title
- Author
- Book content
- Available reader reviews

The response contains:

- Generated book summary
- Reader opinion summary

---

# API Documentation

Base URL:

```text
http://localhost:5000/api
```

Protected APIs require:

```text
Authorization: Bearer <JWT_TOKEN>
```

## Authentication

| Method | Endpoint | Access |
|---|---|---|
| POST | `/auth/register` | Public |
| POST | `/auth/login` | Public |
| GET | `/auth/me` | User |

### Register

```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "Strong@123"
}
```

### Login

```json
{
  "email": "john@gmail.com",
  "password": "Strong@123"
}
```

## Categories

| Method | Endpoint | Access |
|---|---|---|
| GET | `/categories` | Public |
| POST | `/categories` | Admin |
| DELETE | `/categories/:id` | Admin |

### Create Category

```json
{
  "name": "Programming",
  "description": "Programming books"
}
```

## Books

| Method | Endpoint | Access |
|---|---|---|
| GET | `/books` | Public |
| GET | `/books/:id` | Public |
| GET | `/books/search` | Public |
| GET | `/books/:id/read` | User |
| GET | `/books/:id/download` | User |
| POST | `/books` | Admin |
| PUT | `/books/:id` | Admin |
| DELETE | `/books/:id` | Admin |
| POST | `/books/:id/summary` | User |

### Create Book

```json
{
  "title": "Pride and Prejudice",
  "author": "Jane Austen",
  "description": "Classic novel",
  "categoryId": 2,
  "content": "Book content",
  "filePath": "books/pride-and-prejudice.pdf",
  "coverImageUrl": "image-url"
}
```

## Downloads

| Method | Endpoint | Access |
|---|---|---|
| GET | `/downloads` | User |

## Bookmarks

| Method | Endpoint | Access |
|---|---|---|
| PUT | `/books/:id/bookmark` | User |
| GET | `/books/:id/bookmark` | User |
| DELETE | `/books/:id/bookmark` | User |

### Body

```json
{
  "pageNumber": 10
}
```

## Highlights

| Method | Endpoint | Access |
|---|---|---|
| POST | `/books/:id/highlights` | User |
| GET | `/books/:id/highlights` | User |
| PUT | `/highlights/:id` | User |
| DELETE | `/highlights/:id` | User |

### Body

```json
{
  "pageNumber": 20,
  "selectedText": "Important text",
  "note": "Important point"
}
```

## Wishlist

| Method | Endpoint | Access |
|---|---|---|
| POST | `/books/:id/wishlist` | User |
| GET | `/wishlist` | User |
| DELETE | `/books/:id/wishlist` | User |

## Reviews

| Method | Endpoint | Access |
|---|---|---|
| POST | `/books/:id/reviews` | User |
| GET | `/books/:id/reviews` | User |
| PUT | `/reviews/:id` | User |
| DELETE | `/reviews/:id` | User |

### Body

```json
{
  "rating": 5,
  "review": "Excellent book."
}
```

## Dashboard

| Method | Endpoint | Access |
|---|---|---|
| GET | `/dashboard/dashboard` | User |

---

# Database Design

Main tables:

- `users`
- `categories`
- `books`
- `downloads`
- `reading_bookmarks`
- `highlights`
- `wishlists`
- `book_reviews`

Basic relationships:

```text
users
 |
 +-- downloads
 +-- bookmarks
 +-- highlights
 +-- wishlists
 +-- reviews

categories
 |
 +-- books
```

## Unused Tables

### `book_summaries`

This table was created for storing generated AI summaries permanently.

Currently, summaries are generated when requested and returned directly instead of being stored.

### `user_activity`

This table was created for general activity tracking.

Currently, dashboard information is calculated from separate tables such as downloads, bookmarks, highlights and wishlists.

These tables are kept for possible future improvements.

---

# Assumptions

- Database migrations are executed before running the server.
- PDFs are stored locally inside `files/books`.
- For assessment/testing, a normal user can be promoted to admin by changing the `role` field from `user` to `admin` in the `users` table.
- Admin authorization is enforced through middleware.
- AI summary generation requires a valid AI API token.
- The sample PDFs included in the repository are used for testing download and watermark functionality.

---

# Known Limitations

- Automated test cases are not included.
- CORS configuration is suitable for development and assessment usage.
- PDF watermarking loads the complete PDF into memory.
- AI summaries depend on external AI service availability.
