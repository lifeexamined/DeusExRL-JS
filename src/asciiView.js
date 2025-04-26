//Function to convert game state to ASCII board and then to 3d scene description
function gameStateToAsciiBoardTo3dScene(state) {
  //Creating ASCII board
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

  //Create 3d scene description based on the ASCII board
  const objects = [];

  //Convert each cell on the board into a 3d object
  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const cell = asciiBoard[y][x];
      if (cell.type !== "free") {
        objects.push({
          type: cell.type,
          position: { x, y, z: 0 },
        });
      }
    }
  }

  //Camera positioned at player's location
  const camera = {
    position: {
      x: state.playerPosition.x,
      y: state.playerPosition.y,
    },
    direction: state.cameraDirection * 90, //0, 90, 180, 270 degrees
  };

  return {
    asciiBoard,
    sceneDescription3D: {
      camera,
      objects,
    },
  };
}

//Convert ASCII board to text
function asciiBoardToText(asciiBoard) {
  var text = "";

  for (var y = 0; y < asciiBoard.length; y++) {
    var row = asciiBoard[y];
    for (var x = 0; x < row.length; x++) {
      var cell = row[x];
      if (cell.type === "free") {
        text += ".";
      } else if (cell.type === "player") {
        text += "@";
      } else if (cell.type === "enemy") {
        text += "e";
      } else if (cell.type === "block") {
        text += "#";
      }
    }
    text += "\n";
  }
  return text;
}
