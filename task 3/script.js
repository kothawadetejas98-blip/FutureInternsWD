const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const aiToggle = document.getElementById('aiToggle');

let currentPlayer = 'X';
let gameBoard = Array(9).fill('');
let gameActive = true;
let vsAI = false;

// Winning combinations
const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || gameBoard[index]) return;

  makeMove(index, currentPlayer);

  if (vsAI && currentPlayer === 'O' && gameActive) {
    setTimeout(() => {
      aiMove();
    }, 500);
  }
}

function makeMove(index, player) {
  gameBoard[index] = player;
  cells[index].textContent = player;
  checkResult();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (gameActive) statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkResult() {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      statusText.textContent = `Player ${gameBoard[a]} wins!`;
      gameActive = false;
      return;
    }
  }

  if (!gameBoard.includes('')) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  }
}

function aiMove() {
  let emptyIndices = gameBoard.map((v, i) => v === '' ? i : null).filter(i => i !== null);
  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex, 'O');
}

function restartGame() {
  gameBoard = Array(9).fill('');
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
aiToggle.addEventListener('change', () => {
  vsAI = aiToggle.checked;
  restartGame();
});
