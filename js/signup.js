// draws the ui depending on the state of the form

let update_form_page_number = (function () {
  let page_no = 1;
  return function (direction) {
    if (direction == "right") {
      page_no++;
    } else if (direction == "left") {
      page_no--;
    }
  };
})();

update_form_page_number("right");
update_form_page_number("right");
update_form_page_number("right");

// this should be a singelton class that should hold
// the entire state of the ui
class App {}

// this function updates the state of the ui.
// when does the ui change states?
// 1. when user clicks on a button (when a particular event happens)
// 2. when i did simulations the update happend every frame... making
// sure I step through the algorithm but before I do this i need
// to check user events.... (this is what event listeners will do)
// they will only set flags that they have happend. and I will run
// a update then draw loop on a seperate thread that is responsible
// for updating the ui.
// 2. ... Idk know if there state can change by itself without events...
//
function update() {}

// draws the ui according to state changes.
// how would this function know that the state of the ui
// has changed?
// maybe make it loop over on a seperate web worker thread
// that keeps looping over the state of the app and update
// the ui accordingly?
function draw() {}
