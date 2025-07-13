const buttonStyle = (button, width, fontSize, backgroundColor) => {
    button.style.border = "groove";
    button.style.borderRadius = "10px";
    button.style.height = "50px";
    button.style.width = width;
    button.style.fontSize = fontSize;
    button.style.backgroundColor = backgroundColor;
    button.style.cursor = "pointer";
}

export const startButtonEl = document.createElement("button");
startButtonEl.textContent = "START GAME";
buttonStyle(startButtonEl, "150px", "18px", "rgba(245, 245, 220, 0.5)");

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
    buttonStyle(firstRowKeyEl, "50px", "24px", "rgba(245, 245, 220, 0.5)");
    firstRowContainerEl.appendChild(firstRowKeyEl);
}

for (let letter of secondRowLetters) {
    const secondRowKeyEl = document.createElement("button");
    secondRowKeyEl.textContent = letter;
    secondRowKeyEl.classList.add("key");
    secondRowKeyEl.classList.add("second-row");
    buttonStyle(secondRowKeyEl, "50px", "24px", "rgba(245, 245, 220, 0.5)");
    secondRowContainerEl.appendChild(secondRowKeyEl);
}

for (let letter of thirdRowLetters) {
    const thirdRowKeyEl = document.createElement("button");
    thirdRowKeyEl.textContent = letter;
    thirdRowKeyEl.classList.add("key");
    thirdRowKeyEl.classList.add("third-row");
    buttonStyle(thirdRowKeyEl, "50px", "24px", "rgba(245, 245, 220, 0.5)");
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
buttonStyle(backspaceKeyEl, "50px", "24px", "rgba(245, 245, 220, 0.5)");
fourthRowContainerEl.appendChild(backspaceKeyEl);

export const submitKeyEl = document.createElement("button");
submitKeyEl.textContent = "SUBMIT";
buttonStyle(submitKeyEl, "120px", "24px", "rgba(245, 245, 220, 0.5)");
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
buttonStyle(returnButtonEl, "180px", "18px", "rgba(245, 245, 220, 0.5)");