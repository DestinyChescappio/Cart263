/**
P2: Anujeeemeechanuuch
by Destiny Chescappio

A simulation incorporating Indigenous practices of beadwork. The simulation has two separate parts; the start screen
and the interactive screen. The start screen is an introduction section where the user is welcomed by a quick quote by
an Indigenous beadwork artist then the user is lead to the interactive page where they are encouraged to virtually do
the practice of beadwork and follow a guide (image of what the design is supposed to look like). During or after the beadwork,
they are also encouraged to click on the fibre arts objects (thread, scissors, bowl of beads) which lead them to Indigenous
beadwork artists to further their curiousity into the practice.

Credits
--> relaxing music
https://pixabay.com/music/search/mood/relaxing/
by John Kensy Music

--> bouncing bead sound
https://freesound.org/people/Trymyname1/sounds/409184/
by Trymyname1

*/

"use strict";
//intro button; what triggers interactive page
let button = {
  x: 1200,
  y: 700,
  width: 75,
  height: 75,
};

let designPrev;

//title text image
let title;

//relaxing music in interactive screen
let musicSFX;
//bouncing bead sound when bead is dropped in assigned place of design
let bouncingBeadSFX;

//the frame of the speech's text
let speechBubble;

//user object; needle image
let userNeedle;

//responsive voice for intro page
let speaking = false;
let speech =
  "Kwe, beadwork, in a sense, is a violent act; as the needle pierces the fabric it creates something beautiful at the same time.";
let speechIndex = 0;

//character speaker
let introCharacter;

//beads
let beads = [];
let numBeads = 30;

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
  //loaded images
  beadCanvas = loadImage(`assets/images/leather.jpeg`);
  userNeedle = loadImage(`assets/images/userNeedle.png`);
  button.image = loadImage(`assets/images/introButton.png`);
  speechBubble = loadImage(`assets/images/introBox.png`);
  title = loadImage(`assets/images/titleBeading.png`);
  //loaded sounds
  musicSFX = loadSound(`assets/sounds/relaxMusic.mp3`);
  bouncingBeadSFX = loadSound(`assets/sounds/bouncingBead.mp3`);

  designPrev = loadImage(`assets/images/designPrev.png`);
}

/**
Bead.js constructor behavior/methods
- array of falling beads at random areas between x and y
*/
function setup() {
  //to make clickable objects (in interactive page) easier to maneuver on canvas
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("parent");
  //go through all the bead colors
  for (let i = 0; i < beadColors.length; i++) {
    let x = random(0, width);
    let y = random(50, height);
    let beadColor = beadColors[i];
    let bead = new Beads(x, y, beadColor);
    beads.push(bead);
  }

  //add all the "extra" random beads on top of the main set
  for (let i = 0; i < numBeads; i++) {
    let x = random(0, width);
    let y = random(50, height);
    let beadColor = random(beadColors);
    let bead = new Beads(x, y, beadColor);
    beads.push(bead);
  }
  //setting up the speaker character
  speakerCharacter();
}

/**
drawing the scene switcher between the introduction and interactive page
*/
function draw() {
  background(171, 225, 209);
  //interactive and start screen switcher
  sceneSwitcher();
  //user object
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
  introTexts();
  speaker();
}

//interactive page --> calling functions
function interactiveScreen() {
  designPreview();
  userBeadCanvas();
  beadPattern();
  updateBeads();
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
  introCharacter = createSprite(windowWidth / 2, 610, 100, 100);
  introCharacter.addAnimation("notSpeaking", "assets/images/girlStandard.png");
  //loading chracter animation when speaking
  introCharacter.addAnimation(
    "speaking",
    "assets/images/girl01.png",
    "assets/images/girl11.png"
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
  image(speechBubble, 720, 300, 1250, 150);
}

//intro page --> the button that is clicked on to trigger the interactive page
function drawButton(button) {
  imageMode(CENTER);
  image(button.image, button.x, button.y, button.width, button.height);
}

//image title of simulation
function introTexts() {
  //title of simulation
  imageMode(CENTER);
  image(title, 900, 53, 1800, 50);
  fill(67, 107, 95);
  noStroke();
  textFont(`arial`);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(
    `Press any key to start the introduction. Click the button when done introduction`,
    windowWidth / 2,
    120
  );
  text(
    `~Use the mouse to click & drag the beads to their assigned outlines~`,
    windowWidth / 2,
    150
  );
}

//intro page --> responsive voice/speech
function speaker() {
  if (speaking) {
    let currentSpeech = speech.substring(0, speechIndex);
    //what the speaker says, it texts its words as it goes
    text(currentSpeech, 720, 265);
    speechIndex += 0.25;
    textSize(5);
  }
}

//Interactive page --> design preview image for user to follow design
function designPreview() {
  imageMode(CENTER);
  image(designPrev, 170, 200, 250, 290);
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

//interactive page --> calling bead contents (refer to Beads.js)
function updateBeads() {
  for (let i = 0; i < beads.length; i++) {
    let bead = beads[i];
    bead.move();
    bead.wrap();
    bead.display();
  }
}

//both intro and interactive page
function mousePressed() {
  if (state === "startScreen") {
    //mouse is pressed on button object in introduction page to go to interactive page
    let d = dist(button.x, button.y, mouseX, mouseY);
    if (d < button.width / 2) {
      state = "interactiveScreen";
      //display buttons in interactive page (they lead to beadwork artist pages)
      document.getElementById("button_1").style.display = "block";
      document.getElementById("button_2").style.display = "block";
      document.getElementById("button_3").style.display = "block";
    }
    //mouse is pressed is ALSO used to grab bead objects in interactive page
  } else if (state === "interactiveScreen") {
    for (let i = 0; i < beads.length; i++) {
      beads[i].mousePressed();
    }
    //music starts playing
    if (!musicSFX.isPlaying()) {
      //music plays once in a loop
      musicSFX.loop();
      musicSFX.setVolume(0.1);
    }
  }
}

//interactive page --> to know when the beads are released when they are "grabbed"
function mouseReleased() {
  for (let i = 0; i < beads.length; i++) {
    beads[i].mouseReleased(design);
  }
  //bouncing bead sound used for whenever mouse is released
  if (!bouncingBeadSFX.isPlaying()) {
    bouncingBeadSFX.setVolume(0.08);
    bouncingBeadSFX.play();
  }
}
