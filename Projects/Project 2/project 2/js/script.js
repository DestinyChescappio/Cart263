/**
p2: prototype
by Destiny Chescappio

The beginning stages of creating a digitalization of Indigenous beadwork practices! (Also a theraputic simulation)
*/

"use strict";
//intro button; what triggers interactive page
let button = {
  x: 800,
  y: 500,
  width: 75,
  height: 75,
};

//the frame of the speech's text
let speechBubble;

//user object; needle image
let userNeedle;

//responsive voice for intro page
let speaking = false;
let speech = "Intro to beads go here.";
let speechIndex = 0;

//character speaker
let introCharacter;

//beads
let beads = [];
let numBeads = 5;

//user beadwork canvas in interactive page
let beadCanvas = undefined;

//Introduction page before interactive page
let state = "startScreen";

//Bead colors for the design
//Falling beads in interactive page
let beadColors = [
  "#6DA946", //Green color
  "#FF00B3", //Pink color
  "#FFCD00", //Yellow color
  "#5B3314", //Brown color
  "#5F9EF0", //Blue color
  "#FF8900", //Orange color
];

/**
loading images/sounds used for simulation --> both interactive and introduction pages
*/
function preload() {
  beadCanvas = loadImage(`assets/images/leather.jpeg`);
  userNeedle = loadImage(`assets/images/userNeedle.png`);
  button.image = loadImage(`assets/images/introButton.png`);
  speechBubble = loadImage(`assets/images/introBox.png`);
}

/**
Bead.js constructor behavior/methods
- array of falling beads at random areas between x and y
*/
function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("parent");
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
  speakerCharacter();
}

/**
drawing the scene switcher between the introduction and interactive page
*/
function draw() {
  background(255);
  sceneSwitcher();
  userObject(userNeedle);
  //if the state is start screen, the p5 play sprites start
  if (state === "startScreen") {
    drawSprites();
  }
}

//intro page --> calling introduction page functions
function startScreen() {
  drawTextBubble();
  drawButton(button);
  speaker();
}

//interactive page --> calling functions
function interactiveScreen() {
  updateBeads();
  userBeadCanvas();
  beadPattern();
}

//switching pages --> from intro page to interactive page
function sceneSwitcher() {
  if (state === "startScreen") {
    startScreen();
  } else if (state === "interactiveScreen") {
    interactiveScreen();
  }
}

//both interactive and Intro page --> user needle object
function userObject(userNeedle) {
  userNeedle.x = mouseX;
  userNeedle.y = mouseY;
  image(userNeedle, userNeedle.x, userNeedle.y);
}

//the speaker character is created with p5 play
function speakerCharacter() {
  //loading character animation when NOT speaking
  introCharacter = createSprite(600, 600, 100, 100);
  introCharacter.addAnimation("notSpeaking", "assets/images/girlStandard.png");
  //loading chracter animation when speaking
  introCharacter.addAnimation(
    "speaking",
    "assets/images/girl01.png",
    "assets/images/girl03.png"
  );
}

//notSpeaking animation occurs when the speaking is false; stops talking
function stopSpeaking() {
  introCharacter.changeAnimation("notSpeaking");
  speaking = false;
}

//intro page --> key pressed triggers the responsive voice
function keyPressed() {
  if (state === "startScreen") {
    //talking is true
    responsiveVoice.speak(speech, "UK English Female", { onend: stopSpeaking });
    speaking = true;
    //speaking animation occurs
    introCharacter.changeAnimation("speaking");
  } else {
    //otherwise it stops talking
    speaking = false;
  }
}

function drawTextBubble() {
  imageMode(CENTER);
  image(speechBubble, 400, 400, 500, 600);
}

//intro page --> the button that is clicked on to trigger the interactive page
function drawButton(button) {
  imageMode(CENTER);
  image(button.image, button.x, button.y, button.width, button.height);
}

//intro page --> responsive voice/speech
function speaker() {
  if (speaking) {
    let currentSpeech = speech.substring(0, speechIndex);
    //what the speaker says, it texts its words as it goes
    text(currentSpeech, 300, 300);
    speechIndex += 0.25;
  }
}

//interactive page --> calling bead contents (refer to Beads.js)
function updateBeads() {
  for (let i = 0; i < beads.length; i++) {
    let bead = beads[i];
    bead.move();
    bead.wrap();
    bead.display();
  }
}

//Interactive page --> placing the user's beading canvas
function userBeadCanvas() {
  imageMode(CENTER);
  image(beadCanvas, windowWidth / 2 + 10, windowHeight / 2, 720, 800);
}

//interactive page --> filling the grayed-out bead design with colored falling beads
function beadPattern() {
  for (let i = 0; i < design.beads.length; i++) {
    let bead = design.beads[i];
    push();
    //if the gray beads are filled
    if (bead.filled) {
      //corresponding color matches
      fill(bead.color);
    } else {
      //otherwise it remains gray
      fill(200);
    }
    noStroke();
    ellipse(bead.x, bead.y, design.beadSize);
    pop();
  }
}

//both intro and interactive page
function mousePressed() {
  if (state === "startScreen") {
    //mouse is pressed on button object in introduction page to go to interactive page
    let d = dist(button.x, button.y, mouseX, mouseY);
    if (d < button.width / 2) {
      state = "interactiveScreen";
      //display buttons
      document.getElementById("button_1").style.display = "block";
      document.getElementById("button_2").style.display = "block";
      document.getElementById("button_3").style.display = "block";
    }
    //mouse is pressed is ALSO used to grab bead objects in interactive page
  } else if (state === "interactiveScreen") {
    for (let i = 0; i < beads.length; i++) {
      beads[i].mousePressed();
    }
  }
}

//interactive page --> to know when the beads are released when they are "grabbed"
function mouseReleased() {
  for (let i = 0; i < beads.length; i++) {
    beads[i].mouseReleased(design);
  }
}
