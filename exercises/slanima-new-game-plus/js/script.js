/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
//title state
let state = "title";

//number of correct answers
let numCorrectAnswers = 0;
//number of wrong answers
let numWrongAnswers = 0;

//the riddles the user has to figure out with the 'answer'
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
drawing the title, game, winning, losing states
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

//title page
function title() {
  fill(255);
  textFont(`blenny`);
  textStyle(BOLD);
  textSize(60);
  textAlign(CENTER, CENTER);
  text(`🎬🍿Guess the Movie!🍿🎬`, width / 2, height / 2);

  fill(255);
  textFont(`bradley hand`);
  textStyle(BOLD);
  textSize(30);
  textAlign(CENTER, CENTER);
  text(`Press any key to start`, width / 2, height / 1.5);
}

//instructions in the game background
function instructionsGame() {
  fill(255, 0, 0);
  textFont(`bradley hand`);
  textStyle(BOLD);
  textSize(30);
  textAlign(CENTER, CENTER);
  text(`📽Click the screen for more riddles📽`, width / 2, height / 1.2);
}

function wrongAnswersText() {
  fill(255, 0, 0);
  textFont(`bradley hand`);
  textStyle(BOLD);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(`Wrong X${numWrongAnswers}`, width / 6, height / 8);
}

function correctAnswersText() {
  fill(255, 0, 0);
  textFont(`bradley hand`);
  textStyle(BOLD);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(`Correct X${numCorrectAnswers}`, width / 1.3, height / 8);
}

function winGame() {
  fill(200, 255, 0);
  textFont(`bradley hand`);
  textStyle(BOLD);
  textSize(80);
  textAlign(CENTER, CENTER);
  text(`🏆Good Stuff!🏆`, width / 2, height / 2);
}

function lostGame() {
  fill(255, 0, 0);
  textFont(`bradley hand`);
  textStyle(BOLD);
  textSize(80);
  textAlign(CENTER, CENTER);
  text(`You are uncultured...👁👄👁`, width / 2, height / 2);
}

function keyPressed() {
  if (state === `title`) {
    state = `startGame`;
  }
}

//random riddle is said when triggered when mouse is pressed
function mousePressed() {
  currentRiddle = random(riddles);
  //responsive voice speaks
  responsiveVoice.speak(currentRiddle.clue);
}

//what happens in the game
function game() {
  //calling the display answer
  displayAnswer();
  //calling the wrong answers text
  wrongAnswersText();
  //calling the correct answers text
  correctAnswersText();
  //calling the instructions game text
  instructionsGame();
}

//having the user guess the movie title
function guessMovie(answer) {
  //whatever was said by responsive voice
  currentAnswer = answer.toLowerCase();
  //check if it's correct/wrong
  if (currentAnswer === currentRiddle.answer) {
  } else {
    //wrong answers go up by one
    numWrongAnswers += 1;
    //if the number of wrong answers is greater than 2, the losing page triggers
    if (numWrongAnswers > 2) {
      state = `losing`;
    }
  }
  //correct answers go up by one
  numCorrectAnswers += 1;
  //if the number of correct answers is greater than 2, the winning page triggers
  if (numCorrectAnswers > 2) {
    state = `winning`;
  }
}

//the user's answer is displayed
//if it's wrong, the text is red, if correct, the text is green
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
