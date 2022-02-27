/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
let state = "title";

let bgSky;

let layers = {
  bgClouds: {
    bgs: [],
    parallaxRatio: 0.5,
  },
  bgTowers: {
    bgs: [],
    parallaxRatio: 1.0,
  },
};

let harryPotter;

let bludgerImage = undefined;
let bludgers = [];
let numBludger = 5;
let numBludgerHits = 0;

let snitches = [];
let numSnitch = 5;
let numSnitchCollection = 0;
let level = 1;

/**
Description of preload
*/
function preload() {
  bludgerImage = loadImage("assets/images/bludger.png");

  bgSky = loadImage("assets/images/blueSky-assets/blueSky.png");
  bgClouds = loadImage("assets/images/clouds.png");
  bgTowers = loadImage("assets/images/towers.png");
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
  background(bgSky, windowWidth / 2, windowHeight);
  if (state === `title`) {
    title();
  } else if (state === `startGame`) {
    game();
  } else if (state === `win`) {
    winning();
  } else if (state === `lose`) {
    losing();
  }
}

function title() {
  //  image(titleImage, width - 975, height - 630, 500, 500);
  fill(0);
  textFont(`arial`);
  textStyle(BOLD);
  textSize(60);
  textAlign(CENTER, CENTER);
  text(`Harry Potter's Quidditch Adventures`, width / 2, height / 2);
}

function game() {
  updateSnitch();
  updateBludger();
  updateHarryPotter();
  drawSprites();
  numSnitchText();
  numBludgerText();
}

function mousePressed() {
  if (state === `title`) {
    state = `startGame`;
  }
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
    bludger.gravitate(harryPotter);
    //returns true if it hits harry potter
    let bludgerHitHarry = bludger.harryCollision(harryPotter);
    if (bludgerHitHarry) {
      numBludgerHits += 1;
    }
    // bludgerHit(bludger, harryPotter);
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
  text(`Snitches ${numSnitchCollection}`, 1200, 80);
}

function numBludgerText() {
  fill(0);
  textFont(`ariel`);
  textStyle(BOLD);
  textSize(40);
  text(`Bludgers ${numBludgerHits}`, 100, 80);
}

function snitchCollection(snitch, harryPotter) {
  //check to overlapp if snitch hasn't been collected yet
  let d = dist(
    harryPotter.sprite.position.x,
    harryPotter.sprite.position.y,
    snitch.sprite.position.x,
    snitch.sprite.position.y
  );
  //harry potter overlaps snitch
  if (d < harryPotter.sprite.width / 2 + snitch.sprite.width / 2) {
    //keeping track of how many snitches were overlapped
    numSnitchCollection += 1;
  }
  //if he collects 10 snitches, the level goes up
  if (level === 1 && numSnitchCollection >= 10) {
    changeLevel();
  }
}

function bludgerHit(bludger, harryPotter) {
  //check to overlap if bludger hasn't hit harry potter yet
  if (!bludger.harryCollision) {
    let d = dist(
      harryPotter.sprite.position.x,
      harryPotter.sprite.position.y,
      bludger.x,
      bludger.y
    );
    //harry potter overlaps bludger
    if (
      (d < harryPotter.sprite.width / 2 + bludger.width / 2, bludger.height / 2)
    ) {
      bludger.harryCollision = true;
      numBludgerHits += 1;
    }
  }
}

function changeLevel() {
  if (level === 1) {
    level = 2;
    for (let i = 0; i < bludgers.length; i++) {
      bludgers[i].vx = -10;
    }
    if (level === 2) {
      level = 3;
      for (let i = 0; i < bludgers.length; i++) {
        bludgers[i].vx = -15;
      }
      if (level === 3) {
        level = 4;
        for (let i = 0; i < bludgers.length; i++) {
          bludgers.gravitate = true;
        }
      }
    }
  }
}
