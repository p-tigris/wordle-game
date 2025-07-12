import { startButtonEl, keyContainerEl, backspaceKeyEl, enterKeyEl, restartButtonEl } from "./setup.js";
import { wordList } from "./data.js";

const messageEl = document.querySelector('#message');
const gamePlayEl = document.querySelector('#game-play');

const attempts = ["first", "second", "third", "fourth", "fifth", "sixth"];
let currentAttemptIndex = 0;
let attempt = attempts[currentAttemptIndex];

const squaresEl = document.querySelectorAll(".letter");

let winner;

const keysEl = keyContainerEl.querySelectorAll(".key");

let userArray = [];
let charIndex;

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

// Game selects a random word as the winning word from a data array
let winningWord;
let winningWordArray;

// Game initializes game board
const init = () => {
    for (let square of squaresEl) {
        square.style.backgroundColor = "";
        square.textContent = "";
    }

    // winningWord = wordList[Math.floor(Math.random() * wordList.length)];
    winningWord = "water";
    winningWordArray = winningWord.split("");
    currentAttemptIndex = 0;
    attempt = attempts[currentAttemptIndex];
    charIndex = 0;
    userArray = [];
    winner = false;
    gamePlayEl.appendChild(startButtonEl);
    messageEl.textContent = "Press Start Game to begin!";
}

document.addEventListener('DOMContentLoaded', init);
// User inputs letters for a word in the first row

for (let i = 0; i < keysEl.length; i++) {
    keysEl[i].addEventListener('click', () => {
        if (winner) {
            return;
        }
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

enterKeyEl.addEventListener('click', () => {
    if (messageEl.textContent === "Not an allowed word" || winner) {
        return;
    } else if (userArray.length === 5 && currentAttemptIndex < 5) {
        compareWords();
        checkWinner();
        currentAttemptIndex++;
        attempt = attempts[currentAttemptIndex];
        charIndex = 0;
        userArray = [];
    } else if (currentAttemptIndex === 5) {
        compareWords();
        checkWinner();
    }
})

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

startButtonEl.addEventListener('click', () => {
    gamePlayEl.appendChild(keyContainerEl);
    document.querySelectorAll(".key").forEach((key) => {
        key.style.backgroundColor = "";
    })
    startButtonEl.remove();
    messageEl.textContent = "";
})
// Game checks to make sure it is a word

// Game finds if any letters are the same as the winning word and if they are in the same position
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

// User continues to guess for words down each row
// If user finds word before the sixth row finishes, then user wins the game; loses if the user does not
// Restart game if user wishes
restartButtonEl.addEventListener('click', () => {
    restartButtonEl.remove();
    init();
});