let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameMode = '';

function startGame(mode) {
    gameMode = mode;
    document.getElementById('options').style.display = 'none';
    document.getElementById('board').style.display = 'flex';
    document.getElementById('reset').style.display = 'block';
}

function makeMove(index) {
    if (board[index] === '' && !checkWinner()) {
        board[index] = currentPlayer;
        document.getElementsByClassName('cell')[index].innerText = currentPlayer;
        if (checkWinner()) {
            document.getElementById('message').innerText = `${currentPlayer} wins!`;
        } else if (board.every(cell => cell !== '')) {
            document.getElementById('message').innerText = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (gameMode === 'computer' && currentPlayer === 'O') {
                
                setTimeout(makeComputerMove, 300);
            }
        }
    }
}

function makeComputerMove() {
    let emptyCells = board.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex);
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    document.getElementById('board').style.display = 'none';
    document.getElementById('options').style.display = 'flex';
    document.getElementById('message').innerText = '';
    Array.from(document.getElementsByClassName('cell')).forEach(cell => cell.innerText = '');
    document.getElementById('reset').addEventListener('click', function() {
        this.style.display = 'none'; 
    });
}


