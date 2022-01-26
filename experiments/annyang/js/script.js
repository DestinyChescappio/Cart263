/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

("use strict");
//is the light on or off?
let on = false;
/**
Description of setup
*/
function setup() {
  createCanvas(500, 500);
  //check if annyang is available
  if (annyang) {
    //create commands
    let commands = {
      "turn the light on": function () {
        on = true;
      },
      "turn the light off": function () {
        on = false;
      },
    };
    //add the commands and start annyang
    annyang.addCommands(commands);
    annyang.start();
  }
}

/**
Description of draw()
*/
function draw() {
  //if on is true, make the background white, otherwise make it black (off)
  if (on) {
    background(255);
  } else {
    background(0);
  }
}
