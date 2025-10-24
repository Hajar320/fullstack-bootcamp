const fs = require('fs');


function readfile(filename){    
fs.readFile(filename,'utf-8', (err, data) => {
    if (err) {
      console.error(`Error reading ${filename}:`, err.message);
      return null;
    }
    console.log(`Content of ${filename}:`);
    console.log(data);
    return data;

})}

function copyfile(filename,destinationfile) {
  fs.copyFile(filename,destinationfile, (err, data) => {
    if (err) {
      console.error(`copy ${filename}: to ${destinationfile}`);
      return null;
    }
    console.log(`copied the content of ${filename}: to ${destinationfile}`);
    return true;
    
  });
}

readfile('source.txt');
copyfile('source.txt','destination.txt')
