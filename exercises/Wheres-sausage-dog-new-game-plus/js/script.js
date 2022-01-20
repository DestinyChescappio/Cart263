/**
Where's Sausage Dog?
By Destiny

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
let state = "title";
//number of animal image won't change so use 'const'
const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;

let animalClick = undefined;
//declaring global empty array variables; global means: it can be used in any function & in any file in the project
// "global" = outside of the other functions & multi-use
let animalImages = [];
let animals = [];

let sausageDogImage = undefined;
let sausageDog = undefined;

let numAnimalsHit = 0;

/**
Description of preload
*/
function preload() {
  //forloop to count up to 0 (animal 0 to 9)
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    //load images
    //ea. file name has a number (from 0 to 9) so need to insert the variable 'i'
    //putting 'i' will count from animal0 to animal1,animal2, and so on.
    let animalImage = loadImage(`assets/images/animal-images/animal${i}.png`);
    animalImages.push(animalImage);
  }
  animalClick = loadSound(`assets/sounds/animalClick.wav`);
  sausageDogImage = loadImage(`assets/images/animal-images/sausage-dog.png`);
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  //create the animals
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let animalImage = random(animalImages);
    //creating animal variable to create these new animals
    let animal = new Animal(x, y, animalImage);
    //add animal in animal array
    animals.push(animal);
  }

  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

/**
Description of draw()
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
}

//press mouse pad/buttom to start game
function keyPressed() {
  if (state === `title`) {
    state = `startGame`;
  }
}

function game() {
  for (let i = 0; i < animals.length; i++) {
    //give the animals at position 'i' and use update from animal.js
    animals[i].update();
  }
  sausageDog.update();

  numAnimals();
}

function mousePressed() {
  sausageDog.mousePressed();
  for (let i = 0; i < animals.length; i++) {
    //give the animals at position 'i' and use update from animal.js
    animals[i].mousePressed();
  }
}

function numAnimals() {
  fill(255, 0, 0);
  textFont(`impact`);
  textStyle(BOLD);
  textSize(60);
  textAlign(CENTER, CENTER);
  text(`x${numAnimalsHit}`, 1200, 100);
}

function winning() {
  fill(0);
  textFont(`bradley hand`);
  textStyle(BOLD);
  textSize(60);
  textAlign(CENTER, CENTER);
  text(`Sausage Dog is found!`, width / 2, height - 700);
}

function losing() {
  fill(0);
  textFont(`bradley hand`);
  textStyle(BOLD);
  textSize(60);
  textAlign(CENTER, CENTER);
  text(`Sausage Dog was never found. Try again.`, width / 2, height - 700);
}
