const playerName = {
    name: "",
};

const gameSummary = {
    games: 0,
    wins: 0,
    losses: 0,
    draws: 0,
};

const game = {
    playerHand: "",
    compHand: "",
};

const hands = document.querySelectorAll(".select-container img");
const input = document.querySelector("input");
const nameBtn = document.querySelector(".name-btn");
// const 

// Submit your name function
const playerNameCreator = (e) => {
    e.preventDefault();    
    playerName.name = input.value;
    console.log(playerName);
    input.value = "";    
};


// input.addEventListener("input", playerNameCreator)
nameBtn.addEventListener("click", playerNameCreator)

// Display chosen name in game introduction function



// Select your hand function
const handSelector = (e) => {
    game.playerHand = e.target.dataset.option
    console.log(game.playerHand);
    for (const hand of hands) {
        hand.style.boxShadow = "";
    };
    e.target.style.boxShadow = "0 0 0 4px yellow";
};

for (const hand of hands) {
    hand.addEventListener("click", handSelector);
};