# Project API Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Endpoints](#endpoints)
   - [List All Projects](#list-all-projects)
   - [Get a Project by ID](#get-a-project-by-id)
   - [Create a New Project](#create-a-new-project)
   - [Update an Existing Project](#update-an-existing-project)
   - [Delete a Project](#delete-a-project)
3. [Example Requests Using Postman](#example-requests-using-postman)
   - [List Projects with Filters](#list-projects-with-filters)
   - [List Projects with Pagination](#list-projects-with-pagination)


## Introduction
This document provides detailed information on how to use the RESTful API endpoints for managing renovation projects. The API supports CRUD operations on projects, including clients and entrepreneurs linked to each project.

## Endpoints

### List All Projects
**Endpoint**: `GET /projets`  
**Description**: Lists all projects, with options for filtering by `nom`, `startDate`, and `endDate`, sorting, and pagination.

**Query Parameters** (optional):
- `nom`: Filter by project name.
- `startDate`: Filter projects that start on or after this date.
- `endDate`: Filter projects that end on or before this date.
- `sortBy`: Field to sort by (e.g., `date_debut`).
- `page`: Page number for pagination.

### Get a Project by ID
**Endpoint**: `GET /projets/:id`  
**Description**: Fetches a project by its ID, including client and entrepreneur information.

### Create a New Project
**Endpoint**: `POST /projets`  
**Description**: Creates a new project. Requires `nom`, `description`, `date_debut`, `date_fin_prevue`, `budget`, `client_id`, and `entrepreneur_id`.

### Update an Existing Project
**Endpoint**: `PUT /projets/:id`  
**Description**: Updates an existing project by its ID. Accepts any field to update.

### Delete a Project
**Endpoint**: `DELETE /projets/:id`  
**Description**: Deletes a project by its ID.

## Example Requests Using Postman

### List Projects with Filters
**Method**: `GET`  
**URL**: `http://localhost:3000/projets`  
**Query Parameters**:
- **nom**: `"Renovation Project 1"`
- **sortBy**: `"date_debut"`

**Response**:
```json
{
  "totalItems": 1,
  "totalPages": 1,
  "currentPage": 1,
  "data": [
    {
      "id": 1,
      "nom": "Renovation Project 1",
      "description": "Full home renovation",
      "date_debut": "2024-01-01T00:00:00.000Z",
      "date_fin_prevue": "2024-06-01T00:00:00.000Z",
      "budget": 150000,
      "client_id": 1,
      "entrepreneur_id": 1,
      "Client": {
        "nom": "Client A.Simard",
        "coordonnees": "1234 Main St, City A, Email: clienta@example.com"
      },
      "Entrepreneur": {
        "nom": "Entrepreneur X inc",
        "coordonnees": "123 Rue Sherbrooke Ouest, Montréal, QC H2X 1X4, Canada"
      }
    }
  ]
}

/*******************************************/
### List Projects with Pagination
Method: GET
URL: http://localhost:3000/projets
Query Parameters:

page: "1"
Response:

json
{
  "totalItems": 2,
  "totalPages": 2,
  "currentPage": 1,
  "data": [
    {
      "id": 1,
      "nom": "Renovation Project 1",
      "description": "Full home renovation",
      "date_debut": "2024-01-01T00:00:00.000Z",
      "date_fin_prevue": "2024-06-01T00:00:00.000Z",
      "budget": 150000,
      "client_id": 1,
      "entrepreneur_id": 1,
      "Client": {
        "nom": "Client A.Simard",
        "coordonnees": "1234 Main St, City A, Email: clienta@example.com"
      },
      "Entrepreneur": {
        "nom": "Entrepreneur X inc",
        "coordonnees": "123 Rue Sherbrooke Ouest, Montréal, QC H2X 1X4, Canada"
      }
    }
  ]
}

/*************************************/
Create a New Project Using Postman
Method: POST
URL: http://localhost:3000/projets
Body:

json
{
  "nom": "New Renovation Project",
  "description": "This project is for renovating a home completely.",
  "date_debut": "2024-07-01",
  "date_fin_prevue": "2024-12-01",
  "budget": 180000,
  "client_id": 1, // an exiting client id
  "entrepreneur_id": 2 // an exiting entrepreneur id
}

Steps in Postman:
Select Method: Set to POST.
Enter URL: Use http://localhost:3000/projets.
Set Body: Click Body tab, select raw format, and set to JSON.
Paste JSON Body: Use the example provided above.
Click Send.
Example Response:
json

{
  "projet": {
    "id": 1,
    "nom": "New Renovation Project",
    "description": "This project is for renovating a home completely.",
    "date_debut": "2024-07-01T00:00:00.000Z",
    "date_fin_prevue": "2024-12-01T00:00:00.000Z",
    "budget": 180000,
    "client_id": 1,
    "entrepreneur_id": 2
  }
}

/*****************************************/
Update an Existing Project Using Postman
Method: PUT
URL: http://localhost:3000/projets/1

Steps in Postman:
Select Method: Set to PUT.
Enter URL: Use http://localhost:3000/projets/1 (where 1 is an existing project ID).
Set Body: Click Body tab, select raw format, and set to JSON.
Paste JSON Body: Use the example provided above.
{
  "projet": {
    "id": 1,
    "nom": "New Renovation Project",
    "description": "This project is for renovating a home completely.",
    "date_debut": "2024-07-01T00:00:00.000Z",
    "date_fin_prevue": "2024-12-01T00:00:00.000Z",
    "budget": 240000,
    "client_id": 1,
    "entrepreneur_id": 2
  }
}
Click Send.
Example Response:
json
{
  "projet": {
    "id": 1,
    "nom": "New Renovation Project",
    "description": "This project is for renovating a home completely.",
    "date_debut": "2024-07-01T00:00:00.000Z",
    "date_fin_prevue": "2024-12-01T00:00:00.000Z",
    "budget": 240000,
    "client_id": 1,
    "entrepreneur_id": 2
  }
}
