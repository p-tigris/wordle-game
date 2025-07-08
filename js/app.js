import { keyContainerEl } from "./setup.js";

const startButtonEl = document.querySelector('#start');
const gamePlayEl = document.querySelector('#game-play');
const wordEl = document.querySelector('.word');

startButtonEl.addEventListener('click', () => {
    gamePlayEl.appendChild(keyContainerEl);
    startButtonEl.remove();
})

const userArray = [];

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

for (let i = 0; i < keys.length - 2; i++) {
    keys[i].addEventListener('click', () => {
        document.getElementById('0').textContent = keys[i].textContent;
    })
}

keys[keys.length - 2].addEventListener('click', () => {
    document.getElementById('0').textContent = "";
})

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