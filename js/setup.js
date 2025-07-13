export const startButtonEl = document.createElement("button");
startButtonEl.textContent = "START GAME";

export const keyContainerEl = document.createElement("div")

const firstRowLetters = "QWERTYUIOP";
const secondRowLetters = "ASDFGHJKL";
const thirdRowLetters = "ZXCVBNM";

const firstRowContainerEl = document.createElement("div");
const secondRowContainerEl = document.createElement("div");
const thirdRowContainerEl = document.createElement("div");
const fourthRowContainerEl = document.createElement("div");

for (let letter of firstRowLetters) {
    const firstRowKeyEl = document.createElement("button");
    firstRowKeyEl.textContent = letter;
    firstRowKeyEl.classList.add("key");
    firstRowKeyEl.classList.add("first-row");
    firstRowKeyEl.style.height = "50px";
    firstRowKeyEl.style.width = "50px";
    firstRowKeyEl.style.border = "ridge";
    firstRowKeyEl.style.borderRadius = "10px";
    firstRowContainerEl.appendChild(firstRowKeyEl);
}

for (let letter of secondRowLetters) {
    const secondRowKeyEl = document.createElement("button");
    secondRowKeyEl.textContent = letter;
    secondRowKeyEl.classList.add("key");
    secondRowKeyEl.classList.add("second-row");
    secondRowKeyEl.style.height = "50px";
    secondRowKeyEl.style.width = "50px";
    secondRowKeyEl.style.border = "ridge";
    secondRowKeyEl.style.borderRadius = "10px";
    secondRowContainerEl.appendChild(secondRowKeyEl);
}

for (let letter of thirdRowLetters) {
    const thirdRowKeyEl = document.createElement("button");
    thirdRowKeyEl.textContent = letter;
    thirdRowKeyEl.classList.add("key");
    thirdRowKeyEl.classList.add("third-row");
    thirdRowKeyEl.style.height = "50px";
    thirdRowKeyEl.style.width = "50px";
    thirdRowKeyEl.style.border = "ridge";
    thirdRowKeyEl.style.borderRadius = "10px";
    thirdRowContainerEl.appendChild(thirdRowKeyEl);
}

firstRowContainerEl.style.display = "flex";
firstRowContainerEl.style.gap = "5px";
secondRowContainerEl.style.display = "flex";
secondRowContainerEl.style.gap = "5px";
thirdRowContainerEl.style.display = "flex";
thirdRowContainerEl.style.gap = "5px";

export const backspaceKeyEl = document.createElement("button");
backspaceKeyEl.textContent = "⌫"
backspaceKeyEl.style.height = "50px";
backspaceKeyEl.style.width = "50px";
backspaceKeyEl.style.border = "ridge";
backspaceKeyEl.style.borderRadius = "10px";
fourthRowContainerEl.appendChild(backspaceKeyEl);

export const submitKeyEl = document.createElement("button");
submitKeyEl.textContent = "SUBMIT";
submitKeyEl.style.height = "50px";
submitKeyEl.style.width = "80px";
submitKeyEl.style.border = "ridge";
submitKeyEl.style.borderRadius = "10px";
fourthRowContainerEl.appendChild(submitKeyEl);

fourthRowContainerEl.style.display = "flex";
fourthRowContainerEl.style.gap = "5px";

[firstRowContainerEl, secondRowContainerEl, thirdRowContainerEl, fourthRowContainerEl].forEach((el) => {
    keyContainerEl.appendChild(el);
})

keyContainerEl.style.display = "flex";
keyContainerEl.style.flexDirection = "column";
keyContainerEl.style.alignItems = "center";
keyContainerEl.style.gap = "5px";

export const returnButtonEl = document.createElement("button");
returnButtonEl.textContent = "RETURN HOME";