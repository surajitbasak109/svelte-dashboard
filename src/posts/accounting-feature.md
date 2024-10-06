---
title: Building accounting feature
description: Building accounting feature
date: '2024-10-05'
image: /accounting-feature.jpg
categories:
  - Sveltekit
  - Svelte
author: Surajit Basak
published: true
---

![Accounting feature](/accounting-feature.jpg)

## Table of Contents
To build an accounting feature, a well-designed database is crucial. Here's a basic database structure to get you started, focusing on key accounting entities such as accounts, transactions, and categories. The structure is designed to handle general accounting tasks such as recording transactions, managing accounts, and generating reports.

### Database Structure

1. **Accounts Table**
   Stores the information related to different accounts such as cash, bank, assets, liabilities, etc.

   ```sql
   CREATE TABLE accounts (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     type VARCHAR(50) NOT NULL, -- Cash, Bank, Liability, Asset, etc.
     balance DECIMAL(15, 2) DEFAULT 0,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

   - `name`: The name of the account (e.g., "Bank Account", "Cash").
   - `type`: Specifies the type of account, which can be `Cash`, `Bank`, `Liability`, `Asset`, etc.
   - `balance`: The current balance of the account.

2. **Categories Table**
   Stores different income and expense categories.

   ```sql
   CREATE TABLE categories (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     type VARCHAR(10) NOT NULL -- Income or Expense
   );
   ```

   - `name`: Name of the category (e.g., "Salary", "Rent").
   - `type`: Defines if it’s an `Income` or `Expense` category.

3. **Transactions Table**
   Records financial transactions (income, expense, transfers).

   ```sql
   CREATE TABLE transactions (
     id SERIAL PRIMARY KEY,
     account_id INTEGER REFERENCES accounts(id),
     category_id INTEGER REFERENCES categories(id),
     amount DECIMAL(15, 2) NOT NULL,
     transaction_type VARCHAR(10) NOT NULL, -- Income or Expense
     description TEXT,
     date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

   - `account_id`: Refers to the account involved in the transaction.
   - `category_id`: Links to the category of the transaction (e.g., salary, rent).
   - `amount`: The monetary value of the transaction.
   - `transaction_type`: Indicates if the transaction is `Income` or `Expense`.
   - `description`: An optional description of the transaction.

4. **Users Table (optional)**
   If your application requires multiple users (e.g., for a business or shared accounting), you’ll need a table to manage users.

   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     username VARCHAR(50) NOT NULL UNIQUE,
     password_hash VARCHAR(255) NOT NULL,
     email VARCHAR(100) UNIQUE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

   - `username`: Unique username for each user.
   - `password_hash`: Hashed password for authentication.
   - `email`: User’s email address.

5. **User Accounts Table (optional for multi-user)**
   If you want to allow users to have multiple accounts (such as different businesses or personal accounts), you can create a join table.

   ```sql
   CREATE TABLE user_accounts (
     id SERIAL PRIMARY KEY,
     user_id INTEGER REFERENCES users(id),
     account_id INTEGER REFERENCES accounts(id),
     role VARCHAR(20) -- Owner, Viewer, etc.
   );
   ```

   - `user_id`: References the user who owns or has access to the account.
   - `account_id`: Links to the account.
   - `role`: Defines the user’s permission for the account (e.g., `Owner`, `Viewer`).

### Relationships
- **Accounts** and **Transactions**: A one-to-many relationship since an account can have multiple transactions.
- **Categories** and **Transactions**: Another one-to-many relationship since a category can be linked to multiple transactions.
- **Users** (optional) and **Accounts**: A many-to-many relationship if users can own or access multiple accounts, with roles specifying their permissions.

### Sample Queries

1. **Insert a new transaction**
   ```sql
   INSERT INTO transactions (account_id, category_id, amount, transaction_type, description)
   VALUES (1, 2, 500.00, 'Income', 'Monthly Salary');
   ```

2. **Get all transactions for an account**
   ```sql
   SELECT * FROM transactions WHERE account_id = 1 ORDER BY date DESC;
   ```

3. **Update the balance of an account after a transaction**
   ```sql
   UPDATE accounts SET balance = balance + 500 WHERE id = 1;
   ```

4. **Generate a profit/loss report**
   ```sql
   SELECT SUM(amount) as total_income 
   FROM transactions 
   WHERE transaction_type = 'Income' AND date >= '2024-01-01' AND date <= '2024-12-31';

   SELECT SUM(amount) as total_expense 
   FROM transactions 
   WHERE transaction_type = 'Expense' AND date >= '2024-01-01' AND date <= '2024-12-31';
   ```

### Additional Features
You can expand the database structure to include:
- **Audit Logs**: Track all changes for compliance.
- **Tax Management**: Automatically calculate and store tax data.
- **Recurring Transactions**: Store recurring payments, such as monthly bills.

Let me know if you’d like help with any specific aspect of this structure or other features you'd want to add!
