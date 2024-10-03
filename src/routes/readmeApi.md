# Project API Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Endpoints](#endpoints)
   - [List All Projects](#list-all-projects)
   - [Get a Project by ID](#get-a-project-by-id)
   - [Create a New Project](#create-a-new-project)
   - [Update an Existing Project](#update-an-existing-project)
   - [Delete a Project](#delete-a-project)

## Introduction
This document provides detailed information on how to use the RESTful API endpoints for managing renovation projects. The API supports CRUD operations on projects, including clients and entrepreneurs linked to each project.

## Endpoints

### List All Projects
**Endpoint**: `GET /projets`  
**Description**: Lists all projects, with options for filtering, sorting, and pagination.

**Query Parameters** (optional):
- `nom`: Filter by project name.
- `startDate`: Filter projects that start on or after this date.
- `endDate`: Filter projects that end on or before this date.
- `sortBy`: Field to sort by (e.g., `date_debut`).
- `page`: Page number for pagination.

**Examples**:
1. **Sort by Start Date**:
GET http://localhost:3000/projets?sortBy=date_debut
Sorts projects by their start date in ascending order.

2. **Filter Between Two Dates**:
GET http://localhost:3000/projets?startDate=2024-01-01&endDate=2024-06-30
Filters projects with a start date between **2024-01-01** and **2024-06-30**.

3. **Pagination**:
GET http://localhost:3000/projets?page=1
Retrieves projects for **page 1**.

### Get a Project by ID
**Endpoint**: `GET /projets/:id`  
**Description**: Fetches a project by its ID, including related client and entrepreneur information.

**Example**:

Here's a more organized and readable version of the README.md file:

markdown
Copy code
# Project API Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Endpoints](#endpoints)
   - [List All Projects](#list-all-projects)
   - [Get a Project by ID](#get-a-project-by-id)
   - [Create a New Project](#create-a-new-project)
   - [Update an Existing Project](#update-an-existing-project)
   - [Delete a Project](#delete-a-project)


## Introduction
This document provides detailed information on how to use the RESTful API endpoints for managing renovation projects. The API supports CRUD operations on projects, including clients and entrepreneurs linked to each project.

## Endpoints

### List All Projects
**Endpoint**: `GET /projets`  
**Description**: Lists all projects, with options for filtering, sorting, and pagination.

**Query Parameters** (optional):
- `nom`: Filter by project name.
- `startDate`: Filter projects that start on or after this date.
- `endDate`: Filter projects that end on or before this date.
- `sortBy`: Field to sort by (e.g., `date_debut`).
- `page`: Page number for pagination.

**Examples**:
1. **Sort by Start Date**:
GET http://localhost:3000/projets?sortBy=date_debut

sql
Copy code
Sorts projects by their start date in ascending order.

2. **Filter Between Two Dates**:
GET http://localhost:3000/projets?startDate=2024-01-01&endDate=2024-06-30

markdown
Copy code
Filters projects with a start date between **2024-01-01** and **2024-06-30**.

3. **Pagination**:
GET http://localhost:3000/projets?page=1
Retrieves projects for **page 1**.

### Get a Project by ID
**Endpoint**: `GET /projets/:id`  
**Description**: Fetches a project by its ID, including related client and entrepreneur information.
**Example**:
GET http://localhost:3000/projets/1
Fetches the project with ID **1**.

### Create a New Project
**Endpoint**: `POST /projets`  
**Description**: Creates a new project. Requires `nom`, `description`, `date_debut`, `date_fin_prevue`, `budget`, `client_id`, and `entrepreneur_id`.
**Example**:
POST http://localhost:3000/projets
**Request Body** (JSON):
json
{
  "nom": "New Renovation Project",
  "description": "This project is for renovating a home completely.",
  "date_debut": "2024-07-01",
  "date_fin_prevue": "2024-12-01",
  "budget": 180000,
  "client_id": 1,
  "entrepreneur_id": 2
}
client_id and entrepreneur_id must be valid and existing IDs.

### Update an Existing Project
**Endpoint**: PUT /projets/:id
**Description**: Updates an existing project by its ID. Accepts any field to update.
**Example**:
PUT http://localhost:3000/projets/1
Request Body (JSON):
json
{
  "nom": "Updated Renovation Project",
  "description": "Updated full home renovation description",
  "date_debut": "2024-02-01",
  "date_fin_prevue": "2024-07-01",
  "budget": 200000,
  "client_id": 1,
  "entrepreneur_id": 1
}
client_id and entrepreneur_id must be valid and existing IDs.
The ID (in URL) must refer to an existing project.

### Delete a Project
**Endpoint**: DELETE /projets/:id
**Description**: Deletes a project by its ID.
**Example**:
DELETE http://localhost:3000/projets/1
Deletes the project with ID 1.
