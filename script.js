console.log('Hello');
const board = document.querySelectorAll('.board-field');
const displayTurn = document.querySelector('.display');
const reset = document.getElementById('reset-btn');
//Functions
game()

reset.addEventListener('click', (e) => {
    game();
    playerX.reset();
    playerO.reset();
    gameBoard.reset();
    displayController.reset();
});

function playRound(field) {
    gameBoard.boardFill(field);
    gameBoard.isBallTurn() ? playerO.getMove(field) : playerX.getMove(field);
    gameBoard.switchPlayer()
    displayController.displayMove(field);
    displayController.displayCurrentPlayer();
}

function game() {
    let gameIsOver = false;
      
    function gameEvent(event) {
      if (gameIsOver) return;

      const thisField = parseInt(event.target.id);

      if (gameBoard.positionFilled(thisField)) return;
      playRound(thisField)
      const winner = gameBoard.checkWin();

      if (winner === 'playerX' || winner === 'playerO') {
        displayController.displayWinner(winner);
        gameIsOver = true;
      } else if (gameBoard.boardIsFull() && winner === 'any') {
        displayController.tie();
        gameIsOver = true;
      }
    }

    board.forEach((field) => {
        field.addEventListener('click', gameEvent);
    });

    }


// Objects


const gameBoard = (() => {
    const board = [];
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
    const switchPlayer = () => playerBallTurn = !playerBallTurn;


    const boardFill = position => board.push(position);

    const boardIsFull = () => board.length === 9;

    const winner = whoWon => whoWon
    let keepWinner = ()=> winner;

    const positionFilled = position => board.includes(position);

    let winningCombination;
    const exportCombination = () => winningCombination;

    const checkWin = () => {
        let winner;

        winCombinations.forEach((combination) => {
            const playerXWon = combination.every(field => playerX.playerFields.includes(field));
            const playerBallWon = combination.every(field => playerO.playerFields.includes(field));
            
            if(playerXWon) {
                winningCombination = combination;
                winner = 'playerX';
            }
            if(playerBallWon){
                winningCombination = combination;
                winner = 'playerO';
            } 
        });

        if(winner === 'playerX') return 'playerX';
        if(winner === 'playerO') return 'playerO';
        else return 'any'
    }

    const reset = () => playerBallTurn = false; // need to clear the board too.

    return {board, checkWin, playerBallTurn, switchPlayer, isBallTurn, reset, winner, keepWinner, boardFill, positionFilled, boardIsFull, winningCombination, exportCombination}
})();

////////////////////////////////////////////////////////////////////////

const displayController = (() => {

    const tie = () => displayTurn.textContent = `Tie!`

    const displayWinner = winner => {
        const winningCombination = gameBoard.exportCombination();
        winningCombination.forEach((field) => {
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