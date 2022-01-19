/**
Where's Sausage Dog?
By Destiny

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
//number of animal image won't change so use 'const'
const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;

//declaring global empty array variables; global means: it can be used in any function & in any file in the project
// "global" = outside of the other functions & multi-use
let animalImages = [];
let animals = [];

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
}

/**
Description of draw()
*/
function draw() {
  background(255, 255, 0);

  for (let i = 0; i < animals.length; i++) {
    //give the animals at position 'i' and use update from animal.js
    animals[i].update();
  }
}
