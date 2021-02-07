'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let highScore = document.querySelector('.highscore').textContent;
let score = document.querySelector('.score').textContent;
let noFurtherClick = false;
const setHighScore = function () {
  if (score > highScore) {
    highScore = score;
    document.querySelector('.highscore').textContent = highScore;
  }
};
const scoreDeductor = function () {
  score--;
  document.querySelector('.score').textContent = score;
};
const messageWrite = function (str) {
  document.querySelector('.message').textContent = str;
};
const setBodyColor = function (color) {
  document.querySelector('body').style.backgroundColor = color;
};
const revealWriteColor = function (msg, color) {
  document.querySelector('.number').textContent = secretNumber;
  messageWrite(msg);
  setBodyColor(color);
  noFurtherClick = true;
};
const ifLost = function () {
  if (!score) {
    revealWriteColor('You loose 😢', '#e6420b');
  }
};
const guessNotCorrect = function (msg) {
  messageWrite(msg);
  scoreDeductor();
  ifLost();
};
const toDo = function () {
  const guess = Number(document.querySelector('.guess').value);
  if (!noFurtherClick) {
    if (guess > 20 || guess <= 0) {
      messageWrite('Choose between 1 - 20');
    } else if (score > 0) {
      if (guess > secretNumber) {
        guessNotCorrect('📈 Too High!');
      } else if (guess < secretNumber) {
        guessNotCorrect('📉 Too Low!');
      } else {
        document.querySelector('.number').style.width = '30rem';
        revealWriteColor('🥳 Correct. You Win!', '#60b347');
        setHighScore();
      }
    }
  }
};

document.querySelector('.check').addEventListener('click', function () {
  toDo();
});

document.querySelector('.again').addEventListener('click', function () {
  noFurtherClick = false;
  setBodyColor('#222');
  messageWrite('Start guessing...');
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
  score = 20;
  document.querySelector('.score').textContent = score;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  console.log(secretNumber);
});
