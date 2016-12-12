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
      document.querySelector(".container").insertAdjacentHTML('beforeend', `<div class="row"></div>`)
    }

    // Append cars to the current row
    /*"make": "Chevrolet",
            "model": "S10",
            "year": "1994",
            "price": "4000",
            "description": "This is my truck."*/

    // Use querySelectorAll to get all rows, but use the currentRowNumber index to grab the current row
    document.querySelectorAll("div.row")[currentRowNumber].insertAdjacentHTML('beforeend', `<div class="car col-md-4">
                                                                                      <h3>year make model</h3>
                                                                                      <p>price</p>
                                                                                      <p>description</p>
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
