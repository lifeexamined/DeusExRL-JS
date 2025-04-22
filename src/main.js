function main(state) {
  const terminal = new Terminal();
  const viewport = new Viewport();
}

const EntityType = ["player", "free", "block", "enemy"];
class State {
  constructor() {
    this.playerPosition = [0, 0, 0];
    this.cameraDirection = [0, 1, 2, 3];
    this.enemies = { x, y };
  }
}

class Terminal {
  constructor() {}
}

class Viewport {
  constructor() {
    this.camera = [0, 0, 0];
    this.objects = [];
  }
}
