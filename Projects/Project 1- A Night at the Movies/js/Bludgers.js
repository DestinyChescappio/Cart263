class Bludgers {
  constructor(x, y, bludgerImage) {
    this.x = x;
    this.y = y;

    this.vx = -5;
    this.vy = 0;

    this.image = bludgerImage;
  }

  move() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
  }

  wrap() {
    if (this.x < 0) {
      this.x += width;
    }
  }

  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y);
    pop();
  }
}
