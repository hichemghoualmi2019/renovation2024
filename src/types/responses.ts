import Projet from '../models/Projet';

// Define the response interface for the `getAllProjets` function
export interface GetAllProjetsResponse {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    data: Projet[]; // Array of projects
}

// Define the response interface for the `getProjetById` function
export interface GetProjetByIdResponse {
    projet: Projet; // A single project
}

// Define the response interface for creating a new project
export interface CreateProjetResponse {
    projet: Projet; // The newly created project
}

export interface UpdateProjetResponse {
    projet: Projet; // The updated project
}  
