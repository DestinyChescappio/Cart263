class Animal {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;

    this.angle = 0;
  }

  //update method
  update() {
    this.display();
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
}
