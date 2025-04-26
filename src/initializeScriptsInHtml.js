//Function to initialize scripts in the html file
functuion initializeScriptsInHtml () {
  const { sceneDescription3d } = gameStateToAsciiBoard (state003);
  add3DSceneToHtml (sceneDescription3d);
};

//Add event listener to the html file
document.addEventListener("DOMContentLoaded", initializeScriptsInHtml());

// Initialize the 3D view when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create initial state
  const initialState = {
    level: 'level1',
    cameraDirection: 0
  };

  // Convert state to ASCII board and 3D scene
  const { sceneDescription3D } = gameStateToAsciiBoard(initialState);
  
  // Initialize the 3D view
  add3DSceneToHTML(sceneDescription3D);
});