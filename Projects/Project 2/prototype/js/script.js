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

let design = {
  beadSize: 20,
  defaultFill: "#cccccc",
  beads: [
    {
      //middle
      x: 730,
      y: 425,
      filled: false,
      color: "#FFCD00",
    },
    {
      //petal 1
      x: 725,
      y: 390,
      filled: false,
      color: "#FF00B3",
    },
    {
      x: 728,
      y: 365,
      filled: false,
      color: "#FF00B3",
    },
    {
      x: 760,
      y: 373,
      filled: false,
      color: "#FF00B3",
    },
    {
      x: 748,
      y: 398,
      filled: false,
      color: "#FF00B3",
    },
    {
      //petal 2
      x: 702,
      y: 410,
      filled: false,
      color: "#FF00B3",
    },
    {
      x: 675,
      y: 403,
      filled: false,
      color: "FF00B3",
    },
    {
      x: 670,
      y: 435,
      filled: false,
      color: "#FF00B3",
    },
    {
      x: 700,
      y: 435,
      filled: false,
      color: "#FF00B3",
    },
    {
      //petal 3
      x: 735,
      y: 452,
      filled: false,
      color: "#FF00B3",
    },
    {
      x: 735,
      y: 453,
      filled: false,
      color: "#FF00B3",
    },
    {
      x: 757,
      y: 438,
      filled: false,
      color: "#FF00B3",
    },
    {
      x: 745,
      y: 478,
      filled: false,
      color: "#FF00B3",
    },
    {
      x: 775,
      y: 460,
      filled: false,
      color: "#FF00B3",
    },
    {
      //stem
      x: 775,
      y: 415,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 800,
      y: 430,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 823,
      y: 448,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 830,
      y: 475,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 820,
      y: 500,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 800,
      y: 520,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 780,
      y: 538,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 758,
      y: 555,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 745,
      y: 580,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 742,
      y: 610,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 742,
      y: 640,
      filled: false,
      color: "#6DA946",
    },
  ],
};

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
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255),
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
  userBeadCanvas();
  beadPattern();
  updateBeads();
  //userObject(userNeedle);
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
  fill(200);
  noStroke();
  ellipse(design01.x, design01.y, design01.size);

  fill(200);
  noStroke();
  ellipse(design02.x, design02.y, design02.size);

  fill(200);
  noStroke();
  ellipse(design03.x, design03.y, design03.size);

  fill(200);
  noStroke();
  ellipse(design04.x, design04.y, design04.size);

  fill(200);
  noStroke();
  ellipse(design05.x, design05.y, design05.size);

  //
  fill(200);
  noStroke();
  ellipse(design06.x, design06.y, design06.size);

  fill(200);
  noStroke();
  ellipse(design07.x, design07.y, design07.size);

  fill(200);
  noStroke();
  ellipse(design08.x, design08.y, design08.size);

  fill(200);
  noStroke();
  ellipse(design09.x, design09.y, design09.size);

  fill(200);
  noStroke();
  ellipse(design10.x, design10.y, design10.size);

  fill(200);
  noStroke();
  ellipse(design11.x, design11.y, design11.size);

  fill(200);
  noStroke();
  ellipse(design12.x, design12.y, design12.size);

  fill(200);
  noStroke();
  ellipse(design13.x, design13.y, design13.size);

  fill(200);
  noStroke();
  ellipse(design14.x, design14.y, design14.size);

  fill(200);
  noStroke();
  ellipse(design15.x, design15.y, design15.size);

  fill(200);
  noStroke();
  ellipse(design16.x, design16.y, design16.size);

  fill(200);
  noStroke();
  ellipse(design17.x, design17.y, design17.size);

  fill(200);
  noStroke();
  ellipse(design18.x, design18.y, design18.size);

  fill(200);
  noStroke();
  ellipse(design19.x, design19.y, design19.size);

  fill(200);
  noStroke();
  ellipse(design20.x, design20.y, design20.size);

  fill(200);
  noStroke();
  ellipse(design21.x, design21.y, design21.size);

  fill(200);
  noStroke();
  ellipse(design22.x, design22.y, design22.size);

  fill(200);
  noStroke();
  ellipse(design23.x, design23.y, design23.size);

  fill(200);
  noStroke();
  ellipse(design24.x, design24.y, design24.size);
}

function userBeadCanvas() {
  imageMode(CENTER);
  image(beadCanvas, windowWidth / 2, windowHeight - 300, 300, 400);
}

//function userObject(userNeedle) {
//  image(userNeedle, mouseX, mouseY);
//  userNeedle.x = mouseX;
//  userNeedle.y = mouseY;
//}
