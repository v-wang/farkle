import * as DOMELEM from './domElems.js';

window.addEventListener('load', () => {
  initializeDice();
});

DOMELEM.diceImgs.forEach((dice) => {
  dice.addEventListener('click', () => {
    diceClick(dice);
  });
});

DOMELEM.rollBtn.addEventListener('click', () => {
  rollDice().then(() => updateDiceImg());
});

DOMELEM.bankBtn.addEventListener('click', () => {
  DOMELEM.score.innerText = updateScore(diceArr);
});

// Plan was to create multiple rounds but never got to this
class Round {
  constructor() {
    rolls: [];
  }
}
var game = [];
var diceArr = [];
var totalScore = 0;
const roll = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
};

function initializeDice() {
  for (var i = 0; i < 6; i++) {
    diceArr[i] = {};
    diceArr[i].id = 'die' + (i + 1);
    diceArr[i].value = i + 1;
    diceArr[i].clicked = 0;
  }
}

// ultimate plan was to play around with async and promises to avoid too many callbacks
/*Rolling dice values*/
async function rollDice() {
  for (var i = 0; i < 6; i++) {
    if (diceArr[i].clicked === 0) {
      diceArr[i].value = Math.floor(Math.random() * 6 + 1);
    }
  }
}

/*Updating images of dice given values of rollDice*/
function updateDiceImg() {
  diceArr.forEach((dice) => {});
  for (var i = 0; i < 6; i++) {
    document
      .getElementById(diceArr[i].id)
      .setAttribute('src', `images/${diceArr[i].value}.png`);
  }
}

function diceClick(img) {
  var i = img.getAttribute('data-number');

  img.classList.toggle('transparent');
  if (diceArr[i].clicked === 0) {
    diceArr[i].clicked = 1;
    updateScore(diceArr);
  } else {
    diceArr[i].clicked = 0;
  }
}

// Almost got this, tried to stuff it all into one switch case but I should probably parse this out - wrote out game rules and plan to refactor later
function updateScore(diceArr) {
  let selectedDice = diceArr.filter((die) => die.clicked != 0);

  selectedDice.forEach((die) => {
    roll[die.value]++;
  });

  let roundScore = [];
  switch (true) {
    case roll[1] == 3:
      roundScore.push(1000);
      break;
    case roll[1] == 4:
      roundScore.push(1100);
      break;
    case roll[1] == 5:
      roundScore.push(1200);
      break;
    case roll[1] == 6:
      roundScore.push(2000);
      break;
    case roll[1] < 3:
      roundScore.push(roll[1] * 100);
      break;
    case roll[5] == 3:
      roundScore.push(500);
      break;
    case roll[5] == 4:
      roundScore.push(550);
      break;
    case roll[5] == 5:
      roundScore.push(600);
      break;
    case roll[5] == 6:
      roundScore.push(1000);
      break;
    case roll[5] < 3:
      roundScore.push(roll[5] * 50);
      break;
    case roll[2] == 3:
      roundScore.push(200);
      break;
    case roll[3] == 3:
      roundScore.push(300);
      break;
    case roll[4] == 3:
      roundScore.push(400);
      break;
    case roll[6] == 3:
      roundScore.push(600);
  }

  return roundScore;
}
