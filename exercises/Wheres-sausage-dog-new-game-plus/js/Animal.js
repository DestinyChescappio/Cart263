class Animal {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.wiggling = false;

    this.angle = 0;
  }

  //update method
  update() {
    this.wiggle();
    this.display();
  }

  wiggle() {
    if (this.wiggling) {
      this.x += random(-2, 2);
      this.y += random(-2, 2);
    }
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image, 0, 0);
    pop();
  }

  //if mouse over any animals
  //this doesn't do anything, this just checks if it overlaps
  overlap(x, y) {
    if (
      x > this.x - this.image.width / 2 &&
      x < this.x + this.image.width / 2 &&
      y > this.y - this.image.height / 2 &&
      y < this.y + this.image.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }

  stopWiggling() {
    this.wiggling = false;
    //stop playing sound
  }

  mousePressed() {
    if (this.overlap(mouseX, mouseY)) {
      //play the sound
      this.wiggling = true;
      setTimeout(this.stopWiggling.bind(this), 2000);
      //to play it
      animalClick.play();
      animalClick.setVolume(0.02);
    }

    numAnimalsHit += 1;
  }
}
