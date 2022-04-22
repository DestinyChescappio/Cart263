//All beads' behavior are stored in here. They come in an array.
//-Through their movements
//-display style
//-how they are handled throught the user's mouse X/Y actions in the simulation
class Beads {
  constructor(x, y, beadColor) {
    //coordinates
    this.x = x;
    this.y = y;
    //dimensions
    this.width = 20;
    this.height = 20;
    //velocity
    this.vx = 0;
    this.vy = 1.2;
    //color of beads
    this.beadColor = beadColor;
    //dragging behavior always false and only true when clicked on
    this.dragged = false;
  }

  //movement
  move() {
    if (!this.dragged) {
      this.x = this.x + this.vx;
      this.y = this.y + this.vy;
    } else {
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  //mouse pressed--> what happens to the bead = it's draggable
  mousePressed() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < this.width) {
      this.dragged = true;
    }
  }

  //mouse released--> what happens when the mouse is released = the bead is assigned to a color and a specific coordinate (refer to design.js for more details)
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
