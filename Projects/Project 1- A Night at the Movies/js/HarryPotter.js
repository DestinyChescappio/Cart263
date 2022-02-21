class HarryPotter {
  constructor() {
    //loading user's character for 'floating' animation
    this.sprite = createSprite(50, 300, 200, 200);
    this.sprite.addAnimation(
      "floating",
      "assets/standard/standard01.png",
      "assets/standard/standard05.png"
    );
    //loading user's character for 'injury' animation
    this.sprite.addAnimation(
      "injury",
      "assets/attack/attack01.png",
      "assets/attack/attack03.png"
    );
    //acceleration
    this.ay = 3;
  }

  //the user's controls
  handleInput() {
    //right arrow to go right 'forward'
    if (keyIsDown(RIGHT_ARROW)) {
      this.sprite.velocity.x = 10;
      //left arrow to go left 'backward'
    } else if (keyIsDown(LEFT_ARROW)) {
      this.sprite.velocity.x = -10;
    } else {
      //harry potter 'falls' if no arrow keys are pressed
      this.sprite.velocity.x = 0;
    }
    //up arrow to go up to prevent from 'falling'
    if (keyIsDown(UP_ARROW)) {
      this.sprite.velocity.y = -10;
      //down arrow is to go down to have more movement options
    } else if (keyIsDown(DOWN_ARROW)) {
      this.sprite.velocity.y = 10;
    } else {
      //harry potter 'falls' if no arrow keys are pressed
      this.sprite.velocity.y = 0;
    }
  }

  //velocity on y axis and the acceleration is what makes harry potter 'fall'
  handleGravity() {
    this.sprite.velocity.y += this.ay;
  }
}
