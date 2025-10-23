import fs from 'fs';
import path from 'path';

export const FILE_ENCODING = 'utf-8';

export const loadJsonFile = <T>(filePath: string): T | null => {
  try {
    const relativePath = path.join(__dirname, filePath);
    const jsonString = fs.readFileSync(relativePath, FILE_ENCODING);

    const parsedData = JSON.parse(jsonString) as T;

    return parsedData;
  } catch (error) {
    console.error(`Error loading JSON file from ${filePath}:`, error);
    return null;
  }
};

export const saveJsonFile = <T>(filePath: string, data: T): boolean => {
  try {
    const relativePath = path.join(__dirname, filePath);
    const jsonString = JSON.stringify(data, null, 2);

    fs.writeFileSync(relativePath, jsonString, FILE_ENCODING);
    console.log(`JSON file saved to ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error saving JSON file to ${filePath}:`, error);
    return false;
  }
};
