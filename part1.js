const rs = require('readline-sync');

function getRandomNum(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateBoard() {
    const board = [];
    for (let i = 0; i < 3; i++) {
      board.push([]); 
      for (let j = 0; j < 3; j++) {
        board[i].push(' ');    
      }      
    }
    const ship1X = getRandomNum(3);
    const ship1Y = getRandomNum(3);
    board[ship1X][ship1Y] = 'S'; 
    let ship2X = getRandomNum(3);
    let ship2Y = getRandomNum(3);
    while (board[ship2X][ship2Y] === 'S') {
      ship2X = getRandomNum(3);
      ship2Y = getRandomNum(3);
    }
    board[ship2X][ship2Y] = 'S';
    return board;
}

function printBoard(board) {
    console.log('   A  B  C');
    console.log('  ---------');  
    for (let i = 0; i < board.length; i++) {
      console.log(`${i+1} | ${board[i].join(' ')} |`);
  
    }  
}

function getGuess() {
    const guess = rs.question('Enter a location to strike (e.g. A2): ');
    if (!guess.match(/^[A-C][1-3]$/)) {
      console.log('Invalid input. Please enter a letter between A and C followed by a number between 1 and 3 (e.g. A2)');
      return getGuess();
    } else {
      return guess;
    }
}

function playGame() {
    let board = generateBoard();
    let numShipsRemaining = 2;  
    console.log('Press any key to start the game.');
    rs.keyInPause();
  
    while (numShipsRemaining > 0) {
      printBoard(board);
      const guess = getGuess();
      const row = guess.charCodeAt(0) - 'A'.charCodeAt(0);
      const col = parseInt(guess.charAt(1)) - 1;
      if (board[row][col] === 'S') {
        console.log('Hit! You have sunk a battleship. ' + (--numShipsRemaining) + ' ship remaining.');
        board[row][col] = 'X';
      } else if (board[row][col] === 'X') {
        console.log('You have already picked this location. Miss!');
      } else {
        console.log('You have missed!');
        board[row][col] = 'O';
      }
    }

const playAgain = rs.question('You have destroyed all battleships. Would you like to play again? Y/N ');
  
  if (playAgain.toUpperCase() === 'Y') {
    playGame();
  } else {
    console.log('Thanks for playing!');
    process.exit();
  }
}
playGame();

