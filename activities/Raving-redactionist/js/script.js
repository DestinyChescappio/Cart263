/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
//to only re-redact in the top secrets' class if it's clicked
$(`.top-secret`).on(`click`, redact);

//every 5 seconds
setInterval(revelation, 500);

//to reverse redact if it's revealed
function redact(event) {
  //remove the revealed class
  $(this).removeClass(`revealed`);
  //then replace it with redacted
  $(this).addClass(`redacted`);
}

//everything that's redacted, the program attempts to reveal by calling attemptReveal on ea. redacted object
function revelation() {
  $(`.redacted`).each(attemptReveal);
}

//calling the attemptReveal on each object that will be redacted
function attemptReveal() {
  //variable r and assign with math.random
  let r = Math.random();
  //to check if r is than 0.1; to check how likely the hack is successful
  if (r < 0.1) {
    //if it got hacked
    //remove the redacted class from (this)
    $(this).removeClass(`redacted`);
    // and add it to the reveal class
    $(this).addClass(`revealed`);
  }
}
/**
Description of preload
*/
function preload() {}

/**
Description of setup
*/
function setup() {}

/**
Description of draw()
*/
function draw() {}
