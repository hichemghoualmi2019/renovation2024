import { Router } from 'express';
import {
  getAllProjets,
  getProjetById,
  createProjet,
  updateProjet,
  deleteProjet,
} from '../controllers/projetController';

const router = Router();

router.get('/', getAllProjets);
router.get('/:id', getProjetById);
router.post('/', createProjet);

// I used PUT instead of PATCH because i want to replaces the entire resource, ensuring all fields are consistently updated in one operation.
// but PATCH can be appropriate for partial updates ,(depending on the use case)
router.put('/:id', updateProjet);
router.delete('/:id', deleteProjet);

export default router;
