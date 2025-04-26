function initialize() {
  const currentState = state001;
  const scene3D = mapStateTo3dScene(currentState);
  const asciiBoard = mapStateToAsciiBoard(currentState);

  render3dScene(scene3D);
  renderText(asciiBoard);
}

initialize();
