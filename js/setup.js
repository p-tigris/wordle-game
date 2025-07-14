export const startButtonEl = document.createElement("button");
startButtonEl.classList.add("button");
startButtonEl.textContent = "START GAME";

export const keyContainerEl = document.createElement("div");
keyContainerEl.classList.add("important-keys");

const firstRowLetters = "QWERTYUIOP";
const secondRowLetters = "ASDFGHJKL";
const thirdRowLetters = "ZXCVBNM";

const firstRowContainerEl = document.createElement("div");
const secondRowContainerEl = document.createElement("div");
const thirdRowContainerEl = document.createElement("div");
const fourthRowContainerEl = document.createElement("div");

firstRowContainerEl.classList.add("first-row");
secondRowContainerEl.classList.add("second-row");
thirdRowContainerEl.classList.add("third-row");
fourthRowContainerEl.classList.add("fourth-row");

for (let letter of firstRowLetters) {
    const firstRowKeyEl = document.createElement("button");
    firstRowKeyEl.textContent = letter;
    firstRowKeyEl.classList.add("key");
    firstRowContainerEl.appendChild(firstRowKeyEl);
}

for (let letter of secondRowLetters) {
    const secondRowKeyEl = document.createElement("button");
    secondRowKeyEl.textContent = letter;
    secondRowKeyEl.classList.add("key");;
    secondRowContainerEl.appendChild(secondRowKeyEl);
}

for (let letter of thirdRowLetters) {
    const thirdRowKeyEl = document.createElement("button");
    thirdRowKeyEl.textContent = letter;
    thirdRowKeyEl.classList.add("key");
    thirdRowContainerEl.appendChild(thirdRowKeyEl);
}

export const backspaceKeyEl = document.createElement("button");
backspaceKeyEl.classList.add("non-letter-key");
backspaceKeyEl.textContent = "⌫"
fourthRowContainerEl.appendChild(backspaceKeyEl);

export const submitKeyEl = document.createElement("button");
submitKeyEl.classList.add("non-letter-key");
submitKeyEl.id = "submit";
submitKeyEl.textContent = "SUBMIT";
fourthRowContainerEl.appendChild(submitKeyEl);

[firstRowContainerEl, secondRowContainerEl, thirdRowContainerEl, fourthRowContainerEl].forEach((el) => {
    keyContainerEl.appendChild(el);
})

export const returnButtonEl = document.createElement("button");
returnButtonEl.classList.add("button");
returnButtonEl.textContent = "RETURN HOME";