/**
p2: prototype
by Destiny Chescappio

The beginning stages of creating a digitalization of Indigenous beadwork practices! (Also a theraputic simulation)
*/

"use strict";
let button = {
  x: 600,
  y: 500,
  size: 50,
};
let speaking = false;
let speech = "Intro to beads go here.";
let speechIndex = 0;

let beads = [];
let numBeads = 5;

let beadCanvas = undefined;

let state = "startScreen";

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

let beadColors = ["#6DA946", "#FF00B3", "#FFCD00"];

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
    let beadColor = random(beadColors);
    let bead = new Beads(x, y, beadColor);
    beads.push(bead);
  }
}

/**
Description of draw()
*/
function draw() {
  background(255);
  sceneSwitcher();
  //userObject(userNeedle);
}

//switching pages
function sceneSwitcher() {
  if (state === "startScreen") {
    startScreen();
  } else if (state === "interactiveScreen") {
    interactiveScreen();
  }
}

function startScreen() {
  ellipse(button.x, button.y, button.size); //move to a function called drawbutton
  fill(0);
  speaker();
  //drawButton();
}

function interactiveScreen() {
  userBeadCanvas();
  beadPattern();
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

function beadPattern() {
  for (let i = 0; i < design.beads.length; i++) {
    let bead = design.beads[i];
    push();
    if (bead.filled) {
      fill(bead.color);
    } else {
      fill(200);
    }
    noStroke();
    ellipse(bead.x, bead.y, design.beadSize);
    pop();
  }
}

function userBeadCanvas() {
  imageMode(CENTER);
  image(beadCanvas, windowWidth / 2, windowHeight - 300, 300, 400);
}

function mousePressed() {
  if (state === "startScreen") {
    let d = dist(button.x, button.y, mouseX, mouseY);
    if (d < button.size / 2) {
      state = "interactiveScreen";
    }
  } else if (state === "interactiveScreen") {
    for (let i = 0; i < beads.length; i++) {
      beads[i].mousePressed();
    }
  }
}

function mouseReleased() {
  for (let i = 0; i < beads.length; i++) {
    beads[i].mouseReleased(design);
  }
}

function speaker() {
  if (speaking) {
    let currentSpeech = speech.substring(0, speechIndex);

    text(currentSpeech, 100, 100);
    speechIndex += 0.25;
  }
}

function keyPressed() {
  responsiveVoice.speak(speech);
  speaking = true;
}

//function userObject(userNeedle) {
//  image(userNeedle, mouseX, mouseY);
//  userNeedle.x = mouseX;
//  userNeedle.y = mouseY;
//}
