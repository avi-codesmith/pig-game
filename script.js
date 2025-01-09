"usestrict";

// Selecting Elements

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
// Starting Conditions

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

// Rolling Dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    // Generating Random num.
    const dice = Math.trunc(Math.random() * 6 + 1);
    // Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    // Switch to another player
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      current0El.textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      current0El.textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
    }
  }
});

document.querySelector(".btn--new").addEventListener("click", function () {
  location.reload();
});
