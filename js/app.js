import { startButtonEl, keyContainerEl, backspaceKeyEl, submitKeyEl, returnButtonEl } from "./setup.js";
import { wordList } from "./data.js";

/*-------------------------------- Constants --------------------------------*/

const attempts = ["first", "second", "third", "fourth", "fifth", "sixth"];

/*---------------------------- Variables (state) ----------------------------*/
let currentAttemptIndex;
let attempt;
let winner;
let userLetters;
let charIndex;
let winningWord;

/*------------------------ Cached Element References ------------------------*/
const banana = document.querySelector("#title"); // Named "banana" at Glenn's request; otherwise it would be named "titleEl"
const messageEl = document.querySelector('#message');
const gamePlayEl = document.querySelector('#game-play');
const squaresEl = document.querySelectorAll(".letter");
const keysEl = keyContainerEl.querySelectorAll(".key");

/*-------------------------------- Functions --------------------------------*/
const home = () => {
    for (let square of squaresEl) {
        square.style.backgroundColor = "";
        square.style.color = "";
        square.textContent = "";
        square.style.transform = "";
        square.style.transition = "";
    }
    winningWord = wordList[Math.floor(Math.random() * wordList.length)];
    currentAttemptIndex = 0;
    attempt = attempts[currentAttemptIndex];
    charIndex = 0;
    userLetters = [];
    winner = false;
    gamePlayEl.appendChild(startButtonEl);
    messageEl.textContent = "Click Start Game below to begin!";
};

const start = () => {
    gamePlayEl.appendChild(keyContainerEl);
    keysEl.forEach((key) => {
        key.style.backgroundColor = "";
    })
    startButtonEl.remove();
    messageEl.textContent = "Can you guess the word?";
};

const keys = (keyEl) => {
    if (charIndex < 5 && currentAttemptIndex < 6) {
        userLetters.push(keyEl.textContent.toLowerCase());
        if (userLetters.length === 5) {
            checkRealWord();
        }
        document.querySelector(`.${attempt}`).querySelectorAll('.letter')[charIndex].textContent = keyEl.textContent;
        charIndex++;
    }
};

const backspace = () => {  
    if (messageEl.textContent === "Not a valid word") {
        messageEl.textContent = "Can you guess the word?";
        messageEl.style.color = "";
    }

    if (charIndex > 0) {
        userLetters.pop();
        charIndex--;
        document.querySelector(`.${attempt}`).querySelectorAll('.letter')[charIndex].textContent = "";
    }
};

const submit = () => {
    if (messageEl.textContent === "Not a valid word") {
        return;
    } else if (userLetters.length === 5) {
        checkResponse();
        checkWinner();
        if (currentAttemptIndex < 5) {
            currentAttemptIndex++;
            attempt = attempts[currentAttemptIndex];
            charIndex = 0;
            userLetters = [];
        }
    }
};

const checkRealWord = () => {
    let isRealWord = false;
    if (userLetters.length === 5 && currentAttemptIndex < 6) {
        const userWord = userLetters.join("");
        for (let word of wordList) {
            if (word === userWord) {
                isRealWord = true;
                return;
            } 
        }
        if (isRealWord === false) {
            messageEl.textContent = "Not a valid word";
            messageEl.style.color = "#FF0000";
        }
    }
};

const checkResponse = () => {
    const lettersEl = document.querySelector(`.${attempt}`).querySelectorAll('.letter');

    const winningLetters = winningWord.split("");
    const backgroundColors = ["gray", "gray", "gray", "gray", "gray"]

    for (let i = 0; i < userLetters.length; i++) {
        if (userLetters[i] === winningLetters[i]) {
            backgroundColors[i] = "green";
            winningLetters.splice(i, 1, null);
            userLetters.splice(i, 1, null);
        }
    }

    for (let i = 0; i < userLetters.length; i++) {
        if (winningLetters.includes(userLetters[i]) && userLetters[i] !== null) {
            backgroundColors[i] = "gold";
            winningLetters.splice(winningLetters.indexOf(userLetters[i]), 1, null);
        }
    }

    lettersEl.forEach((letter, index) => {
        letter.style.backgroundColor = backgroundColors[index];
        if (letter.style.backgroundColor === "green") {
            letter.style.color = "#FFFFFF";
        } else {
            letter.style.color = "#000000";
        }
        letter.style.transform = "rotateY(360deg)";
        letter.style.transition = "transform 1.5s, background-color 1s";
    })

    if (userLetters.every((char, index) => char === winningLetters[index])) {
        winner = true;
    }

    changeKeyColors();
};

const changeKeyColors = () => {
    const lettersEl = document.querySelector(`.${attempt}`).querySelectorAll('.letter');

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
                key.style.backgroundColor = "gold";
            }
        } else if (grayLetters.includes(key.textContent)) {
            key.style.backgroundColor = "gray";
        }
    })
};

const checkWinner = () => {
    if (winner || (winner !== true && currentAttemptIndex === 5)) {
        keyContainerEl.remove();
        gamePlayEl.appendChild(returnButtonEl);
    }
    messageEl.style.color = "";
    if (winner) {
        messageEl.textContent = `Congratulations! ${winningWord.toUpperCase()} is the correct word!`;
    } else if (winner !== true && currentAttemptIndex === 5) {
        messageEl.textContent = `Game Over. The correct word is ${winningWord.toUpperCase()}`;
    }
};

/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener('DOMContentLoaded', home);

banana.addEventListener('click', () => {
    keyContainerEl.remove();
    returnButtonEl.remove();
    home();
})

startButtonEl.addEventListener('click', start);

keysEl.forEach((key) => {
    key.addEventListener('click', () => {
        keys(key);
    })
});

backspaceKeyEl.addEventListener('click', backspace);

submitKeyEl.addEventListener('click', submit);

returnButtonEl.addEventListener('click', () => {
    returnButtonEl.remove();
    home();
});