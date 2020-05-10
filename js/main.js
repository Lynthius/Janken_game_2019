const playerName = {
  name: "",
};

const gameSummary = {
  games: 0,
  wins: 0,
  loses: 0,
  draws: 0,
};

const game = {
  playerHand: "",
  compHand: "",
};

const hands = [...document.querySelectorAll(".select-container img")];
const input = document.querySelector("input");
const nameBtn = document.querySelector(".name-btn");
const playerIntr = document.querySelector(".introduction");
const playBtn = document.querySelector(".play-btn");

const playerNameCreator = (e) => {
  e.preventDefault();
  playerName.name = input.value;
  input.value = "";
};

nameBtn.addEventListener("click", playerNameCreator)

const showIntroduction = () => {
  playerIntr.textContent = `Choose your destiny ${playerName.name}-san...`;
};

nameBtn.addEventListener("click", showIntroduction)

const handSelector = (e) => {
  game.playerHand = e.target.dataset.option
  hands.forEach(hand => hand.style.boxShadow = "");
  e.target.style.boxShadow = "0 0 0 4px yellow";
};

hands.forEach(hand => hand.addEventListener("click", handSelector));

const randomHand = () => {
  let randomIndex = Math.floor(Math.random() * 3);
  let randomHand = hands[randomIndex].dataset.option;
  return randomHand;
};

const checkResult = (player, comp) => {
  if (player === comp) {
    ++gameSummary.games;
    ++gameSummary.draws;
    return "draw";
  } else if ((player === "paper" && comp === "rock") || (player === "rock" && comp === "scissors") || (player === "scissors" && comp === "paper")) {
    ++gameSummary.games;
    ++gameSummary.wins;
    return "win";
  } else {
    ++gameSummary.games;
    ++gameSummary.loses;
    return "lose";
  };
};

const showResults = (player, comp, result) => {
  const playerChoice = document.querySelector('[data-summary="your-choice"]');
  playerChoice.textContent = player;
  const compChoice = document.querySelector('[data-summary="cp-choice"]');
  compChoice.textContent = comp;
  const gameNumbers = document.querySelector("p.games span");
  gameNumbers.textContent = gameSummary.games;
  const winNumbers = document.querySelector("p.wins span");
  winNumbers.textContent = gameSummary.wins;
  const drawNumbers = document.querySelector("p.draws span");
  drawNumbers.textContent = gameSummary.draws;
  const loseNumbers = document.querySelector("p.loses span");
  loseNumbers.textContent = gameSummary.loses;

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

const endGame = () => {
  document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = "";
  game.playerHand = "";
  game.compHand = "";
};

const startGame = () => {
  if (game.playerHand) {
    game.compHand = randomHand();
    console.log(game.compHand);
    const gameResult = checkResult(game.playerHand, game.compHand);
    console.log(gameResult);
    showResults(game.playerHand, game.compHand, gameResult);
    endGame();
  } else {
    return alert("Choose your hand!");
  };
};

playBtn.addEventListener("click", startGame);