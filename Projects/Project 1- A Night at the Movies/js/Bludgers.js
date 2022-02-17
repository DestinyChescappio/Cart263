class Bludgers {
  constructor(x, y, bludger) {
    this.x = x;
    this.y = y;

    this.vx = 5;
    this.vy = 0;

    this.image = bludger;
  }

  move() {
    this.x += this.vy;
    this.y += this.vy;
  }

  wrap() {
    if (this.x > width) {
      this.x -= width;
    }
  }

  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y);
  }
}
