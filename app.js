const squares = document.querySelectorAll(".square");
const message = document.querySelector(".message");
const newGameButton = document.querySelector(".new-game-button");

// Initialize the game variables
let turn = "X";
let isGameOver = false;
let board = ["", "", "", "", "", "", "", "", ""];

// the winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Loop through each square and add a click event listener
squares.forEach((square, index) => {
  square.addEventListener("click", () => {

    // If the square is already taken or the game is over, return
    if (board[index] !== "" || isGameOver) return;

    // Update the board with the current player's move
    board[index] = turn;
    square.textContent = turn;

    // Check if the current player has won
    if (checkWin()) {
      message.textContent = `${turn} wins!`;
      isGameOver = true;
      return;
    }

    // Check if the game is a draw
    if (checkDraw()) {
      message.textContent = "It's a draw!";
      isGameOver = true;
      return;
    }

    // Switch the turn to the other player
    turn = turn === "X" ? "O" : "X";
    message.textContent = `${turn}'s turn`;
  });
});

// Function to check if the current player has won
function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return board[index] === turn;
    });
  });
}

// Function to check if the game is a draw
function checkDraw() {
  return board.every(square => {
    return square !== "";
  });
}

// Function to start a new game
function startNewGame() {
  // Reset the game variables
  turn = "X";
  isGameOver = false;
  board = ["", "", "", "", "", "", "", "", ""];

  // Clear the board
  squares.forEach(square => {
    square.textContent = "";
  });

  // Update the message
  message.textContent = `${turn}'s turn`;
}

// Add click event listener to the new game button
newGameButton.addEventListener("click", startNewGame);

// Start the first game
startNewGame();
