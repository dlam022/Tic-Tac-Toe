let gameBoard = [['','',''],
                 ['','',''],
                 ['','',''],

];

function resetBoard() {
    gameBoard = [['','',''],
                 ['','',''],
                 ['','',''], 
    ];
}

function clearGameBoard() {
    while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
    }
}


function renderBoard() {
    gameContainer.innerHMTL = '';

    gameBoard.forEach((columns, colindex) => {
        const column = document.createElement('div');
        column.classList.add('col');

        columns.forEach((cell, rowindex) => {
            const cells = document.createElement('div');
            cells.classList.add('cell');
            cells.setAttribute('data-row', rowindex);
            cells.setAttribute('data-col', colindex);
            cells.textContent = cell;
            column.appendChild(cells);
        })

        gameContainer.appendChild(column)
    });
    displayTurn.innerHTML = 'Player One Turn';

}

function handleListener(event) {
    const clickedcell = event.target;
    if(!clickedcell.classList.contains('cell')) return;
    if(clickedcell.textContent !== '') return;
    const row = parseInt(clickedcell.getAttribute('data-row'));
    const column = parseInt(clickedcell.getAttribute('data-col'));


    if(turns == 0) {
        displayTurn.innerHTML = 'Player Two Turn'
        clickedcell.textContent = playerOne;
        checkClicked(row, column, turns);
        turns = 1;
        tiecounter++;
    }

    else {
        displayTurn.innerHTML = 'Player One Turn'
        clickedcell.textContent = playerTwo;
        checkClicked(row, column, turns);
        turns = 0;
        tiecounter++;
    }

    checkWin();
}


function checkClicked(row, col, player) {
    gameBoard[row][col] = player;
    console.log(gameBoard);    
}

function checkWin() {
    //check row
    if(!gameOver){
        for(let row = 0; row < gameBoard.length; row++) {
            xcounter = 0;
            ycounter = 0;
            for(let col = 0; col < gameBoard[row].length; col++) {
                if(gameBoard[row][col] === 0) {
                    xcounter++;
                }

                if(gameBoard[row][col] === 1) {
                    ycounter++;
                }
            
            }
            if(xcounter === 3) {
                endGame('Player One Wins');
                return;
            }

            if(ycounter === 3) {
                endGame('Player Two Wins');
                return;
            }
        }

    //check column
        for(let col = 0; col < gameBoard[0].length; col++) {
            xcounter = 0;
            ycounter = 0;
            for(let row = 0; row < gameBoard.length; row++) {
                if(gameBoard[row][col] === 0) {
                    xcounter++;
                }

                if(gameBoard[row][col] === 1) {
                    ycounter++;
                }
            }

            if(xcounter === 3) {
                endGame('Player One Wins');
                return;
            }

            if(ycounter === 3) {
                endGame('Player Two Wins');
                return;
            }
        }


    //check diagonal
        xcounter = 0;
        ycounter = 0;
        for(let row = 0; row < gameBoard.length; row++) {
            if(gameBoard[row][row] === 0) {
                xcounter++;
            }

            if(gameBoard[row][row] === 1) {
                ycounter++;
            }

            if(xcounter === 3) {
                endGame('Player One Wins');
                return;
            }

            if(ycounter === 3) {
                endGame('Player Two Wins');
                return;
            }
        }

        xcounter = 0;
        ycounter = 0;
        let col = 2;
        for(let row = 0; row < gameBoard.length; row++) {
            if(gameBoard[row][col] === 0) {
                xcounter++;
            }

            if(gameBoard[row][col] === 1) {
                ycounter++;
            }

            if(xcounter === 3) {
                endGame("Player One Wins");
                return;
            }

            else if(ycounter === 3) {
                endGame("Player Two Wins");
                return;
            }
            col--;
        }

        console.log(tiecounter);
        if(tiecounter === 9) {
            endGame("Tie Game");
            return;
        }
    }

}

function endGame(display) {
    popUp.style.display = 'block';
    body.classList.add('active');
    winner.innerHTML = display;
    gameOver = true;
    body.style.pointerEvents = 'none';
    console.log("ran");
    restartBtn.addEventListener('click', restartGame);
}

function restartGame() {
    console.log('click');
    popUp.style.display = 'none';
    body.classList.remove('active');
    gameOver = false;
    body.style.pointerEvents = 'auto';
    turns = 0;
    tiecounter = 0;
    winner.innerHTML = '';
    resetBoard();
    clearGameBoard();
    renderBoard();
}





const playerOne = 'x';
const playerTwo = 'o';
const body = document.querySelector('.body-container');
const gameContainer = document.querySelector('.gameBoard');
const cells = document.querySelectorAll('.cell');
const endDiv = document.querySelector('.endGame');
const restartBtn = document.getElementById('restartBtn');
const popUp = document.querySelector('.endGame');
const winner = document.querySelector('.winner');
const displayTurn = document.querySelector('.playerturn');
let turns = 0;
let xcounter;
let ycounter;
let tiecounter = 0;
let gameOver = false;

renderBoard();

gameContainer.addEventListener('click', handleListener);






    

