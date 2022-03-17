/**
Title of Project
Author Name

Da Vinci?!
*/
stewImg;

("use strict");

function preload() {
  let stewImg = loadImage(`assets/images/giphy.gif`);
}
//when the ser solves the answer
$(`#solved-dialog`).dialog({
  autoOpen: false,
  buttons: {
    "duh!": function () {
      $(this).dialog(`close`);
    },
  },
});

//the class found is when the mouse is over
$(`.secret`).one(`mouseover`, function (event) {
  //found only after 5 seconds
  $(this).addClass(`found`, 500);
  //drag when the mouse is over
  $(`.secret`).draggable({
    //options object 'helper' clones the word that is dragged- so they won't displace the texts
    helper: `clone`,
  });
});

//making the words droppable
$(`#answer`).droppable({
  drop: function (event, ui) {
    //the letter is droppable
    let letter = ui.draggable.text();
    //adding the letter to the droppable area (the box)
    $(this).append(letter);
    //to stop it from being draggable the second time- can only drag a letter once
    ui.draggable.draggable(`disable`);
    //to stop the red higlight when found
    ui.draggable.removeClass(`found`);
    //check if the user got it right
    if ($(this).text() === "stew") {
      $(`#solved-dialog`).dialog(`open`);
    }
  },
});
