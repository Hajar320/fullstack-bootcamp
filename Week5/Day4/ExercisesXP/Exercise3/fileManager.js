const fs = require('fs');


// read a file 
function readFile(filename) {
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

// write a file
function writeFile(filename,content) {
  fs.writeFile(filename,content, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${filename}:`, err.message);
      return null;
    }
    console.log(`wrote to  ${filename}:`);
    return true;
    
  });
}



module.exports = {
  readFile,
  writeFile
};