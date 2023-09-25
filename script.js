let currentPlayer = 'X';

const rows = 20;
const cols = 20;
const board = Array(rows).fill('').map(() => Array(cols).fill(''));


// for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//         matrix[i][j] = i * cols + j + 1;
//     }
// }




console.log(board);

function makeMove(row, col) {
    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        document.getElementById(`${row}_${col}`).innerText = currentPlayer;

        if (checkWin()) {
            document.getElementById('status').innerText = `${currentPlayer} wins!`;
            disableBoard();
        } else if (board.every(row => row.every(cell => cell !== ''))) {
            document.getElementById('status').innerText = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWin() {

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j <= cols - 5; j++) {
            const symbol = board[i][j];
            if (symbol !== '' && board[i][j + 1] === symbol && board[i][j + 2] === symbol && board[i][j + 3] === symbol && board[i][j + 4] === symbol) {
                return true;
            }
        }
    }


    for (let i = 0; i <= rows - 5; i++) {
        for (let j = 0; j < cols; j++) {
            const symbol = board[i][j];
            if (symbol !== '' && board[i + 1][j] === symbol && board[i + 2][j] === symbol && board[i + 3][j] === symbol && board[i + 4][j] === symbol) {
                return true;
            }
        }
    }

    for (let i = 0; i <= rows - 5; i++) {
        for (let j = 0; j <= cols - 5; j++) {
            const symbol = board[i][j];
            if (symbol !== '' && board[i + 1][j + 1] === symbol && board[i + 2][j + 2] === symbol && board[i + 3][j + 3] === symbol && board[i + 4][j + 4] === symbol) {
                return true;
            }
        }
    }

    for (let i = 0; i <= rows - 5; i++) {
        for (let j = 4; j < cols; j++) {
            const symbol = board[i][j];
            if (symbol !== '' && board[i + 1][j - 1] === symbol && board[i + 2][j - 2] === symbol && board[i + 3][j - 3] === symbol && board[i + 4][j - 4] === symbol) {
                return true;
            }
        }
    }

    return false;
}


function disableBoard() {
    const cells = document.getElementById('board').children;
    for (const cell of cells) {
        cell.onclick = null;
    }
}

function resetGame() {
    currentPlayer = 'X';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            board[i][j] = '';
            document.getElementById(`${i}_${j}`).innerText = '';
        }
    }
    document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
}


const boardContainer = document.getElementById('board');
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `${i}_${j}`;
        cell.onclick = () => makeMove(i, j);
        boardContainer.appendChild(cell);
    }
}

function storePlayerName() {
    const name1 = document.getElementById('first_player').value;
    const name2 = document.getElementById('second_player').value;

    // Store the name in localStorage
    localStorage.setItem('first_player', name1);
    localStorage.setItem('second_player', name2);

    // Redirect to the other page
    window.location.href = 'table.html';
}


const secondPlayerName = localStorage.getItem('second_player');

const secondPlayerNameElement = document.getElementById('secondPlayerName');
secondPlayerNameElement.textContent = `Second Player: ${secondPlayerName}`;