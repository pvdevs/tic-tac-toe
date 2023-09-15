console.log('Hello');
const board = document.querySelectorAll('.board-field');

board.forEach((field) => {
    field.addEventListener('click', ()=> {
        const id = parseInt(field.id);
        playerX.getMove(id);
        console.log(id);

        //gameBoard.getMarker('x' ,id); // saves on gabeBoard
        displayController.displayMarker('x',id); // Prints
        gameBoard.checkWin();

        //gameBoard.playerTurn(); function not created yet

        console.log(gameBoard.board);
        console.log(`player array -> ${playerX.playerFields}`);
    })
});

//Functions


// Objects


const gameBoard = (() => {
    const board = [0,1,2,3,4,5,6,7,8];

    const winCombinations =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    
    const checkWin = () => {
        const teste = winCombinations.some((combination) => {
            const teste = combination.every(field => playerX.playerFields.includes(field));
            if (teste) return true;
            });
        
        if(teste) console.log('aq acabou');
        
        }
    
    
    const getMarker = (marker, position) => board[position] = marker;

    
    const checkWhoWon = (position) => { // Depracted
        if(position === 'x') return playerX;
        if(position === 'o') return playerO;
    };

    return {board, getMarker, checkWin, checkWhoWon}
})();

//

const displayController = (() => {
    const displayMarker = (marker,position) => {
        const field = document.getElementById(`${position}`);
        field.classList.add('paint');
    }
    return {displayMarker};
})();


const Player = (marker) => {
    const getPlayerMarker = () => marker;

    const playerFields = [];

    const getMove = (position) => {
        playerFields.push(position);
    }

    return {getPlayerMarker, playerFields, getMove}
}

const players = [];

const playerX = Player('x');
const playerO = Player('o');

players.push(playerX);
players.push(playerO);

console.log(players);