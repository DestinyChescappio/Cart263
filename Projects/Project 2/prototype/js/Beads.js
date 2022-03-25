class Beads {
  constructor(x, y, beadColor) {
    this.x = x;
    this.y = y;

    this.width = 20;
    this.height = 20;

    this.vx = 0;
    this.vy = 1.2;

    this.beadColor = beadColor;

    this.dragged = false;
  }

  move() {
    if (!this.dragged) {
      this.x = this.x + this.vx;
      this.y = this.y + this.vy;
    } else {
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  mousePressed() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < this.width) {
      this.dragged = true;
    }
  }

  mouseReleased(design) {
    if (this.dragged) {
      this.dragged = false;
      for (let i = 0; i < design.beads.length; i++) {
        let designBead = design.beads[i];
        let d = dist(this.x, this.y, designBead.x, designBead.y);
        if (!designBead.filled && d < this.width / 2 + design.beadSize / 2) {
          if (this.beadColor === designBead.color) {
            designBead.filled = true;
          }
          break;
        }
      }
    }
  }

  wrap() {
    if (this.y > height) {
      this.y -= height;
    }
  }

  display() {
    push();
    noStroke();
    fill(this.beadColor);
    ellipse(this.x, this.y, this.width, this.height);
    pop();
  }
}
