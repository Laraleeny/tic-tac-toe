/*1. создать переменные 
  2. при нажатии на клетку появляется Х
  3. меняется надпись на It's 0 turn
  4. на клетку нажать ещё раз чтобы появился О
  5. меняется надпись на It's Х turn
  6. когда выстроятся три 0 или Х вряд то меняется цвет клеток
  7. выскакивает надпись вы выиграли! если после вашего последнего хода выстроились 3 0 или Х
  8. выскакивает надпись вы проиграли!:( 
  9. при нажатии кнопки Restart game , начинаем с чистого поля
*/
"use strict"
//создать переменные для кнопки и клеток поля
let button = document.querySelector('button');
let allCell = document.querySelectorAll('.cell');
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let messageStatus = document.querySelector('.game--status');
const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];



  
// Все переменные нужно привести к изначальному состоянию
const handleRestartGame = () => {    
  allCell.forEach((cell, index) => {
    cell.textContent = '';
  });
  gameState.forEach((item, index) => {
    gameState[index] = '';
  });
  gameActive = true;
  currentPlayer = "X";
  messageStatus.innerHTML = `It's ${currentPlayer}'s turn`;
}
  
// Функция handlePlayerChange, которая меняет активного пользователя
// и выводит сообщение об активном пользователе в .game--status
const handlePlayerChange = () => {
   currentPlayer === 'X'? currentPlayer = '0' : currentPlayer = 'X';
   messageStatus.innerHTML = `It's ${currentPlayer}'s turn`;
   
};

const handleCellClick = (event) => {
  //  Получаем из event значение 'data-cell-index'
  let cellIndex = event.target.dataset.cellIndex;
  //  Проверяем, если игра не активна !gameActive или в ячейке уже что-то есть
  if (gameActive === false || gameState[cellIndex] !== '') {
    return;
  } else {
    //  Записываем в gameState текущий ход
    gameState[cellIndex] = currentPlayer;
    // Выводим в разметку с помощью textContent значение переменной currentPlayer
    event.target.textContent = currentPlayer;
   handleResultValidation();
  }
  
}

const handleResultValidation= () => {

  for (let i = 0; i <= winningLines.length - 1; i++) {
    const winCondition = winningLines[i];
    const a = gameState[winCondition[0]];
    const b = gameState[winCondition[1]];
    const c = gameState[winCondition[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      gameActive = false;
      messageStatus.textContent = `Player ${currentPlayer} has won!`;

      return;
    }  
  }
  handlePlayerChange(); 
  // Проверяем игру на ничью, нужно проверить массив на наличие пустых строк gameState
    const emptyCell = gameState.includes('');
   // Если уже в массиве нет пустых строк и игра не закончилась тогда это ничья и выводим сообщение также о ничьей
    if (emptyCell === false) {
      gameActive = false;
      messageStatus.textContent = `It's draw!`;

    }
  } 

allCell.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
    
  });
  
button.addEventListener('click', handleRestartGame);