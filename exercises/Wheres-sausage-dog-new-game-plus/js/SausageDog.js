//using 'extends' to inherit animal stuff
class SausageDog extends Animal {
  constructor(x, y, image) {
    //using 'super' since we are extending the animal class
    super(x, y, image);

    this.found = false;
    this.rotationSpeed = 0.25;
  }

  update() {
    super.update();

    if (this.found) {
      this.angle += this.rotationSpeed;
    }
  }

  mousePressed() {
    if (this.overlap(mouseX, mouseY)) {
      this.found = true;
    }
  }
}
