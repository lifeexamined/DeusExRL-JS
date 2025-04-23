function convertGameState(state) {
  // Create ASCII board
  var asciiBoard = [];
  var boardSize = 10; // Assuming a 10x10 board

  // Initialize empty board
  for (var y = 0; y < boardSize; y++) {
    var row = [];
    for (var x = 0; x < boardSize; x++) {
      row.push({ type: "free" });
    }
    asciiBoard.push(row);
  }

  // Place player
  asciiBoard[state.playerPosition.y][state.playerPosition.x].type = "player";

  // Place enemies
  for (var i = 0; i < state.enemies.length; i++) {
    var enemy = state.enemies[i];
    asciiBoard[enemy.y][enemy.x].type = "enemy";
  }

  // Create 3D scene description based on ASCII board
  var objects = [];

  // Convert each cell in the ASCII board to a 3D object
  for (var y = 0; y < boardSize; y++) {
    for (var x = 0; x < boardSize; x++) {
      var cell = asciiBoard[y][x];
      if (cell.type !== "free") {
        objects.push({
          type: cell.type,
          position: { x: x, y: y, z: 0 },
        });
      }
    }
  }

  // Camera is positioned at player's location
  var camera = {
    position: {
      x: state.playerPosition.x,
      y: state.playerPosition.y,
      z: 0,
    },
    direction: state.cameraDirection * 90, // Convert to degrees
  };

  return {
    asciiBoard: asciiBoard,
    "3dSceneDescription": {
      camera: camera,
      objects: objects,
    },
  };
}

module.exports = { convertGameState };

// Example usage:
const state = {
  playerPosition: { x: 5, y: 5 },
  cameraDirection: 0,
  enemies: [
    { x: 3, y: 3 },
    { x: 7, y: 7 },
  ],
};

const result = convertGameState(state);
console.log(result);
