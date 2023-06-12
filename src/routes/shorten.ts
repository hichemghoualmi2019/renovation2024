import express, { Router } from 'express';
import UrlShortener from '../controllers/shorten';
import { loadDataFromFile2 } from '../models/dataUtils';

const router: Router = express.Router();
const urlShortener = new UrlShortener();

router.post('/', (req, res) => urlShortener.shortenURL(req, res));
router.post('/one', (req, res) => urlShortener.shortenOneURL(req, res));
router.get('/data', loadDataFromFile2);
router.get('/:key', (req, res) => urlShortener.redirectToURL(req, res));

export default router;
