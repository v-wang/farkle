import * as DOMELEM from './domElems.js';

window.addEventListener('load', () => {
  initializeDice();
});

function initializeDice() {
  for (var i = 0; i < 6; i++) {
    diceArr[i] = {};
    diceArr[i].id = 'die' + (i + 1);
    diceArr[i].value = i + 1;
    diceArr[i].clicked = 0;
  }
}
const scoreKey = {
  1: { 3: 1000, 4: 1100, 5: 4200, 6: 2000 },
  2: { 3: 300 },
  3: { 3: 400 },
  4: { 3: 500 },
  5: { 1: 50, 2: 100, 3: 500 },
  6: { 3: 600 },
};

var diceArr = [];
var roundScore = [];
const roll = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
};

/*Rolling dice values*/
async function rollDice() {
  for (var i = 0; i < 6; i++) {
    if (diceArr[i].clicked === 0) {
      diceArr[i].value = Math.floor(Math.random() * 6 + 1);
    }
  }
  return diceArr;
}

/*Updating images of dice given values of rollDice*/
function updateDiceImg(diceArr) {
  for (var i = 0; i < 6; i++) {
    document
      .getElementById(diceArr[i].id)
      .setAttribute('src', `images/${diceArr[i].value}.png`);
  }
  return diceArr;
}

function diceClick(img) {
  var i = img.getAttribute('data-number');
  img.classList.toggle('transparent');
  if (diceArr[i].clicked === 0) {
    diceArr[i].clicked = 1;
  } else {
    diceArr[i].clicked = 0;
  }
}

async function selectDie(diceArr) {
  let selectedDice = diceArr.filter((die) => die.clicked != 0);

  selectedDice.forEach((die) => {
    roll[die.value] += 1;
  });

  return roll;
}

function calcScore(roll) {
  Object.keys(roll).forEach((key) => {
    let val = roll[key];
    let keyVal = scoreKey[key];
    roundScore.push(keyVal[val]);
  });
  let final = roundScore.filter((num) => num);
  return final.reduce((a, b) => a + b);
}

DOMELEM.diceImgs.forEach((dice) => {
  dice.addEventListener('click', () => {
    diceClick(dice);
  });
});

DOMELEM.rollBtn.addEventListener('click', () => {
  rollDice().then((diceArray) => updateDiceImg(diceArray));
});

DOMELEM.bankBtn.addEventListener('click', () => {
  // let total = Object.keys(roll).map((num) => calcScore(num));
  // console.log(total);
  selectDie(diceArr)
    .then((roll) => calcScore(roll))
    .then((totalScore) => {
      DOMELEM.score.innerText = totalScore;
    })
    .then();

  // console.log(totalScore);
});
