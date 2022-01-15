import Storage from './localStorage.js';
import Modal from './modal.js';

const main = document.querySelector('.main');
const nav = main.querySelector('.nav');
const note = main.querySelector('.note-container');
const btnAddNote = main.querySelector('.btn-new-note');

const newNote = new Modal(main);
