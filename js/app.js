import { keyContainerEl, backspaceKeyEl, enterKeyEl } from "./setup.js";
import { wordList } from "./data.js";

const startButtonEl = document.querySelector('#start');
const messageEl = document.querySelector('#message');
const gamePlayEl = document.querySelector('#game-play');
const wordEl = document.querySelector('.word');

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

// backspaceKeyEl.addEventListener('click', () => {
//     for (let i = wordleBoard[wordleIndex][attempt].length; i >= 0; i--) {
//         if (document.getElementById(i).textContent !== "") {
//             userArray.pop();
//             document.getElementById(i).textContent = "";
//             return;
//         }
//     }
// })

const checkRealWord = () => {
    let isRealWord = false;
    if (userArray.length === 5 && currentAttemptIndex < 6) {
        userWord = userArray.toString();
        for (let word of wordList) {
            if (word === userWord) {
                isRealWord = true;
            } 
        }
        if (!isRealWord) {
            messageEl.textContent = "Not a real word"
        }
    }
}

const compareWords = () => {

}

// Game selects a random word as the winning word from a data array
const winningWord = wordList[Math.floor(Math.random() * wordList.length)];
const winningWordArray = winningWord.split("");
// Game initializes game board
const init = () => {
    currentAttemptIndex = 0;
    attempt = attempts[currentAttemptIndex];
    charIndex = 0;
    userArray = [];
}

document.addEventListener('DOMContentLoaded', init);
// User inputs letters for a word in the first row
// const render = () => {
//     for (let i = 0; i < keys.length - 2; i++) {
//         keys[i].addEventListener('click', () => {
//             userArray.push(keys[i].textContent);
//             document.getElementById(wordleBoard[attempt][charIndex]).textContent = keys[i].textContent.toUpperCase();
//             charIndex++;
//             console.log(userArray);
//         });
//     }
// }

const render = () => {

    for (let i = 0; i < keys.length - 2; i++) {
        keys[i].addEventListener('click', () => {
            if (charIndex < 5 && currentAttemptIndex < 6) {
                userArray.push(keys[i].textContent);
                console.log(charIndex);
                document.getElementById(wordleBoard[attempt][charIndex]).textContent = keys[i].textContent.toUpperCase();
                charIndex++;
                console.log(userArray);
            }
        });
    }

    enterKeyEl.addEventListener('click', () => {
        if (userArray.length === 5 && currentAttemptIndex < 6) {
            currentAttemptIndex++;
            attempt = attempts[currentAttemptIndex];
            charIndex = 0;
            userArray = [];
        }
    })

    backspaceKeyEl.addEventListener('click', () => {
            userArray.pop();
            charIndex--;
            document.getElementById(wordleBoard[attempt][charIndex]).textContent = "";
    })
    
}



startButtonEl.addEventListener('click', () => {
    gamePlayEl.appendChild(keyContainerEl);
    startButtonEl.remove();
    render();
})

// Game checks to make sure it is a word

// Game finds if any letters are the same as the winning word and if they are in the same position
// User continues to guess for words down each row
// If user finds word before the sixth row finishes, then user wins the game; loses if the user does not