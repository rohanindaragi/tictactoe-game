const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Check for a win or a draw
function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            message.textContent = `Player ${currentPlayer} wins!`;
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        message.textContent = 'It\'s a draw!';
    }
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.id.split('-')[1];

    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        checkWinner();

        if (gameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = 'Player X\'s turn';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O', 'winner');
    });
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Initial message
message.textContent = 'Player X\'s turn';
