//File to store the state of the game

const state001 = {
  playerPosition: { x: 5, y: 5 },
  cameraDirection: 0,
  enemies: [
    { x: 2, y: 2 },
    { x: 8, y: 7 },
  ],
};

const state002 = {
  playerPosition: { x: 2, y: 2 },
  cameraDirection: 3,
  enemies: [
    { x: 1, y: 1 },
    { x: 8, y: 7 },
  ],
};

const state003 = {
  playerPosition: { x: 3, y: 8 },
  cameraDirection: 0,
  enemies: [
    { x: 1, y: 1 },
    { x: 5, y: 6 },
  ],
};

let currentState = state001;

function getCurrentState() {
  return currentState;
}

function setCurrentState(newState) {
  currentState = newState;
}
