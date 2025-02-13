const words = [
  { word: "hammer", clue: "carpenter" },
  { word: "game", clue: "play" },
  { word: "style", clue: "fashion" },
  { word: "number", clue: "calculator" },
  { word: "poem", clue: "poet" },
  { word: "corpse", clue: "dead" },
  { word: "liter", clue: "scale" },
  { word: "sculpture", clue: "marble" },
  { word: "water", clue: "life" },
  { word: "cement", clue: "construction" },
  { word: "iron", clue: "sword" },
  { word: "computer", clue: "calculation" },
  { word: "wine", clue: "barrel" },
  { word: "tobacco", clue: "lighter" },
  { word: "bottle", clue: "liquid" },
  { word: "car", clue: "speed" },
  { word: "marker", clue: "mark" },
  { word: "battery", clue: "energy" },
  { word: "lighter", clue: "gas" },
  { word: "flag", clue: "country" },
  { word: "passport", clue: "foreigner" },
  { word: "alien", clue: "mars" },
  { word: "clock", clue: "timer" },
  { word: "bug", clue: "spider" },
];

const input = document.querySelector("#wordinput");
const guessBtn = document.querySelector("#guess");
const beforeguess = document.querySelector(".beforeguess");
const refresh = document.querySelector(".refresh");
const wlength = document.querySelector(".wordlength");
const clueDiv = document.querySelector(".clue");
const scoreDiv = document.querySelector(".score");
const yourScore = document.querySelector(".yourscore");
const losingSound = new Audio("wa.mp3");
const wrongSound = new Audio("wrong.mp3");
const correctSound = new Audio("correct.mp3");

let usedWords = [];
let randomIndex, randomWord, randomClue;
let point = 0;

function deleteOldLength() {
  wlength.innerHTML = "";
}

function getNewWord() {
  if (usedWords.length === words.length) {
    alert("All words have been used. Restarting the game!");
    usedWords = [];
  }

  do {
    randomIndex = Math.floor(Math.random() * words.length);
    randomWord = words[randomIndex].word;
    randomClue = words[randomIndex].clue;
  } while (usedWords.includes(randomWord));

  let spanned = randomWord.length + " WORD";
  const wordl = document.createElement("p");
  wordl.textContent = spanned;
  wlength.appendChild(wordl);

  usedWords.push(randomWord);

  clueDiv.textContent = `Clue: ${randomClue.toUpperCase()}`;
  scoreDiv.textContent = `Correct Letters: 0`;
}

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    guessBtn.click();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  deleteOldLength();
  getNewWord();

  input.addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ]/g, "");
  });

  guessBtn.addEventListener("click", function () {
    let inputValue = input.value.trim().toLowerCase();
    if (inputValue === "") {
      alert("Please Write a Word");
      return;
    }

    let correctLetters = 0;
    let checkedLetters = [];

    for (let char of inputValue) {
      if (randomWord.includes(char) && !checkedLetters.includes(char)) {
        correctLetters++;
        checkedLetters.push(char);
      }
    }

    scoreDiv.textContent = `Correct Letters: ${correctLetters}`;

    const newp = document.createElement("p");
    newp.textContent = inputValue;
    input.value = "";
    beforeguess.appendChild(newp);

    if (inputValue === randomWord.toLowerCase()) {
      correctSound.play();
      alert("Correct! You guessed the right word.");
      point++;
      yourScore.textContent = `Your Score: ${point}`;
      deleteOldLength();
      getNewWord();
      beforeguess.innerHTML = "";
    } else if (beforeguess.children.length <= 4) {
      wrongSound.play();
    } else if (beforeguess.children.length === 5) {
      losingSound.play();
      alert("You Lost");
      location.reload();
    }
  });
});

refresh.addEventListener("click", function () {
  location.reload();
});
