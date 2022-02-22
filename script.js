"use strict";

// Selecting dom element

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const rollBtnEl = document.querySelector(".btn--roll");
const newBtnEl = document.querySelector(".btn--new");
const holdBtnEl = document.querySelector(".btn--hold");
const players0El = document.querySelector(".player--0");
const players1El = document.querySelector(".player--1");
const correntScoresEl = document.querySelectorAll(".current-score");

// const correntScore0El = document.querySelector("#current--0");
// const correntScore1El = document.querySelector("#current--1");
// const playersEl1 = document.querySelector('.player');
// console.log(playersEl);
// console.log(correntScoresEl);

// Starting conditions

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");
let currentScoreValue = 0;
let activePlayer = 0;
const scoresValue = [0, 0];
const switchPlayer = function () {
  currentScoreValue = 0;
  correntScoresEl[activePlayer].textContent = currentScoreValue;
  activePlayer = activePlayer === 0 ? 1 : 0;
  players0El.classList.toggle("player--active");
  players1El.classList.toggle("player--active");
};
let plaing = true;

const randomNumGen = () => Math.trunc(Math.random() * 6) + 1;
// console.log(randomNumGen());

rollBtnEl.addEventListener("click", function () {
  if (plaing) {
    const randomNum = randomNumGen();
    console.log(randomNum);
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${randomNum}.png`;
    if (randomNum !== 1) {
      currentScoreValue += randomNum;
      correntScoresEl[activePlayer].textContent = currentScoreValue;
    } else {
      switchPlayer();
    }
  }
});

holdBtnEl.addEventListener("click", function () {
  if (plaing) {
    scoresValue[activePlayer] += currentScoreValue;
    document.getElementById(`score--${activePlayer}`).textContent =
      scoresValue[activePlayer];
    if (scoresValue[activePlayer] >= 50) {
      plaing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

newBtnEl.addEventListener("click", function () {
  plaing = true;
  if (plaing) {
    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScoreValue = 0;
    for (let i = 0; i < correntScoresEl.length; i++) {
      scoresValue[i] = 0;
      correntScoresEl[i].textContent = 0;
    }
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--winner");
    document.querySelector(".player--0").classList.add("player--active");
    activePlayer = 0;
  }
});
