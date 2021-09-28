// selecting elements

const currentScore = document.querySelector(".currentScore");
const currentNum0El = document.querySelector(".currentNum0El");
const currentNum1El = document.querySelector(".currentNum1El");
const totalScore = document.querySelector(".totalScore");
const totalNum0EL = document.querySelector(".total0Num");
const totalNum1EL = document.querySelector(".total1Num");
const player0 = document.querySelector(".player0");
const player1 = document.querySelector(".player1");

const rollDiceBtn = document.querySelectorAll(".rollDice");
const holdScoreBtn = document.querySelectorAll(".holdScore");
const newGameBtn = document.querySelectorAll(".newGame");

const diceImage = document.querySelector(".diceImage");

let currentNum, activePlayer, totalScores, stillPLaying;

const init = function () {
  currentNum = 0;
  activePlayer = 0;
  totalScores = [0, 0];
  stillPlaying = true;

  player0.classList.add("activePlayer");
  player1.classList.remove("activePlayer");
  document.querySelector(".diceRollSpan").classList.add("hidden");
  diceImage.classList.add("hidden");
  player0.classList.remove("playerWinner");
  player1.classList.remove("playerWinner");

  document.querySelector(".currentNum0El").textContent = 0;
  document.querySelector(".total0Num").textContent = 0;
  document.querySelector(".currentNum1El").textContent = 0;
  document.querySelector(".total1Num").textContent = 0;
};

init();

const switchPlayer = function () {
  document.querySelector(`.currentNum${activePlayer}El`).textcontent = 0;
  currentNum = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("activePlayer");
  player1.classList.toggle("activePlayer");
};

// implementing roll dice button
for (let i = 0; i < rollDiceBtn.length; i++) {
  rollDiceBtn[i].addEventListener("click", function () {
    if (stillPlaying) {
      const diceNumber = Math.trunc(Math.random() * 6 + 1);
      // console.log(diceNumber);

      diceImage.src = `images/dice${diceNumber}.png`;
      document.querySelector(".diceRollSpan").classList.remove("hidden");
      diceImage.classList.remove("hidden");

      if (diceNumber !== 1) {
        currentNum += diceNumber;
        //   console.log(currentNum);
        document.querySelector(`.currentNum${activePlayer}El`).textContent =
          currentNum;
      } else {
        //   totoalScores.push(currentNum);
        //   console.log(totoalScores);
        //   const lastArrayEl = totoalScores[totoalScores.length - 1];
        //   console.log(lastArrayEl);
        //   totalNumEL.textContent = lastArrayEl;
        switchPlayer();
      }
    }
  });
}

// implementing hold button feature
for (let i = 0; i < holdScoreBtn.length; i++) {
  holdScoreBtn[i].addEventListener("click", function () {
    if (stillPlaying) {
      diceImage.classList.add("hidden"); // hide dice image

      // add current score to total scores of the active player

      totalScores[activePlayer] += currentNum;
      // console.log(currentNum);

      document.querySelector(`.total${activePlayer}Num`).textContent =
        totalScores[activePlayer];
      // console.log(typeof totalNumEL.textContent, totalNumEL.textContent);
      if (totalScores[activePlayer] >= 100) {
        stillPlaying = false;
        diceImage.classList.add("hidden");
        document
          .querySelector(`.player${activePlayer}`)
          .classList.add("playerWinner");
        document
          .querySelector(`.player${activePlayer}`)
          .classList.remove("activePlayer");
      }
      // score > 500? ... if yes finish game, else switch to next player

      switchPlayer();
    }
  });
}

// implementing new game button feature
for (let i = 0; i < newGameBtn.length; i++) {
  newGameBtn[i].addEventListener("click", init);
}
