const startBtn = document.getElementById('startBtn');
const menuScreen = document.getElementById('menuScreen');

const restartBtn = document.getElementById('restartBtn');
const gameScreen = document.getElementById('gameScreen');

const playAgain = document.getElementById('playAgainBtn');
const winnerScreen = document.getElementById('winnerScreen');



startBtn.addEventListener('click',toGame);

function toGame(){
    gameScreen.classList.remove('hidden');
    menuScreen.classList.add('hidden');
};

restartBtn.addEventListener('click',toMenuFromGame);

function toMenuFromGame(){
    menuScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
};

playAgain.addEventListener('click',toMenuFromWin);

function toMenuFromWin(){
    winnerScreen.classList.add('hidden');
    menuScreen.classList.remove('hidden');
};