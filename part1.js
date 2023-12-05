const rs = require("readline-sync");

function getRandomNum(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const gridSize = 3;

function generateBoard(gridSize) {
  const board = [];
  for (let i = 0; i < gridSize; i++) {
    board.push([]);
    for (let j = 0; j < gridSize; j++) {
      board[i].push(" ");
    }
  }
  return board;
}

function placeShips(board) {
  const ship1X = getRandomNum(gridSize);
  const ship1Y = getRandomNum(gridSize);
  board[ship1X][ship1Y] = "S";
  let ship2X = getRandomNum(gridSize);
  let ship2Y = getRandomNum(gridSize);
  while (board[ship2X][ship2Y] === "S") {
    ship2X = getRandomNum(gridSize);
    ship2Y = getRandomNum(gridSize);
  }
  board[ship2X][ship2Y] = "S";
}

function printBoard(board) {
  console.log("   1  2  3");
  console.log("  ---------");
  for (let i = 0; i < board.length; i++) {
    console.log(`${String.fromCharCode(65 + i)} | ${board[i].join(" ")} |`);
  }
  console.log("  ---------");
}

function getGuess() {
  const guess = rs.question("Enter a location to strike (e.g. A2): ");
  if (!guess.match(/^[A-C][1-3]$/)) {
    console.log(
      "Invalid input. Please enter a letter between A and C followed by a number between 1 and 3 (e.g. A2)"
    );
    return getGuess();
  } else {
    return guess;
  }
}

function restartGame(playGame, gridSize) {
  const playAgain = rs.question(
    "You have destroyed all battleships. Would you like to play again? Y/N "
  );

  if (playAgain.toUpperCase() === "Y") {
    playGame(gridSize);
  } else {
    console.log("Thanks for playing!");
    process.exit();
  }
}

const doSomething = (numShipsRemaining, board) => {
  while (numShipsRemaining > 0) {
    printBoard(board);
    const guess = getGuess();
    const row = guess.charCodeAt(0) - "A".charCodeAt(0);
    const col = parseInt(guess.charAt(1)) - 1;
    if (board[row][col] === "S") {
      console.log(
        "Hit! You have sunk a battleship. " +
          --numShipsRemaining +
          " ship remaining."
      );
      board[row][col] = "X";
    } else if (board[row][col] === "X") {
      console.log("You have already picked this location. Miss!");
    } else if (board[row][col] === "O") {
      console.log("You have already picked this location. Miss!");
    } else {
      console.log("You have missed!");
      board[row][col] = "O";
    }
  }
};

function playGame(gridSize) {
  let board = generateBoard(gridSize);
  placeShips(board);
  let numShipsRemaining = 2;
  console.log("Press any key to start the game.");
  rs.keyInPause();

  doSomething(numShipsRemaining, board);
  restartGame(playGame, gridSize);
}
playGame(gridSize);
