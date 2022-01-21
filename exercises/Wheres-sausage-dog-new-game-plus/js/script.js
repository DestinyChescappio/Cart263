/**
Where's Sausage Dog?
By Destiny

The game's goal is for the user to search for Sausage Dog in the crowd of random animals. If the user finds Sausage Dog,
they win. If they click on the other animals three times, they lose and have to star over.The simulation consists sound,
wiggling, spinning, and states. The program utilizes three separate scripts; the main script.js, SausageDog.js, and Animal.js.

credits:
- Other Animal sounds
"Game Boy Classic - Startup Sound" by toumas
https://freesound.org/people/toumas/sounds/610484/
*/

"use strict";

let state = "title";

//number of animal image won't change
const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;

//sound of other animals when clicked on
let animalClick = undefined;

//array of animals and animal images
let animalImages = [];
let animals = [];

//sausage dog image & sausage dog
let sausageDogImage = undefined;
let sausageDog = undefined;

//sound of sausage dog when "found"
let barkSFX = undefined;

//number of animals when clicked on
let numAnimalsHit = 0;

/**
- forloop to count other animal images from 0 to 9 & so on...
-loading images for both the other animals and sausage dog
-loading sounds when sausage dog and other animals are clicked on
*/
function preload() {
  //forloop to count up to 0 (animal 0 to 9)
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    //load images

    //making an array of animals
    let animalImage = loadImage(`assets/images/animal-images/animal${i}.png`);
    animalImages.push(animalImage);
  }
  sausageDogImage = loadImage(`assets/images/animal-images/sausage-dog.png`);

  //load sounds
  animalClick = loadSound(`assets/sounds/animalClick.wav`);
  barkSFX = loadSound(`assets/sounds/bark.wav`);
}

/**
- setting up canvas
- creating the other animals & sausage dog with forloop and randomly selecting/positioning them ea. reload
- calling sausageDog & Animal's class
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  //create the animals
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let animalImage = random(animalImages);
    //creating animal variable to create these new animals
    let animal = new Animal(x, y, animalImage, animalClick);
    //add animal in animal array
    animals.push(animal);
  }

  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage, barkSFX);
}

/**
- displaying states
- title, game, winning, losing pages
- title displays when it reloads
*/
function draw() {
  background(255, 255, 0);
  if (state === `title`) {
    title();
  } else if (state === `startGame`) {
    game();
  } else if (state === `winning`) {
    winning();
  } else if (state === `gameOver`) {
    losing();
    if (state === `title`) {
    }
  }
}

//Title page displays
function title() {
  fill(0);
  textFont(`bradley hand`);
  textStyle(BOLD);
  textSize(60);
  textAlign(CENTER, CENTER);
  text(`Where's Sausage Dog?`, width / 2, height / 2);

  textFont(`arial`);
  textStyle(NORMAL);
  textSize(30);
  textAlign(CENTER, CENTER);
  text(`🐶 Press any key to start 🐶`, width / 2, height - 100);
  numAnimalsHit = 0;
}

//press any key to start the game/simulation
function keyPressed() {
  if (state === `title`) {
    state = `startGame`;
  }
}

//game displays
//what happens when playing
function game() {
  for (let i = 0; i < animals.length; i++) {
    //give the animals at position 'i' and use update from animal.js
    animals[i].update();
  }
  //the sausage dog's update
  sausageDog.update();
  //number of animals clicked on
  numAnimals();
  //what happens if the animals are clicked on 3 times; game over state triggers
  checkState();
}

//every/array of animals can be clicked on by the mouse
function mousePressed() {
  sausageDog.mousePressed();
  for (let i = 0; i < animals.length; i++) {
    //give the animals at position 'i' and use update from animal.js
    animals[i].mousePressed();
  }
}

//number of animals clicked on display
function numAnimals() {
  fill(255, 0, 0);
  textFont(`impact`);
  textStyle(BOLD);
  textSize(60);
  textAlign(CENTER, CENTER);
  text(`x${numAnimalsHit}`, 1200, 100);
}

//winning page display
function winning() {
  fill(0);
  textFont(`bradley hand`);
  textStyle(BOLD);
  textSize(60);
  textAlign(CENTER, CENTER);
  text(`Sausage Dog is found!🐶🏆`, width / 2, height / 2);
}

//losing page display
function losing() {
  fill(0);
  textFont(`bradley hand`);
  textStyle(BOLD);
  textSize(60);
  textAlign(CENTER, CENTER);
  text(`Sausage Dog was never found. Try again.`, width / 2, height - 700);
}

//if three other animals are clicked on,the state 'gameOver' is triggered
function checkState() {
  if (numAnimalsHit >= 3) {
    state = `gameOver`;
  }
}
