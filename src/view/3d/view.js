// Function to render a 3D scene from a scene description
function render3dScene(sceneDescription3D, containerId = "three-container") {
  // Create a container div if it doesn't exist
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    container.style.width = "400px";
    container.style.height = "400px";
    document.body.appendChild(container);
  } else {
    // Clear previous content
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    // Ensure container has the correct dimensions
    container.style.width = "400px";
    container.style.height = "400px";
  }

  // Initialize Three.js scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  // Set up camera for first-person view
  const camera = new THREE.PerspectiveCamera(
    75, // Wider FOV for first-person
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );

  // Default board size
  const boardSize = 10;
  const centerOffset = boardSize / 2 - 0.5;

  // Get player position and direction from scene description
  const playerObj = sceneDescription3D.objects.find(
    (obj) => obj.type === "player"
  );
  if (!playerObj) {
    console.error("No player found in scene description");
    return;
  }

  // Calculate player position and direction
  const playerX = playerObj.position.x;
  const playerY = playerObj.position.y;
  const playerHeight = 0.8; // Eye height
  const directionDegrees = sceneDescription3D.camera.direction;
  const directionRadians = THREE.MathUtils.degToRad(directionDegrees);

  // Calculate look direction based on player's rotation
  const lookX = playerX + Math.sin(directionRadians);
  const lookZ = playerY + Math.cos(directionRadians);

  // Position camera at player position with eye height
  camera.position.set(playerX, playerHeight, playerY);
  camera.lookAt(lookX, playerHeight, lookZ);

  // Create renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0x606060); // Brighter ambient for first-person
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(centerOffset, 10, centerOffset);
  scene.add(directionalLight);

  // Add grid helper
  const gridHelper = new THREE.GridHelper(boardSize, boardSize);
  gridHelper.position.set(centerOffset, 0, centerOffset);
  scene.add(gridHelper);

  // Create objects from the scene description
  sceneDescription3D.objects.forEach((obj) => {
    // Skip objects outside the grid
    if (
      obj.position.x < 0 ||
      obj.position.x >= boardSize ||
      obj.position.y < 0 ||
      obj.position.y >= boardSize
    ) {
      return;
    }

    // Skip rendering the player model in first-person mode
    if (obj.type === "player") {
      return;
    }

    let geometry, material, mesh;

    switch (obj.type) {
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

    // Position the mesh
    mesh.position.set(obj.position.x, obj.position.z + 0.5, obj.position.y);
    scene.add(mesh);
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    // Maintain fixed size of 400x400 pixels
    container.style.width = "400px";
    container.style.height = "400px";
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Render once
  renderer.render(scene, camera);
}
