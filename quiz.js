var inventory = [];
loadInventory();


function populatePage (inventory) {
  console.log("populatePage function called")

  var carsInRow = 0;
  var currentRowNumber = 0;

  // Loop over the inventory and populate the page

  for(var i = 0; i < inventory.cars.length ; i++) {
    console.log(inventory.cars[i])

    // Make a new bootstrap row for the first and every third iteration to make 3 cars per row      rowNumber${currentRowNumber}
    if (i % 3 === 0) {
      document.querySelectorAll(".container")[1].insertAdjacentHTML('beforeend', `<div class="row flexbox"></div>`)
    }

    // Append cars to the current row
    /*"make": "Chevrolet",
            "model": "S10",
            "year": "1994",
            "price": "4000",
            "description": "This is my truck."*/

    // Use querySelectorAll to get all rows, but use the currentRowNumber index to grab the current row
    document.querySelectorAll("div.row")[currentRowNumber].insertAdjacentHTML('beforeend', `<div class="car col-md-3 col-md-offset-1">
                                                                                      <h3 class="yearMakeModelInfo">${inventory.cars[i].year} ${inventory.cars[i].make} ${inventory.cars[i].model}</h3>
                                                                                      <h4 class="priceHeader">Price</h4>
                                                                                      <p>$${inventory.cars[i].price}</p>
                                                                                      <h4 class="descriptionHeader">Description</h4>
                                                                                      <p>${inventory.cars[i].description}</p>
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


function activateEvents() {
  console.log("activateEvents function called")
}
