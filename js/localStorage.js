export default class Storage {
  static _getAllNotes() {
    const allNotes = localStorage.getItem('notes');
    return JSON.parse(allNotes);
  }

  static _saveNote(note) {
    const notes = Storage._getAllNotes() || [];

    note.id = Math.floor(Math.random() * 100000000);
    note.updated_time = new Date().toLocaleDateString();

    notes.push(note);
    console.log(notes);

    const saveLocalStorage = localStorage.setItem(
      'notes',
      JSON.stringify(notes)
    );
  }
}
