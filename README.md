# Product Browser API

A full-stack product browsing application built for the CodeVector Internship Take-Home Assignment.

## Features

* Browse 200,000 products
* Category-based filtering
* Cursor-based pagination
* Stable pagination during data updates
* React frontend
* Node.js + Express backend
* MongoDB database

## Tech Stack

### Frontend

* React
* Vite
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

## Why Cursor Pagination?

Traditional OFFSET/LIMIT pagination can become slow on large datasets and may produce duplicate or missing records when new products are inserted.

This project uses cursor-based pagination with `(createdAt, _id)` ordering to ensure:

* Consistent results
* No duplicate products
* No skipped products
* Better performance on large datasets

## Database Schema

Product:

* name
* category
* price
* createdAt
* updatedAt

## Indexes Used

* `{ createdAt: -1, _id: -1 }`
* `{ category: 1, createdAt: -1, _id: -1 }`

These indexes improve sorting and filtering performance.

## API Endpoints

### Health Check

GET /

Response:

{
"status": "ok",
"message": "Product Browser API"
}

### Get Products

GET /api/products

Query Parameters:

* limit
* category
* cursor

Examples:

GET /api/products

GET /api/products?category=Books

GET /api/products?cursor=<cursor>

## Running Locally

### Backend

cd backend

npm install

npm run dev

### Frontend

cd frontend

npm install

npm run dev

## Seed Database

node scripts/seed.js

This generates 200,000 sample products.

## Future Improvements

* Infinite scrolling
* Product search
* Redis caching
* Docker support
* Automated testing

## AI Usage

AI tools were used to assist with project structure, React components, backend boilerplate, and pagination implementation. All generated code was reviewed, tested, and modified manually.
