export default class Storage {
  static getAllNotes() {
    const allNotes = localStorage.getItem('notes');
    return JSON.parse(allNotes);
  }

  static saveNote(note) {
    const notes = Storage.getAllNotes() || [];

    const alreadySaved = notes.find((n) => n.id === +note.id);
    if (alreadySaved) {
      (alreadySaved.title = note.title),
        (alreadySaved.content = note.content),
        (alreadySaved.color = note.color),
        (alreadySaved.updated_time = new Date().toLocaleString());
    } else {
      note.id = Math.floor(Math.random() * 100000000);
      note.updated_time = new Date().toLocaleString();
      notes.push(note);
    }
    const saveLocalStorage = localStorage.setItem(
      'notes',
      JSON.stringify(notes)
    );
  }

  static deleteNotes(id) {
    const notes = Storage.getAllNotes() || [];

    const noteIndex = notes.findIndex((n) => n.id === +id);

    if (noteIndex < 0) return;

    notes.splice(noteIndex, 1);

    const saveLocalStorage = localStorage.setItem(
      'notes',
      JSON.stringify(notes)
    );
  }

  static changeCardColor = (id, color) => {
    const notes = Storage.getAllNotes() || [];
    const note = notes.find((n) => n.id === +id);
    note.color = color;
    const saveLocalStorage = localStorage.setItem(
      'notes',
      JSON.stringify(notes)
    );
  };
}
