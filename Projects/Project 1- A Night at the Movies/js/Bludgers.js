class Bludgers {
  constructor(x, y, bludgerImage) {
    this.isColliding = false;
    this.x = x;
    this.y = y;

    this.ax = 0;
    this.ay = 0;

    this.acceleration = 0.25;

    this.vx = -5;
    this.vy = 0;

    this.height = 280;
    this.width = 280;

    this.image = bludgerImage;

    //following harry potter
    this.follow = false;
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

  //bludger and harry potter collision
  harryCollision(harryPotter) {
    //if the distance between the bludger and harry potter is greater than 50 pixels
    //and if the colliding variable is false (only after contact!!)
    if (
      dist(
        harryPotter.sprite.position.x,
        harryPotter.sprite.position.y,
        this.x,
        this.y
      ) < 50 &&
      this.isColliding === false
    ) {
      //injury animation = collision is true
      harryPotter.sprite.changeAnimation("injury");
      this.isColliding = true;
      //ouchSound is triggered with "injury animation only"
      if (!ouchSound.isPlaying()) {
        ouchSound.setVolume(0.08);
        ouchSound.play();
      }
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

  gravitate(harryPotter) {
    //  console.log("in gravitate");
    if (this.follow === true) {
      //target is harry's position
      let targetX = harryPotter.sprite.position.x;
      let targetY = harryPotter.sprite.position.y;
      //how many px bludger needs to move to be on harry
      let distX = targetX - this.x;
      let distY = targetY - this.y;
      //scaling the distance
      let accelX = distX / 100;
      //updating the bludger position
      this.x += accelX;

      let accelY = distY / 100;
      this.y += accelY;
    }
  }
}
