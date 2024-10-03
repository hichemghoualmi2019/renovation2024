import Client from '../models/Client';
import Entrepreneur from '../models/Entrepreneur';
import Projet from '../models/Projet';

// Function to initialize dummy data
export const initializeDummyData = async () => {
  try {
    // Check if there is already data in the Clients table
    const clientsCount = await Client.count();
    let client1, client2;

    if (clientsCount === 0) {
      // Insert Dummy Clients if no clients exist
      client1 = await Client.create({
        nom: 'Client A.Simard',
        coordonnees: '1234 Main St, City A, Email: clienta@example.com',
      });
      client2 = await Client.create({
        nom: 'Client B.Proulx',
        coordonnees: '5678 Market St, City B, Email: clientb@example.com',
      });

      console.log('Dummy clients have been created');
    } else {
      console.log('Clients already exist, skipping dummy data insertion for clients');
      client1 = await Client.findOne({ where: { nom: 'Client A.Simard' } });
      client2 = await Client.findOne({ where: { nom: 'Client B.Proulx' } });
    }

    // Check if there is already data in the Entrepreneurs table
    const entrepreneursCount = await Entrepreneur.count();
    let entrepreneur1, entrepreneur2;

    if (entrepreneursCount === 0) {
      // Insert Dummy Entrepreneurs if no entrepreneurs exist
      entrepreneur1 = await Entrepreneur.create({
        nom: 'Entrepreneur X inc',
        coordonnees: '123 Rue Sherbrooke Ouest, Montréal, QC H2X 1X4, Canada',
      });
      entrepreneur2 = await Entrepreneur.create({
        nom: 'Entrepreneur Y inc',
        coordonnees: '456 Avenue du Mont-Royal Est, Montréal, QC H2J 1W1, Canada',
      });

      console.log('Dummy entrepreneurs have been created');
    } else {
      console.log('Entrepreneurs already exist, skipping dummy data insertion for entrepreneurs');
      entrepreneur1 = await Entrepreneur.findOne({ where: { nom: 'Entrepreneur X inc' } });
      entrepreneur2 = await Entrepreneur.findOne({ where: { nom: 'Entrepreneur Y inc' } });
    }

    // Check if there is already data in the Projets table
    const projetsCount = await Projet.count();
    if (projetsCount === 0) {
      // Insert Dummy Projects if no projects exist
      await Projet.create({
        nom: 'Renovation Project 1',
        description: 'Full home renovation',
        date_debut: '2024-01-01',
        date_fin_prevue: '2024-06-01',
        budget: 150000,
        client_id: client1?.id,
        entrepreneur_id: entrepreneur1?.id,
      });

      await Projet.create({
        nom: 'Renovation Project 2',
        description: 'Kitchen and bathroom remodeling',
        date_debut: '2024-03-01',
        date_fin_prevue: '2024-09-01',
        budget: 100000,
        client_id: client2?.id,
        entrepreneur_id: entrepreneur2?.id,
      });

      console.log('Dummy projects have been created');
    } else {
      console.log('Projects already exist, skipping dummy data insertion for projects');
    }
  } catch (error) {
    console.error('Error initializing dummy data:', error);
  }
};
