const {readFile,writeFile}=require('./fileManager.js')


readFile('Hello_World.txt');
writeFile('Bye_World.txt',"Writing to the file");
readFile('Bye_World.txt');
