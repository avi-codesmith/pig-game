"use strict";

// Selecting Elements

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const current = document.querySelectorAll(".current");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const sound = document.querySelector(".sound");
const bColor = document.querySelector(".color");
const background = document.querySelector("body");
const target = document.querySelector(".target");
const badge = document.querySelector(".badge");

// Change background color
bColor.addEventListener("input", () => {
  background.style.backgroundColor = bColor.value;
});

let targetInput = 100;

target.addEventListener("input", function (event) {
  targetInput = Number(event.target.value);
  console.log(targetInput);
});

// Load dice roll sound
const diceRollSound = new Audio("sounddice.mp3");
const win = new Audio("win.mp3");
const hold = new Audio("hold.mp3");
const newgame = new Audio("newgame.mp3");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let volume = true;
// Starting Conditions

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

// Rolling Dice
btnRoll.addEventListener("click", function () {
  badge.style.display = "none";
  if (playing) {
    // Reset and play dice roll sound
    if (volume) {
      diceRollSound.currentTime = 0; // Reset to start
      diceRollSound
        .play()
        .catch((error) => console.error("Audio playback error:", error));
    }
    const dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    document.querySelector(".dice").classList.add("diceMove");

    setTimeout(() => {
      document.querySelector(".dice").classList.remove("diceMove");
    }, 200);
    // Generating Random num.

    // Display Dice

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

    if (scores[activePlayer] >= targetInput) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      // win.currentTime = 0; // Reset to start
      if (volume) {
        win
          .play()
          .catch((error) => console.error("Audio playback error:", error));
      }
    } else {
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      current0El.textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");

      if (volume) {
        hold.currentTime = 0;
        hold
          .play()
          .catch((error) => console.error("Audio playback error:", error));
      }
    }
  }
});
btnNew.addEventListener("click", function () {
  if (volume) {
    newgame.play();
    newgame.addEventListener("ended", function () {
      location.reload();
    });
  } else {
    location.reload();
  }
});

sound.addEventListener("click", function () {
  if (sound.src.includes("volume.png")) {
    sound.src = "mute.png";
    volume = false;
  } else if (sound.src.includes("mute.png")) {
    sound.src = "volume.png";
    volume = true;
  }
});
