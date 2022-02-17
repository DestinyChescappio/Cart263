class Bludgers {
  constructor(x, y, bludgerImage) {
    this.x = x;
    this.y = y;

    this.vx = 0;
    this.vy = 5;

    this.image = bludgerImage;
  }

  move() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
  }

  wrap() {
    if (this.x < 0) {
      this.x += height;
    }
  }

  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y);
  }
}
