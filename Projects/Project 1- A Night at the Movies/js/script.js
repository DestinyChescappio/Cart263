/**
P1: Harry Potter's Quidditch Adventures
By Destiny Chescappio

- User plays Harry Potter. User must use arrow keys to maneuver their way into collecting more than 15 snitches to win.
- User loses if Harry Potter "falls" or goes up too far off canvas. They also lose if the bludgers hit them more than 5 times.
- The challenge is to go through 4 levels of flying bludgers that get faster and eventually follow Harry.

Credits:
ouchSound
- Retro video game sfx - Ouch By OwlStorm
https://freesound.org/people/OwlStorm/sounds/404747/

snitchCatchSFX
- Metall-Tischbein.wav By MattesHaus
https://freesound.org/people/MattesHaus/sounds/353497/

gameMusic
- Soar by Scott Buckley | www.scottbuckley.com.au
Music promoted by https://www.chosic.com/free-music/all/
Creative Commons CC BY 4.0
https://creativecommons.org/licenses/by/4.0/

*/

"use strict";
//title/win/lose state images
let titleImage;
let winImage;
let loseImage;

//beginning state
let state = "title";

//parallax effect images
let bgSky;
let bgClouds;
let bgTowers;

//sound design
let gameMusic;
let ouchSound;
let snitchCatchSFX;

//main character for user
let harryPotter;

//layers used for parallax effect for background
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

//bludgers
let bludgerImage = undefined;
//how many
let bludgers = [];
let numBludger = 5;
//how many bludgers hit harry from beginning
let numBludgerHits = 0;

//snitches
let snitches = [];
//how many
let numSnitch = 5;
//collection
let numSnitchCollection = 0;

//beginning level
let level = 1;
//number of level displayed in beginning
let numLevels = 1;

/**
Pre-Loading image and sound files for the game's visual and audio design
*/
function preload() {
  bludgerImage = loadImage("assets/images/bludger.png");

  bgSky = loadImage("assets/images/blueSky-assets/blueSky.png");
  bgClouds = loadImage("assets/images/clouds.png");
  bgTowers = loadImage("assets/images/towers.png");

  titleImage = loadImage("assets/images/snitchTITLE.gif");
  winImage = loadImage("assets/images/winPic.gif");
  loseImage = loadImage("assets/images/losePic.gif");

  gameMusic = loadSound("assets/sounds/mainMusic.mp3");
  ouchSound = loadSound("assets/sounds/ouchSound.wav");
  snitchCatchSFX = loadSound("assets/sounds/snitchSound.wav");
}

/**
setting up the harryPotter, bludgers, snitches classes & setting up the parallax effect for background visuals
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

  //Parallax effect
  //starting point for the first building
  let x = 0;
  //position to draw the base of nearest layer
  let y = height;
  //adding new sky extension to sky layer
  layers.sky.paraObjects.push(createParaObject(0, 0));
  layers.cloud.paraObjects.push(createParaObject(0, 0));
  layers.tower.paraObjects.push(createParaObject(0, 0));
}

/**
what happens in the overall game; from title, to game, to winning, and losing states
*/
function draw() {
  background(bgSky, windowWidth, windowHeight);
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

//Title state content
function title() {
  imageMode(CENTER);
  image(titleImage, windowWidth / 2, windowHeight - 250);

  //title
  fill(190, 20, 0);
  textFont(`letter magic`);
  textStyle(BOLD);
  textSize(60);
  textAlign(CENTER, CENTER);
  text(
    `Harry Potter's Quidditch Adventures`,
    windowWidth / 2,
    windowHeight - 500
  );

  //what to press to start game
  fill(0);
  textFont(`coquette`);
  textSize(30);
  text(`Press any key to start`, windowWidth / 2, windowHeight - 130);

  //user's input instructions
  textFont(`arial`);
  textStyle(NORMAL);
  textSize(20);
  text(
    `Use LEFT/RIGHT/UP arrow keys to move`,
    windowWidth / 2,
    windowHeight - 80
  );

  //instructions
  textStyle(NORMAL);
  text(
    `Avoid the bludgers and catch as many as snitches as you can`,
    windowWidth / 2,
    windowHeight - 180
  );
}

//what happens in the game
function game() {
  updateSnitch();
  updateBludger();
  updateHarryPotter();

  numSnitchText();
  numBludgerText();
  numLevelText();

  moveParaObjects();
  displayParaObject();

  drawSprites();

  harryWins();
  harryLoses();
}

//winning page
function winning() {
  imageMode(CENTER);
  image(winImage, windowWidth / 2, windowHeight / 2);
  textFont(`letter magic`);
  textStyle(BOLD);
  textSize(40);
  textAlign(CENTER, CENTER);
  text(`30 points to Gryffindor!`, windowWidth / 2, windowHeight - 150);
}

//losing page
function losing() {
  imageMode(CENTER);
  image(loseImage, windowWidth / 2, windowHeight / 2);
  textFont(`letter magic`);
  textStyle(BOLD);
  textSize(40);
  textAlign(CENTER, CENTER);
  text(`YOU ARE HEREBY EXPELLED!`, windowWidth / 2, windowHeight - 150);
}

//to start the game
function keyPressed() {
  //any key is pressed
  if (state === `title`) {
    state = `startGame`;
  }
  if (!gameMusic.isPlaying()) {
    //back ground music plays once in a loop
    gameMusic.loop();
    gameMusic.setVolume(0.1);
  }
}

//snitch updates; refer to Snitches class
function updateSnitch() {
  for (let i = 0; i < snitches.length; i++) {
    let snitch = snitches[i];
    // calling methods- move, wrap, display
    snitch.move(harryPotter);
    snitch.wrap();
    snitch.snitchCollection(snitch, harryPotter);
  }
}

//bludger updates; refer to Bludgers class
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
    bludger.bludgerHit();

    //returns true if it hits harry potter
    let bludgerHitHarry = bludger.harryCollision(harryPotter);
    if (bludgerHitHarry) {
      numBludgerHits += 1;
    }
  }
}

