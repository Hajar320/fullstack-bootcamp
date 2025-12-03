const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');

const argv = yargs(process.argv.slice(2)).argv;
const command = argv._[0];

if (command === 'add') {
  const note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note added successfully');
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  } else {
    console.log('Note already exists');
  }
} else if (command === 'list') {
  const allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => {
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  });
} else if (command === 'read') {
  const note = notes.getNote(argv.title);
  if (note) {
    console.log('Note found');
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  } else {
    console.log('Note not found');
  }
} else if (command === 'remove') {
  const noteRemoved = notes.removeNote(argv.title);
  const message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}