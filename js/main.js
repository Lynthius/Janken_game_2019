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

const hands = [...document.querySelectorAll(".select-box img")];
const input = document.querySelector("input");
const nameBtn = document.querySelector(".name-btn");
const playerIntr = document.querySelector(".game-section__header");
const playBtn = document.querySelector(".play-btn");
const instructionSection = document.querySelector(".instruction-section");
const gameSection = document.querySelector(".game-section");
const statSection = document.querySelector(".statistics-footer")
const resultsSection = document.querySelector(".results")
const scoreSection = document.querySelector(".scores")
const scoresBtn = document.querySelector(".statistics__button");
const heartsContainer = document.querySelector(".hearts");

function playerNameCreator(e) {
  e.preventDefault();
  playerName.name = input.value;
  input.value = "";
};

instructionSection.addEventListener("submit", playerNameCreator)

function showIntroduction() {
  playerIntr.textContent = `Choose your destiny ${playerName.name}-san...`;
  instructionSection.style.display = "none";
  gameSection.style.display = "block";
  statSection.style.display = "flex";
};

instructionSection.addEventListener("submit", showIntroduction)

function showGameScores() {
  if (resultsSection.style.display === "block") {
    resultsSection.style.display = "none";
    scoreSection.style.display = "block";
    scoresBtn.textContent = "Game results >";
  } else {
    resultsSection.style.display = "block";
    scoreSection.style.display = "none";
    scoresBtn.textContent = "Game scores >";
  };
};

scoresBtn.addEventListener("click", showGameScores);

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
  if (player === comp) {
    gameSummary.counter = 1;
    ++gameSummary.games;
    ++gameSummary.draws;
    checkForLives()
    return "draw";
  } else if ((player === "paper" && comp === "rock") || (player === "rock" && comp === "scissors") || (player === "scissors" && comp === "paper")) {
    gameSummary.counter++;
    ++gameSummary.games;
    ++gameSummary.wins;
    gameSummary.prize += 50;
    checkForLives()
    return "win";
  } else {
    gameSummary.counter = 1;
    ++gameSummary.games;
    ++gameSummary.loses;
    gameSummary.lives--;
    const heart = document.querySelector(".statistics__heart");
    heart.parentNode.removeChild(heart);
    checkForLives()
    return "lose";
  };
};

function checkForLives() {
  if (gameSummary.counter === 3 && gameSummary.lives < 3) {
    ++gameSummary.lives;
    const heart = document.createElement('img');
    heart.src = "./img/heart.svg";
    heart.classList.add("statistics__heart");
    heartsContainer.appendChild(heart);
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
  const gameNumbers = document.querySelector('[data-option="games"]');
  gameNumbers.textContent = gameSummary.games;
  const winNumbers = document.querySelector('[data-option="wins"]');
  winNumbers.textContent = gameSummary.wins;
  const drawNumbers = document.querySelector('[data-option="draws"]');
  drawNumbers.textContent = gameSummary.draws;
  const loseNumbers = document.querySelector('[data-option="loses"]');
  loseNumbers.textContent = gameSummary.loses;
  const prizeNumbers = document.querySelector('[data-option="prize"]');
  prizeNumbers.textContent = gameSummary.prize;

  if (result === "win") {
    const winner = document.querySelector('[data-summary="who-win"]');
    winner.textContent = `${playerName.name}`;
  } else if (result === "lose") {
    const winner = document.querySelector('[data-summary="who-win"]');
    winner.textContent = "Sachiko";
  } else {
    const winner = document.querySelector('[data-summary="who-win"]');
    winner.textContent = "nobody";
  };
};

function endGame() {
  document.querySelector(`[data-option="${game.playerHand}"]`).className = "select-box__image";
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