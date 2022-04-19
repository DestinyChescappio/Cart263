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
let userNeedle;

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
      //stem leaf 01
      x: 716,
      y: 632,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 695,
      y: 618,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 676,
      y: 600,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 658,
      y: 583,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 643,
      y: 563,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 638,
      y: 539,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 642,
      y: 515,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 718,
      y: 605,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 708,
      y: 583,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 695,
      y: 562,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 684,
      y: 540,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 666,
      y: 518,
      filled: false,
      color: "#6DA946",
    },
    {
      //stem leaf 02
      x: 770,
      y: 635,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 790,
      y: 620,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 813,
      y: 612,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 835,
      y: 597,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 839,
      y: 572,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 816,
      y: 563,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 793,
      y: 570,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 776,
      y: 588,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 765,
      y: 610,
      filled: false,
      color: "#6DA946",
    },
    {
      //yellow sun shape above
      x: 738,
      y: 130,
      filled: false,
      color: "#FF8900",
    },
    {
      //orange sun shape exterior
      x: 738,
      y: 105,
      filled: false,
      color: "#FFCD00",
    },
    {
      x: 738,
      y: 80,
      filled: false,
      color: "#FF8900",
    },
    {
      x: 712,
      y: 105,
      filled: false,
      color: "#FF8900",
    },
    {
      x: 763,
      y: 105,
      filled: false,
      color: "#FF8900",
    },
    {
      //left floral bud 01
      x: 523,
      y: 400,
      filled: false,
      color: "#5F9EF0",
    },
    {
      x: 527,
      y: 376,
      filled: false,
      color: "#5F9EF0",
    },
    {
      x: 547,
      y: 390,
      filled: false,
      color: "#5F9EF0",
    },
    {
      //left floral bud 02
      x: 523,
      y: 250,
      filled: false,
      color: "#5F9EF0",
    },
    {
      x: 510,
      y: 271,
      filled: false,
      color: "#5F9EF0",
    },
    {
      x: 497,
      y: 251,
      filled: false,
      color: "#5F9EF0",
    },
    {
      //right floral bud 01
      x: 947,
      y: 400,
      filled: false,
      color: "#5F9EF0",
    },
    {
      x: 940,
      y: 376,
      filled: false,
      color: "#5F9EF0",
    },
    {
      x: 922,
      y: 392,
      filled: false,
      color: "#5F9EF0",
    },
    {
      //right floral bud 02
      x: 935,
      y: 250,
      filled: false,
      color: "#5F9EF0",
    },
    {
      x: 948,
      y: 273,
      filled: false,
      color: "#5F9EF0",
    },
    {
      x: 961,
      y: 251,
      filled: false,
      color: "#5F9EF0",
    },
    {
      //left leaf plant
      x: 640,
      y: 651,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 630,
      y: 627,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 615,
      y: 606,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 595,
      y: 587,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 572,
      y: 571,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 530,
      y: 531,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 550,
      y: 552,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 515,
      y: 507,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 505,
      y: 480,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 498,
      y: 452,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 494,
      y: 424,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 498,
      y: 395,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 505,
      y: 367,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 513,
      y: 339,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 520,
      y: 312,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 530,
      y: 287,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 545,
      y: 262,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 560,
      y: 237,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 575,
      y: 213,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 585,
      y: 185,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 590,
      y: 157,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 580,
      y: 130,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 563,
      y: 107,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 540,
      y: 91,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 513,
      y: 87,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 485,
      y: 90,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 463,
      y: 108,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 460,
      y: 135,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 480,
      y: 155,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 507,
      y: 150,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 538,
      y: 155,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 562,
      y: 175,
      filled: false,
      color: "#6DA946",
    },
    {
      //L leaf 01
      x: 483,
      y: 350,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 460,
      y: 335,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 434,
      y: 337,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 417,
      y: 357,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 427,
      y: 380,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 453,
      y: 380,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 478,
      y: 375,
      filled: false,
      color: "#6DA946",
    },
    {
      //L leaf 02
      x: 485,
      y: 500,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 460,
      y: 500,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 440,
      y: 515,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 438,
      y: 540,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 460,
      y: 552,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 483,
      y: 543,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 501,
      y: 528,
      filled: false,
      color: "#6DA946",
    },
    {
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
      //Right leaf plant
      x: 840,
      y: 657,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 850,
      y: 634,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 865,
      y: 614,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 885,
      y: 597,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 906,
      y: 583,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 925,
      y: 565,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 943,
      y: 544,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 955,
      y: 520,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 965,
      y: 495,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 970,
      y: 468,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 973,
      y: 440,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 973,
      y: 413,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 967,
      y: 386,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 958,
      y: 360,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 950,
      y: 335,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 939,
      y: 310,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 925,
      y: 285,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 913,
      y: 260,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 899,
      y: 239,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 888,
      y: 215,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 879,
      y: 190,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 879,
      y: 163,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 887,
      y: 137,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 904,
      y: 115,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 924,
      y: 100,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 949,
      y: 94,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 975,
      y: 96,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 1003,
      y: 110,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 1008,
      y: 137,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 988,
      y: 158,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 960,
      y: 154,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 930,
      y: 162,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 908,
      y: 175,
      filled: false,
      color: "#6DA946",
    },
    {
      //R leaf 01
      x: 982,
      y: 350,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 1005,
      y: 339,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 1029,
      y: 337,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 1045,
      y: 356,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 1038,
      y: 380,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 1013,
      y: 380,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 990,
      y: 375,
      filled: false,
      color: "#6DA946",
    },
    {
      //R Leaf 02
      x: 990,
      y: 500,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 1013,
      y: 499,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 1033,
      y: 510,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 1035,
      y: 534,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 1018,
      y: 552,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 996,
      y: 546,
      filled: false,
      color: "#6DA946",
    },
    {
      x: 976,
      y: 533,
      filled: false,
      color: "#6DA946",
    },
    {
      //right root
      x: 763,
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

let beadColors = [
  "#6DA946",
  "#FF00B3",
  "#FFCD00",
  "#5B3314",
  "#5F9EF0",
  "#FF8900",
];

//let userNeedle = undefined;

/**
Description of preload
*/
function preload() {
  beadCanvas = loadImage(`assets/images/leather.jpeg`);
  userNeedle = loadImage(`assets/images/userNeedle.png`);
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  //go through all the bead colors
  for (let i = 0; i < beadColors.length; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let beadColor = beadColors[i];
    let bead = new Beads(x, y, beadColor);
    beads.push(bead);
  }

  //add all the "extra" random beads on top of the main set
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
  userObject(userNeedle);
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
  image(beadCanvas, windowWidth / 2 + 10, windowHeight / 2, 720, 800);
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

function userObject(userNeedle) {
  image(userNeedle, mouseX, mouseY);
  userNeedle.x = mouseX;
  userNeedle.y = mouseY;
}
