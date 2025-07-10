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
// const winningWord = wordList[Math.floor(Math.random() * wordList.length)];
const winningWord = "after";
const winningWordArray = winningWord.split("");

console.log(winningWord);
console.log(winningWordArray);

console.log(wordleBoard[attempt]);
// Game initializes game board
const init = () => {
    for (let attempt of attempts) {
        for (let i = 0; i < 5; i++) {
            document.getElementById(wordleBoard[attempt][i]).style.backgroundColor = "";
            document.getElementById(wordleBoard[attempt][i]).textContent = "";
        }
    }
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
    startButtonEl.remove();
    messageEl.textContent = "";
})

// Game checks to make sure it is a word

// Game finds if any letters are the same as the winning word and if they are in the same position
const compareWords = () => {
        const wordEl = document.querySelector(`.${attempt}`);
        const lettersEl = wordEl.querySelectorAll('.letter');
        const keysEl = document.querySelectorAll('#key');

        if (userArray.every((char, index) => char === winningWordArray[index])) {
            lettersEl.forEach((letter) => {
                letter.style.backgroundColor = "green";
            })
            winner = true;
        }

        const correctPositionLetters = [];
        const containsLetters = [];
        const lettersNotContained = [];

        for (let i = 0; i < userArray.length; i++) {
            if (userArray[i] === winningWordArray[i]) {
                correctPositionLetters.push(userArray[i]);
            } else if (winningWordArray.includes(userArray[i])) {
                containsLetters.push(userArray[i]);
            } else {
                lettersNotContained.push(userArray[i]);
            }
        }
        
        keysEl.forEach((key) => {
            if (lettersNotContained.includes(key.textContent)) {
                key.style.backgroundColor = "gray";
            }
        })

        console.log("Correct positions: "+ correctPositionLetters);
        console.log("Contains letters: "+ containsLetters);
        lettersEl.forEach((letter) => {
            if (correctPositionLetters.includes(letter.textContent.toLowerCase()) && parseInt(letter.id) % 5 === winningWordArray.indexOf(letter.textContent.toLowerCase())) {
                letter.style.backgroundColor = "green";
                if (winningWordArray.filter((char) => char === letter.textContent.toLowerCase()).length === 1) {
                    correctPositionLetters.shift();
                }
                // containsLetters.splice(containsLetters.indexOf(letter.textContent.toLowerCase()), 1);
            } else if (containsLetters.includes(letter.textContent.toLowerCase()) /*&& letter.textContent.toLowerCase() !== userArray[i]*/) {
                if (letter.style.backgroundColor !== "green") {
                    letter.style.backgroundColor = "yellow";
                }
                if (winningWordArray.filter((char) => char === letter.textContent.toLowerCase()).length === 1) {
                    containsLetters.shift();
                }
            }
        })

    // lettersEl.forEach((letter) => {
    //     for (let i = 0; i < 5; i++) {
    //     if (containsLetters.includes(letter.textContent.toLowerCase()) && letter.textContent.toLowerCase() !== userArray[i]) {
    //         if (letter.style.backgroundColor !== "green") {
    //             letter.style.backgroundColor = "yellow";
    //         }
    //         if (userArray.filter((char) => char === letter.textContent.toLowerCase()).length === 1) {
    //             containsLetters.shift();
    //         }
    //     }}
    // })
}
// User continues to guess for words down each row
// If user finds word before the sixth row finishes, then user wins the game; loses if the user does not
// Restart game if user wishes
restartButtonEl.addEventListener('click', () => {
    restartButtonEl.remove();
    init();
});