/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let beads = [];
let numBeads = 5;

/**
Description of preload
*/
function preload() {}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numBeads; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let beadColor = {
      r: random(100, 255),
      g: random(100, 255),
      b: random(100, 255),
    };
    let bead = new Beads(x, y, beadColor);
    beads.push(bead);
  }
}

/**
Description of draw()
*/
function draw() {
  background(255);
  updateBeads();
}

function updateBeads() {
  for (let i = 0; i < beads.length; i++) {
    let bead = beads[i];
    bead.move();
    bead.wrap();
    bead.display();
  }
}
