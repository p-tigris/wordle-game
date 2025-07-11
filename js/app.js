import { startButtonEl, keyContainerEl, backspaceKeyEl, enterKeyEl, restartButtonEl } from "./setup.js";
import { wordList } from "./data.js";

const messageEl = document.querySelector('#message');
const gamePlayEl = document.querySelector('#game-play');

const attempts = ["first", "second", "third", "fourth", "fifth", "sixth"];
let currentAttemptIndex = 0;
let attempt = attempts[currentAttemptIndex];

let winner;

const keys = keyContainerEl.children;

const wordleBoard = {
        "first": ["0", "1", "2", "3", "4"], 
        "second": ["5", "6", "7", "8", "9"], 
        "third": ["10", "11", "12", "13", "14"], 
        "fourth": ["15", "16", "17", "18", "19"], 
        "fifth": ["20", "21", "22", "23", "24"], 
        "sixth": ["25", "26", "27", "28", "29"],
};

let userArray = [];
let charIndex;

const checkRealWord = () => {
    let isRealWord = false;
    console.log(userArray);
    if (userArray.length === 5 && currentAttemptIndex < 6) {
        const userWord = userArray.join("");
        console.log(userWord);
        for (let word of wordList) {
            if (word === userWord) {
                isRealWord = true;
                return;
            } 
        }
    if (isRealWord === false) {
        messageEl.textContent = "Not an allowed word";
        return;
    }
    }
}

const checkWinner = () => {
    if (winner === true) {
        messageEl.textContent = `Congratulations! ${winningWord.toUpperCase()} is the correct word!`;
        keyContainerEl.remove();
        gamePlayEl.appendChild(restartButtonEl);
    } else if (winner !== true && currentAttemptIndex === 5) {
        messageEl.textContent = `Game Over. The correct word is ${winningWord.toUpperCase()}`;
        keyContainerEl.remove();
        gamePlayEl.appendChild(restartButtonEl);
    }
}

// Game selects a random word as the winning word from a data array
let winningWord;
let winningWordArray;

console.log(wordleBoard[attempt]);
// Game initializes game board
const init = () => {
    for (let attempt of attempts) {
        for (let i = 0; i < 5; i++) {
            document.getElementById(wordleBoard[attempt][i]).style.backgroundColor = "";
            document.getElementById(wordleBoard[attempt][i]).textContent = "";
        }
    }
    winningWord = wordList[Math.floor(Math.random() * wordList.length)];
    winningWordArray = winningWord.split("");
    console.log(winningWord);
    console.log(winningWordArray);
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

for (let i = 0; i < keys.length - 2; i++) {
    keys[i].addEventListener('click', () => {
        if (charIndex < 5 && currentAttemptIndex < 6) {
            userArray.push(keys[i].textContent);
            if (userArray.length === 5) {
                checkRealWord();
            }
            document.getElementById(wordleBoard[attempt][charIndex]).textContent = keys[i].textContent.toUpperCase();
            charIndex++;
            console.log(userArray);
        }
    });
}

enterKeyEl.addEventListener('click', () => {
    if (messageEl.textContent === "Not an allowed word") {
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
        document.getElementById(wordleBoard[attempt][charIndex]).textContent = "";
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
    const keysEl = document.querySelectorAll('.key');

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
            backgroundColors[/*userArray.indexOf(userArray[i])*/i] = "yellow";
            userArray.splice(i, 1, null);
        }
    }

    lettersEl.forEach((letter, index) => {
        letter.style.backgroundColor = backgroundColors[index];
    })

    keysEl.forEach((key) => {
        const grayLetters = [];
        const nonGrayLetters = [];
        lettersEl.forEach((letter) => {
            if (letter.style.backgroundColor === "gray") {
                grayLetters.push(letter.textContent);
            } else {
                nonGrayLetters.push(letter.textContent);
            }
        })
        for (let i = 0; i < grayLetters.length; i++) {
            if (nonGrayLetters.includes(grayLetters[i])) {
                grayLetters.splice(i, 1, null);
            }
        }
        for (let letter of grayLetters) {
            if (key.textContent.toUpperCase() === letter) {
                key.style.backgroundColor = "gray";
            }
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