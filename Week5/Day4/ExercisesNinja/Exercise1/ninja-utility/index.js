import { Command } from 'commander';

import greeting from './commands/greet.js';
import fetchWeather from'./commands/fetch.js';
import readFile from'./commands/read.js';


const program = new Command();

program
  .name('test')
  .description('A simple program tes')

program
    .command('greet')
    .action(greeting)
  
program
    .command('fetch')
    .action(fetchWeather)
  
program
    .command('read<filename>')
    .action(readFile)
  

program.parse();

