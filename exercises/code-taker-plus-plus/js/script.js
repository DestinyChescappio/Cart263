/**
E7: Code Taker to get some stew!
Destiny Chescappio

credits
- poem text
https://www.rd.com/list/funny-poems/
"Do you Carrot All for me?" by Unknown

- Stew Gif
https://giphy.com/gifs/rachaelrayshow-rachael-ray-the-show-rachel-gHVtUzINxjq4zhD4aP
by Rachael Ray Show

- jQuery
https://jquery.com

- jQuery UI:
https://jqueryui.com


Stew Master 101
*/
let stewImg;
let secretWord = `stew`;

("use strict");

function preload() {
  //stew img occurs in the dialog box when user finds the secret
  stewImg = loadImage(`assets/images/giphy.gif`);
}
//when the ser solves the answer
$(`#solved-dialog`).dialog({
  autoOpen: false,
  width: 500,
  buttons: {
    "yummy stew!": function () {
      $(this).dialog(`close`);
    },
  },
});

//the class found is when the mouse is over
$(`.secret`).on(`mouseover`, function (event) {
  //found only after 5 seconds
  $(this).addClass(`found`, 500);
  //drag when the mouse is over
});

$(`.secret`).draggable({
  //options object 'helper' clones the word that is dragged- so they won't displace the texts
  helper: `clone`,
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
    console.log("hit" + $(`#answer`).text());
    if ($(`#answer`).text() === secretWord) {
      $(`#solved-dialog`).dialog(`open`);
    }
  },
});
