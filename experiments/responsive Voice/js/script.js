/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

/**
Description of preload
*/
function preload() {}

/**
Description of setup
*/
function setup() {
  createCanvas(500, 500);
}

/**
Description of draw()
*/
function draw() {
  background(0);
}

function mousePressed() {
  responsiveVoice.speak("wachiyah! dandahatukuiin?", "UK English Male", {
    pitch: 2,
    rate: 1,
    volume: 1,
  });
}
