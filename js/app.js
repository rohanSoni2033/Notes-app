import Storage from './localStorage.js';
import Modal from './modal.js';

export default class App {
  constructor(root) {
    this.root = root;

    const notes = Storage.getAllNotes();

    const modal = new Modal(root, {
      createNote: (title, content) => {
        Storage.saveNote({
          title: title,
          content: content,
          color: 'white',
        });
        console.log(title);
        console.log(content);
      },
      deleteNote: (id) => {
        Storage.deleteNotes(id);
      },
      changeCardColor: (id, color) => {
        Storage.changeCardColor(id, color);
      },
    });

    notes.forEach((note) => modal._createNotesTemplate(note));
  }
}
