function initialize() {
  const currentState = getCurrentState();
  const scene3D = mapStateTo3dScene(currentState);
  const asciiBoard = mapStateToAsciiBoard(currentState);

  render3dScene(scene3D);
  renderText(asciiBoard);
}

initialize();
