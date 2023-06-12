import { Request, Response } from 'express';
import generateKey from '../helpers/generateKey';
import { loadDataFromFile, saveDataToFile } from '../models/dataUtils';

class UrlShortener {
  protected urlMap: { [key: string]: string };

  constructor() {
    this.urlMap = loadDataFromFile();
  }

  protected generateUniqueKey(): string {
    let key: string;
    do {
      key = generateKey(6);
    } while (this.urlMap.hasOwnProperty(key));
    return key;
  }

  /*shortenOneURL(req: Request, res: Response): void {
    //const url: string = req.query.url as string;
    const url: string = req.body.url as string;

    const key: string = this.generateUniqueKey();

    this.urlMap[key] = url;
    saveDataToFile(this.urlMap);

    res.json({ shortUrl: `http://localhost:3000/shorten/${key}` });
  }*/

  shortenOneURL(req: Request, res: Response): void {
    const url: string = req.body.url as string;
  
    // Check if the URL already exists in the urlMap
    const existingKey = Object.keys(this.urlMap).find(key => this.urlMap[key] === url);
  
    if (existingKey) {
      res.json({ shortUrl: `http://localhost:3000/shorten/${existingKey}` });
      return;
    }
  
    const key: string = this.generateUniqueKey();
  
    this.urlMap[key] = url;
    saveDataToFile(this.urlMap);
  
    res.json({ shortUrl: `http://localhost:3000/shorten/${key}` });
  }

  /*
  shortenURL(req: Request, res: Response): void {
    const urls: string[] = req.body.urls as string[];
  
    const shortenedUrls: string[] = [];
    for (const url of urls) {
      const key: string = this.generateUniqueKey();
      this.urlMap[key] = url;
      saveDataToFile(this.urlMap);
      shortenedUrls.push(`http://localhost:3000/shorten/${key}`);
    }
  
    res.json({ shortenedUrls });
  }
  */

  shortenURL(req: Request, res: Response): void {
    const urls: string[] = req.body.urls as string[];
    const shortenedUrls: string[] = [];
  
    for (const url of urls) {
      // Check if the URL already exists in the urlMap
      const existingKey = Object.keys(this.urlMap).find(
        (key) => this.urlMap[key] === url
      );
  
      if (existingKey) {
        shortenedUrls.push(`http://localhost:3000/shorten/${existingKey}`);
      } else {
        const key: string = this.generateUniqueKey();
        this.urlMap[key] = url;
        saveDataToFile(this.urlMap);
        shortenedUrls.push(`http://localhost:3000/shorten/${key}`);
      }
    }
  
    res.json({ shortenedUrls });
  }
  

  

  redirectToURL(req: Request, res: Response): void {
    const key: string = req.params.key;

    if (this.urlMap.hasOwnProperty(key)) {
      const url: string = this.urlMap[key];
      res.redirect(url);
    } else {
      res.status(404).send('URL not found');
    }
  }
}

export default UrlShortener;
