console.log('Hello');
const board = document.querySelectorAll('.board-field');

getPositionById('02');

board.forEach((field) => {
    field.addEventListener('click', ()=> {
        const id = getPositionById(field.id);
        console.log(id);
        gameBoard.getMarker('x' ,id[0],id[1]);
        console.log(gameBoard.board);
    })
});

const gameBoard = (() => {
    const board = [
        ['','',''],
        ['','',''],
        ['','','']
       ];
    const getMarker = (marker, x, y) => board[x][y] = marker;
    return {board, getMarker}
})();

//

const displayController = (() => {
    const displayMarker = () => {

        board.forEach((field) => {
            field.addEventListener('click', ()=> {
                const id = getPositionById(field.id);
                console.log(id);
                gameBoard.getMarker('x' ,id[0],id[1]);
            })
        });
    }
    return {displayMarker};
})();


const Player = (marker) => {
    const getPlayerMarker = () => marker;

    gameBoard.getMarker()
}


function getPositionById(id) {
    const idArray = id.split('');
    return idArray;
}