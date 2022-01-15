export default class Modal {
  constructor(main) {
    this.main = main;
    const html = `
    <button class="btn-new-note">+</button>
    <nav class="nav">
    
    </nav>
    <div class="note-container">
        <input class="input--note-title" type="text" placeholder="my note">
        <textarea class="input--note-content" placeholder="start typing.."></textarea>
    </div>`;

    main.insertAdjacentHTML('afterbegin', html);

    const btnAddNote = this.main.querySelector('.btn-new-note');
    const inputTitle = this.main.querySelector('.input--note-title');
    const inputContent = this.main.querySelector('.input--note-content');

    console.log(this);

    btnAddNote.addEventListener('click', () => {
      const notesTemplate = `
      <div class="notes-template">
                <div class="btn-container">
                    <button class="btn--color" style="background-color: #ff1818;"></button>
                    <button class="btn--color" style="background-color: #90ee90;"></button>
                    <button class="btn--color active" style="background-color: #6b00cf;"></button>
                    <button class="btn--color" style="background-color: #ff8800;"</button>
                    <button class="btn--color" style="background-color: #00a2ff;"></button>
                    <button><i class="far fa-trash-alt"></i></button>
                    <button><i class="far fa-edit"></i></button>
                </div>
                <span class="notes-template-title">
                    my first note my second notes my third notes...
                </span>
                <span class="notes-template-content">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit...
                </span>
                <span class="notes-template-time">
                    06:19 PM 14 Jan 22
                </span>
        </div>`;
      console.log(this.main);
      this.main
        .querySelector('.nav')
        .insertAdjacentHTML('beforeend', notesTemplate);
      console.log('ADD NEW NOTE !!!!!!!!!!!!!');
    });

    [inputTitle, inputContent].forEach((input) => {
      input.addEventListener('blur', () => {
        console.log('UPDATE THE NOTES');
      });
    });
  }
}
