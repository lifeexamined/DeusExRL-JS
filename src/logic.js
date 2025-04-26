function movePlayer(direction, state) {
  const newState = { ...state };

  // Update player position based on direction
  if (direction === "up") {
    newState.playerPosition.y -= 1;
  } else if (direction === "down") {
    newState.playerPosition.y += 1;
  } else if (direction === "left") {
    newState.playerPosition.x -= 1;
  } else if (direction === "right") {
    newState.playerPosition.x += 1;
  }

  // Update camera direction based on direction
  if (direction === "up") {
    newState.cameraDirection = 0;
  } else if (direction === "down") {
    newState.cameraDirection = 2;
  } else if (direction === "left") {
    newState.cameraDirection = 3;
  } else if (direction === "right") {
    newState.cameraDirection = 1;
  }

  return newState;
}
