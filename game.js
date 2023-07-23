import readlineSync from 'readline-sync';

function startGame(board) {
  console.log('Starting... ')
  return validPick(board)
}

function restartGame(board) {
  return validPick(board)
}

// CHECK FOR VALID LETTER INPUT
const characterPick = () => {

  let count = 0;
  let pick;
  
  return (board) => {
    
    if (count % 2 === 0) pick = 'x'
    else pick = 'o'

    count++

    pick = pick.toUpperCase();
    return validBoardSpace(pick, board);
  }
  
  // let pick = readlineSync.question('Pick.. X or O: ')
  // pick = pick.toUpperCase();
  
  // if (pick !== 'X' && pick !== 'O') {
    //   console.log('Not a valid pick. Try Again!')
    //   return validPick(board)
    // }
}
  
const validPick = characterPick();

// CHECK IF BOARD SPACE IS VALID AND AVAIABLE TO CHOOSE
const validBoardSpace = (letter, board) => {
  let turnIntoArray = readlineSync.question(`Player ${letter}, Select 0-2 for a Row and 0-2 for a Column: `);
  turnIntoArray = turnIntoArray.split('');
  
  const x = Number(turnIntoArray[0]);
  const y = Number(turnIntoArray[1]);
  
  if (x !== 0 && x !== 1 && x !== 2) {
    console.log('Invalid row seclection');
    return validBoardSpace(letter, board);
  }
  if (y !== 0 && y !== 1 && y !== 2) {
    console.log('Invalid column selection');
    return validBoardSpace(letter, board);
  }
  console.log('row and col', x, y)
  
  // SECTION TO CHECK IF BOARD SPACE IS AVAIABLE
  if (board[x][y] === 'X' || board[x][y] === 'O') {
    console.log('Spot already taken. Pick a different combination... ');
    return validBoardSpace(letter, board);
  }
  
  if (board[x][y] !== 'X' && board[x][y] !== 'O') board[x][y] = letter;
  
  return checkWin(board);
}


// CHECK FOR A TRIO OF X's OR O's /// CHECK IF ANY SPACE ON BOARD IS LEFT
const checkWin = (board) => {
  const size = board.length
  
  // check for Row or Col winner
  for (let i = 0; i < size; i++) {
    if ((board[i][0] !== '-' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) ||
      (board[0][i] !== '-' && board[0][i] === board[1][i] && board[0][i] === board[2][i]))
    {
      return `Player ${board[i][i]} Wins! ${printBoard(board)}`;
    }
  }
    
  // Check top-left to bottom-right diagonal winner
  // Check top-right to bottom-left diagonal winner
  let topLeft = board[0][0]
  let topRight = board[0][size - 1];
  let diagonalWinTopLeft = true
  let diagonalWinTopRight = true
    
  for (let i = 1; i < size; i++) {
    if (board[i][i] !== topLeft || topLeft === '-') {
      diagonalWinTopLeft = false
    }
    if (board[i][size - 1 - i] !== topRight || topRight === '-') {
      diagonalWinTopRight = false
    }
  }
    
  if (diagonalWinTopLeft || diagonalWinTopRight) {
    return `Player ${board[1][1]} wins on the diagonals ${printBoard(board)}`;
  }
    
    
  // check for Tie game
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === '-') {
        console.log(printBoard(board))
        return restartGame(board)
      }
    }
  }
    
  return `No More Spaces Left. TIE GAME! ${printBoard(board)}`
}
  
const printBoard = (board) => {
  for (let i = 0; i < 3; i++) {
    console.log(`| ${board[i][0]} | ${board[i][1]} | ${board[i][2]} |`);
  }
  return ''
}
  
  
console.log(startGame([
  ['-', '-', '-'],
  ['-', '-', '-'],
  ['-', '-', '-']
]))

  
export {
  startGame,
  validPick,
  validBoardSpace,
  checkWin
}
