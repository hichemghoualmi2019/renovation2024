# Project Title: Renovation Projects Management API

## Table of Contents
1. [Introduction](#introduction)
2. [Project Setup](#project-setup)
3. [Running the Project](#running-the-project)
4. [API Usage](#api-usage)
5. [Running Tests](#running-tests) 

## Introduction

This project is a RESTful API for managing renovation projects, clients, and contractors. It allows developers to create, read, update, and delete projects and associated entities.

### Technologies Used
- **Node.js**
- **Express**
- **TypeScript**
- **Sequelize (ORM)**
- **MySQL**
- **Jest** for unit testing

## Project Setup

### Prerequisites
- **Node.js** and **npm** installed.
- **MySQL** installed and running.

### Installation

1. **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd <repository_folder>
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set up Environment Variables**:

    Create a `.env` file in the root of your project with the following content:

    ```env
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=renovation
    ```

4. **Configure the Database**:

    Ensure that MySQL is running, and create a database:

    ```sql
    CREATE DATABASE renovation;
    ```

## Running the Project


1. **Start the Development Server**:

    Start the server in development mode using `ts-node`:

    ```bash
    npm run dev
    ```

    By default, the server will run on `http://localhost:3000`.

## API Usage

### Base URL
- **`http://localhost:3000`**

### Endpoints

1. **Projects**
   - **GET /projects**: List all projects (with optional filters and pagination).
   - **GET /projects/:id**: Get a project by ID.
   - **POST /projects**: Create a new project.
   - **PUT /projects/:id**: Update an existing project.
   - **DELETE /projects/:id**: Delete a project.

2. **To do later Clients**
   - **GET /clients**: List all clients.
   - **GET /clients/:id**: Get a client by ID.
   - **POST /clients**: Create a new client.

3. **To do later Entrepreneurs**
   - **GET /entrepreneurs**: List all entrepreneurs.
   - **GET /entrepreneurs/:id**: Get an entrepreneur by ID.
   - **POST /entrepreneurs**: Create a new entrepreneur.







