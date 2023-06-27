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
  let pick = readlineSync.question('Enter Pick.. X or O: ')
  pick = pick.toUpperCase();
  
  if (pick !== 'X' && pick !== 'O') {
    console.log('Not a valid selection.');
    return validPick();
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
  

  
  // SECTION TO CHECK IF BOARD SPACE IS AVAIABLE -- Could simplify this more
  if (letter === 'X' && board[x][y] !== 'X' && board[x][y] !== 'O') {
    board[x][y] = letter;

  } else if (letter === 'O' && board[x][y] !== 'X' && board[x][y] !== 'O') {
    board[x][y] = letter;

  } else if (board[x][y] === 'X' || board[x][y] === 'O') {
    console.log('None of those work. Pick a different combination... ');
    return validBoardSpace(letter);
  }
  
  
  return checkWin();
}

// CHECK FOR A TRIO OF X's OR O's /// CHECK IF ANY SPACE ON BOARD IS LEFT
const checkWin = () => {
  // Rows loop
  for (let x = 0; x < 3; x++) {
    // CHECK ROWS FOR WIN
    if (board[x][0] === 'X' && board[x][1] === 'X' && board[x][2] === 'X') return `Player-X wins on X axis ${printBoard()}`

    if (board[x][0] === 'O' && board[x][1] === 'O' && board[x][2] === 'O') return `Player-O wins on X axis ${printBoard()}`
    
    // Columns loop
    for (let y = 0; y < 3; y++) {
      // CHECK COLUMNS FOR WIN
      if (board[0][y] === 'X' && board[1][y] === 'X' && board[2][y] === 'X') return `Player-X wins on Y axis ${printBoard()}`

      if (board[0][y] === 'O' && board[1][y] === 'O' && board[2][y] === 'O') return `Player-O wins on Y axis ${printBoard()}`
      
      
      // CHECK DIAGONALLY FROM TOP LEFT TO BOTTOM RIGHT
      if (board[0][0] === 'X' && board[1][1] === 'X' && board[2][2] === 'X') return `Player-X wins on Diagonally ${printBoard()}`

      if (board[0][0] === 'O' && board[1][1] === 'O' && board[2][2] === 'O') return `Player-O wins on Diagonally ${printBoard()}`
      
      // CHECK DIAGONALLY FROM TOP RIGHT to BOTTOM LEFT
      if (board[0][2] === 'X' && board[1][1] === 'X' && board[2][0] === 'X') return `Player-X wins on Diagonally ${printBoard()}`
      
      if (board[0][2] === 'O' && board[1][1] === 'O' && board[2][0] === 'O') return `Player-O wins on Diagonally ${printBoard()}`
      
      // console.log(`checking for open space on board ${board[x][y]}` )
      if (board[x][y] === '-') return playGame();
    }
  }
  console.log(printBoard());
  return 'NO SPACES LEFT, TIE GAME';
}

const printBoard = () => {
  for (let i = 0; i < 3; i++) {
    console.log(`| ${board[i][0]} | ${board[i][1]} | ${board[i][2]} |`);
  }
  return ''
}

function playGame() {
  if(!runOnce) console.log('Starting...', "\n");
  runOnce = true;

  console.log(printBoard());
  return validPick();
}

console.log(playGame());


