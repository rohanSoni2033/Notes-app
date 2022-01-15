import Storage from './localStorage.js';

const note = {
  title: 'first note',
  content: 'my first note is here...',
  color: 'red',
};

Storage._saveNote(note);
Storage._getAllNotes();
