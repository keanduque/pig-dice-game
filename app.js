/**
 * Author : Kean Duque
 * Project : Dice Game 2
 */
"use strict";

//initialize variable by querySelector
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const name0El = document.querySelector("#name--0");
const name1El = document.querySelector("#name--1");
// const diceThrowEl = document.querySelector(".dice-throw");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const imgSrc = "src";

let scores, currentScore, activePlayer, playing;

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  name0El.textContent = "Player 1";
  name1El.textContent = "Player 2";
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// rolling dice functionality
btnRoll.addEventListener("click", function (e) {
  if (playing) {
    //1. generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `${imgSrc}/dice-${dice}.png`;
    diceEl.classList.add("play");

    setTimeout(() => {
      //const throwDice = Math.trunc(Math.random() * 6) + 1;
      //diceThrowEl.src = `${imgSrc}/dice-${throwDice}.png`; //throwing dice
      diceEl.classList.remove("play");
    }, 500);

    //3. check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      setTimeout(() => {
        document.getElementById(
          `current--${activePlayer}`
        ).textContent = currentScore;
      }, 700);
    } else {
      //switching to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    //1. add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      //Finish the game
      playing = false;

      document.getElementById(`name--${activePlayer}`).textContent =
        "🏆 Winner!";

      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});
//reseting game
btnNew.addEventListener("click", init);
