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
**url**: 

**Query Parameters** (optional):
- `nom`: Filter by project name.
- `startDate`: Filter projects that start on or after this date.
- `endDate`: Filter projects that end on or before this date.
- `sortBy`: Field to sort by (e.g., `date_debut`).
- `page`: Page number for pagination.

**Example to use**
-http://localhost:3000/projets?sortBy=date_debut  
Sorts the list of projects by their start date (date_debut) in ascending order.

-http://localhost:3000/projets?startDate=2024-01-01&endDate=2024-06-30 
Filters projects to include only those with a start date between 2024-01-01 and 2024-06-30

-http://localhost:3000/projets?page=1
Use of pagination


### Get a Project by ID
**Endpoint**: `GET /projets/:id`  
**Description**: Fetches a project by its ID, including client and entrepreneur information.



### Create a New Project
**Endpoint**: `POST /projets`  
**Description**: Creates a new project. Requires `nom`, `description`, `date_debut`, `date_fin_prevue`, `budget`, `client_id`, and `entrepreneur_id`.
**Example to use on Postman**
url URL: http://localhost:3000/projets
Select Method: Set to POST.
Enter URL: Use http://localhost:3000/projets.
Set Body: Click Body tab, select raw format, and set to JSON.
Paste JSON Body: Use the example as {
  "nom": "New Renovation Project",
  "description": "This project is for renovating a home completely.",
  "date_debut": "2024-07-01",
  "date_fin_prevue": "2024-12-01",
  "budget": 180000,
  "client_id": 1, // has to be an existing client id
  "entrepreneur_id": 2 // has to be an existing entrepreneur id
}.
Click Send.


### Update an Existing Project
**Endpoint**: `PUT /projets/:id`  
**Description**: Updates an existing project by its ID. Accepts any field to update.
**Example to use on Postman**
url URL: http://localhost:3000/projets/1
id 1 has to be an existing projet to update
Select Method: Set to PUT. 
Enter URL: Use http://localhost:3000/projets/1.
Set Body: Click Body tab, select raw format, and set to JSON.
Paste JSON Body: Use the example as 
{
  "nom": "Updated Renovation Project",
  "description": "Updated full home renovation description",
  "date_debut": "2024-02-01",
  "date_fin_prevue": "2024-07-01",
  "budget": 200000,
  "client_id": 1,  // choose existing client id  from the client table
  "entrepreneur_id": 1 // choose existing entrepreneur id from the entrepreneur table
}
Click Send.

### Delete a Project
**Endpoint**: `DELETE /projets/:id`  
**Description**: Deletes a project by its ID.
