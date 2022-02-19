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

let snitches = [];
let numSnitch = 5;
let numSnitchCollection = 0;
let level = 1;

/**
Description of preload
*/
function preload() {
  bludgerImage = loadImage("assets/images/bludger.png");
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
    let snitch = new Snitches(x, y);
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
  numSnitchText();
  fill(0, 0, 255);
  ellipse(harryPotter.sprite.position.x, harryPotter.sprite.position.y, 10, 10);
}

function updateSnitch() {
  for (let i = 0; i < snitches.length; i++) {
    let snitch = snitches[i];
    // calling methods- move, wrap, display
    snitch.move(harryPotter);
    snitch.wrap();
    snitchCollection(snitch, harryPotter);
  }
}

function updateBludger() {
  for (let i = 0; i < bludgers.length; i++) {
    let bludger = bludgers[i];
    // calling methods- move, wrap, display
    bludger.move();
    bludger.wrap();
    bludger.display();
    bludger.harryCollision();
  }
}

function updateHarryPotter() {
  harryPotter.handleInput();
  harryPotter.handleGravity();
}

function numSnitchText() {
  fill(0);
  textFont(`ariel`);
  textStyle(BOLD);
  textSize(40);
  text(`Snitch ${numSnitchCollection}`, 1200, 80);
}

function snitchCollection(snitch, harryPotter) {
  //check to overlapp if snitch hasn't been collected yet
  if (!snitch.collected) {
    let d = dist(
      harryPotter.sprite.position.x,
      harryPotter.sprite.position.y,
      snitch.sprite.position.x,
      snitch.sprite.position.y
    );
    console.log(harryPotter.sprite.width / 2 + snitch.sprite.width / 2);
    //snowball collects snowball & snowball disappears
    if (d < harryPotter.sprite.width / 2 + snitch.sprite.width / 2) {
      snitch.collected = true;
      //keeping track of how many snowballs were collected
      numSnitchCollection += 1;
    }
  }
}
function changeLevel() {
  if (level === 1) {
    level = 2;
    for (let i = 0; i < bludgers.length; i++) {
      bludgers[i].vx = -10;
    }
  }
}
