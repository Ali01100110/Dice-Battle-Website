import {optionFunctions} from './options.js'; //? getModeSelected() 3 or 5  getPlayerNbr() 2 or 3
import { designFunctions } from './design.js';

//* ################## Variables #####################
let players_Score = []; //? each player score in each round
let players_Wins_Count =[]; //? each player round wins count
let round_Wins; //? how much player should win rounds in order to win the game
let current_round = 1;

let player_turn; //? player turn index

let diceValue; //? dice value after the math random generates it

let playersNames = []; // store the players names


//* ################## Sounds #####################
const sound1 = new Audio('./JsCodes/Audio/win.mp3'); //winning sound 1
const sound2 = new Audio('./JsCodes/Audio/round-win.mp3'); //round win 2
function playSound(x){ //? run sounds from zero if clicked twice 
    x.currentTime = 0;
    x.play(); 
};
//* ################## getElements Variables #####################

const roundDisplay = document.getElementById('roundDisplay'); //used by set_round_display
const bestOf = document.getElementById("bestOf"); //used by the setup_players_options_mode Function

const rolling_button = document.getElementById('rollBtn'); //roll button in the game screen
rolling_button.addEventListener('click',rolling_Event);

const player1Card = document.getElementById('card1');
const player2Card = document.getElementById('card2');
const player3Card = document.getElementById('card3');
const cards =[player1Card,player2Card,player3Card]; // adding all cards into one array used in setTurn function


const nextRoundBtn = document.getElementById('nextRoundBtn');
nextRoundBtn.addEventListener('click',nextRound);



const winnerScreen = document.getElementById('winnerScreen');
const winnerName = document.getElementById('winnerName');

const gameScreen = document.getElementById('gameScreen');



//* ################## Buttons: #####################
const startBtn = document.getElementById('startBtn'); // start button in the game screen
startBtn.addEventListener('click',main); // run the main function

const playAgain = document.getElementById('playAgainBtn');
playAgain.addEventListener('click',()=>{
    clearGame();
    sound1.pause();
});

const restartBtn = document.getElementById('restartBtn');
restartBtn.addEventListener('click',clearGame);


//* ################## Checking Functions: #####################
function checkGameWinner(){ //? check game winner if the wins in count === round wins needed
    if(players_Wins_Count[player_turn] === round_Wins){
        setTimeout(()=>{
            playSound(sound1);
            buildResultsTable();
            gameScreen.classList.add('hidden');
            winnerScreen.classList.remove('hidden');
            winnerName.textContent = `${playersNames[player_turn]}`;
        },1300);
    }else{
        setTimeout(()=>{
        playSound(sound2);
        document.getElementById('roundBanner').classList.remove('hidden');
        document.getElementById('bannerName').textContent = `${playersNames[player_turn]}`;
        current_round++;
        set_round_display();
        },500); // time lhta ma do8re t3mel pop up
    };
};
function checkRoundWinner(){ //? if score>=25 go to checkGameWinner else go to the next player
    if(players_Score[player_turn] >= 25){
        players_Wins_Count[player_turn] += 1;
        updatePips();
        checkGameWinner();
    }else{
        setTimeout(change_player_turn,500); //time to sync with the animation and the button
    }
};


//* ################## Build Function: #####################
function buildResultsTable() { //? build and sort the players scoreboard at the win screen
    const tbody = document.getElementById('resultsBody');

    tbody.innerHTML = ''; // clear any previous match data

    const p1 = [playersNames[0],players_Wins_Count[0]];
    const p2 = [playersNames[1],players_Wins_Count[1]];
    const p3 = [playersNames[2],players_Wins_Count[2]];
    
    let data = players_Wins_Count.length === 2 ? [p1,p2] : [p1,p2,p3];
    data.sort((a,b)=>b[1]-a[1]);

    for(let i = 0;i<players_Wins_Count.length;i++){
        const tr = document.createElement('tr');
        if(i === 0) tr.classList.add('winner-row');
            tr.innerHTML = `
                <td>${data[i][0]}</td>
                <td>${data[i][1]}</td>
            `;
            tbody.appendChild(tr);
    };
    
    

    
};

