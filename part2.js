const rs = require("readline-sync");
let board = [];
let ships = [
  { size: 2, hits: 0 },
  { size: 3, hits: 0 },
  { size: 3, hits: 0 },
  { size: 4, hits: 0 },
  { size: 5, hits: 0 },
];
let guessedLocations = [];

function initializeBoard(size) {
  for (let i = 0; i < size; i++) {
    board[i] = new Array(size).fill(" ");
  }
}

function canPlaceShip(x, y, size, direction) {
  for (let i = 0; i < size; i++) {
    if (direction === 0) {
      if (typeof board[y][x + i] === "object") return false;
    } else {
      if (typeof board[y + i][x] === "object") return false;
    }
  }
  return true;
}

function placeShips() {
  for (let ship of ships) {
    let placed = false;
    while (!placed) {
      let direction = Math.floor(Math.random() * 2);
      let x, y;
      if (direction === 0) {
        x = Math.floor(Math.random() * (board.length - ship.size));
        y = Math.floor(Math.random() * board.length);
      } else {
        x = Math.floor(Math.random() * board.length);
        y = Math.floor(Math.random() * (board.length - ship.size));
      }
      if (canPlaceShip(x, y, ship.size, direction)) {
        for (let i = 0; i < ship.size; i++) {
          if (direction === 0) {
            board[y][x + i] = ship;
          } else {
            board[y + i][x] = ship;
          }
        }
        placed = true;
      }
    }
  }
}

function printBoard() {
  console.log("    1 2 3 4 5 6 7 8 9 10");
  console.log("  ----------------------- ");
  for (let i = 0; i < board.length; i++) {
    let row = String.fromCharCode(65 + i) + " | ";
    for (let j = 0; j < board.length; j++) {
      row += typeof board[i][j] === "object" ? "S " : board[i][j] + " ";
    }
    console.log(row + "|");
  }
  console.log("  ----------------------- ");
}

function restartGame() {
  const playAgain = rs.question(
    "You have destroyed all battleships. Would you like to play again? Y/N "
  );
  if (playAgain.toUpperCase() === "Y") {
    board = [];
    ships = [
      { size: 2, hits: 0 },
      { size: 3, hits: 0 },
      { size: 3, hits: 0 },
      { size: 4, hits: 0 },
      { size: 5, hits: 0 },
    ];
    guessedLocations = [];
    initializeBoard(10);
    placeShips();
    playGame();
  } else {
    console.log("Thanks for playing!");
    process.exit();
  }
}

function getGuess() {
  while (true) {
    const guess = rs.question("Enter a location to strike (e.g. A2): ");
    if (!guess.match(/^[A-J][1-9]|10$/)) {
      console.log(
        "Invalid input. Please enter a letter between A and J followed by a number between 1 and 10 (e.g. A2)"
      );
    } else {
      return guess;
    }
  }
}

const doSomething = () => {
  while (ships.length > 0) {
    printBoard();
    let guess = getGuess();
    let x = guess.charCodeAt(0) - 65;
    let y = parseInt(guess.slice(1)) - 1;
    if (guessedLocations.includes(guess)) {
      console.log("You have already picked this location. Miss!");
    } else if (
      guess[0] < "A" ||
      guess[0] > "J" ||
      guess.slice(1) < 1 ||
      guess.slice(1) > 10
    ) {
      console.log(
        "Invalid input. Please enter a letter between A and J followed by a number between 1 and 10 (e.g. A2)"
      );
      continue;
    } else {
      guessedLocations.push(guess);
      if (typeof board[x][y] === "object") {
        let ship = board[x][y];
        ship.hits++;
        board[x][y] = "X";
        if (ship.hits === ship.size) {
          console.log(
            "Hit. You have sunk a battleship. " +
              (ships.length - 1) +
              " ship(s) remaining."
          );
          ships.splice(ships.indexOf(ship), 1);
        } else {
          console.log("Hit!");
        }
      } else {
        console.log("You have missed!");
        board[x][y] = "O";
      }
    }
  }
};

function playGame() {
  console.log("Press any key to start the game.");
  rs.keyInPause();
  doSomething();
  restartGame();
}

initializeBoard(10);
placeShips();
playGame();
