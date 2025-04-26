// Example usage:
// First include Three.js in your HTML:
// <script src="https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js"></script>

// Then after getting the scene description:
// const { sceneDescription3D } = gameStateToAsciiBoardTo3dScene(state001);
// const threeScene = create3DSceneFromDescription(sceneDescription3D);

// console.log(
//   asciiBoardToText(gameStateToAsciiBoardTo3dScene(state002).sceneDescription3D)
// );
// console.log(asciiBoardToText(result.asciiBoard));

//Function to add 3d view to the html file
function add3DSceneToHTML(sceneDescription3D, containerId = "three-container") {
  // Create a container div if it doesn't exist
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    container.style.width = "100%";
    container.style.height = "500px";
    document.body.appendChild(container);
  } else {
    // Clear previous content
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  // Initialize Three.js scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  // Set up camera for top-down view
  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );

  // Get board size from the first row of objects (assuming square board)
  const boardSize = 10; // Default to 10x10
  const centerOffset = boardSize / 2 - 0.5; // Center offset for the grid

  // Position camera above the center of the board looking down
  camera.position.set(centerOffset, 15, centerOffset);
  camera.lookAt(centerOffset, 0, centerOffset); // Look at the center of the board

  // Create renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(centerOffset, 10, centerOffset); // Light from above center
  scene.add(directionalLight);

  // Add grid helper centered on the board
  const gridHelper = new THREE.GridHelper(boardSize, boardSize);
  gridHelper.position.set(centerOffset, 0, centerOffset); // Center the grid
  scene.add(gridHelper);

  // Create objects from the scene description
  sceneDescription3D.objects.forEach((obj) => {
    // Ensure objects are within the grid boundaries
    if (
      obj.position.x < 0 ||
      obj.position.x >= boardSize ||
      obj.position.y < 0 ||
      obj.position.y >= boardSize
    ) {
      return; // Skip objects outside the grid
    }

    let geometry, material, mesh;

    switch (obj.type) {
      case "player":
        geometry = new THREE.ConeGeometry(0.5, 1, 4);
        material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        mesh = new THREE.Mesh(geometry, material);
        // Rotate to point in the direction of the camera
        mesh.rotation.x = Math.PI / 2; // Point up from top-down view
        mesh.rotation.z = THREE.MathUtils.degToRad(
          sceneDescription3D.camera.direction
        );
        break;
      case "enemy":
        geometry = new THREE.SphereGeometry(0.5);
        material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        mesh = new THREE.Mesh(geometry, material);
        break;
      case "block":
        geometry = new THREE.BoxGeometry(1, 1, 1);
        material = new THREE.MeshPhongMaterial({ color: 0x8888ff });
        mesh = new THREE.Mesh(geometry, material);
        break;
      default:
        return;
    }

    // Position the mesh (convert coordinate systems)
    mesh.position.set(obj.position.x, obj.position.z + 0.5, obj.position.y);
    scene.add(mesh);
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  return {
    scene,
    camera,
    renderer,
    container,
  };
}

add3DSceneToHTML(gameStateToAsciiBoardTo3dScene(state003).sceneDescription3D);

// Complete HTML example usage:
/*
<!DOCTYPE html>
<html>
<head>
  <title>3D Game Scene</title>
  <style>
    body { margin: 0; overflow: hidden; }
    #three-container { height: 100vh; width: 100vw; }
  </style>
</head>
<body>
  <div id="three-container"></div>
  <script src="https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js"></script>
  <script>
    // Your game state and conversion functions here...
    
    // Example usage:
    const gameState = {
      playerPosition: { x: 5, y: 5 },
      cameraDirection: 0,
      enemies: [
        { x: 2, y: 2 },
        { x: 8, y: 7 },
      ],
    };

    const { sceneDescription3D } = gameStateToAsciiBoardTo3dScene(gameState);
    add3DSceneToHTML(sceneDescription3D);
  </script>
</body>
</html>
*/
