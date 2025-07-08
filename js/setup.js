export const keyContainerEl = document.createElement('div')

const lettersOfAlphabet = "abcdefghijklmnopqrstuvwxyz";

for (let letter of lettersOfAlphabet) {
    const keyEl = document.createElement('button');
    keyEl.textContent = letter;
    keyContainerEl.appendChild(keyEl);
}

const backspaceKeyEl = document.createElement('button');

const enterKeyEl = document.createElement('button');
keyContainerEl.appendChild(backspaceKeyEl, enterKeyEl);

keyContainerEl.style.display = "grid";
keyContainerEl.style.gridTemplateColumns = "repeat(5, 75px)";