export default class Storage {
  static _getAllNotes() {
    const allNotes = localStorage.getItem('notes');
    return JSON.parse(allNotes);
  }

  static _saveNote(note) {
    const notes = Storage._getAllNotes() || [];

    const alreadySaved = notes.find((n) => n.id === +note.id);

    if (alreadySaved) {
      (alreadySaved.title = note.title),
        (alreadySaved.content = note.content),
        (alreadySaved.time = new Date());
    } else {
      note.id = Math.floor(Math.random() * 100000000);
      note.updated_time = new Date().toLocaleDateString();
      notes.push(note);
    }

    const saveLocalStorage = localStorage.setItem(
      'notes',
      JSON.stringify(notes)
    );
  }

  static _deleteNotes(id) {
    const notes = Storage._getAllNotes() || [];

    const noteIndex = notes.findIndex((n) => n.id === id);

    if (noteIndex < 0) return;

    notes.splice(noteIndex, 1);

    const saveLocalStorage = localStorage.setItem(
      'notes',
      JSON.stringify(notes)
    );
  }
}
