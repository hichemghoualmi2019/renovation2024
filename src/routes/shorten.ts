import express, { Router } from 'express';
import UrlShortener from '../controllers/shorten';
import { loadDataFromFile2 } from '../models/dataUtils';

const router: Router = express.Router();
const urlShortener = new UrlShortener();

// shorten the url
router.post('/', (req, res) => urlShortener.shortenURL(req, res));

router.post('/one', (req, res) => urlShortener.shortenOneURL(req, res));
router.get('/data', loadDataFromFile2);

// redirect to url suing the short key 123
router.get('/:key', (req, res) => urlShortener.redirectToURL(req, res));

export default router;
