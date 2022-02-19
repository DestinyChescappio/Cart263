let self;
class Bludgers {
  constructor(x, y, bludgerImage) {
    this.isColliding = false;
    this.x = x;
    this.y = y;

    this.vx = -5;
    this.vy = 0;

    this.height = 280;
    this.width = 280;

    this.image = bludgerImage;
    //bludger this
    self = this;
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
    image(this.image, this.x, this.y, this.height, this.width);
    pop();
  }

  harryCollision() {
    if (
      dist(
        harryPotter.sprite.position.x,
        harryPotter.sprite.position.y,
        this.x,
        this.y
      ) < 50 &&
      this.isColliding === false
    ) {
      harryPotter.sprite.changeAnimation("injury");
      this.isColliding = true;
      setTimeout(function () {
        harryPotter.sprite.changeAnimation("floating");
        console.log(self);
        self.isColliding = false;
      }, 2000);
    }
  }
}
