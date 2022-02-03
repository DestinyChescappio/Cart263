/**
Title of Project
Author Name

Generates a randomized spy profile for the user, and password protects it.
*/

"use strict";

let state = "start";

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
loading the JSON files from the web
*/
function preload() {
  goodMeme = loadImage(`assets`);
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
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  //to load the data
  let data = JSON.parse(localStorage.getItem(`spy-profile-data`));

  if (data) {
    spyProfile = data;
    let name = prompt(`Agent! what's your name?`);
    if (name === spyProfile.name) {
      spyProfileVisible = true;
      //timeout for data
      setTimeout(nameCorrect, 3000);
    }
  } else {
    generateSpyProfile();
  }
}

//the data is not shown after a certain amount of time passes
function nameCorrect() {
  spyProfileVisible = false;
  //spy profile is visible for 2 seconds
  setTimeout(askAlias, 2000);
}

//the alias question pops up
//spy profile is visible if answer is correct
function askAlias() {
  let alias = prompt(`Agent! what's your alias?`);
  if (alias === spyProfile.alias) {
    spyProfileVisible = true;
    //timeout for data
    setTimeout(aliasCorrect, 3000);
  }
}
function aliasCorrect() {
  spyProfileVisible = false;
  setTimeout(askSecretWeapon, 2000);
}

function askSecretWeapon() {
  let secretWeapon = prompt(`Agent! what's your secret weapon?`);
  if (secretWeapon === spyProfile.secretWeapon) {
    spyProfileVisible = true;
    //timeout for data
    setTimeout(secretWeaponCorrect, 3000);
  }
}

function secretWeaponCorrect() {
  spyProfileVisible = false;
  setTimeout(askPassword, 2000);
}

function askPassword() {
  let password = prompt(`Agent! what's you password?`);
  if (password === spyProfile.password) {
    spyProfileVisible = true;
    //timeout for data
    setTimeout(passwordCorrect, 3000);
  } else {
    badScreen();
  }
}

function badScreen() {
  image;
}

// function goodScreen() {
//
// }

function generateSpyProfile() {
  //interactive pop-up for user
  //spyProfile.name = prompt(`Agent! what is your name?`);
  //random instrument is played
  let instrument = random(instrumentData.instruments);

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
Description of draw()
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
    text(profile, 100, 100);
    pop();
  }
}
