export const startButtonEl = document.createElement('button');
startButtonEl.textContent = "START GAME";

export const keyContainerEl = document.createElement('div')

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

export const submitKeyEl = document.createElement('button');
submitKeyEl.textContent = "SUBMIT";

[firstRowContainerEl, secondRowContainerEl, thirdRowContainerEl, backspaceKeyEl, submitKeyEl].forEach((el) => {
    keyContainerEl.appendChild(el);
})

keyContainerEl.style.display = "flex";
keyContainerEl.style.flexDirection = "column";


export const returnButtonEl = document.createElement('button');
returnButtonEl.textContent = "RETURN HOME";