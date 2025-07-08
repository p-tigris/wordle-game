import { keyContainerEl } from "./setup.js";

const startButtonEl = document.querySelector('#start');
const gamePlayEl = document.querySelector('#game-play');

startButtonEl.addEventListener('click', () => {
    gamePlayEl.appendChild(keyContainerEl);
    startButtonEl.remove();
})