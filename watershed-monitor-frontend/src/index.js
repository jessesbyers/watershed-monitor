
// ******************VARIABLES***********************
// declaring variables to be used throughout
    const BACKEND_URL = "http://localhost:3000"

    let addObs = document.getElementById("add_obs")
    let deleteObs = document.getElementById("delete_obs")
    let filterData = document.getElementById("filter_data")
    let form = document.querySelector("header#form")
    let filter = document.querySelector("header#filter")

    let submit = document.getElementById("submit_observation")
    let filterSubmit = document.getElementById("filter_submit")
    let map
    let markersArray = []
    let newMarkerArray = []
    let view = document.getElementById("view")

    const observationsAdapter =  new ObservationsAdapter(`${BACKEND_URL}/observations`)






// *******************SETTING UP THE MAP***************************************
// initMap function is called in script tag on index.html as page is loaded: 
// Initiates rendering of the map on the DOM, and sets event listener for adding maps
function initMap(map) {
    form.style.display = "none";
    filter.style.display = "none";
    filterData.style.display = "none"

    // Set center of map for home view
    // let mapCenter =  { lat: 45, lng: -90} 
    let mapCenter =  { lat: 44.8007, lng: -73.100} 
    // set zoom 12 for local view, zoom 3 for North America
    // let map = new google.maps.Map(document.getElementById('map'), {zoom: 3, center: mapCenter});

    // event listener so user can click "Add" button when ready to create a new observation
    addObs.addEventListener('click', function() { 
        alert("Click on a location on the map to add a new observation.");
        // event listener to place marker on map with click on location
        let addMarkerListener = map.addListener('click', function(e) {
            Observation.placeMarker(e.latLng, map);
            // remove listener so only one marker can be added at a time
            google.maps.event.removeListener(addMarkerListener)
        });
    })

    view.addEventListener('click', function() { 
        view.style.display = "none"
        filterData.style.display = "block"

        observationsAdapter.fetchObservations(map)
    })

    return map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: mapCenter});
}







// *********************DELETE FUNCTIONS******************************************
// event listener so user can click "Delete" button when ready to delete an existing observation
deleteObs.addEventListener('click', function() { 
    if (deleteObs.innerText === "Delete Data") {
        alert("Double Click a marker on the map to delete the observation.");
        deleteObs.innerText = "Reset"
        // event listener on each marker to delete marker on map with mousedown on location
        markersArray.forEach(marker => {

            let deleteMarkerListener = marker.addListener('dblclick', function(e) {
                if (confirm("Do you want to delete this observation?") === true) {
                    deleteMarker(marker)
                } else {
                    console.log("delete cancelled")
                }
            return deleteMarkerListener
            })
        })
    } else if (deleteObs.innerText === "Reset") {
        markersArray.map(marker => {
                google.maps.event.clearListeners(marker, 'dblclick')
                console.log("reset!")
                deleteObs.innerText = "Delete Data"
        })
    }
})

function deleteMarker(marker) {
    console.log("deleteMarker function")
    markerLocation = [marker.getPosition().lat(), marker.getPosition().lng()]
    removeObsFromDatabase(marker)
}

function removeObsFromDatabase(marker) {
    let id = parseInt(marker.label)

    let configObj = {
        method: "DELETE",
        headers: 
        {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
    };

    fetch(`${BACKEND_URL}/observations/${id}`, configObj) 
    .then(function(response) {
        // response.json();
    })
    .then(function(json) {
        marker.setVisible(false)
        marker.setMap(null)
        console.log(`marker ${id} deleted`)
    })
    .then (alert(`Observation ${id} Successfully Deleted`))

}






// ************FILTER FUNCTIONS****************
// Event listener for filtering data by category
filterData.addEventListener('click', function() { 
    filter.style.display = "block";

    filterSubmit.addEventListener('click', function(){
        event.preventDefault();
        markersArray.map(marker => {
            marker.setVisible(false)
            if (document.getElementById('cat_1').checked && marker.icon === "http://maps.google.com/mapfiles/ms/icons/red.png") {
                marker.setVisible(true)
            }
            if (document.getElementById('cat_2').checked && marker.icon === "http://maps.google.com/mapfiles/ms/icons/green.png") {
                marker.setVisible(true)
            }
            if (document.getElementById('cat_3').checked && marker.icon === "http://maps.google.com/mapfiles/ms/icons/yellow.png") {
                marker.setVisible(true)
            }
        })
        filter.style.display = "none";
    })
})


// **********RESET FUNCTION****************
function resetMarkers(array) {
    array.map(marker => marker.setMap(null))
    // array = []
}