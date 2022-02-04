/**
E3: spy-profile-generator-plus
Destiny

Generates a randomized spy profile for the user to figure out each pop up questions asked. Surprise memes show up if wrong or right.
*/

"use strict";

let state = "start";

let goodMeme = undefined;
let badMeme = undefined;

let goodEnding = false;
let badEnding = false;

let spyProfileVisible = false;
//setting a spyProfile variable with objects
let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED`,
  secretWeapon: `**REDACTED`,
  password: `**REDACTED**`,
};

let instrumentData = undefined;
let objectData = undefined;
let tarotData = undefined;

/**
loading the JSON files from the web & local images
*/
function preload() {
  //images
  goodMeme = loadImage(`assets/images/goodMeme.jpeg`);
  badMeme = loadImage(`assets/images/badMeme.jpeg`);

  //JSON data
  instrumentData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`
  );
  objectData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`
  );
  tarotData = loadJSON(
    `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`
  );
}

/**
canvas setup, first pop up question asked to user
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  let name = prompt(`Agent! what's your name?`);

  //to load the data
  let data = JSON.parse(localStorage.getItem(`spy-profile-data`));
  if (data) {
    spyProfile = data;
    if (name === spyProfile.name) {
      spyProfileVisible = true;
      //timeout for data visibility
      setTimeout(nameCorrect, 3000);
    } else {
      setTimeout(nameIncorrect, 2000);
    }
  } else {
    generateSpyProfile(name);
    setTimeout(nameCorrect, 2000);
  }
}

//the data is not shown after a certain amount of time passes
function nameCorrect() {
  spyProfileVisible = false;
  //spy profile is invisible for 3 seconds
  setTimeout(askAlias, 2000);
}

//
function nameIncorrect() {
  console.log("nameIncorrect");
}

//the alias question pops up
//spy profile is visible if answer is correct
function askAlias() {
  let alias = prompt(`Agent! what's your alias?`);
  if (alias === spyProfile.alias) {
    spyProfileVisible = true;
    //timeout for data
    setTimeout(aliasCorrect, 2000);
  }
}

//if it's correct, the visibility of the spy data goes away for 2 seconds
function aliasCorrect() {
  spyProfileVisible = false;
  setTimeout(askSecretWeapon, 2000);
}

//the secre weapon question pops up
//spy profile is visible if answer is correct
function askSecretWeapon() {
  let secretWeapon = prompt(`Agent! what's your secret weapon?`);
  //if the password is correct
  if (secretWeapon === spyProfile.secretWeapon) {
    //the spy data shows
    spyProfileVisible = true;
    //timeout for data
    setTimeout(secretWeaponCorrect, 2000);
  }
}

////if it's correct, the visibility of the spy data goes away for 2 seconds
function secretWeaponCorrect() {
  spyProfileVisible = false;
  setTimeout(askPassword, 2000);
}

//interactive pop up asks the user what's the password
function askPassword() {
  let password = prompt(`Agent! what's you password?`);
  //if the password is correct
  if (password === spyProfile.password) {
    //the spy data shows
    spyProfileVisible = true;
    //timeout for data visibility
    setTimeout(passwordCorrect, 2000);
    goodScreen();
  } else {
    badScreen();
  }
}

//good screen only appears 2 seconds and data doesn't show
function passwordCorrect() {
  spyProfileVisible = false;
  setTimeout(goodScreen(), 2000);
}

//bad screen when the user gets the answers wrong
function badScreen() {
  badEnding = true;
}

//good screen when the user gets the answers correct
function goodScreen() {
  goodEnding = true;
}

function generateSpyProfile(name) {
  //interactive pop-up for user
  //random instrument is played
  let instrument = random(instrumentData.instruments);
  spyProfile.name = name;
  spyProfile.alias = `The ${instrument}`;
  //secret weapon is chosen randomly from the objects section
  spyProfile.secretWeapon = random(objectData.objects);

  //tarot card is randomly chosen from the interpretations section
  let card = random(tarotData.tarot_interpretations);

  //password is the random tarot card chosen
  spyProfile.password = random(card.keywords);

  //save the profile data as a string
  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));

  //login first time
  spyProfileVisible = true;
}

/**
drawing the spy profile
*/
function draw() {
  background(0);
  if (spyProfileVisible === true) {
    //creating a variable template string
    let profile = `** SPY PROFILE! DO NOT DISTRIBUTE! **
  Name: ${spyProfile.name}
  Alias: ${spyProfile.alias}
  Secret Weapon: ${spyProfile.secretWeapon}
  Password: ${spyProfile.password}`;

    //displaying the text
    push();
    textFont(`courier`);
    textSize(24);
    fill(0, 255, 0);
    textAlign(LEFT, TOP);
    text(profile, width / 2, height / 2);
    pop();
  }

  //if it's a bad ending, the bad meme shows
  if (badEnding) {
    image(badMeme, 275, 135, 900, 600);
    //otherwise, the good meme shows
  } else if (goodEnding) {
    image(goodMeme, 275, 135, 900, 600);
  }
}
