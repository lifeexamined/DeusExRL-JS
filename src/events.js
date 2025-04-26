function arrowHandler(direction) {
  const currentState = getCurrentState();
  const newState = movePlayer(direction, currentState);
  setCurrentState(newState);
}

// Event handlers for keyboard input
function keyDownHandler(event) {
  const key = event.key;

  // Handle movement keys
  if (key === "ArrowUp" || key === "w") {
    arrowHandler("up");
  } else if (key === "ArrowDown" || key === "s") {
    arrowHandler("down");
  } else if (key === "ArrowLeft" || key === "a") {
    arrowHandler("left");
  } else if (key === "ArrowRight" || key === "d") {
    arrowHandler("right");
  }

  initialize();
}

function keyUpHandler(event) {
  // Handle key release events if needed
}

// Register event listeners
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
