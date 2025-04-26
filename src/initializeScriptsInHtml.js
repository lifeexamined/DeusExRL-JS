//Function to initialize scripts in the html file
functuion initializeScriptsInHtml () {
  const { sceneDescription3d } = gameStateToAsciiBoardTo3dScene (state003);
  add3DSceneToHtml (sceneDescription3d);
};

//Add event listener to the html file
document.addEventListener("DOMContentLoaded", initializeScriptsInHtml());