class HarryPotter {
  constructor() {
    //loading user's character
    this.sprite = createSprite(300, 300, 200, 200);
    this.sprite.addAnimation(
      "floating",
      "assets/standard/standard01.png",
      "assets/standard/standard05.png"
    );
    this.ay = 3;
  }

  handleInput() {
    if (keyIsDown(RIGHT_ARROW)) {
      this.sprite.velocity.x = 10;
    } else if (keyIsDown(LEFT_ARROW)) {
      this.sprite.velocity.x = -10;
    } else {
      this.sprite.velocity.x = 0;
    }
    if (keyIsDown(UP_ARROW)) {
      this.sprite.velocity.y = -10;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.sprite.velocity.y = 10;
    } else {
      this.sprite.velocity.y = 0;
    }
  }

  handleGravity() {
    this.sprite.velocity.y += this.ay;
  }
}
