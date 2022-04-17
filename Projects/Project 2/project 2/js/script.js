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
    {
      //left plant leaf
      //  x: 680,
      //  y: 700,
      //  filled:
      //  color:
      //},
      //{
      //left root
      x: 720,
      y: 660,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 693,
      y: 670,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 666,
      y: 676,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 638,
      y: 677,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 612,
      y: 679,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 585,
      y: 676,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 557,
      y: 674,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 530,
      y: 674,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 503,
      y: 680,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 480,
      y: 700,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 470,
      y: 727,
      filled: false,
      color: "#5B3314",
    },
    {
      //L root branches
      x: 484,
      y: 660,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 480,
      y: 634,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 590,
      y: 702,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 570,
      y: 720,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 678,
      y: 700,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 670,
      y: 725,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 653,
      y: 743,
      filled: false,
      color: "#5B3314",
    },
    {
      //right root
      x: 760,
      y: 660,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 785,
      y: 670,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 810,
      y: 680,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 837,
      y: 683,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 863,
      y: 685,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 890,
      y: 687,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 918,
      y: 685,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 945,
      y: 684,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 970,
      y: 692,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 985,
      y: 717,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 990,
      y: 744,
      filled: false,
      color: "#5B3314",
    },
    //R root branches
    {
      x: 995,
      y: 680,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 998,
      y: 655,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 880,
      y: 713,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 903,
      y: 725,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 815,
      y: 704,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 818,
      y: 728,
      filled: false,
      color: "#5B3314",
    },
    {
      x: 838,
      y: 744,
      filled: false,
      color: "#5B3314",
    },
  ],
};

let beadColors = ["#6DA946", "#FF00B3", "#FFCD00", "#5B3314"];

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
  image(beadCanvas, windowWidth / 2, windowHeight / 2, 700, 800);
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
