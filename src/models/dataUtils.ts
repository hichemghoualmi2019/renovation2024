import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(__dirname, '../data/urlData.json');

// Define the interface for the URL mapping object
interface UrlMap {
  [key: string]: string;
}

// Load data from the file and return the URL mapping object
export const loadDataFromFile = (): UrlMap => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data) as UrlMap;
  } catch (error) {
    console.error('Error loading data:', error);
    return {};
  }
};

// Save the URL mapping object to the file
/* export const saveDataToFile = (urlMap: UrlMap): void => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(urlMap), 'utf8');
  } catch (error) {
    console.error('Error saving data:', error);
  }
}; */
export const saveDataToFile = (urlMap: UrlMap): void => {
  try {
    // Load existing data from file
    let existingData: UrlMap = {};
    try {
      const existingDataString = fs.readFileSync(dataFilePath, 'utf8');
      existingData = JSON.parse(existingDataString);
    } catch (error) {
      // File does not exist or is empty
    }

    // Merge the existing data with the new data
    const mergedData: UrlMap = { ...existingData, ...urlMap };

    // Save the merged data to file
    fs.writeFileSync(dataFilePath, JSON.stringify(mergedData), 'utf8');
  } catch (error) {
    console.error('Error saving data:', error);
  }
};


// Define the loadDataFromFile function
export const loadDataFromFile2 = (req: any, res: any) => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const urlMap = JSON.parse(data);
    res.json(urlMap);
  } catch (error) {
    console.error('Error loading data:', error);
    res.status(500).send('Error loading data');
  }
};







  
// export const urlMap = loadDataFromFile();