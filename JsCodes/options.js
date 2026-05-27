const optionFunctions ={
getPlayerNbr(){ //export player option to the main script
    const btn = document.querySelector('#playerOptions button.active');
    return btn.dataset.players; //hay will return data-players
},
getModeSelected(){ //export mode option to the main script
    const btn = document.querySelector('#modeOptions button.active');
    return btn.dataset.mode; //hay will return data-mode 
}
};

//Players Option

const twoPlayersBtn = document.querySelector('#playerOptions button:nth-child(1)');
const threePlayersBtn = document.querySelector('#playerOptions button:nth-child(2)');
const player3 = document.getElementById('inputP3');

twoPlayersBtn.addEventListener('click',() => selectedPlayer(twoPlayersBtn,threePlayersBtn));
threePlayersBtn.addEventListener('click',() => selectedPlayer(threePlayersBtn,twoPlayersBtn));

function selectedPlayer(btn1,btn2){
    
    if (btn1.dataset.players === '2') {
        player3.classList.add('hidden');
    }else if(btn1.dataset.players === '3'){
        player3.classList.remove('hidden');
    }

    btn2.classList.remove('active');
    btn1.classList.add('active');
};

//Mode Option

const bestOfThree = document.querySelector('#modeOptions button:nth-child(1)');
const bestOfFive = document.querySelector('#modeOptions button:nth-child(2)');

//                                                        active     deactive
bestOfThree.addEventListener('click',() => selectedMode(bestOfThree,bestOfFive));
bestOfFive.addEventListener('click',() => selectedMode(bestOfFive,bestOfThree));

function selectedMode(btn1,btn2){
    btn2.classList.remove('active'); //remove active
    btn1.classList.add('active'); // add active 
};


//Names Section
const rule = document.getElementById('rule1');
const nameOptions = document.getElementById('nameOptions');
const playerLabel = document.getElementById('playerLabel');

const continueBtn = document.getElementById('continueBtn');
const startBtn = document.getElementById('startBtn');

continueBtn.addEventListener('click',showNameOptions);

function showNameOptions(){
    nameOptions.classList.remove('hidden');
    playerLabel.classList.remove('hidden');
    rule.classList.remove('hidden');
    continueBtn.classList.add('hidden');
    startBtn.classList.remove('hidden');
};

const restartBtn= document.getElementById('restartBtn');
restartBtn.addEventListener('click',hideNameOptions);

function hideNameOptions(){
    nameOptions.classList.add('hidden'); //hide
    playerLabel.classList.add('hidden'); //hide  player label
    rule.classList.add('hidden'); // hide rule
    continueBtn.classList.remove('hidden'); //show continue btn
    startBtn.classList.add('hidden'); // hide start btn
};


export {optionFunctions};