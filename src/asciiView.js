//Function to convert game state to ASCII board and then to 3d scene description
function gameStateToAsciiBoard(state) {
  //Creating ASCII board
  const asciiBoard = [];

  //Get level from levels object in levels.js
  const level = levels[state.level];
  console.log("Level data:", level);

  //Get size of level
  const levelRows = level.level.split("\n").map((row) => row.trim());
  const levelHeight = levelRows.length;
  const levelWidth = levelRows[0].length;
  console.log("Level dimensions:", { width: levelWidth, height: levelHeight });

  const objects = [];
  let player = null;

  //Create ASCII board based on levels.js
  for (let y = 0; y < levelHeight; y++) {
    const row = [];
    const levelRow = levelRows[y];

    // Iterate through each character in the row
    for (let x = 0; x < levelWidth; x++) {
      if (levelRow[x] === ".") {
        row.push({ type: "free" });
      } else if (levelRow[x] === "#") {
        row.push({ type: "block" });
        objects.push({
          type: "block",
          position: { x, y, z: 0 },
        });
      } else if (levelRow[x] === "e") {
        row.push({ type: "enemy" });
        objects.push({
          type: "enemy",
          position: { x, y, z: 0 },
        });
      } else if (levelRow[x] === "@") {
        row.push({ type: "player" });
        player = {
          type: "player",
          position: {
            x: state.playerPosition.x,
            y: state.playerPosition.y,
            z: 0,
          },
        };
        objects.push(player);
      }
    }
    asciiBoard.push(row);
  }

  console.log("ASCII Board:", asciiBoard);
  console.log("Objects:", objects);
  console.log("Player:", player);

  //Camera positioned at player's location
  const camera = {
    position: state.playerPosition,
    direction: state.cameraDirection * 90, //0, 90, 180, 270 degrees
  };

  const result = {
    asciiBoard,
    sceneDescription3D: {
      camera,
      objects,
    },
  };

  // Log the ASCII board in text format
  console.log("ASCII Board Text Format:");
  console.log(asciiBoardToText(asciiBoard));

  console.log("Final result:", result);
  return result;
}

//Convert ASCII board to text
function asciiBoardToText(asciiBoard) {
  let text = "";
  for (let y = 0; y < asciiBoard.length; y++) {
    const row = asciiBoard[y];
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
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
  console.log("ASCII Board Text:", text);
  return text;
}
