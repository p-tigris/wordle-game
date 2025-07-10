import { keyContainerEl, backspaceKeyEl, enterKeyEl } from "./setup.js";
import { wordList } from "./data.js";

const startButtonEl = document.querySelector('#start');
const messageEl = document.querySelector('#message');
const gamePlayEl = document.querySelector('#game-play');

const attempts = ["first", "second", "third", "fourth", "fifth", "sixth"];
let currentAttemptIndex = 0;
let attempt = attempts[currentAttemptIndex];

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
        messageEl.textContent = "Not an allowed word"
        return;
    }
    }
}

// Game selects a random word as the winning word from a data array
const winningWord = wordList[Math.floor(Math.random() * wordList.length)];
const winningWordArray = winningWord.split("");

console.log(winningWord);
console.log(winningWordArray);
// Game initializes game board
const init = () => {
    currentAttemptIndex = 0;
    attempt = attempts[currentAttemptIndex];
    charIndex = 0;
    userArray = [];
    messageEl.textContent = "Press Start Game to begin!"
}

document.addEventListener('DOMContentLoaded', init);
// User inputs letters for a word in the first row

const render = () => {
    messageEl.textContent = "";

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
        } else if (userArray.length === 5 && currentAttemptIndex < 6) {
            compareWords();
            currentAttemptIndex++;
            attempt = attempts[currentAttemptIndex];
            charIndex = 0;
            userArray = [];
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
}



startButtonEl.addEventListener('click', () => {
    gamePlayEl.appendChild(keyContainerEl);
    startButtonEl.remove();
    render();
})

// Game checks to make sure it is a word

// Game finds if any letters are the same as the winning word and if they are in the same position
const compareWords = () => {
    // for (let char of userArray) {
    //     for (let i = 0; i < winningWordArray.length; i++) {
    //         if (char === winningWordArray[i]) {
    //             for (let j = 0; j < wordleBoard[attempt].length; j++) {
    //                 if (document.getElementById(wordleBoard[attempt][j]).textContent === char) {
    //                     console.log(document.getElementById(wordleBoard[attempt][j]));
    //                     document.getElementById(wordleBoard[attempt][j]).style.backgroundColor = "yellow";
    //                 }
    //             }
    //         }
    //     }
    // }
    const wordEl = document.querySelector(`.${attempt}`);
    console.log(wordEl);
    const lettersEl = wordEl.querySelectorAll('.letter');

    if (userArray.every((char, index) => char === winningWordArray[index])) {
        lettersEl.forEach((letter) => {
            letter.style.backgroundColor = "green";
        })
    }
}
// User continues to guess for words down each row
// If user finds word before the sixth row finishes, then user wins the game; loses if the user does not