//harryPoter's updates; refer to HarryPotter class
function updateHarryPotter() {
  harryPotter.handleInput();
  harryPotter.handleGravity();
  harry.collision(bludgers);
}

//how many snitches got collected by harry
function numSnitchText() {
  fill(200, 0, 0);
  stroke(250, 200, 0);
  strokeWeight(5);
  textFont(`letter magic`);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textSize(40);
  text(`Snitches ${numSnitchCollection}`, 1250, 80);
}

//how many bludgers hit harry text
function numBludgerText() {
  fill(200, 0, 0);
  stroke(250, 200, 0);
  strokeWeight(5);
  textFont(`letter magic`);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textSize(40);
  text(`Bludgers ${numBludgerHits}`, 200, 80);
}

//how many levels passed text
function numLevelText() {
  fill(200, 0, 0);
  stroke(250, 200, 0);
  strokeWeight(5);
  textFont(`letter magic`);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textSize(40);
  text(`LEVEL ${numLevels}`, windowWidth / 2, 80);
}

//level change behavior
function changeLevel() {
  //if level 1 moves to level 2,
  if (level === 1) {
    level = 2;
    for (let i = 0; i < bludgers.length; i++) {
      //the bludgers x velocity speeds up. (negative because it goes left against harry)
      bludgers[i].vx = -8;
    }
    //if level 2 moves to level 3,
  } else if (level === 2) {
    level = 3;
    for (let i = 0; i < bludgers.length; i++) {
      //the bludgers x velocity speeds up. (negative because it goes left against harry)
      bludgers[i].vx = -12;
    }
    //if level 3 moves to level 4,
  } else if (level === 3) {
    level = 4;
    for (let i = 0; i < bludgers.length; i++) {
      //the bludgers conjoin and follow harry's movement
      bludgers[i].follow = true;
    }
  }
}

//what triggers the win state; harry successfuly collects more than 15 snitches
function harryWins() {
  if (numSnitchCollection >= 15) {
    state = `win`;
  }
}

//What triggers the lose state; harry gets hit by more than 4 bludgers
//and if he goes past the canvas on either side of the y axis
function harryLoses() {
  if (
    numBludgerHits >= 4 ||
    harryPotter.sprite.position.y > windowHeight ||
    harryPotter.sprite.position.y < -20
  ) {
    state = `lose`;
  }
}

//making the parralax object for the parallax effect
function createParaObject(x, y) {
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

//moving the parallax objects (sky, clouds, towers) with harry's movement
function moveLayer(layer) {
  //go through all paraObjects in this layer
  for (let i = 0; i < layer.paraObjects.length; i++) {
    //get the paraObject
    let paraObject = layer.paraObjects[i];
    //changing its x by the negative of harry potter's velocity; which is multiplied by the parallax ratio
    paraObject.x += -harryPotter.sprite.velocity.x * layer.parallaxRatio;

    //wrapping the paraObject to other side if needed (it will need to be relative to the first/last paraObject in the array)
    if (paraObject.x < -width) {
      paraObject.x = 0;
    } else if (paraObject.x > 0) {
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
    //x2 its windowWidth to create that smooth transition onto the next image
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
    //x2 its windowWidth to create that smooth transition onto the next image
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
    //x2 its windowWidth to create that smooth transition onto the next image
    windowWidth * 2,
    windowHeight
  );
  pop();
}
