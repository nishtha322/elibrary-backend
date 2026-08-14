# E-Library Management System

A backend system for an E-Library Management System built using Node.js,
Express.js and MySQL.

The system allows users to manage and access a digital book collection
with features such as authentication, book management, protected PDF
downloads, reading support, bookmarks, highlights, wishlist, reviews,
ratings, dashboard analytics and AI-powered book summaries.

------------------------------------------------------------------------

# How to Run

## Prerequisites

Make sure the following are installed:

-   Node.js 18+
-   npm
-   MySQL 8+
-   Git

## 1. Clone Repository

``` bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd backend
```

## 2. Install Dependencies

``` bash
npm install
```

## 3. Database Setup

Create the database:

``` sql
CREATE DATABASE e_library;
```

## 4. Environment Variables

Create a `.env` file inside the backend folder:

``` env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=e_library

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h

AI_API_TOKEN=your_userfacet_ai_token
```

## 5. Run Migration

``` bash
npm run migrate
```

## 6. Add Sample Books

Sample PDFs are included:

    files/
    └── books/
        ├── pride-and-prejudice.pdf
        └── adventures-of-sherlock-holmes.pdf

Book file paths stored in database should be:

    books/pride-and-prejudice.pdf

## 7. Start Server

Development:

``` bash
npm run dev
```

Normal:

``` bash
npm start
```

Server:

    http://localhost:5000

------------------------------------------------------------------------

# Technology Stack

## Backend

-   Node.js - Runtime environment
-   Express.js - REST API framework
-   MySQL - Relational database
-   mysql2 - MySQL driver
-   JWT - Authentication and authorization
-   bcryptjs - Password hashing
-   Axios - External API communication
-   pdf-lib - PDF reading and watermark generation
-   dotenv - Environment configuration
-   CORS - Cross-origin request handling

------------------------------------------------------------------------

# Architecture / Approach

The project follows a layered backend architecture:

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

## Routes Layer

Responsible for:

-   Defining API endpoints
-   Applying authentication middleware
-   Applying role-based authorization

## Controllers Layer

Responsible for:

-   Handling HTTP requests
-   Validating request data
-   Sending responses

Controllers do not directly access the database.

## Services Layer

Contains business logic:

-   Authentication logic
-   Book operations
-   Review handling
-   Wishlist management
-   PDF watermark generation
-   AI summary generation

## Repository Layer

Responsible for:

-   SQL queries
-   Database CRUD operations
-   Communication with MySQL

## Middleware

Used for:

-   JWT authentication
-   Admin authorization
-   Error handling

------------------------------------------------------------------------

# Features

## Authentication

-   User registration and login
-   JWT based authentication
-   bcrypt password hashing
-   Password strength validation
-   User and Admin roles

## Book Management

-   View books
-   Search books
-   View book details
-   Admin can create, update and delete books
-   Admin can manage categories

## Reading Features

-   Authenticated book reading
-   Reading bookmarks
-   Text highlights with notes

## PDF Download

-   Protected PDF download
-   User-specific watermark generation
-   Download history tracking

## Reviews and Ratings

-   Users can rate books
-   Users can submit reviews
-   Users can update and delete their own reviews
-   Average rating calculation

## Wishlist

-   Add books to wishlist
-   Remove books from wishlist
-   View wishlist

## User Dashboard

Dashboard provides:

-   Download statistics
-   Bookmark statistics
-   Highlight statistics
-   Wishlist statistics
-   Recent user activity

## AI Book Summary

The system generates book summaries using an AI API.

The AI receives:

-   Book title
-   Author
-   Book content
-   Available reader reviews

The output contains:

-   Generated book summary
-   Reader opinion summary

------------------------------------------------------------------------

# API Documentation

Base URL:

    http://localhost:5000/api

Protected routes require:

    Authorization: Bearer <JWT_TOKEN>

------------------------------------------------------------------------

