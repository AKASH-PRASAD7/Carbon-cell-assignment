# Sample Node.js, Express Typescript Backend Application
https://carbon-cell-assignment-k9u4.onrender.com/api-docs/

## Overview

This project implements a Node.js backend application that fulfills the requirements outlined in the backend developer assessment. The project includes functionalities for user authentication using JSON Web Tokens (JWT), API endpoints for data retrieval from a public API, Swagger documentation for API endpoints, securing API endpoints for authenticated users, and an optional feature to retrieve Ethereum account balance using web3.js.

## Features

1. **User Authentication with JWT:**
   - Endpoints for user registration, login, and logout.
   - JWT authentication for securing sensitive routes.
2. **API Endpoints for Data Retrieval:**

   - API routes to fetch data from the [public API]([https://api.publicapis.org/entrie](https://carbon-cell-assignment-k9u4.onrender.com/api-docs/)s).
   - Filtering options based on categories and result limits.

3. **Swagger Documentation:**

   - Integration of Swagger JS for documenting all API endpoints.
   - Interactive Swagger UI for better usability.

4. **Secure API Endpoint for Authenticated Users Only:**

   - Implementation of middleware to verify JWT authentication for restricted API endpoint.
   - Proper error handling for unauthenticated requests.

5. **Retrieve Ethereum Account Balance (Optional):**
   - Integration of web3.js library to interact with the Ethereum blockchain.
   - API route to retrieve the balance of a specified Ethereum account.
   - Graceful error handling and response formatting.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/AKASH-PRASAD7/Carbon-cell-assignment.git
   ```
2. Install dependencies:
   ```bash
   cd Carbon-cell-assignment
   npm install
   ```
3. Configure environment variables:

   - Create a `.env` file in the root directory.
   - Add environment variables such as database connection string, JWT secret key, Infura API key, etc.

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

- **User Authentication:**

  - POST /api/auth/signup
  - POST /api/auth/signin
  - POST /api/auth/signout

- **Data Retrieval:**

  - GET /api/products
  - Query parameters: category, limit

- **Secure Endpoint for Authenticated Users:**

  - GET /api/products/:category
  - GET /api/products/filter

- **Ethereum Account Balance (Optional):**
  - GET /api/block/:address

## Swagger Documentation

- Swagger documentation is available at `/api-docs` endpoint.
- Access the Swagger UI to interactively explore and test the API endpoints.

## Usage

- Register a user using the `/api/auth/signup` endpoint.
- Login to obtain an authentication token using the `/api/auth/signin` endpoint.
- Use the obtained token to access secured endpoints like `/api/products/:category`.
- Explore data retrieval endpoints like `/api/data` to fetch data from the public API.
- Optionally, retrieve Ethereum account balance using the `/api/block/:address` endpoint.
