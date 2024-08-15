# 📦 Inventory Management API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

## Description

The **Inventory Management API** is an API developed to manage product inventory. It allows you to create, read, update, and delete (CRUD) categories, products, users, suppliers and transactions. This project is being developed with Node.js, Express.js, and MySQL.

## Features

- **Categories**
  - Add a new category
  - List all categories
  - Update an existing category
  - Delete a category

- **Products**
  - Add a new product
  - List all products
  - Update an existing product
  - Delete a product

- **Users**
  - Add a new user
  - List all users
  - Update an existing user
  - Delete a user

- **Suppliers**
  - Add a new supplier
  - List all suppliers
  - Update an existing supplier
  - Delete a supplier
  
- **transactions**
  - Add a new transaction
  - List all transaction
  - Delete a transaction

## Endpoints

See Endpoint "/docs" for more.


## Installation

1. **Clone the repository**:
   ```shell
   git clone https://github.com/your-username/inventory-api.git
   cd inventory-api
   ```
2. **Install the dependencies**:
    ```shell
    npm install  
    ```
3. **Configure environment variables**: 
- Create a .env file in the root of the project and add your database settings:
 ```env
 DB_HOST=localhost
 DB_USER=root
 DB_PASSWORD=your-password
 DB_NAME=inventory
```

4. **Start application**:
  ```shell
  npm run dev
  ```
## Setting up the Database


1. **Install MySQL:**
   - Download and install MySQL from the official [MySQL website](https://dev.mysql.com/downloads/).

2. **Start MySQL Server:**
   - Ensure that the MySQL server is running. You can start the server using the command line or MySQL Workbench.

3. **Create Database:**
   - Create a database for the project:
     ```shell
     mysql -u root -p
     CREATE DATABASE inventory;
     ```
4. **Create Tables**:
- Run the following SQL queries to create the necessary tables:
  ```SQL
   CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );

  CREATE TABLE suppliers (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_name VARCHAR(255) NOT NULL,
    supplier_contact VARCHAR(255),
    supplier_email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );

  CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    product_price DECIMAL(10, 2) NOT NULL,
    product_quantity INT NOT NULL,
    category_id INT,
    supplier_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
  );

  CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_role ENUM('admin', 'manager', 'staff') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );  
  
  CREATE TABLE stock_transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    user_id INT,
    transaction_quantity INT NOT NULL,
    transaction_type ENUM('in', 'out') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
  ); 
  ```
4. **Update environment variables**:
- Ensure your '.env' file contains the correct database credentials.


## License
- This project is licensed under the MIT License - see the LICENSE file for details.

## Contact 
- Author: Lira
- E-mail: lyradev@proton.me
