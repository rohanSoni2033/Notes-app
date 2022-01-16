export default class Modal {
  constructor(root, { deleteNote, changeCardColor, createNote } = {}) {
    this.root = root;
    this.deleteNote = deleteNote;
    this.createNote = createNote;
    this.changeCardColor = changeCardColor;

    const html = `
    <button class="btn-new-note">+</button>
    <nav class="nav"></nav>
    <div class="note-container">
        <input class="input--note-title" type="text" placeholder="my note">
        <textarea class="input--note-content" placeholder="start typing.."></textarea>
    </div>`;

    root.insertAdjacentHTML('afterbegin', html);
    this._ButtonHandler();

    const btnAddNote = this.root.querySelector('.btn-new-note');
    const inputTitle = this.root.querySelector('.input--note-title');
    const inputContent = this.root.querySelector('.input--note-content');

    const nav = this.root.querySelector('.nav');

    btnAddNote.addEventListener('click', () => {
      createNote('my note 📝', 'i gonna dance, sing , play , study , watch tv');
    });

    // [inputTitle, inputContent].forEach((input) => {
    //   input.addEventListener('blur', () => {
    //     this.createNote(inputTitle.value, inputContent.value);
    //   });
    // });
  }

  _createNotesTemplate({ id, title, content, updated_time, color }) {
    const MAX_TITLE_LENGTH = 55;
    const MAX_CONTENT_LENGTH = 75;
    const notesTemplate = `
    <div class="notes-template" data-id="${id}" style="background-color:${color}">
        <div class="btn-container">
            <button class="btn--color" style="background-color: #ff1818;" data-color="#ff181866"></button>
            <button class="btn--color" style="background-color: #90ee90;" data-color="#90ee9066"></button>
            <button class="btn--color" style="background-color: #6b00cf;" data-color="#6b00cf66"></button>
            <button class="btn--color" style="background-color: #ff8800;" 
            data-color="#ff880066"</button>
            <button class="btn--color" style="background-color: #00a2ff;" data-color="#00a2ff66"></button>
            <button class="btn--dlt"><i class="far fa-trash-alt"></i></button>
            <button class="btn--edit"><i class="far fa-edit"></i></button>
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
            ${updated_time}
        </span>
    </div>`;

    this.root
      .querySelector('.nav')
      .insertAdjacentHTML('afterbegin', notesTemplate);
  }

  _updateNotes(notes) {
    notes.forEach((note) => {
      this._createNotesTemplate(
        note.id,
        note.title,
        note.content,
        note.updated_time,
        note.color
      );
    });
  }

  _updateActiveNote(note) {
    this.root.querySelector('.input--note-title').value = note.title;
    this.root.querySelector('.input--note-content').value = note.content;
  }

  _ButtonHandler() {
    const nav = this.root.querySelector('.nav');

    nav.addEventListener('click', (e) => {
      const btnChangeColor = e.target.closest('.btn--color');
      const btnDeleteNote = e.target.closest('.btn--dlt');
      const btnEditNote = e.target.closest('.btn--edit');

      if (btnChangeColor) {
        this.changeCardColor(
          e.target.closest('.notes-template').dataset.id,
          btnChangeColor.dataset.color
        );
        e.target.closest(
          '.notes-template'
        ).style.backgroundColor = `${btnChangeColor.dataset.color}`;

        const btnColor = e.target
          .closest('.notes-template')
          .querySelectorAll('.btn--color');
        btnColor.forEach((btn) => btn.classList.remove('active'));
        btnChangeColor.classList.add('active');
      }

      if (btnDeleteNote) {
        this.deleteNote(e.target.closest('.notes-template').dataset.id);
        e.target.closest('.notes-template').classList.add('dlt--note');
        setTimeout(() => {
          e.target.closest('.notes-template').remove();
        }, 500);
      }
    });
  }
}
