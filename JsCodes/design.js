const designFunctions = {
    drawDice(diceValue,playerTurn){
        let coloredDots = dice[diceValue];
        coloredDots.forEach(dot => {
            let d = document.querySelector(`#card${playerTurn+1} .d${dot}`); 
            d.classList.add('on');
        });
    },
    clearDice(playerTurn){
        let allDots = [1,3,4,5,6,7,9];
        allDots.forEach(dot => {
            let d = document.querySelector(`#card${playerTurn+1} .d${dot}`); 
            d.classList.remove('on');
        });
    }
};

// 1    2    3
// 4    5    6
// 7    8    9

const dice ={
    1 : [5],
    2 : [1,9],
    3 : [1,5,9],
    4 : [1,3,7,9],
    5 : [1,3,5,7,9],
    6 : [1,3,4,6,7,9]
};




export {designFunctions};
