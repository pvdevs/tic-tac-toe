console.log('Hello');
const board = document.querySelectorAll('.board-field');

board.forEach((field) => {
    field.addEventListener('click', ()=> {
        const id = getPositionById(field.id);
        console.log(id);
        gameBoard.getMarker('x' ,id[0],id[1]);
        displayController.displayMarker('x', id[0], id[1]);
        gameBoard.win();
        console.log(gameBoard.board);
    })
});

//Functions

function getPositionById(id) {
    const idArray = id.split('');
    return idArray;
}

// Objects


const gameBoard = (() => {
    const board = [
        ['','',''],
        ['','',''],
        ['','','']
       ];
    const getMarker = (marker, x, y) => board[x][y] = marker;

    const checkWhoWon = (position) => {
        if(position === 'x') return playerX;
        if(position === 'o') return playerO;
    };

    /*
    const win = () => {
        if(board[0][0] != '' && board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
            console.log('GANHOU');
            checkWhoWon(board[0][0]);
        }
        if(board[0][0] != '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            console.log('GANHOU');
            checkWhoWon(board[0][0]);
        }
        if(board[2][0] != '' && board[2][0] === board[2][1] && board[2][1] === board[2][2]) {
            console.log('GANHOU');
            checkWhoWon(board[0][0]);
        }
    }
    */

    const win = () => {
        for(let i = 0; i < board.length; i++){

            for(let j = 0; j < board[i].length; j++) {  
                //Row verify
                if(board[i][j] != '' && board[i][j] === board[i][j+1] && board[i][j+1] === board[i][j+2]) {
                    console.log('GANHOU');
                    checkWhoWon(board[i][j]);
                }
            }
        }
    }





    return {board, getMarker, win, checkWhoWon}
})();

//

const displayController = (() => {
    const displayMarker = (marker,x,y) => {
        const field = document.getElementById(`${x}${y}`);
        field.classList.add('paint');
    }
    return {displayMarker};
})();


const Player = (marker) => {
    const getPlayerMarker = () => marker;
    return {getPlayerMarker}
}

const players = [];

const playerX = Player('x');
const playerO = Player('o');

players.push(playerX);
players.push(playerO);

console.log(players);