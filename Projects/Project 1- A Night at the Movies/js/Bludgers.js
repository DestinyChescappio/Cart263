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

  harryCollision(harryPotter) {
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
      //setting a timeout for seconds of the 'injury' animation
      //after 'injury' animation, harry potter return to 'floating' animation
      setTimeout(() => {
        harryPotter.sprite.changeAnimation("floating");
        this.isColliding = false;
      }, 2000);
      return true;
    } else {
      return false;
    }
  }
}
