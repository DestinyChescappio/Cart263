//Animal class: the update of its wiggle and display behavior, behavior of wiggling when
//clicked on, the display,checking if the mouse overalps the animal, behavior when mouse is
//pressed on any of the animals.

class Animal {
  //animal properties
  constructor(x, y, image) {
    //x position
    this.x = x;
    //y position
    this.y = y;
    //the image it's using
    this.image = image;
    //wiggling is false when it's not clicked on
    this.wiggling = false;
    //no angle
    this.angle = 0;
  }

  //update method
  update() {
    this.wiggle();
    this.display();
  }

  //wiggling method
  wiggle() {
    if (this.wiggling) {
      //if it's wiggling, the position axis shifts -2 to 2 pixels
      this.x += random(-2, 2);
      this.y += random(-2, 2);
    }
  }

  //display method
  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image, 0, 0);
    pop();
  }

  //if mouse is overlapping any animals
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

  //stops wiggling method is used for the 'setTimeout'
  stopWiggling() {
    this.wiggling = false;
  }

  //when mouse is pressed on the animal, the wiggling is true
  //wiggling stops; after 2 seconds
  mousePressed() {
    if (this.overlap(mouseX, mouseY)) {
      //play the sound
      this.wiggling = true;
      setTimeout(this.stopWiggling.bind(this), 2000);
      //animalsClick sound triggers when animal is clicked on
      animalClick.play();
      //volume of sound
      animalClick.setVolume(0.02);
      //keeping track of how many animals are hit; 1 each time
      numAnimalsHit++;
    }
  }
}
