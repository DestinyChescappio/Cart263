/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
let state = "title";

let bgSky;
let bgClouds;
let bgTowers;

let harryPotter;

let layers = {
  sky: {
    paraObjects: [],
    parallaxRatio: 0.25,
  },
  cloud: {
    paraObjects: [],
    parallaxRatio: 0.5,
  },
  tower: {
    paraObjects: [],
    parallaxRatio: 1,
  },
};

let bludgerImage = undefined;
let bludgers = [];
let numBludger = 5;
let numBludgerHits = 0;

let snitches = [];
let numSnitch = 5;
let numSnitchCollection = 0;
let level = 1;

let numLevels = 1;
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

  //starting point for the first building
  let x = 0;
  //position to draw the base of nerest layer
  let y = height;
  //adding new sky extension to sky layer
  layers.sky.paraObjects.push(createParaObject(0, 0));
  layers.cloud.paraObjects.push(createParaObject(0, 0));
  layers.tower.paraObjects.push(createParaObject(0, 0));
}

/**
Description of draw()
*/
function draw() {
  background(255);
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
  updateHarryPotter();

  moveParaObjects();
  displayParaObject();

  drawSprites();

  updateBludger();

  numSnitchText();
  numBludgerText();
  numLevelText();

  harryWins();
}

function winning() {
  textFont(`arial`);
  textStyle(BOLD);
  textSize(60);
  text(`Yay :)`, windowWidth / 2, windowHeight / 2);
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
    if (level === 4) {
      bludger.gravitate(harryPotter);
    } else {
      bludger.move();
    }

    bludger.wrap();
    bludger.display();

    //returns true if it hits harry potter
    let bludgerHitHarry = bludger.harryCollision(harryPotter);
    if (bludgerHitHarry) {
      numBludgerHits += 1;
    }
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

function numLevelText() {
  fill(0);
  textFont(`arial`);
  textStyle(BOLD);
  textSize(40);
  text(`LEVEL ${numLevels}`, windowWidth / 2, 80);
}

function snitchCollection(snitch, harryPotter) {
  if (snitch.caught === false) {
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
      snitch.caught = true;
      setTimeout(function () {
        snitch.caught = false;
      }, 1000);
    }
  }
  console.log(numSnitchCollection);
  //if he collects 10 snitches, the level goes up
  if (level === 1 && numSnitchCollection >= 5) {
    changeLevel();
    numLevels += 1;
  } else if (level === 2 && numSnitchCollection >= 10) {
    changeLevel();
    numLevels += 1;
  } else if (level === 3 && numSnitchCollection >= 15) {
    numLevels += 1;
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
  } else if (level === 2) {
    level = 3;
    for (let i = 0; i < bludgers.length; i++) {
      bludgers[i].vx = -15;
    }
  } else if (level === 3) {
    level = 4;
    for (let i = 0; i < bludgers.length; i++) {
      bludgers[i].follow = true;
    }
  }
}

function harryWins() {
  if (numSnitchCollection >= 20) {
    state = `win`;
  }
}

function createParaObject(x, y) {
  //making the object
  let paraObject = {
    x: x,
    y: y,
    width: windowWidth,
    height: windowHeight,
  };
  return paraObject;
}

//moving paraObjects according to harry potter's velocity
function moveParaObjects() {
  moveLayer(layers.sky);
  moveLayer(layers.cloud);
  moveLayer(layers.tower);
}

function moveLayer(layer) {
  //go through all paraObjects in this layer
  for (let i = 0; i < layer.paraObjects.length; i++) {
    //get the paraObject
    let paraObject = layer.paraObjects[i];
    //console.log(paraObject);
    //console.log(harryPotter.sprite.velocity);
    //changing its x by the negative of harry potter's velocity; which is multiplied by the parallax ratio
    paraObject.x += -harryPotter.sprite.velocity.x * layer.parallaxRatio;

    //  console.log(paraObject.x);

    //wrapping the paraObject to other side if needed (it will need to be relative to the first/last paraObject in array)
    if (paraObject.x < -width) {
      console.log("herer");
      paraObject.x = 0;
    } else if (paraObject.x > 0) {
      console.log("herer other");
      paraObject.x = -width;
    }
  }
}

//displays the provided paraObject according to its properties
function displayParaObject() {
  //sky
  push();
  image(
    bgSky,
    layers.sky.paraObjects[0].x,
    layers.sky.paraObjects[0].y,
    windowWidth * 2,
    windowHeight
  );
  pop();

  //clouds
  push();
  image(
    bgClouds,
    layers.cloud.paraObjects[0].x,
    layers.cloud.paraObjects[0].y,
    windowWidth * 2,
    windowHeight
  );
  pop();

  //tower
  push();
  image(
    bgTowers,
    layers.tower.paraObjects[0].x,
    layers.tower.paraObjects[0].y,
    windowWidth * 2,
    windowHeight
  );
  pop();
}
