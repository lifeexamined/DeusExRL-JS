// Function to create ASCII board from game state
function createAsciiBoard(state) {
  const asciiBoard = [];
  const boardSize = 10; //10x10 board

  //Initialize board with empty spaces
  for (let y = 0; y < boardSize; y++) {
    const row = [];
    for (let x = 0; x < boardSize; x++) {
      row.push({ type: "free" });
    }
    asciiBoard.push(row);
  }

  //Place player on board
  asciiBoard[state.playerPosition.y][state.playerPosition.x] = {
    type: "player",
  };

  //Place enemies on board
  for (var i = 0; i < state.enemies.length; i++) {
    var enemy = state.enemies[i];
    asciiBoard[enemy.y][enemy.x] = { type: "enemy" };
  }

  return asciiBoard;
}
