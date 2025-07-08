export const keyContainerEl = document.createElement('div')

const lettersOfAlphabet = "abcdefghijklmnopqrstuvwxyz";

for (let letter of lettersOfAlphabet) {
    const keyEl = document.createElement('button');
    keyEl.textContent = letter;
    keyContainerEl.appendChild(keyEl);
}

export const backspaceKeyEl = document.createElement('button');
backspaceKeyEl.textContent = "⌫"

const enterKeyEl = document.createElement('button');
enterKeyEl.textContent = "ENTER";

[backspaceKeyEl, enterKeyEl].forEach((el) => {
    keyContainerEl.appendChild(el);
})

keyContainerEl.style.display = "grid";
keyContainerEl.style.gridTemplateColumns = "repeat(5, 75px)";