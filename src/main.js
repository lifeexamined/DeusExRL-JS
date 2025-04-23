//Map broken down into an array of strings
const currentLevel = 0;
const Map = levels[currentLevel].map;
const mapLines = levels[currentLevel].map.split("\n");
const processedMap = [];
for (let i = 0; i < mapLines.length; i++) {
  processedMap.push(mapLines[i].split(""));
}
console.log("mapLines:");
console.log(mapLines);
console.log("processedMap:");
console.log(processedMap);

function main(State) {
  Terminal(State);
  Viewport(State);
}

//Object to store current state of the game
const State = {
  playerPosition: [],
  cameraPosition: [0, 0, 0],
  cameraDirection: 0,
  blocks: [],
  enemies: [[0, 0, 0, 0]],
};

//Function to initialize the state for everything at the start of the game
function initiateState() {
  for (let i = 0; i < mapLines.length; i++) {
    for (let j = 0; j < processedMap[i].length; j++) {
      if (processedMap[i][j] === "@") {
        State.playerPosition = [j, i, 0];
      } else if (processedMap[i][j] === "#") {
        State.blocks.push([i, j, 0]);
      }
    }
  }
}

initiateState();
console.log(State.playerPosition);
console.log(State.blocks); //Function to initialize the game, takes in the state of the game

//List of all possible entities in the game
const EntityTypes = ["player", "free", "block", "enemy"];

//Object to store the state of the our imitation of the terminal window
function Terminal(playerPosition, enemies) {}

//Object that translates the state from the terminal to the 3d viewport
class Viewport {
  constructor() {
    this.camera = [0, 0, 0];
    this.objects = [];
  }
}
