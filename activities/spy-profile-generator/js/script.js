/**
Title of Project
Author Name

Generates a randomized spy profile for the user, and password protects it.
*/

"use strict";

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
  //if there is data save already
  //  if (data !== null) {
  //check the password if it's not null
  //let password = prompt(`agent! What is your password?`);
  spyProfile.name = prompt(`Agent! what is your name?`);

  //if they typed the same password, and it matches, show the data
  if (name === data.name) {
    //    spyProfile.name = data.name;
    //    spyProfile.alias = data.alias;
    //    spyProfile.secretWeapon = data.secretWeapon;
    //    spyProfile.password = data.password;
    //calling the generateSpyProfile function
  }
  generateSpyProfile();
}

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
}

/**
Description of draw()
*/
function draw() {
  background(0);

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
