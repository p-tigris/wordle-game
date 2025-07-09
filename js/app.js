import { keyContainerEl, backspaceKeyEl, enterKeyEl } from "./setup.js";

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

const wordleWords = [
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

const userArray = []

for (let i = 0; i < keys.length - 2; i++) {
    keys[i].addEventListener('click', () => {
        for (let j = 0; j < wordleWords[wordleIndex][attempt].length; j++) {
            if (document.getElementById(j).textContent === "") {
                userArray.push(keys[i].textContent);
                document.getElementById(j).textContent = keys[i].textContent;
                return;
            }
        }
    })
}

backspaceKeyEl.addEventListener('click', () => {
    for (let i = 4; i >= 0; i--) {
        if (document.getElementById(i).textContent !== "") {
            userArray.pop();
            document.getElementById(i).textContent = "";
            return;
        }
    }
})

enterKeyEl.addEventListener('click', () => {
    if (userArray.length === 5) {
        currentAttemptIndex++;
        wordleIndex++;
        attempt = attempts[currentAttemptIndex];
    }
})


const checkRealWord = () => {

}

const compareWords = () => {

}

// for (let i = 0; i < keys.length - 2; i++) {
//     keys[i].addEventListener('click', (key) => {
//         for (const word of wordleWords) {
//             for (const numberWord in word) {
//                 for (let j = 0; j < word[numberWord].length; j++) {
//                     document.getElementById(j).textContent = key.textContent;
//                 }
//             }
//         }
//     })
// }

// console.log(document.getElementById(wordleWords[0]['first'][0]));

// Game selects a random word as the winning word from a data array
// User inputs letters for a word in the first row
// Game checks to make sure it is a word
// Game finds if any letters are the same as the winning word and if they are in the same position
// User continues to guess for words down each row
// If user finds word before the sixth row finishes, then user wins the game; loses if the user does not