//* ################## Clearing Functions: #####################
function clearGame(){ //? clear game to start from zero
    clearRound();
    const pips = document.querySelectorAll('.pip');
    pips.forEach(pip=>{
        pip.classList.remove('won');
    });
    current_round = 1;
    set_round_display();

};
function clearRound(){ //?clear round like player score and last roll dice face ...
    for(let i = 0;i<players_Score.length;i++){ //Reset: Player Scores,Last Roll,Dice Circles,Bar
        players_Score[i] = 0;
        const playerScoreDisplay = document.getElementById(`score${i+1}`);
        playerScoreDisplay.textContent = '0';
        const lastRoll = document.getElementById(`lastRoll${i + 1}`);
        lastRoll.textContent = 'No roll yet';
        const diceFace = document.getElementById(`dice${i+1}`);
        designFunctions.clearDice(i);
        diceFace.dataset.value = '?';
        const bar = document.getElementById(`bar${i + 1}`);
        bar.style.width = '0%';
    };


};

//* ################## Buttons Functions: #####################

function nextRound(){ //? nextRound Button start by clearing the round then start new random player turn
    clearRound();
    player_turn = Math.floor(Math.random() * players_Score.length); //new turn 
    setTurn();
    document.getElementById('roundBanner').classList.add('hidden');
};
function updatePips(){ //? add color to pips using the class won
    const pipToUpdate = document.querySelector(`#trackerP${player_turn+1} .pip[data-pip='${players_Wins_Count[player_turn]}']`);
    pipToUpdate.classList.add('won');
};

//* ################## Rolling Functions: #####################

