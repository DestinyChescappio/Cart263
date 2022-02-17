class Snitches {
  constructor(x, y, snitchImage) {
    this.x = x;
    this.y = y;

    this.speed = 2;

    this.vx = -5;
    this.vy = 0;

    this.image = snitchImage;
  }

  move(harryPotter) {
    //snitch random/jittery movement
    //this.vx = random(-this.speed, this.speed);
    //this.vy = random(-this.speed, this.speed);

    if (
      dist(
        harryPotter.sprite.position.x,
        harryPotter.sprite.position.y,
        this.x,
        this.y
      ) < 300
    ) {
      if (harryPotter.sprite.position.y < this.y) {
        this.vy = 10;
      } else if (harryPotter.sprite.position.y > this.y) {
        this.vy = -10;
      }
    }
    //movement setup
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    this.y = constrain(this.y, 50, height - 50);
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
