const rs = require('readline-sync');

function getRandomNum(max) {
  return Math.floor(Math.random() * Math.floor(max));}

function generateBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      board.push([]);
      for (let j = 0; j < 10; j++) {
        board[i].push(' ');
      }
    }
    const ship1X = getRandomNum(10);
    const ship1Y = getRandomNum(10);
    board[ship1X][ship1Y] = 'S';
    let ship2X = getRandomNum(10);
    let ship2Y = getRandomNum(10);
    while (board[ship2X][ship2Y] === 'S') {
      ship2X = getRandomNum(10);
      ship2Y = getRandomNum(10);
    }
    board[ship2X][ship2Y] = 'S';
    let ship3X = getRandomNum(10);
    let ship3Y = getRandomNum(10);
    while (board[ship3X][ship3Y] === 'S') {
      ship3X = getRandomNum(10);
      ship3Y = getRandomNum(10);
    }
    board[ship3X][ship3Y] = 'S';
    let ship4X = getRandomNum(10);
    let ship4Y = getRandomNum(10);
    while (board[ship4X][ship4Y] === 'S') {
      ship4X = getRandomNum(10);
      ship4Y = getRandomNum(10);
    }
    board[ship4X][ship4Y] = 'S';
    return board;
}

const board = [
    [' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' ']
];
  
function printBoard(board) {
    console.log('    1 2 3 4 5 6 7 8 9 10 ');
    console.log('  ----------------------- ');   
    for (let i = 0; i < board.length; i++) {
      console.log(`${String.fromCharCode(65+i)} | ${board[i].join(' ')} |`);
    }  
}
printBoard(board);

function getGuess() {
  while (true) {
    const guess = rs.question('Enter a location to strike (e.g. A2): ');
    if (!guess.match(/^[A-J][1-9]|10$/)) {   
      console.log('Invalid input. Please enter a letter between A and J followed by a number between 1 and 10 (e.g. A2)');
    } else {
      return guess;
    }
  }
}

function playGame() {
    let board = generateBoard();
    let numShipsRemaining = 4;  
    console.log('Press any key to start the game.');
    rs.keyInPause();  
    
    while (numShipsRemaining > 0) {
      printBoard(board);
      const guess = getGuess();
      if (guess[0] < 'A' || guess[0] > 'J' || guess.slice(1) < 1 || guess.slice(1) > 10) {
        console.log('Invalid input. Please enter a letter between A and J followed by a number between 1 and 10 (e.g. A2)');
        continue;
      }
      const row = guess.charCodeAt(0) - 'A'.charCodeAt(0);
      const col = parseInt(guess.slice(1)) - 1;  
      if (board[row][col] === 'S') {
        console.log('Hit! You have sunk a battleship. ' + (--numShipsRemaining) + ' ship(s) remaining.');
        board[row][col] = 'X';
      } else if (board[row][col] === 'X') {
        console.log('You have already picked this location. Miss!');
      } else {
        console.log('You have missed!');
        board[row][col] = 'O';
      }
    }
    
    console.log('You have destroyed all battleships. Would you like to play again?');
    const playAgain = rs.question('Enter Y for yes or N for no: ');
  
    if (playAgain.toUpperCase() === 'Y') {
      playGame();
    }
}  
playGame();


