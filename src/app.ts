
import express from 'express';
import cors from 'cors';
import projetRoutes from './routes/projetRoutes';
import db from './config/database';
import { initializeDummyData } from './seeds/dummyData';

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

app.use('/projets', projetRoutes);

// Connect to the database and sync tables
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Database connection error:', err));

// Alter sync (updates tables without dropping them; useful for development)
// Create Tables if Missing: The sync call with alter: true will create the tables if they do not exist.
db.sync({ alter: true })
  .then(async () => {
    console.log('Tables have been altered to match the models');
    await initializeDummyData();
  })
  .catch(err => console.error('Error syncing tables:', err));

export default app;