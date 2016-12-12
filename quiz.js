var inventory = [];
loadInventory();

function populatePage (inventory) {
  // Loop over the inventory and populate the page

  // Now that the DOM is loaded, establish all the event listeners needed
  activateEvents();
}

// Load the inventory and send a callback function to be
// invoked after the process is complete

function loadInventory (callback) {
  console.log("loadInventory function called")

  var inventoryLoader = new XMLHttpRequest();

  inventoryLoader.addEventListener("load", function (event) {

    inventory = JSON.parse(event.target.responseText);
    console.log(inventory)
  });

  inventoryLoader.open("GET", "inventory.json")
  inventoryLoader.send()
}


function activateEvents() {

}
