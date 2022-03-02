/**
P1: Harry Potter's Quidditch Adventures
By Destiny Chescappio

- User plays Harry Potter. User must use arrow keys to maneuver their way into collecting more than 15 snitches to win.
- User loses if Harry Potter "falls" or goes up too far off canvas. They also lose if the bludgers hit them more than 5 times.
- The challenge is to go through 4 levels of flying bludgers that get faster and eventually follow Harry.

Credits:
//
- Retro video game sfx - Ouch By OwlStorm
https://freesound.org/people/OwlStorm/sounds/404747/

- Metall-Tischbein.wav By MattesHaus
https://freesound.org/people/MattesHaus/sounds/353497/

gameMusic
- Soar by Scott Buckley | www.scottbuckley.com.au
Music promoted by https://www.chosic.com/free-music/all/
Creative Commons CC BY 4.0
https://creativecommons.org/licenses/by/4.0/

*/

"use strict";
//state images used
let titleImage;
let winImage;
let loseImage;
//Sound design
let gameMusic;
let ouchSound;
let snitchCatchSFX;
//beginning state
let state = "title";
//parallax effect background images
let bgSky;
let bgClouds;
let bgTowers;
//user character
let harryPotter;
//layers of parallax effect obejcts
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
let bludgers = [];
let numBludger = 5;
let numBludgerHits = 0;
//snitches
let snitches = [];
let numSnitch = 5;
let numSnitchCollection = 0;
let level = 1;
//beginning level
let numLevels = 1;

/**
Preload of images and sounds used
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
Setting up (bludgers, snitches, and harry potter) classes & parallax layers
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

  //parallax effect setup
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
Drawing what happens in the game from title, game, win and lose states/pages
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

//title state page
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

//what happens in the game (calling functions)
function game() {
  //game objective, enemy, and user character
  updateSnitch();
  updateBludger();
  updateHarryPotter();
  //background parallax effect functions
  moveParaObjects();
  displayParaObject();
  //the p5.play sprites (harry Potter & Snitches)
  drawSprites();
  //keeping track of snitch, bludger, and level texts
  numSnitchText();
  numBludgerText();
  numLevelText();
  //win and lose states/pages
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

//to start the game; pressing any key
function keyPressed() {
  if (state === `title`) {
    state = `startGame`;
  }
  if (!gameMusic.isPlaying()) {
    //music plays once in a loop
    gameMusic.loop();
    gameMusic.setVolume(0.1);
  }
}

//Snitch updated data
function updateSnitch() {
  for (let i = 0; i < snitches.length; i++) {
    let snitch = snitches[i];
    // calling methods- move, wrap, display
    snitch.move(harryPotter);
    snitch.wrap();
    snitchCollection(snitch, harryPotter);
  }
}

//updated bludger data
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

//update harry potter data
function updateHarryPotter() {
  harryPotter.handleInput();
  harryPotter.handleGravity();
}

//numSnitch text display
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

//numBludgerText display
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

//numLevelText display
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

//overlapping snitch with harry potter
//keeping track of how many snitches are collected
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
      if (!snitchCatchSFX.isPlaying()) {
        snitchCatchSFX.setVolume(0.08);
        snitchCatchSFX.play();
      }
      //to see if the snitch is caught,
      snitch.caught = true;
      //it is only caught for 1 second until it's not "caught" --> had to be done to ensure individual snitches instead of overlapping multiple ones.
      setTimeout(function () {
        snitch.caught = false;
      }, 1000);
    }
  }
  //Snitch Collection is in charge of determining the level
  //if he collects 10 snitches, the level goes up
  if (level === 1 && numSnitchCollection >= 3) {
    changeLevel();
    numLevels += 1;
  } else if (level === 2 && numSnitchCollection >= 6) {
    changeLevel();
    numLevels += 1;
  } else if (level === 3 && numSnitchCollection >= 9) {
    numLevels += 1;
    changeLevel();
  }
}

//overlapping bludger
//keeping track of how many bludgers hit harry
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
      //per bludger hit when overlapping harry
      numBludgerHits += 1;
    }
  }
}

//What happens when the level is changed
//Level behavior is dependent on bludger behavior
function changeLevel() {
  if (level === 1) {
    level = 2;
    for (let i = 0; i < bludgers.length; i++) {
      //velocity speeds up
      bludgers[i].vx = -8;
    }
  } else if (level === 2) {
    level = 3;
    for (let i = 0; i < bludgers.length; i++) {
      //velocity speeds up
      bludgers[i].vx = -11;
    }
  } else if (level === 3) {
    level = 4;
    for (let i = 0; i < bludgers.length; i++) {
      //bludgers follow harry
      bludgers[i].follow = true;
    }
  }
}

//what triggers harry to win
function harryWins() {
  //win state happens when snitchCollection is more than 15
  if (numSnitchCollection >= 15) {
    state = `win`;
  }
}

//what triggers harry to lose
function harryLoses() {
  //if the bludger hits are more than 5
  if (
    numBludgerHits >= 5 ||
    //or harry's y position is more than windowHeight,
    harryPotter.sprite.position.y > windowHeight ||
    //or harry's y position is less than -10
    harryPotter.sprite.position.y < -10
  ) {
    //harry loses
    state = `lose`;
  }
}

//Parallax effect with creating the object
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

//moving ea. layer of the parallax object with harry's movement
function moveLayer(layer) {
  //go through all paraObjects in this layer
  for (let i = 0; i < layer.paraObjects.length; i++) {
    //get the paraObject
    let paraObject = layer.paraObjects[i];
    //changing its x by the negative of harry potter's velocity; which is multiplied by the parallax ratio
    paraObject.x += -harryPotter.sprite.velocity.x * layer.parallaxRatio;

    //wrapping the paraObject to other side if needed (it will need to be relative to the first/last paraObject in array)
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
