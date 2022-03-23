/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let beads = [];
let numBeads = 5;

let beadCanvas = undefined;

let design01 = {
  x: 800,
  y: 600,
  size: 20,
};
//let design02 = {
//  x: 700,
//  y: 500,
//  size: 20,
//};
//let design03 = {
//  x: 600,
//  y: 400,
//  size: 20,
//};
//let design04 = {
//  x: 700,
//  y: 300,
//  size: 20,
//};
//let design05 = {
//  x: 600,
//  y: 200,
//  size: 20,
//};
//let design06 = {
//  x: 500,
//  y: 100,
//  size: 20,
//};

//let userNeedle = undefined;

/**
Description of preload
*/
function preload() {
  beadCanvas = loadImage(`assets/images/leather.jpeg`);
  //userNeedle = loadImage(`assets/images/userNeedle.png`);
}

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
  userBeadCanvas();
  //userObject();
  beadPattern();
}

function updateBeads() {
  for (let i = 0; i < beads.length; i++) {
    let bead = beads[i];
    bead.move();
    bead.wrap();
    bead.display();
  }
}

function beadPattern() {
  stroke(0);
  strokeWeight(10);
  ellipse(design01.x, design01.y, design01.size);

  //  stroke(0);
  //  strokeWeight(10);
  //  ellipse(design02.x, design02.y, design02.size);

  //  stroke(0);
  //  strokeWeight(10);
  //  ellipse(design03.x, design03.y, design03.size);

  //  stroke(0);
  //  strokeWeight(10);
  //  ellipse(design04.x, design04.y, design04.size);

  //  stroke(0);
  //  strokeWeight(10);
  //  ellipse(design05.x, design05.y, design05.size);

  //  stroke(0);
  //  strokeWeight(10);
  //  ellipse(design06.x, design06.y, design06.size);
}

function userBeadCanvas() {
  imageMode(CENTER);
  image(beadCanvas, windowWidth / 2, windowHeight - 300, 300, 400);
}

//function userObject(userNeedle) {
//  image(userNeedle);
//  userNeedle.x = mouseX;
//  userNeedle.y = mouseY;
//}
