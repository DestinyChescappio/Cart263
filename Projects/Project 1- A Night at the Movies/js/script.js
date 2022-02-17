/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let harryPotter = {
  vx: 0,
  vy: 0,
};

let bludgerImage = undefined;
let bludgers = [];
let numBludger = 10;

/**
Description of preload
*/
function preload() {
  //loading user's character
  harryPotter = loadAnimation(
    "assets/standard/standard01.png",
    "assets/standard/standard05.png"
  );
  bludgerImage = loadImage("assets/images/bludger.png");
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numBludger; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let bludger = new Bludgers(x, y, bludgerImage);
    bludgers.push(bludger);
  }
}

/**
Description of draw()
*/
function draw() {
  background(255);
  //drawing the user's animated character
  animation(harryPotter, 500, 500);

  harryPotterFlying();

  updateBludger();
}

function harryPotterFlying() {
  harryPotter.x = harryPotter.x + harryPotter.vx;
  harryPotter.y = harryPotter.y + harryPotter.vy;
  if (keyIsDown(RIGHT_ARROW)) {
    harryPotter.play();
  } else {
    harryPotter.stop();
  }
}

function updateBludger() {
  for (let i = 0; i < bludgers.length; i++) {
    let bludger = bludgers[i];
    // calling methods- move, wrap, display
    bludger.move();
    bludger.wrap();
    bludger.display();
  }
}
