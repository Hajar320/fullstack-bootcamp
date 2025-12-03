const fs = require('fs');

// Fetch existing notes from the JSON file
const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

// Save notes to the JSON file
const saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

// Add a new note
const addNote = (title, body) => {
  const notes = fetchNotes();
  const note = {
    title,
    body
  };

  // Check for duplicate titles
  const duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

// Get all notes
const getAll = () => {
  return fetchNotes();
};

// Get a specific note by title
const getNote = (title) => {
  const notes = fetchNotes();
  const note = notes.find((note) => note.title === title);
  return note;
};

// Remove a note by title
const removeNote = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
};