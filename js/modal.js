export default class Modal {
  constructor(
    root,
    { deleteNote, changeCardColor, createNote, selectNote, updateNote } = {}
  ) {
    this.root = root;

    this.deleteNote = deleteNote;
    this.createNote = createNote;
    this.selectNote = selectNote;
    this.updateNote = updateNote;

    this.changeCardColor = changeCardColor;

    const html = `
    <button class="btn--add-note">+</button>
    <nav class="sidebar"></nav>
    <div class="input-note-container">
        <input class="input--note-title" type="text" placeholder="my note">
        <textarea class="input--note-content" placeholder="start typing.."></textarea>
    </div>`;

    root.insertAdjacentHTML('afterbegin', html);
    this._ButtonHandler();

    const btnAddNote = this.root.querySelector('.btn--add-note');
    const inputTitle = this.root.querySelector('.input--note-title');
    const inputContent = this.root.querySelector('.input--note-content');

    // const sidebar = this.root.querySelector('.sidebar');

    btnAddNote.addEventListener('click', () => {
      createNote('my note 📝', '✅ Start writing your note...');
    });

    [inputTitle, inputContent].forEach((input) => {
      input.addEventListener('blur', () => {
        this.updateNote(inputTitle.value, inputContent.value);
      });
    });

    this._contentVisible(false);
  }

  _createNotesTemplate({ id, title, content, updated_time, color }) {
    const MAX_TITLE_LENGTH = 55;
    const MAX_CONTENT_LENGTH = 75;
    const notesTemplate = `
    <div class="sidebar_note-card" data-id="${id}" style="background-color:${color}">
        <div class="sidebar_note-card_btn-container">
            <button class="btn--note-card-color" style="background-color: #ff1818;" data-color="#ff181866"></button>
            <button class="btn--note-card-color" style="background-color: #90ee90;" data-color="#90ee9066"></button>
            <button class="btn--note-card-color" style="background-color: #6b00cf;" data-color="#6b00cf66"></button>
            <button class="btn--note-card-color" style="background-color: #ff8800;" 
            data-color="#ff880066"</button>
            <button class="btn--note-card-color" style="background-color: #00a2ff;" data-color="#00a2ff66"></button>
            <button class="btn--note-card-color" style="background-color: #fff;" data-color="#fff"></button>
            <button class="btn--dlt-note"><i class="far fa-trash-alt"></i></button>
        </div>
        <span class="sidebar_note-card-title">
            ${title.substring(0, MAX_TITLE_LENGTH)}${
      title.length > MAX_TITLE_LENGTH ? '...' : ''
    }
        </span>
        <span class="notes-card-content">
        ${content.substring(0, MAX_CONTENT_LENGTH)}${
      content.length > MAX_CONTENT_LENGTH ? '...' : ''
    }
        </span>
        <span class="sidebar_note-card-time">
            ${updated_time}
        </span>
    </div>`;

    this.root
      .querySelector('.sidebar')
      .insertAdjacentHTML('afterbegin', notesTemplate);

    this.root
      .querySelector(`.btn--note-card-color[data-color="${color}"]`)
      ?.classList.add('active');
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
    const sidebar = this.root.querySelector('.sidebar');

    sidebar.addEventListener('click', (e) => {
      const btnChangeColor = e.target.closest('.btn--note-card-color');
      const btnDeleteNote = e.target.closest('.btn--dlt-note');
      // const btnEditNote = e.target.closest('.btn--edit-note');
      const noteCard = e.target.closest('.sidebar_note-card');

      if (noteCard && !btnDeleteNote && !btnChangeColor) {
        sidebar
          .querySelectorAll('.sidebar_note-card')
          .forEach((card) => card.classList.remove('active'));
        noteCard.classList.add('active');

        this.selectNote(noteCard.dataset.id);
      }

      if (btnChangeColor) {
        this.changeCardColor(noteCard.dataset.id, btnChangeColor.dataset.color);
        noteCard.style.backgroundColor = `${btnChangeColor.dataset.color}`;

        const btnNoteCardColor = noteCard.querySelectorAll(
          '.btn--note-card-color'
        );
        btnNoteCardColor.forEach((btn) => btn.classList.remove('active'));
        btnChangeColor.classList.add('active');
      }

      if (btnDeleteNote) {
        this.deleteNote(noteCard.dataset.id);
        noteCard.classList.add('dlt--note');
        setTimeout(() => {
          noteCard.remove();
        }, 500);
      }
    });
  }

  _contentVisible(active) {
    this.root.querySelector('.input-note-container').style.visibility = `${
      active ? 'visible' : 'hidden'
    }`;
  }
}
