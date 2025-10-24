import fs from 'fs'

export default function readFile(filename) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${filename}:`, err.message);
      return null;
    }
    console.log(`Content of ${filename}:`);
    console.log(data);
    return data;
    
  });
}