## Authentication

  Method   Endpoint         Access
  -------- ---------------- --------
  POST     /auth/register   Public
  POST     /auth/login      Public
  GET      /auth/me         User

Register:

``` json
{
"name":"John Doe",
"email":"john@gmail.com",
"password":"Strong@123"
}
```

Login:

``` json
{
"email":"john@gmail.com",
"password":"Strong@123"
}
```

------------------------------------------------------------------------

## Categories

  Method   Endpoint          Access
  -------- ----------------- --------
  GET      /categories       Public
  POST     /categories       Admin
  DELETE   /categories/:id   Admin

Create Category:

``` json
{
"name":"Programming",
"description":"Programming books"
}
```

------------------------------------------------------------------------

## Books

  Method   Endpoint              Access
  -------- --------------------- --------
  GET      /books                Public
  GET      /books/:id            Public
  GET      /books/search         Public
  GET      /books/:id/read       User
  GET      /books/:id/download   User
  POST     /books                Admin
  PUT      /books/:id            Admin
  DELETE   /books/:id            Admin
  POST     /books/:id/summary    User

Create Book:

``` json
{
"title":"Pride and Prejudice",
"author":"Jane Austen",
"description":"Classic novel",
"categoryId":2,
"content":"Book content",
"filePath":"books/pride-and-prejudice.pdf",
"coverImageUrl":"image-url"
}
```

------------------------------------------------------------------------

## Downloads

  Method   Endpoint     Access
  -------- ------------ --------
  GET      /downloads   User

------------------------------------------------------------------------

## Bookmarks

  Method   Endpoint              Access
  -------- --------------------- --------
  PUT      /books/:id/bookmark   User
  GET      /books/:id/bookmark   User
  DELETE   /books/:id/bookmark   User

Body:

``` json
{
"pageNumber":10
}
```

------------------------------------------------------------------------

## Highlights

  Method   Endpoint                Access
  -------- ----------------------- --------
  POST     /books/:id/highlights   User
  GET      /books/:id/highlights   User
  PUT      /highlights/:id         User
  DELETE   /highlights/:id         User

Body:

``` json
{
"pageNumber":20,
"selectedText":"Important text",
"note":"Important point"
}
```

------------------------------------------------------------------------

## Wishlist

  Method   Endpoint              Access
  -------- --------------------- --------
  POST     /books/:id/wishlist   User
  GET      /wishlist             User
  DELETE   /books/:id/wishlist   User

------------------------------------------------------------------------

## Reviews

  Method   Endpoint             Access
  -------- -------------------- --------
  POST     /books/:id/reviews   User
  GET      /books/:id/reviews   User
  PUT      /reviews/:id         User
  DELETE   /reviews/:id         User

Body:

``` json
{
"rating":5,
"review":"Excellent book."
}
```

------------------------------------------------------------------------

## Dashboard

  Method   Endpoint               Access
  -------- ---------------------- --------
  GET      /dashboard/dashboard   User

------------------------------------------------------------------------

# Database Design

Main tables:

-   users
-   categories
-   books
-   downloads
-   reading_bookmarks
-   highlights
-   wishlists
-   book_reviews

Relationships:

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

## Unused Tables

### book_summaries

This table was created for storing generated AI summaries permanently.
Currently, summaries are generated when requested and returned directly
instead of being stored.

### user_activity

This table was created for general activity tracking. Currently,
dashboard information is calculated from separate tables like downloads,
bookmarks, highlights and wishlists.

These tables are kept for possible future improvements.

------------------------------------------------------------------------

# Assumptions

-   Database migrations are executed before running the server.
-   PDFs are stored locally inside `files/books`.
-   Admin users are created by updating the role in the database for
    testing.
-   AI summary generation requires a valid AI API token.

------------------------------------------------------------------------

# Known Limitations

-   Automated test cases are not included.
-   CORS configuration is suitable for development and assessment usage.
-   PDF watermarking loads the complete PDF into memory.
-   AI summaries depend on external AI service availability.
