// Function to convert ASCII board to 3D scene description
function asciiBoardTo3dScene(asciiBoard, state) {
  const objects = [];
  const boardSize = asciiBoard.length;

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
    camera,
    objects,
  };
}

// Function to convert game state to ASCII board and then to 3d scene description
function mapStateTo3dScene(state) {
  const asciiBoard = createAsciiBoard(state);
  const sceneDescription3D = asciiBoardTo3dScene(asciiBoard, state);

  return sceneDescription3D;
}
