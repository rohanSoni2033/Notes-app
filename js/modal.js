export default class Modal {
  constructor(main, { createNote, saveNote, deleteNote, updataNote }) {
    this.main = main;
    this.createNote = createNote;
    this.saveNote = saveNote;

    const html = `
    <button class="btn-new-note">+</button>
    <nav class="nav"></nav>
    <div class="note-container">
        <input class="input--note-title" type="text" placeholder="my note">
        <textarea class="input--note-content" placeholder="start typing.."></textarea>
    </div>`;

    main.insertAdjacentHTML('afterbegin', html);

    const btnAddNote = this.main.querySelector('.btn-new-note');
    const inputTitle = this.main.querySelector('.input--note-title');
    const inputContent = this.main.querySelector('.input--note-content');

    const nav = this.main.querySelector('.nav');

    console.log(this);

    btnAddNote.addEventListener('click', () => {
      createNote();

      console.log('ADD NEW NOTE !!!!!!!!!!!!!');
    });

    nav.addEventListener('click', (e) => {
      if (!e.target.closest('.notes-template')) return;
      console.log('SHOW THIS NOTES 📝📝📝📝📝');
    });

    [inputTitle, inputContent].forEach((input) => {
      input.addEventListener('blur', () => {
        this.saveNote(inputTitle.value, inputContent.value);
      });
    });
  }

  _createNotesTemplate(id, title, content, time, color) {
    const MAX_TITLE_LENGTH = 45;
    const MAX_CONTENT_LENGTH = 65;
    const notesTemplate = `
    <div class="notes-template" data-id="${id}" style="background-color:${color}">
        <div class="btn-container">
            <button class="btn--color" style="background-color: #ff1818;"></button>
            <button class="btn--color" style="background-color: #90ee90;"></button>
            <button class="btn--color" style="background-color: #6b00cf;"></button>
            <button class="btn--color" style="background-color: #ff8800;"</button>
            <button class="btn--color" style="background-color: #00a2ff;"></button>
            <button><i class="far fa-trash-alt"></i></button>
            <button><i class="far fa-edit"></i></button>
        </div>
        <span class="notes-template-title">
            ${title.substring(0, MAX_TITLE_LENGTH)}${
      title.length > MAX_TITLE_LENGTH ? '...' : ''
    }
        </span>
        <span class="notes-template-content">
        ${content.substring(0, MAX_CONTENT_LENGTH)}${
      content.length > MAX_CONTENT_LENGTH ? '...' : ''
    }
        </span>
        <span class="notes-template-time">
            ${time}
        </span>
    </div>`;

    this.main
      .querySelector('.nav')
      .insertAdjacentHTML('beforeend', notesTemplate);
  }

  _updateNotes(notes) {
    notes.forEach((note) => {
      console.log('update notes function');
      this._createNotesTemplate(
        note.id,
        note.title,
        note.content,
        note.updated_time,
        note.color
      );
    });
  }
}
