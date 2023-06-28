import readlineSync from 'readline-sync';
// import scanf from 'scanf';
let runOnce = false;

const board = [
  ['-', '-', '-'],
  ['-', '-', '-'],
  ['-', '-', '-']
];


// CHECK FOR VALID LETTER INPUT
const validPick = () => {
  let pick = readlineSync.question('Pick.. X or O: ')
  pick = pick.toUpperCase();
  
  if (pick !== 'X' && pick !== 'O') {
    console.log('Not a valid pick. Try Again!')
    return validPick()
  }
    
  return validBoardSpace(pick);
}

// CHECK IF BOARD SPACE IS VALID AND AVAIABLE TO CHOOSE
const validBoardSpace = (letter) => {
  let turnIntoArray = readlineSync.question('Pick 0-2 for a Row and 0-2 for a Column: ');
  turnIntoArray = turnIntoArray.split('');

  const x = Number(turnIntoArray[0]);
  const y = Number(turnIntoArray[1]);

  if (x !== 0 && x !== 1 && x !== 2) {
    console.log('Invalid row seclection');
    return validBoardSpace(letter);
  }
  if (y !== 0 && y !== 1 && y !== 2) {
    console.log('Invalid column selection');
    return validBoardSpace(letter);
  }
  

  
  // SECTION TO CHECK IF BOARD SPACE IS AVAIABLE
   if (board[x][y] === 'X' || board[x][y] === 'O') {
    console.log('Spot already taken. Pick a different combination... ');
    return validBoardSpace(letter);
   }
  
   if (board[x][y] !== 'X' && board[x][y] !== 'O') board[x][y] = letter;
  
  return checkWin();
}

// CHECK FOR A TRIO OF X's OR O's /// CHECK IF ANY SPACE ON BOARD IS LEFT
const checkWin = () => {
  const size = board.length

  // check for Row or Col winner
  for (let i = 0; i < size; i++) {
    if (
      (board[i][0] !== '-' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) ||
      (board[0][i] !== '-' && board[0][i] === board[1][i] && board[0][i] === board[2][i])
    ) {
      return `Player ${board[i][i]} Wins! ${printBoard()}`;
    }
  }

  // Check top-left to bottom-right diagonal winner
  let symbol = board[0][0]
  let diagonalWin = true
  for (let i = 1; i < size; i++) {
    if (board[i][i] !== symbol || symbol === '-') {
      diagonalWin = false
      break
    }
  }
  if (diagonalWin) {
     return `Player ${board[1][1]} wins on the diagonals ${printBoard()}`;
  }

  // Check top-right to bottom-left diagonal winner
  symbol = board[0][size - 1];
  diagonalWin = true;
  for (let i = 1; i < size; i++) {
    if (board[i][size - 1 - i] !== symbol || symbol === '-') {
      diagonalWin = false
      break
    }
  }
  if (diagonalWin) {
    return `Player ${board[1][1]} wins on the diagonals ${printBoard()}`
  }

  // check for Tie game
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === '-') {
        console.log(printBoard())
        return playGame()
      }
    }
  }

  return `No More Spaces Left. TIE GAME! ${printBoard()}`
}

const printBoard = () => {
  // console.log('\n')
  for (let i = 0; i < 3; i++) {
    console.log(`| ${board[i][0]} | ${board[i][1]} | ${board[i][2]} |`);
  }
  return ''
}

function playGame() {
  if(runOnce !== true) console.log('Starting...');
  runOnce = true;

  // console.log(printBoard());
  return validPick()
}

console.log(playGame())


