var inventory = [];
var canRemoveEventListener = false;
loadInventory();


/* When you click on one of the car elements, change the width of the border to a higher value, and change the background
color to any other color of your choosing.*/


function resetCardClass () {

  var cardIsClickedNodeList = document.querySelectorAll('.cardIsClicked')

  if (cardIsClickedNodeList.length > 0){
    for(var i = 0; i < cardIsClickedNodeList.length; i++){
      cardIsClickedNodeList[i].classList.remove('cardIsClicked');
    }
  }
}


function changeDescription(clickedElement, input) {
  console.log("input changed")
  clickedElement.querySelector(".descriptionText").innerText = input.value;
}

// DO THIS TOMORROW: MAYBE REMOVE OTHER EVENT LISTENER?

function selectCard (clickedElement, color) {

  var inputEventListener = function () {
  changeDescription(clickedElement, input);
  canRemoveEventListener = true;
}

  var input= document.querySelector('input');

  if (canRemoveEventListener) {
    input.removeEventListener('input', inputEventListener)
  }

  if (clickedElement.className.split(' ')[0] === 'card') {

    console.log("Clicked Element", clickedElement);
    // console.log("Chosen color", color);

    // reset cardIsClicked class each time so only one is selected
    resetCardClass();

    // Add new class to most recently clicked card div
    clickedElement.classList.add("cardIsClicked")

    // Put focus on the input field when the card div is selected
    input.focus();
    // Clear placeholder text
    //input.placeholder = '';
    input.value = clickedElement.querySelector('.descriptionText').innerText;
    // input.addEventListener('input', function inputEventListener() {
    //   changeDescription(clickedElement, input);
    //   canRemoveEventListener = true;
    // })
    input.addEventListener('input', inputEventListener);
  }

  // input.removeEventListener('input', inputEventListener)

  // else if (event.target.parentElement.className.split(' ')[0] === "card") {
  //   console.log("Clicked Element", clickedElement);
  //   console.log("Chosen color", color);
  // }
}




function activateEvents() {
  console.log("activateEvents function called")

  document.querySelector('body').addEventListener("click", function(event){
    selectCard(event.target, 'tomato')
  })

  // document.querySelector('input').addEventListener('input', function(event){
  //     console.log("input changed")
  //     changeDescription(event.target)
  //   })
}



function populatePage (inventory) {
  console.log("populatePage function called")

  var currentRowNumber = -1;

  // Loop over the inventory and populate the page

  for(var i = 0; i < inventory.cars.length ; i++) {

    // Make a new bootstrap row for the first and every third iteration to make 3 cars per row      rowNumber${currentRowNumber}
    if (i % 3 === 0) {
      document.querySelectorAll(".container")[1].insertAdjacentHTML('beforeend', `<div class="row flexbox"></div>`)
      currentRowNumber += 1;
    }

    // Append cars to the current row

    // Use querySelectorAll to get all rows, but use the currentRowNumber index to grab the current row
    document.querySelectorAll("div.row")[currentRowNumber].insertAdjacentHTML('beforeend', `<div class="card col-md-3 col-md-offset-1">
                                                                                      <h3 class="yearMakeModelInfo">${inventory.cars[i].year} ${inventory.cars[i].make} ${inventory.cars[i].model}</h3>
                                                                                      <h4 class="priceHeader">Price</h4>
                                                                                      <p>$${inventory.cars[i].price}</p>
                                                                                      <h4 class="descriptionHeader">Description</h4>
                                                                                      <p class="descriptionText">${inventory.cars[i].description}</p>
                                                                                    </div`)
  }

  // Now that the DOM is loaded, establish all the event listeners needed
  activateEvents();
}


// Load the inventory and send a callback function to be
// invoked after the process is complete

function addJsonToInventory(event) {
  inventory = JSON.parse(event.target.responseText)

  populatePage(inventory)
}

function loadInventory (callback) {
  console.log("loadInventory function called")

  var inventoryLoader = new XMLHttpRequest();

  inventoryLoader.addEventListener("load", addJsonToInventory);

  inventoryLoader.open("GET", "inventory.json")
  inventoryLoader.send()

}
