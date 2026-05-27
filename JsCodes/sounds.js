//* My Sounds:
const sound1 = new Audio('./JsCodes/Audio/continue.mp3');
const sound2 = new Audio('./JsCodes/Audio/start.mp3');
const sound3 = new Audio('./JsCodes/Audio/select.mp3');
const sound4 = new Audio('./JsCodes/Audio/restart.mp3');
const sound5 = new Audio('./JsCodes/Audio/theme.mp3');

const rollS1 = new Audio('./JsCodes/Audio/Roll/roll1.mp3');
const rollS2 = new Audio('./JsCodes/Audio/Roll/roll2.mp3');
const rollS3 = new Audio('./JsCodes/Audio/Roll/roll3.mp3');
const rollS4 = new Audio('./JsCodes/Audio/Roll/roll4.mp3');


//* Buttons:
const continueBtn = document.getElementById('continueBtn'); //?
continueBtn.addEventListener('click',()=>playSound(sound1));

const startBtn = document.getElementById('startBtn'); //?
startBtn.addEventListener('click',()=>playSound(sound2));

const twoPlayersBtn = document.querySelector('#playerOptions button:nth-child(1)');//?
twoPlayersBtn.addEventListener('click',()=>playSound(sound3));

const threePlayersBtn = document.querySelector('#playerOptions button:nth-child(2)');//?
threePlayersBtn.addEventListener('click',()=>playSound(sound3));

const bestOfThree = document.querySelector('#modeOptions button:nth-child(1)');//?
bestOfThree.addEventListener('click',()=>playSound(sound3));

const bestOfFive = document.querySelector('#modeOptions button:nth-child(2)');//?
bestOfFive.addEventListener('click',()=>playSound(sound3));

const nextRoundBtn = document.getElementById('nextRoundBtn');
nextRoundBtn.addEventListener('click',()=>playSound(sound1));

const restartBtn = document.getElementById('restartBtn');
restartBtn.addEventListener('click',()=>playSound(sound4));

const playAgain = document.getElementById('playAgainBtn');
playAgain.addEventListener('click',()=>playSound(sound4));

const rolling_button = document.getElementById('rollBtn');
rolling_button.addEventListener('click',()=>play4RandomSounds(rollS1,rollS2,rollS3,rollS4));

const themeToggle = document.querySelectorAll('.themeToggle');
themeToggle.forEach(btn=>{
    btn.addEventListener('click',()=>playSound(sound5));
});

//* Function: 
function playSound(x){
    x.currentTime = 0;
    x.play(); 
};
function play4RandomSounds(k,x,y,z){
    let ranNum = Math.floor(Math.random() * 4) + 1; // 1 --> 4
    k.currentTime = 0;
    x.currentTime = 0;
    y.currentTime = 0;
    z.currentTime = 0;
    k.volume = 0.5;
    x.volume = 0.5;
    y.volume = 0.5;
    z.volume = 0.5;

    if(ranNum === 1){    
        k.play(); 
    }else if(ranNum === 2){
        x.play();
    }else if(ranNum === 3){
        y.play();
    }else if(ranNum === 4){
        z.play();
    }
}

