export const startButtonEl = document.createElement('button');
startButtonEl.textContent = "Start Game";

export const keyContainerEl = document.createElement('div')

// const lettersOfAlphabet = "abcdefghijklmnopqrstuvwxyz";

// for (let letter of lettersOfAlphabet) {
//     const keyEl = document.createElement('button');
//     keyEl.textContent = letter;
//     keyEl.classList.add("key");
//     keyContainerEl.appendChild(keyEl);
// }

const firstRowLetters = "QWERTYUIOP";
const secondRowLetters = "ASDFGHJKL";
const thirdRowLetters = "ZXCVBNM";

const firstRowContainerEl = document.createElement("div");
const secondRowContainerEl = document.createElement("div");
const thirdRowContainerEl = document.createElement("div");

for (let letter of firstRowLetters) {
    const firstRowKeyEl = document.createElement('button');
    firstRowKeyEl.textContent = letter;
    firstRowKeyEl.classList.add("key");
    firstRowKeyEl.classList.add("first-row");
    firstRowContainerEl.appendChild(firstRowKeyEl);
}

for (let letter of secondRowLetters) {
    const secondRowKeyEl = document.createElement('button');
    secondRowKeyEl.textContent = letter;
    secondRowKeyEl.classList.add("key");
    secondRowKeyEl.classList.add("second-row");
    secondRowContainerEl.appendChild(secondRowKeyEl);
}

for (let letter of thirdRowLetters) {
    const thirdRowKeyEl = document.createElement('button');
    thirdRowKeyEl.textContent = letter;
    thirdRowKeyEl.classList.add("key");
    thirdRowKeyEl.classList.add("third-row");
    thirdRowContainerEl.appendChild(thirdRowKeyEl);
}

firstRowContainerEl.style.display = "flex";
firstRowContainerEl.style.flexDirection = "row";
secondRowContainerEl.style.display = "flex";
secondRowContainerEl.style.flexDirection = "row";
thirdRowContainerEl.style.display = "flex";
thirdRowContainerEl.style.flexDirection = "row";

export const backspaceKeyEl = document.createElement('button');
backspaceKeyEl.textContent = "⌫"

export const enterKeyEl = document.createElement('button');
enterKeyEl.textContent = "ENTER";

[firstRowContainerEl, secondRowContainerEl, thirdRowContainerEl, backspaceKeyEl, enterKeyEl].forEach((el) => {
    keyContainerEl.appendChild(el);
})

keyContainerEl.style.display = "flex";
keyContainerEl.style.flexDirection = "column";


export const restartButtonEl = document.createElement('button');
restartButtonEl.textContent = "Return Home";