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
    //if harry potter is at a 300 px distance
    if (
      dist(
        harryPotter.sprite.position.x,
        harryPotter.sprite.position.y,
        this.x,
        this.y
      ) < 300
    ) {
      //snitches move away from harry potter at 10 velocity (up or down)
      if (harryPotter.sprite.position.y < this.y) {
        this.vy = 10;
      } else if (harryPotter.sprite.position.y > this.y) {
        this.vy = -10;
      }
    }
    //movement setup
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
    //movement is constrained from moving passed the canvas and stops at 50 px
    this.y = constrain(this.y, 50, height - 50);
  }

  //continuous snitch movement
  wrap() {
    if (this.x < 0) {
      this.x += width;
    }
  }

  //displaying the snitch
  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y);
    pop();
  }
}
