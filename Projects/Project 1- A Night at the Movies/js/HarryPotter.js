class HarryPotter {
  constructor() {
    (this.x = 300), (this.y = 300), (this.ay = 3);
  }

  handleInput() {
    if (keyIsDown(RIGHT_ARROW)) {
      this.velocity.x = 5;
    } else if (keyIsDown(LEFT_ARROW)) {
      this.velocity.x = -5;
    } else {
      this.velocity.x = 0;
    }
    if (keyIsDown(UP_ARROW)) {
      this.velocity.y = -5;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.velocity.y = 5;
    } else {
      this.velocity.y = 0;
    }
  }

  handleGravity() {
    this.velocity.y += this.ay;
  }

  display() {
    drawSprites();
  }
}
