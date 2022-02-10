/**
Bubble Popper
Destiny

pop bubbles
*/

"use strict";

//the user's webcam
let video = undefined;
//the handpose model
let handpose = undefined;
//current set of predictions
let predictions = [];
//the bubble
let bubble = undefined;

/**
Description of preload
*/
function preload() {}

/**
Description of setup
*/
function setup() {
  createCanvas(640, 480);

  //access user's webcam
  video = createCapture(VIDEO);
  video.hide();

  //load handpose model
  handpose = ml5.handpose(video, { flipHorizontal: true }, function () {
    console.log(`Model loaded`);
  });

  //listen for predictions
  handpose.on(`predict`, function (results) {
    console.log(results);
    predictions = results;
  });

  //the bubble
  bubble = {
    x: random(width),
    y: height,
    size: 100,
    speed: 2,
    vx: 0,
    vy: -2,
  };
}

/**
Description of draw()
*/
function draw() {
  background(0);
  //this happens if there's a hand detected
  if (predictions.length > 0) {
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3];
    let base = index[0];
    let tipX = tip[0];
    let tipY = tip[1];
    let baseX = base[0];
    let baseY = base[1];
    //drawing the white pin
    push();
    noFill();
    stroke(255, 255, 255);
    strokeWeight(2);
    line(baseX, baseY, tipX, tipY);
    pop();

    //red pin head
    push();
    noStroke();
    fill(255, 0, 0);
    ellipse(baseX, baseY, 20);
    pop();

    //check bubble popping
    let d = dist(tipX, tipY, bubble.x, bubble.y);
    if (d < bubble.size / 2) {
      bubble.x = random(width);
      bubble.y = height;
    }
  }
  //moving the bubble
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;

  //if the bubble gone off the top of the canvas
  if (bubble.y < 0) {
    bubble.x = random(width);
    bubble.y = height;
  }

  //displaying the bubble
  push();
  fill(0, 100, 200);
  noStroke();
  ellipse(bubble.x, bubble.y, bubble.size);
}
