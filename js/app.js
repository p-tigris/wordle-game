import { keyContainerEl, backspaceKeyEl, enterKeyEl } from "./setup.js";
import { wordList } from "./data.js";

const startButtonEl = document.querySelector('#start');
const gamePlayEl = document.querySelector('#game-play');
const wordEl = document.querySelector('.word');

startButtonEl.addEventListener('click', () => {
    gamePlayEl.appendChild(keyContainerEl);
    startButtonEl.remove();
})

const attempts = ["first", "second", "third", "fourth", "fifth", "sixth"];
let currentAttemptIndex = 0;
let attempt = attempts[currentAttemptIndex];

const keys = keyContainerEl.children;

const wordleBoard = [
    {
        "first": ["0", "1", "2", "3", "4"]
    }, 
    {
        "second": ["5", "6", "7", "8", "9"]
    }, 
    {
        "third": ["10", "11", "12", "13", "14"]
    }, 
    {
        "fourth": ["15", "16", "17", "18", "19"]
    }, 
    {
        "fifth": ["20", "21", "22", "23", "24"]
    }, 
    {
        "sixth": ["25", "26", "27", "28", "29"]
    },
];

let wordleIndex = 0;
let userArray = [];

for (let i = 0; i < keys.length - 2; i++) {
    keys[i].addEventListener('click', () => {
        for (let j = 0; j < wordleBoard[wordleIndex][attempt].length; j++) {
            if (document.getElementById(j).textContent === "") {
                userArray.push(keys[i].textContent);
                document.getElementById(j).textContent = keys[i].textContent;
                return;
            }
        }
    })
}

backspaceKeyEl.addEventListener('click', () => {
    for (let i = wordleBoard[wordleIndex][attempt].length; i >= 0; i--) {
        if (document.getElementById(i).textContent !== "") {
            userArray.pop();
            document.getElementById(i).textContent = "";
            return;
        }
    }
})

enterKeyEl.addEventListener('click', () => {
    if (userArray.length === 5 && currentAttemptIndex < 6) {
        currentAttemptIndex++;
        wordleIndex++;
        attempt = attempts[currentAttemptIndex];
    }
})


const checkRealWord = () => {

}

const compareWords = () => {

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
    wordleIndex = 0;
    userArray = [];
}
// User inputs letters for a word in the first row
// Game checks to make sure it is a word
// Game finds if any letters are the same as the winning word and if they are in the same position
// User continues to guess for words down each row
// If user finds word before the sixth row finishes, then user wins the game; loses if the user does not