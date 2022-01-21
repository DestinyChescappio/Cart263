//Sausage dog class: the update of its spinning behavior, winning state when it is found, and
//what happens if it is found, the barking sound triggers

//using 'extends' to inherit animal stuff
class SausageDog extends Animal {
  constructor(x, y, image) {
    //using 'super' since we are extending the animal class
    super(x, y, image);
    //if it's not clicked on, being found it false
    this.found = false;
    //how fast it spins
    this.rotationSpeed = 0.25;
  }

  //sausage dog behavior
  update() {
    super.update();
    //if the sausage dog is found, he spins
    if (this.found) {
      this.angle += this.rotationSpeed;
    }
  }

  //winning state when sausage dog is found
  winState() {
    state = `winning`;
  }

  //when mouse is pressed on the sausage dog, finding him is true
  //barking sound triggers when he is found
  //barking sound and overall behavior & state stops after 2 seconds it is found
  mousePressed() {
    if (!this.found && this.overlap(mouseX, mouseY)) {
      this.found = true;
      barkSFX.play();
      setTimeout(this.winState.bind(this), 2000);
    }
  }
}
