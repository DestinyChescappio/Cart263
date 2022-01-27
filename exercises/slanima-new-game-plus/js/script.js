/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

const riddles = [
  {
    clue: "The boy who lived",
    answer: "harry potter",
  },
];

//array of animals
// const riddles = [
//   "The boy who lived", //Harry Potter
//   "We only wear Pink on Wednesdays", //Mean Girls
//   "I'll be back...", //The terminator
//   "Toto, I've got a feeling we're not in Kansas anymore", //the wizard of oz
// ];
//
// const answers = [
//   "Harry Potter",
//   "Mean Girls",
//   "The Terminator",
//   "The Wizard of Oz",
// ];

//setting a variable with an empty string
let currentRiddle = {
  clue: undefined,
  answer: undefined,
};
//answer after the command
let currentAnswer = ``;
/**
the set up of annyang's speech recognition by the user
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  if (annyang) {
    //what the user says in order to trigger the responsivevoice
    let commands = {
      "*answer": guessMovie,
    };
    //to add the commands
    annyang.addCommands(commands);
    //to start it
    annyang.start();

    //TEXT size/style/alignment
    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
  }
}
/**
Description of draw()
*/
function draw() {
  background(0);
  //displaying the correct and wrong answer
  if (currentAnswer === currentRiddle.answer) {
    //correct answer
    fill(0, 255, 0);
  } else {
    //wrong answer
    fill(255, 0, 0);
  }
  text(currentAnswer, width / 2, height / 2);
}

//random animal said in reverse is triggered when mouse is pressed
function mousePressed() {
  currentRiddle = random(riddles);
  //let movieRiddle = movieRiddleString(currentRiddle);
  responsiveVoice.speak(currentRiddle.clue);
}

//having the user guess the animal being called in reverse
function guessMovie(answer) {
  //whatever was said by responsive voice
  currentAnswer = answer.toLowerCase();
  //check if it's correct
  if (currentAnswer === currentRiddle.answer) {
    console.log(`yay`);
  } else {
    //increase the number with # of wrong guesses
  }
  console.log(currentAnswer, currentRiddle.answer);
}

/**
Reverses the provided string
*/
function movieRiddleString(string) {
  // Split the string into an array of characters
  let characters = string.split("");
  // Join the array of characters back into a string
  let result = characters.join("");
  // Return the result
  return result;
}
