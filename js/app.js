import { startButtonEl, keyContainerEl, backspaceKeyEl, submitKeyEl, restartButtonEl } from "./setup.js";
import { wordList } from "./data.js";

/*-------------------------------- Constants --------------------------------*/

const attempts = ["first", "second", "third", "fourth", "fifth", "sixth"];

/*---------------------------- Variables (state) ----------------------------*/
let currentAttemptIndex;
let attempt;
let winner;
let userArray;
let charIndex;
let winningWord;
let winningWordArray;

/*------------------------ Cached Element References ------------------------*/
const messageEl = document.querySelector('#message');
const gamePlayEl = document.querySelector('#game-play');
const squaresEl = document.querySelectorAll(".letter");
const keysEl = keyContainerEl.querySelectorAll(".key");

/*-------------------------------- Functions --------------------------------*/
const home = () => {
    for (let square of squaresEl) {
        square.style.backgroundColor = "";
        square.textContent = "";
    }
    winningWord = wordList[Math.floor(Math.random() * wordList.length)];
    winningWordArray = winningWord.split("");
    currentAttemptIndex = 0;
    attempt = attempts[currentAttemptIndex];
    charIndex = 0;
    userArray = [];
    winner = false;
    gamePlayEl.appendChild(startButtonEl);
    messageEl.textContent = "Press Start Game to begin!";
}

const checkRealWord = () => {
    let isRealWord = false;
    if (userArray.length === 5 && currentAttemptIndex < 6) {
        const userWord = userArray.join("");
        for (let word of wordList) {
            if (word === userWord) {
                isRealWord = true;
                return;
            } 
        }
    if (isRealWord === false) {
        messageEl.textContent = "Not an allowed word";
    }
    }
}

const compareWords = () => {
    const wordEl = document.querySelector(`.${attempt}`);
    const lettersEl = wordEl.querySelectorAll('.letter');

    const winningArrayCopy = winningWord.split("");
    const backgroundColors = ["gray", "gray", "gray", "gray", "gray"]

    for (let i = 0; i < userArray.length; i++) {
        if (userArray[i] === winningArrayCopy[i]) {
            backgroundColors[i] = "green";
            winningArrayCopy.splice(i, 1, null);
            userArray.splice(i, 1, null);
        }
    }

    for (let i = 0; i < userArray.length; i++) {
        if (winningArrayCopy.includes(userArray[i]) && userArray[i] !== null) {
            backgroundColors[i] = "yellow";
            winningArrayCopy.splice(winningArrayCopy.indexOf(userArray[i]), 1, null);
        }
    }

    lettersEl.forEach((letter, index) => {
        letter.style.backgroundColor = backgroundColors[index];
    })

    const grayLetters = [];
    const greenLetters = [];
    const yellowLetters = [];
    lettersEl.forEach((letter) => {
        if (letter.style.backgroundColor === "gray") {
            grayLetters.push(letter.textContent);
        } else if (letter.style.backgroundColor === "green") {
            greenLetters.push(letter.textContent);
        } else {
            yellowLetters.push(letter.textContent);
        }
    })

    keysEl.forEach((key) => {
        if (greenLetters.includes(key.textContent)) {
            key.style.backgroundColor = "green";
        } else if (yellowLetters.includes(key.textContent)) {
            if (key.style.backgroundColor !== "green") {
                key.style.backgroundColor = "yellow";
            }
        } else if (grayLetters.includes(key.textContent)) {
            key.style.backgroundColor = "gray";
        }
    })


    if (userArray.every((char, index) => char === winningArrayCopy[index])) {
        winner = true;
    }
};

const checkWinner = () => {
    if (winner || (winner !== true && currentAttemptIndex === 5)) {
        keyContainerEl.remove();
        gamePlayEl.appendChild(restartButtonEl);
    }

    if (winner) {
        messageEl.textContent = `Congratulations! ${winningWord.toUpperCase()} is the correct word!`;
    } else if (winner !== true && currentAttemptIndex === 5) {
        messageEl.textContent = `Game Over. The correct word is ${winningWord.toUpperCase()}`;
    }
}

/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener('DOMContentLoaded', home);

startButtonEl.addEventListener('click', () => {
    gamePlayEl.appendChild(keyContainerEl);
    keysEl.forEach((key) => {
        key.style.backgroundColor = "";
    })
    startButtonEl.remove();
    messageEl.textContent = "";
})

for (let i = 0; i < keysEl.length; i++) {
    keysEl[i].addEventListener('click', () => {
        if (charIndex < 5 && currentAttemptIndex < 6) {
            userArray.push(keysEl[i].textContent.toLowerCase());
            if (userArray.length === 5) {
                checkRealWord();
            }
            document.querySelector(`.${attempt}`).querySelectorAll('.letter')[charIndex].textContent = keysEl[i].textContent;
            charIndex++;
        }
    });
}

backspaceKeyEl.addEventListener('click', () => {
    if (messageEl.textContent === "Not an allowed word") {
        messageEl.textContent = "";
    }
    if (charIndex > 0) {
        userArray.pop();
        charIndex--;
        document.querySelector(`.${attempt}`).querySelectorAll('.letter')[charIndex].textContent = "";
    }
})

submitKeyEl.addEventListener('click', () => {
    if (messageEl.textContent === "Not an allowed word") {
        return;
    } else if (userArray.length === 5) {
        compareWords();
        checkWinner();
        if (currentAttemptIndex < 5) {
            currentAttemptIndex++;
            attempt = attempts[currentAttemptIndex];
            charIndex = 0;
            userArray = [];
        }
    }
})

restartButtonEl.addEventListener('click', () => {
    restartButtonEl.remove();
    home();
});