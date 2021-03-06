import Storage from './localStorage.js';
import Modal from './modal.js';

export default class App {
  constructor(root) {
    this.root = root;
    this.notes = [];
    this.modal = new Modal(root, this._handlers());
    this._refresh();
  }

  _refresh() {
    this.root.querySelector('.sidebar').innerHTML = ``;
    this.notes = Storage.getAllNotes();
    this.notes.forEach((note) => this.modal._createNotesTemplate(note));
  }

  _handlers() {
    return {
      createNote: (title, content) => {
        const noteID = Storage.saveNote({
          title,
          content,
          color: '#fff',
        });
        this._refresh();

        this.modal.selectNote(noteID);
      },
      updateNote: (title, content) => {
        this.activeNote.title = title;
        this.activeNote.content = content;

        Storage.saveNote(this.activeNote);
        this._refresh();
      },
      selectNote: (id) => {
        const note = this.notes.find((note) => note.id === +id);
        this.activeNote = note;
        this.modal._contentVisible(true);
        this.modal._updateActiveNote(note);
      },
      deleteNote: (id) => {
        Storage.deleteNotes(id);
        if (this.activeNote?.id === +id) {
          this.modal._contentVisible(false);
        }
      },
      changeCardColor: (id, color) => {
        Storage.changeCardColor(id, color);
      },
    };
  }
}
