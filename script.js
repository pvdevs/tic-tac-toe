console.log('Hello');
const board = document.querySelectorAll('.board-field');

board.forEach((field) => {
    field.addEventListener('click', ()=> {
        const id = parseInt(field.id);
        gameBoard.playerTurn(id);

        //gameBoard.getMarker('x' ,id); // saves on gabeBoard
        displayController.displayMarker(id); // Prints
        gameBoard.checkWin();

        //gameBoard.playerTurn(); function not created yet
       // console.log(gameBoard.board);
       // console.log(`player array -> ${playerX.playerFields}`);
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

    let playerBallTurn = false;

    const isBallTurn = () => playerBallTurn; //Function used to export which round the game is currently;


    const checkWin = (roundPlayer) => {
        const fieldCheck = winCombinations.some((combination) => {
            const playerXWon = combination.every(field => playerX.playerFields.includes(field));
            const playerBallWon = combination.every(field => playerO.playerFields.includes(field));

            if (playerXWon) console.log('X ganhou');
            if (playerBallWon) console.log('O ganhou');
        });
    }

    const playerTurn = (field) => {
        if(!playerBallTurn) { // Remember to turn all of this into a ternary if
            console.log('Player X Turn!');
            playerX.getMove(field);
            console.log('player X Field ' + playerX.playerFields);
        }
        if (playerBallTurn){
            console.log('Player O Turn!');
            playerO.getMove(field);
            console.log('player O Field ' + playerO.playerFields);
        }

        playerBallTurn = switchPlayer(playerBallTurn);
    }

    const switchPlayer = (turn) => !turn;
    const getMarker = (marker, position) => board[position] = marker;
    return {board, getMarker, checkWin, playerBallTurn, playerTurn, switchPlayer, isBallTurn}
})();

////////////////////////////////////////////////////////////////////////

const displayController = (() => {
    const displayMarker = (position) => {
        const field = document.getElementById(`${position}`);
        if(gameBoard.isBallTurn() === false) field.classList.add('paint-x');
        if(gameBoard.isBallTurn() === true) field.classList.add('paint-ball');
    }
    return {displayMarker};
})();

////////////////////////////////////////////////////////////////////////

const Player = (marker) => {
    const playerFields = [];
    const getPlayerMarker = () => marker;
    const getMove = position => playerFields.push(position);

    return {getPlayerMarker, playerFields, getMove}
}

const players = [];
const playerX = Player('x');
const playerO = Player('o');

players.push(playerX);
players.push(playerO);

console.log(players);