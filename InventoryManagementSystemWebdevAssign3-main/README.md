# Inventory Management & Tracking System

A RESTful backend application developed with **Node.js, Express.js, MongoDB, and Mongoose**. This project provides APIs to manage product information, monitor stock levels, handle inventory updates, and generate useful stock reports.

## Key Functionalities

### 1. Product Data Management
- Defines a structured product model with validation rules.
- Automatically converts SKU codes to uppercase and maintains their uniqueness.
- Restricts negative values for product prices and stock quantities.
- Implements a virtual `stockValue` property to calculate the total monetary value of a product's available inventory.

### 2. Product CRUD Operations
- Create and register new products in the database.
- Retrieve the complete product collection or fetch a specific product by ID.
- Modify existing product details.
- Remove products from the inventory when they are no longer required.

### 3. Product Search & Data Filtering
- Find products using their names without case sensitivity.
- Retrieve products belonging to a particular category.
- Arrange product records using sorting options.
- Implement pagination to make browsing large datasets more manageable.

### 4. Stock Updates
- Provides a separate `PATCH` endpoint for inventory adjustments.
- Supports adding newly purchased stock.
- Allows stock deductions when products are sold.
- Includes validation to ensure inventory quantities never become negative.

### 5. Inventory Analytics & Reports
- **Low Inventory Report:** Identifies products that have reached or fallen below their specified reorder quantity.
- **Category Summary:** Generates category-level statistics, including product count, combined stock quantity, total inventory value, and average product price.

### 6. Application Configuration & Error Management
- Implements centralized error-handling middleware for consistent API responses.
- Uses `dotenv` to load configuration values from environment variables.
- Separates application logic into models, routes, and the main server file.

## Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | REST API development |
| MongoDB | Database for storing inventory records |
| Mongoose | Database modelling and schema validation |
| dotenv | Environment configuration management |

## Directory Structure

```text
Inventory-Management-System/
│
├── models/
│   └── Product.js
│
├── routes/
│   └── productRoutes.js
│
├── .env
├── .gitignore
├── package.json
└── server.js
```

## Project Objective

The primary objective of this project is to develop a structured backend system that simplifies product administration and inventory tracking. It demonstrates practical implementation of RESTful APIs, database operations, schema validation, stock control, and data aggregation using the Node.js and MongoDB ecosystem.