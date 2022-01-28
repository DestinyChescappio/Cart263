/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
let state = "title";

let numWrongAnswers = 0;

const riddles = [
  {
    clue: "The boy who lived",
    answer: "harry potter",
  },
  {
    clue: "We only wear pink on Wednedays",
    answer: "mean girls",
  },
  {
    clue: "I'll be back...",
    answer: "terminator",
  },
  {
    clue: "Toto, I've got a feeling we're not in kansas anymore",
    answer: "the wizard of oz",
  },
];

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
  if (state === `title`) {
    title();
  } else if (state === `startGame`) {
    game();
  } else if (state === `winning`) {
    winGame();
  } else if (state === `losing`) {
    lostGame();
  }
}

function title() {
  fill(255);
  textFont(`blenny`);
  textStyle(BOLD);
  textSize(60);
  textAlign(CENTER, CENTER);
  text(`Guess the Movie!`, width / 2, height / 2);
}

function wrongAnswersText() {
  fill(255, 0, 0);
  textFont(`bradley hand`);
  textStyle(BOLD);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(`Wrong X${numWrongAnswers}`, width / 6, height / 8);
}

function winGame() {
  fill(150, 80, 0);
  textFont(`bradley hand`);
  textStyle(BOLD);
  textSize(60);
  textAlign(CENTER, CENTER);
  text(`Good Stuff!`, width / 2, height / 2);
}

function lostGame() {
  fill(255, 0, 0);
  textFont(`bradley hand`);
  textStyle(BOLD);
  textSize(60);
  textAlign(CENTER, CENTER);
  text(`You are uncultured...`, width / 2, height / 2);
}

function keyPressed() {
  if (state === `title`) {
    state = `startGame`;
  }
}

//random animal said in reverse is triggered when mouse is pressed
function mousePressed() {
  currentRiddle = random(riddles);
  //let movieRiddle = movieRiddleString(currentRiddle);
  responsiveVoice.speak(currentRiddle.clue);
}

function game() {
  displayAnswer();

  wrongAnswersText();
}

//having the user guess the animal being called in reverse
function guessMovie(answer) {
  //whatever was said by responsive voice
  currentAnswer = answer.toLowerCase();
  //check if it's correct
  if (currentAnswer === currentRiddle.answer) {
  } else {
    numWrongAnswers += 1;
    if (numWrongAnswers > 2) {
      state = `losing`;
    }
  }
}

function displayAnswer() {
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
