//import Redis from 'ioredis';
import { Request, Response } from 'express';
import Projet from '../models/Projet';
import Client from '../models/Client';
import Entrepreneur from '../models/Entrepreneur';
import { buildWhereClause, getOrderClause, getPagination } from '../helpers/restHelper';
import { CreateProjetResponse, GetAllProjetsResponse, GetProjetByIdResponse, UpdateProjetResponse } from '../types/responses'; // Import the response interface

// List all projects, optionally filtered, sorted, and paginated
export const getAllProjets = async (req: Request, res: Response) => {
  try {
    // Extract query parameters
    const { nom, startDate, endDate, sortBy, page } = req.query;


    // Build query parameters using helper functions
    const whereClause = buildWhereClause(nom as string, startDate as string, endDate as string);
    const orderClause = getOrderClause(sortBy as string);
    const { limit, offset, currentPage } = getPagination(page as string);

    // Fetch projects with filters, sorting, and pagination
    const projets = await Projet.findAndCountAll({
      where: whereClause,
      include: [Client, Entrepreneur], // Include related data
      order: orderClause,
      limit,
      offset,
    });

    // If no projects are found, respond with a 404 status code
    if (projets.rows.length === 0) {
      return res.status(404).json({ message: 'No projects found with the given criteria.' });
    }

    // Prepare the response
    const response: GetAllProjetsResponse = {
      totalItems: projets.count,
      totalPages: Math.ceil(projets.count / limit),
      currentPage,
      data: projets.rows,
    };

    // Respond with the filtered, sorted, and paginated projects
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// Get a project by ID
export const getProjetById = async (req: Request, res: Response) => {
  try {
    const projet = await Projet.findByPk(req.params.id, {
      include: [Client, Entrepreneur], // Include client and entrepreneur information
    });
    if (!projet) {
      return res.status(404).json({ message: 'Projet not found' });
    }

    // Prepare the response
    const response: GetProjetByIdResponse = {
      projet
    };

    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};


// Create a new project
export const createProjet = async (req: Request, res: Response) => {
  const { nom, description, date_debut, date_fin_prevue, budget, client_id, entrepreneur_id } = req.body;

  try {
    // Verify if client and entrepreneur exist
    const clientExists = await Client.findByPk(client_id);
    const entrepreneurExists = await Entrepreneur.findByPk(entrepreneur_id);

    if (!clientExists) {
      return res.status(400).json({ error: `Client with id ${client_id} does not exist.` });
    }

    if (!entrepreneurExists) {
      return res.status(400).json({ error: `Entrepreneur with id ${entrepreneur_id} does not exist.` });
    }

    // Create the project if client and entrepreneur exist
    const newProjet = await Projet.create({
      nom,
      description,
      date_debut,
      date_fin_prevue,
      budget,
      client_id,
      entrepreneur_id,
    });

    // Prepare the response
    const response: CreateProjetResponse = {
      projet: newProjet,
    };

    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// Update an existing project
export const updateProjet = async (req: Request, res: Response) => {
  const { nom, description, date_debut, date_fin_prevue, budget, client_id, entrepreneur_id } = req.body;

  try {
    // Verify if client and entrepreneur exist (if being updated)
    if (client_id) {
      const clientExists = await Client.findByPk(client_id);
      if (!clientExists) {
        return res.status(400).json({ error: `Client with id ${client_id} does not exist.` });
      }
    }

    if (entrepreneur_id) {
      const entrepreneurExists = await Entrepreneur.findByPk(entrepreneur_id);
      if (!entrepreneurExists) {
        return res.status(400).json({ error: `Entrepreneur with id ${entrepreneur_id} does not exist.` });
      }
    }

    // Update the project if everything is valid
    const [updatedRows] = await Projet.update(
      { nom, description, date_debut, date_fin_prevue, budget, client_id, entrepreneur_id },
      { where: { id: req.params.id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Projet not found.' });
    }

    // Retrieve the updated project
    const updatedProject = await Projet.findByPk(req.params.id);

    const response: UpdateProjetResponse = {
      projet: updatedProject as Projet,
    };
    res.status(200).json(response);

  } catch (error: any) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// Delete a project
export const deleteProjet = async (req: Request, res: Response) => {
  try {
    const deletedProjet = await Projet.destroy({ where: { id: req.params.id } });
    if (!deletedProjet) {
      return res.status(404).json({ message: 'Projet not found' });
    }
    res.status(200).json({ message: 'Projet deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};



// if redis installed here is a solution for caching the api
/*
const redis = new Redis();
export const getAllProjets = async (req: Request, res: Response) => {
  try {
    // Extract query parameters
    const { nom, startDate, endDate, sortBy, page } = req.query;

    // Generate a cache key based on query parameters
    const cacheKey = `projets:${nom || ''}-${startDate || ''}-${endDate || ''}-${sortBy || ''}-${page || ''}`;

    // Check if data exists in the Redis cache
    const cachedResponse = await redis.get(cacheKey);
    if (cachedResponse) {
      return res.status(200).json(JSON.parse(cachedResponse));
    }

    // Build query parameters using helper functions
    const whereClause = buildWhereClause(nom as string, startDate as string, endDate as string);
    const orderClause = getOrderClause(sortBy as string);
    const { limit, offset, currentPage } = getPagination(page as string);

    // Fetch projects with filters, sorting, and pagination
    const projets = await Projet.findAndCountAll({
      where: whereClause,
      include: [Client, Entrepreneur], // Include related data
      order: orderClause,
      limit,
      offset,
    });

    // If no projects are found, respond with a 404 status code
    if (projets.rows.length === 0) {
      return res.status(404).json({ message: 'No projects found with the given criteria.' });
    }

    // Prepare the response
    const response: GetAllProjetsResponse = {
      totalItems: projets.count,
      totalPages: Math.ceil(projets.count / limit),
      currentPage,
      data: projets.rows,
    };

    // Store the response in Redis cache for future requests
    await redis.set(cacheKey, JSON.stringify(response), 'EX', 600); // Cache for 10 minutes

    // Respond with the filtered, sorted, and paginated projects
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};
*/

