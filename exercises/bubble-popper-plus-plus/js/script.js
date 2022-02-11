/**
Bubble Popper
Destiny

A bubble wiggle simulator. Not a game; just for fun :)
*/

"use strict";

//the user's webcam
let video = undefined;
//the handpose model
let handpose = undefined;
//current set of predictions
let predictions = [];
//the bubble
let bubbles = [];
let numBubbles = 10;
//number of bubbles touched
let numBubbleTouched = 0;

/**
seeting up array of bubbles and setting up ml5 handpose
*/
function setup() {
  createCanvas(800, 600);

  //making a forloop of bubbles
  for (let i = 0; i < numBubbles; i++) {
    let currentBubble = createBubbles(random(0, width), random(0, height));
    bubbles.push(currentBubble);
  }

  //access user's webcam
  video = createCapture(VIDEO);
  video.hide();

  //load handpose model
  handpose = ml5.handpose(video, { flipHorizontal: true }, function () {
    console.log(`Model loaded`);
  });

  //listen for predictions
  handpose.on(`predict`, function (results) {
    // console.log(results);
    predictions = results;
  });
}

/**
drawing the pin and bubbles
*/
function draw() {
  background(0);

  //calling the function when the bubbles are touched
  numBubbleTouchedText();

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

    //array of bubbles
    for (let i = 0; i < bubbles.length; i++) {
      moveBubbles(bubbles[i]);
      displayBubbles(bubbles[i]);

      //check bubble popping
      let d = dist(tipX, tipY, bubbles[i].x, bubbles[i].y);
      if (d < bubbles[i].size / 2) {
        bubbles[i].x = bubbles[i].x + random(-100, 100);
        numBubbleTouched += 1;
      }
    }
  }
}

//number of bubbles touched text
function numBubbleTouchedText() {
  fill(255, 0, 0);
  textFont(`impact`);
  textStyle(BOLD);
  textSize(60);
  textAlign(CENTER, CENTER);
  text(`bubble wiggles X${numBubbleTouched}`, 400, 100);
}

//creating bubbles
function createBubbles(x, y) {
  let bubble = {
    x: x,
    y: y,
    size: 50,
    speed: 2,
    vx: 0,
    vy: -2,
    wiggle: false,
  };
  return bubble;
}

//moving bubbles
function moveBubbles(bubble) {
  //moving the bubble
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;

  //if the bubble gone off the top of the canvas
  if (bubble.y < 0) {
    bubble.x = random(0, width);
    bubble.y = height;
  }
}

//displaying the bubbles
function displayBubbles(bubble) {
  //displaying the bubble
  push();
  fill(0, 100, 200);
  noStroke();
  ellipse(bubble.x, bubble.y, bubble.size);
  pop();
}

//bubble wiggle behavior
function bubbleWiggle() {
  if (bubbles.wiggle) {
    bubbles.x += random(-2, 2);
    bubbles.y += random(-2, 2);
  }
}
