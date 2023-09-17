console.log('Hello');

const board = document.querySelectorAll('.board-field');
const displayTurn = document.querySelector('.display');
const reset = document.getElementById('reset-btn');

//Game state
let gameIsOver = false;

//Event Listeners
board.forEach(field => field.addEventListener('click', gameEvent));
reset.addEventListener('click', resetGame);

// Game board module
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
    let winningNumbers;

    const isBallTurn = () => playerBallTurn;

    const switchPlayer = () => playerBallTurn = !playerBallTurn;

    const boardFill = position => board.push(position);

    const boardIsFull = () => board.length === 9;

    const positionFilled = position => board.includes(position);

    const getWinningNumbers = () => winningNumbers;

    const checkWin = () => {
        let winner;

        winningCombinations.forEach((combination) => {
            const playerXWon = combination.every(field => playerX.playerFields.includes(field));
            const playerBallWon = combination.every(field => playerO.playerFields.includes(field));

            if(playerXWon || playerBallWon) winningNumbers = combination;

            if(playerXWon) winner = 'playerX';

            if(playerBallWon)winner = 'playerO';
        });

        return winner;
    }

    const reset = () => {
        board.length = 0;
        playerBallTurn = false;
        winningNumbers = undefined;
    }

    return {board, checkWin, playerBallTurn, switchPlayer, isBallTurn, reset, boardFill, positionFilled, boardIsFull, winningNumbers, getWinningNumbers}
})();


const displayController = (() => {
    const tie = () => displayTurn.textContent = `Tie!`

    const displayWinnerLine = () => {
        const winningNumbers = gameBoard.getWinningNumbers();

        winningNumbers.forEach((field) => {
            const fieldToPaint = document.getElementById(`${field}`);
            fieldToPaint.style.backgroundColor = '#AAFF00';
        })
    }

    const displayWinner = winner => {
        displayWinnerLine();
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
            field.classList.remove('paint-x');
            field.classList.remove('paint-ball');
            field.style.backgroundColor = '#FFFFFF';
            displayTurn.textContent = 'X is playing!';
        });
    };
    return {displayCurrentPlayer, displayMove, displayWinnerLine, displayWinner, reset, tie};
})();

//

const Player = () => {
    const playerFields = [];
    const getMove = position => playerFields.push(position);

    const reset = () => playerFields.length = 0;
    return {playerFields, getMove, reset}
}

const playerX = Player();
const playerO = Player();

//

function resetGame(){
    playerX.reset();
    playerO.reset();
    gameBoard.reset();
    displayController.reset();
    gameIsOver = false;
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

    } else if (gameBoard.boardIsFull() && winner === undefined) {
      displayController.tie();
      gameIsOver = true;
    }
}
