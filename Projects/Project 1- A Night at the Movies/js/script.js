/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let harryPotter;

/**
Description of preload
*/
function preload() {
  //loading user's character
  harryPotter = loadAnimation(
    "assets/standard/standard01.png",
    "assets/standard/standard05.png"
  );
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
}

/**
Description of draw()
*/
function draw() {
  background(0);
  //drawing the user's animated character
  animation(harryPotter, 200, 200);
}
