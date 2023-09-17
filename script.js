console.log('Hello');
const board = document.querySelectorAll('.board-field');
const displayTurn = document.querySelector('.display');
const reset = document.getElementById('reset-btn');
//Functions

let gameIsOver = false;

board.forEach(field => field.addEventListener('click', gameEvent));
reset.addEventListener('click', resetGame);

function resetGame(){
    playerX.reset();
    playerO.reset();
    gameBoard.reset();
    displayController.reset();
}

function playRound(field) {
    gameBoard.boardFill(field);
    gameBoard.isBallTurn() ? playerO.getMove(field) : playerX.getMove(field);
    gameBoard.switchPlayer()
    displayController.displayMove(field);
    displayController.displayCurrentPlayer();
}

function gameEvent(event) {
    const thisField = parseInt(event.target.id);
    if (gameIsOver) return;
    if (gameBoard.positionFilled(thisField)) return;

    playRound(thisField)
    const winner = gameBoard.checkWin();

    if (winner === 'playerX' || winner === 'playerO') {
      displayController.displayWinner(winner);
      gameIsOver = true;

    } else if (gameBoard.boardIsFull() && winner === null) {
      displayController.tie();
      gameIsOver = true;
    }
}

// Objects


const gameBoard = (() => {
    const board = [];
    const winningCombinations =[
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
    const switchPlayer = () => playerBallTurn = !playerBallTurn;

    const boardFill = position => board.push(position);
    const boardIsFull = () => board.length === 9;

    const positionFilled = position => board.includes(position);


    let winningNumbers;
    const exportCombination = () => winningNumbers;

    const winner = () => {
        winningCombinations.forEach((combination) => {
            const playerXWon = combination.every(field => playerX.playerFields.includes(field));
            const playerBallWon = combination.every(field => playerO.playerFields.includes(field));

            if(playerXWon || playerBallWon) winningNumbers = combination;
            if(playerXWon) winner = 'playerX';
            if(playerBallWon)winner = 'playerO';
        });

    }

    const checkWin = () => {
        let winner;

        winningCombinations.forEach((combination) => {
            const playerXWon = combination.every(field => playerX.playerFields.includes(field));
            const playerBallWon = combination.every(field => playerO.playerFields.includes(field));
            
            if(playerXWon || playerBallWon) winningNumbers = combination;
            if(playerXWon) winner = 'playerX';
            if(playerBallWon)winner = 'playerO';
        });
        if(winner != null) return winner;
        else return null;
    }

    const reset = () => playerBallTurn = false; // need to clear the board too.

    return {board, checkWin, playerBallTurn, switchPlayer, isBallTurn, reset, winner, boardFill, positionFilled, boardIsFull, winningNumbers, exportCombination}
})();

////////////////////////////////////////////////////////////////////////

const displayController = (() => {

    const tie = () => displayTurn.textContent = `Tie!`

    const displayWinner = winner => {
        const winningNumbers = gameBoard.exportCombination();
        winningNumbers.forEach((field) => {
            const tempField = document.getElementById(`${field}`);
            tempField.style.backgroundColor = '#AAFF00';
        })
        displayTurn.textContent = `${winner} wins!`

    } 

    const displayCurrentPlayer = () => gameBoard.isBallTurn() ? displayTurn.textContent = 'O is playing!' : displayTurn.textContent = 'X is playing!';

    const displayMove = (position) => {
        const field = document.getElementById(`${position}`);
        if(gameBoard.isBallTurn() === false) field.classList.add('paint-x');
        if(gameBoard.isBallTurn() === true) field.classList.add('paint-ball');
    }
    const reset = () => {
        board.forEach((field) => {
            field.classList.remove('paint-x')
            field.classList.remove('paint-ball')
            displayTurn.textContent = 'X is playing!'
        });
    };
    return {displayCurrentPlayer, displayMove, displayWinner, reset, tie};
})();

////////////////////////////////////////////////////////////////////////

const Player = (marker) => {
    const playerFields = [];
    const getPlayerMarker = () => marker;
    const getMove = position => playerFields.push(position);

    const reset = () => playerFields.length = 0;

    return {getPlayerMarker, playerFields, getMove, reset}
}

const players = [];
const playerX = Player('x');
const playerO = Player('o');

players.push(playerX);
players.push(playerO);

console.log(players);