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

/**
Description of preload
*/
function preload() {
  //loading user's character
  harryPotter = loadAnimation(
    "assets/standard/standard01.png",
    "assets/standard/standard05.png"
  );
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  harryPotter.x = harryPotter.x + harryPotter.vx;
}

/**
Description of draw()
*/
function draw() {
  background(255);
  //drawing the user's animated character
  animation(harryPotter, 500, 500);

  harryPotterFlying();
}

function harryPotterFlying() {
  if (keyIsDown(RIGHT_ARROW)) {
    harryPotter.play();
  } else {
    harryPotter.stop();
  }
}
