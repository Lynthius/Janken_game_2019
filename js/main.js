const playerName = {
  name: "",
};

const gameSummary = {
  games: 0,
  wins: 0,
  loses: 0,
  draws: 0,
  lives: 3,
  prize: 0,
  counter: 1
};

const game = {
  playerHand: "",
  compHand: "",
};

const hands = [...document.querySelectorAll(".select img")];
const input = document.querySelector("input");
const nameBtn = document.querySelector(".name-btn");
const playerIntr = document.querySelector(".introduction");
const playBtn = document.querySelector(".play-btn");

function playerNameCreator(e) {
  e.preventDefault();
  playerName.name = input.value;
  input.value = "";
};

input.addEventListener("submit", playerNameCreator)

function showIntroduction() {
  playerIntr.textContent = `Choose your destiny ${playerName.name}-san...`;
};

input.addEventListener("submit", showIntroduction)

function handSelector(e) {
  game.playerHand = e.target.dataset.option
  hands.forEach(hand => hand.className = "select-box__image");
  e.target.className = `${e.target.className}--${e.target.dataset.option}`;
};

hands.forEach(hand => hand.addEventListener("click", handSelector));

function randomHand() {
  let randomIndex = Math.floor(Math.random() * 3);
  let randomHand = hands[randomIndex].dataset.option;
  return randomHand;
};

function checkResult(player, comp) {
  checkForLives()
  if (player === comp) {
    ++gameSummary.games;
    ++gameSummary.draws;
    return "draw";
  } else if ((player === "paper" && comp === "rock") || (player === "rock" && comp === "scissors") || (player === "scissors" && comp === "paper")) {
    ++gameSummary.games;
    ++gameSummary.wins;
    ++gameSummary.counter;
    gameSummary.prize += 50;
    return "win";
  } else {
    ++gameSummary.games;
    ++gameSummary.loses;
    gameSummary.counter = 1;
    --gameSummary.lives;
    return "lose";
  };
};

function checkForLives() {
  if (gameSummary.counter === 2 && gameSummary.lives !== 3) {
    ++gameSummary.lives;
  }
  if (gameSummary.lives === 0) {
    return alert("Ups, you lose!");
  };
};

function showResults(player, comp, result) {
  const playerChoice = document.querySelector('[data-summary="your-choice"]');
  playerChoice.textContent = player;
  const compChoice = document.querySelector('[data-summary="cp-choice"]');
  compChoice.textContent = comp;
  const gameNumbers = document.querySelector("p.games span");
  gameNumbers.textContent = gameSummary.games;
  const winNumbers = document.querySelector("p.wins span");
  winNumbers.textContent = gameSummary.wins;
  const prizeNumbers = document.querySelector("p.prize span");
  prizeNumbers.textContent = gameSummary.prize;
  const drawNumbers = document.querySelector("p.draws span");
  drawNumbers.textContent = gameSummary.draws;
  const loseNumbers = document.querySelector("p.loses span");
  loseNumbers.textContent = gameSummary.loses;
  const livesNumbers = document.querySelector("p.lives span");
  livesNumbers.textContent = gameSummary.lives;

  if (result === "win") {
    const winner = document.querySelector('[data-summary="who-win"]');
    winner.textContent = `${playerName.name}-san`;
  } else if (result === "lose") {
    const winner = document.querySelector('[data-summary="who-win"]');
    winner.textContent = "Computer-san";
  } else {
    const winner = document.querySelector('[data-summary="who-win"]');
    winner.textContent = "nobody";
  };
};

function endGame() {
  document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = "";
  game.playerHand = "";
  game.compHand = "";
};

function startGame() {
  if (game.playerHand) {
    game.compHand = randomHand();
    const gameResult = checkResult(game.playerHand, game.compHand);
    showResults(game.playerHand, game.compHand, gameResult);
    endGame();
  } else {
    return alert("Choose your hand!");
  };
};

playBtn.addEventListener("click", startGame);