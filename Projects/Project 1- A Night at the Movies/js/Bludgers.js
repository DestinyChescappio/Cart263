//Bludger is a regular image playing the enemy
//bludger determines harry potter shift of animation
//overlapping harry potter determines sound and keeping track how many bludgers hit harry
//gravitate behavior

class Bludgers {
  constructor(x, y, bludgerImage) {
    //collision is false from beginning
    this.isColliding = false;
    //position
    this.x = x;
    this.y = y;
    //acceleration
    this.ax = 0;
    this.ay = 0;
    //velocity
    this.vx = -5;
    this.vy = 0;
    //dimensions
    this.height = 280;
    this.width = 280;
    //what image
    this.image = bludgerImage;

    //following harry potter is false from beginning
    this.follow = false;
  }

  //movement setup
  move() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
  }

  //continous movement
  wrap() {
    if (this.x < 0) {
      this.x += width;
    }
  }

  //displaying the bludger
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

  //gravitate behavior towards harry
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
