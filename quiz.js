var inventory = [];
var saveClickedElement = false;
loadInventory();



function resetCardClass () {

  var cardIsClickedNodeList = document.querySelectorAll('.cardIsClicked')

  if (cardIsClickedNodeList.length > 0){
    for(var i = 0; i < cardIsClickedNodeList.length; i++){
      cardIsClickedNodeList[i].classList.remove('cardIsClicked');
    }
  }
}


function changeDescription(input) {

  // Check if there is a card selected
  if (saveClickedElement) {
    // Modify the current cards description when the input is changed
    saveClickedElement.innerText = input.value
  }
}


function selectCard (clickedElement, color) {

  var input = document.querySelector('input');

  // Checks to see if the body element selected is a card
  if (clickedElement.className.split(' ')[0] === 'card') {

    // Check to see if elemnt is clicked
    //console.log("Clicked Element", clickedElement);

    // reset cardIsClicked class each time so only one is selected
    resetCardClass();

    // Add new class to most recently clicked card div
    clickedElement.classList.add("cardIsClicked")

    // Put focus on the input field when the card div is selected
    input.focus();

    // Add description  text to the inputs value
    input.value = clickedElement.querySelector('.descriptionText').innerText;

    // save element with description to be used in  changeDescription function
    saveClickedElement = clickedElement.querySelector('.descriptionText')
  }

  // Checks to see if the body element selected parents is a card
  else if (clickedElement.parentElement.className.split(' ')[0] === "card") {
    resetCardClass();

    // Add new class to most recently clicked card div
    clickedElement.parentElement.classList.add("cardIsClicked")

    // Put focus on the input field when the card div is selected
    input.focus();

    // Add description  text to the inputs value
    input.value = clickedElement.parentElement.querySelector('.descriptionText').innerText;

    // save element with description to be used in  changeDescription function
    saveClickedElement = clickedElement.parentElement.querySelector('.descriptionText')
  }
}




function activateEvents() {
  console.log("activateEvents function called")

  // Add event listener for when a card is selected
  document.querySelector('body').addEventListener("click", function clickCard(event){
    selectCard(event.target, 'tomato')
  })

  // Add event listener to watch for changing input in the only input field and apply its changes to the current chosen card
  document.querySelector('input').addEventListener('input', function inputEventListener(event) {
      changeDescription(event.target)
  });

  // Removes the default event of the enter key press
  document.querySelector('input').addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  })

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
