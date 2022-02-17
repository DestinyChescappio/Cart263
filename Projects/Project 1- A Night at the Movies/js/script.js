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
let numBludger = 5;

let snitchImage = undefined;
let snitches = [];
let numSnitch = 5;

/**
Description of preload
*/
function preload() {
  bludgerImage = loadImage("assets/images/bludger.png");

  snitchImage = loadImage("assets/images/snitch.gif");
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  //calling the harry potter object
  harryPotter = new HarryPotter();

  //array of snitches
  for (let i = 0; i < numSnitch; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let snitch = new Snitches(x, y, snitchImage);
    snitches.push(snitch);
  }
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

  updateSnitch();
  updateBludger();
  updateHarryPotter();
  drawSprites();
}

function updateSnitch() {
  for (let i = 0; i < snitches.length; i++) {
    let snitch = snitches[i];
    // calling methods- move, wrap, display
    snitch.move(harryPotter);
    snitch.wrap();
    snitch.display();
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

function updateHarryPotter() {
  harryPotter.handleInput();
  harryPotter.handleGravity();
}
