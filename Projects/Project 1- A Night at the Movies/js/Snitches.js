class Snitches {
  constructor(x, y) {
    //loading user's character
    this.sprite = createSprite(50, 300, 200, 200);
    this.sprite.addAnimation(
      "floating",
      "assets/images/snitch01.png",
      "assets/images/snitch02.png"
    );
    //snitch position and velocity
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.sprite.velocity.x = -2;

    this.caught = false;
  }

  move(harryPotter) {
    //if harry potter is at a 300 px distance from Snitch
    if (
      dist(
        harryPotter.sprite.position.x,
        harryPotter.sprite.position.y,
        this.sprite.position.x,
        this.sprite.position.y
      ) < 300
    ) {
      //snitches move away from harry potter at 10 velocity (up or down)
      if (harryPotter.sprite.position.y < this.sprite.position.y) {
        this.sprite.velocity.y = 10;
      } else if (harryPotter.sprite.position.y > this.sprite.position.y) {
        this.sprite.velocity.y = -10;
      }
    }
    //movement setup
    this.sprite.position.x = this.sprite.position.x + this.sprite.velocity.x;
    this.sprite.position.y = this.sprite.position.y + this.sprite.velocity.y;
    //movement is constrained from moving passed the canvas and stops at 50 px
    this.sprite.position.y = constrain(this.sprite.position.y, 50, height - 50);
  }

  //continuous snitch movement
  wrap() {
    if (this.sprite.position.x < 0) {
      this.sprite.position.x = width;
    }
  }
}
