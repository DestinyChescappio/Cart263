/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let harryPotter;

let bludgerImage = undefined;
let bludgers = [];
let numBludger = 10;

/**
Description of preload
*/
function preload() {
  //loading user's character
  harryPotter = createSprite(600, 200, 50, 100);
  harryPotter.addAnimation(
    "floating",
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

  //calling the harry potter inheritance object
  harryPotter = new HarryPotter();

  //array of bludgers
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

  updateBludger();

  updateHarryPotter();
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

function updateHarryPotter() {
  harryPotter.handleInput();
  harryPotter.handleGravity();
  harryPotter.display();
}
