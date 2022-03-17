class Beads {
  constructor(x, y, beadColor) {
    this.x = x;
    this.y = y;

    this.width = 20;
    this.height = 20;

    this.vx = 0;
    this.vy = 5;

    this.beadColor = beadColor;

    this.dragged = false;
  }

  move() {
    if (!this.dragged) {
      this.x = this.x + this.vx;
      this.y = this.y + this.vy;
    }
  }

  wrap() {
    if (this.y < 0) {
      this.y += height;
    }
  }

  display() {
    push();
    noStroke();
    fill(this.beadColor.r, this.beadColor.g, this.beadColor.b);
    ellipse(this.x, this.y, this.width, this.height);
    pop();
  }
}
