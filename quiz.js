var inventory = [];
loadInventory();


/* When you click on one of the car elements, change the width of the border to a higher value, and change the background
color to any other color of your choosing.*/

function selectCard (event) {
  console.log("selectCard function called")

  if (event.target.className.split(' ')[0] === "car" || event.target.parentElement.className.split(' ')[0] === "car") {
    console.log("this event has a class name of car")
    console.log(event.target)
  }
}



function activateEvents() {
  console.log("activateEvents function called")

  document.querySelector('body').addEventListener("click", selectCard)
}



function populatePage (inventory) {
  console.log("populatePage function called")

  var carsInRow = 0;
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
    document.querySelectorAll("div.row")[currentRowNumber].insertAdjacentHTML('beforeend', `<div class="car col-md-3 col-md-offset-1">
                                                                                      <h3 class="yearMakeModelInfo">${inventory.cars[i].year} ${inventory.cars[i].make} ${inventory.cars[i].model}</h3>
                                                                                      <h4 class="priceHeader">Price</h4>
                                                                                      <p>$${inventory.cars[i].price}</p>
                                                                                      <h4 class="descriptionHeader">Description</h4>
                                                                                      <p>${inventory.cars[i].description}</p>
                                                                                    </div`)
    //carsInRow += 1;
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