function updateScoreBar() { //?bar below the player increase the width as the score is higher
    const bar = document.getElementById(`bar${player_turn + 1}`);
    const percentage = Math.min((players_Score[player_turn] / 25) * 100, 100); //l2hseb 3rd albar
    bar.style.width = `${percentage}%`;
};
function updateLastRoll(x) {//? if x is value it shows the last roll else if x is rol it shows rolling...

    const diceFaces = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅']; // index 1-6
    const lastRoll = document.getElementById(`lastRoll${player_turn + 1}`);
    if(x === 'value'){
        lastRoll.innerHTML = `${diceFaces[diceValue]} <strong>+${diceValue}</strong> pts`;
    }else if(x === 'roll'){
        lastRoll.innerHTML = `<strong>Rolling...</strong>`;
    }
};
function change_player_turn(){ //? increase player turn index each round & check if its more than the length of the score array
    player_turn += 1;
    if (player_turn > players_Score.length-1) {
        player_turn = 0;
    }
    setTurn();
    
};
function update_player_score(x){ //? if x = remove it only remove the popup class else if x = add it add the class to show the popup animation then change the score by adding the new value
    const playerScoreDisplay = document.getElementById(`score${player_turn+1}`);
    
    if (x === 'remove') {
        playerScoreDisplay.classList.remove('score-pop');
    }else if(x === 'add'){
        players_Score[player_turn] += diceValue;
        playerScoreDisplay.textContent = players_Score[player_turn];
        playerScoreDisplay.classList.add('score-pop');
        checkRoundWinner();
    }
    
}
function getDiceValue(){ //? get the value of rolling the dice
    diceValue = Math.floor(Math.random() * 6) + 1; // number from 1 to 6 
};
function rollTheDice(){ //? roll the dice animation
    const diceFace = document.getElementById(`dice${player_turn+1}`);
    rolling_button.disabled = true;

    diceFace.dataset.value = '?'; // make it default for css design to be fade circles dice
    update_player_score('remove'); //remove the pop class
    diceFace.classList.remove('rolled'); // remove the rolled class
    designFunctions.clearDice(player_turn); // clear the colors on the dice

    diceFace.classList.add('rolling'); // add the rolling animation class
    updateLastRoll('roll'); // display rolling... message 
    setTimeout(() => { //after 500ms run the below that do the inverse of the above
        diceFace.dataset.value = diceValue; //remove the fade circle on the dice
        diceFace.classList.remove('rolling'); // remove the rolling class
        designFunctions.drawDice(diceValue,player_turn); //draw circles according to dice value
        diceFace.classList.add('rolled'); // add the class rolled

        update_player_score('add'); // add the popup class for animation and update the score
        updateLastRoll('value'); // show the dice value as last roll
        updateScoreBar(); // increase the bar according to the score
    }, 500);
    
};
function rolling_Event(){ //? this runs after the player clicks rolling btn
    getDiceValue();
    rollTheDice();
    
};
//* ################## Setup Functions: #####################
function setTurn(){ //? set the turn to a player that has the player_turn as index
    cards.forEach(card=>{
        card.classList.remove('is-turn');
    });
    cards[player_turn].classList.add('is-turn');
    rolling_button.disabled = false;
};
function set_round_display(){ //? show the rounds counter number on top left
    roundDisplay.textContent = current_round;
};
function setup_tracker_pips(){ //? show 3 pips for each player if bestOf5 and 2pips if bestOf3
    const game_mode_Selected = optionFunctions.getModeSelected();
    const game_players_number = optionFunctions.getPlayerNbr();

    const third_pip = document.querySelectorAll(".pip[data-pip='3']");

    if (game_mode_Selected === "3") {
        third_pip.forEach(pip=>{
            pip.classList.add('hidden');
        });  
    }else if (game_mode_Selected === "5") {
        third_pip.forEach(pip=>{
            pip.classList.remove('hidden');
        });
        if (game_players_number === "2") {
            third_pip[2].classList.add('hidden');
        }
    }else{
        third_pip.forEach(pip=>{
            pip.classList.add('hidden');
        }); 
    }


};
function setup_players_options_playerNbr(){ //? get user PlayerNbr option,fill the arrays according that,Toggle player3
    const game_players_number = optionFunctions.getPlayerNbr();
    const player3 = document.querySelectorAll('.player3Array');

    if (game_players_number === '2') {
        players_Score = [0,0];
        players_Wins_Count = [0,0];
        player3.forEach(element=>{
            element.classList.add('hidden');
        });
        player_turn = Math.floor(Math.random() * 2); // indexes 0,1 : player1 & player 2

    } else if(game_players_number === '3'){
        players_Score = [0,0,0];
        players_Wins_Count = [0,0,0];
        player3.forEach(element=>{
            element.classList.remove('hidden');
        });
        player_turn = Math.floor(Math.random() * 3); // indexes 0,1,2 : player1 & player2 & player3
    }else{
        players_Score = [0,0];
        players_Wins_Count = [0,0];
        player3.forEach(element=>{
            element.classList.add('hidden');
        });
        player_turn = Math.floor(Math.random() * 2); // indexes 0,1 : player1 & player2
    };
};
function setup_players_options_mode(){ //? get the user Mode option, set Round Wins according tp that
    const game_mode_Selected = optionFunctions.getModeSelected();
    if (game_mode_Selected === '3') {
        round_Wins = 2;
    } else if(game_mode_Selected == '5'){
        round_Wins = 3;
    }else{
        round_Wins = 2;
    };
    bestOf.textContent = ` BestOf ${game_mode_Selected}`;

    //round Wins According to chooseMatchMode
};
function setNames(){ //? show player names on the cards
    const player_1_Name = document.getElementById('p1Name')?.value?.trim().slice(0, 15) || 'Player 1'; // get Names &
    const player_2_Name = document.getElementById('p2Name')?.value?.trim().slice(0, 15) || 'Player 2'; // trim spaces &
    const player_3_Name = document.getElementById('p3Name')?.value?.trim().slice(0, 15) || 'Player 3'; // slice size to 15
    playersNames = [player_1_Name,player_2_Name,player_3_Name];

    let oldNames = [player_1_Name,player_2_Name,player_3_Name]; //? don't allow duplicated names 
    let newNames = []; //? contain the new modified names
    for(let i = 0;i<oldNames.length;i++){
        let currentName = oldNames[i];
        let counter = 2;
        while(newNames.includes(currentName)){
            currentName = `${oldNames[i]}${counter}`;
            counter++;
        };

        newNames.push(currentName);
    };
    playersNames = [...newNames];
    const playerNames = document.querySelectorAll('.player-name'); // get names textContents from the document
    playerNames[0].textContent = newNames[0];
    playerNames[1].textContent = newNames[1];
    playerNames[2].textContent = newNames[2];
    const trackerNames = document.querySelectorAll('.tracker-name');
    trackerNames[0].textContent = newNames[0];
    trackerNames[1].textContent = newNames[1];
    trackerNames[2].textContent = newNames[2];
};
function main() { //? run the whole game
    setNames(); 
    setup_players_options_mode();
    setup_players_options_playerNbr();
    setup_tracker_pips();
    setTurn();
};








