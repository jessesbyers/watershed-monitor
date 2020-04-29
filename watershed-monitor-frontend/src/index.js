
// ******************VARIABLES***********************
    // const BACKEND_URL = "http://localhost:3000"
    const BACKEND_URL = "https://watershed-monitor-api.herokuapp.com/"

    // navbar buttons 
    const addObs = document.getElementById("add_obs")
    const deleteObs = document.getElementById("delete_obs")
    const filterData = document.getElementById("filter_data")
    const view = document.getElementById("view")
    const about = document.getElementById("about")

    // headers sections to hide and make visible
    const form = document.querySelector("header#form")
    const filter = document.querySelector("header#filter")
    const aboutSection = document.querySelector("header#about_section")

    // submit buttons
    const aboutSubmit = document.getElementById("about_submit")
    const submit = document.getElementById("submit_observation")
    const filterSubmit = document.getElementById("filter_submit")

    let map
    let markersArray = []
    let newMarkerArray = []

    const observationsAdapter =  new ObservationsAdapter(`${BACKEND_URL}/observations`)


// *******************SETTING UP THE MAP***************************************
// initMap function is called in script tag on index.html as page is loaded: 
function initMap(map) {
    // hide all of the optional headers until user clicks on navbar buttons
    form.style.display = "none";
    filter.style.display = "none";
    filterData.style.display = "none"
    aboutSection.style.display = "none";


    // Create google map instance and set center of map and zoon level for home view (North America visible)
    let mapCenter =  { lat: 45, lng: -90} 
    map = new google.maps.Map(document.getElementById('map'), {zoom: 3, center: mapCenter});



    // *********************VIEW: Event Listener logic for viewing observations*****************
    view.addEventListener('click', function() { 
        // replace view button with filter button
        view.style.display = "none"
        filterData.style.display = "block"

        observationsAdapter.fetchObservations(map)
    })


    // *********************ADD: Event Listener logic for adding observations **************
    addObs.addEventListener('click', function() { 
        addObs.disabled = true
        alert("Click on a location on the map to add a new observation.");
        // Event listener to place marker on map with click on location
        let addMarkerListener = map.addListener('click', function(e) {
            Observation.placeMarker(e.latLng, map);
            // Remove event listener so only one marker can be added at a time
            google.maps.event.removeListener(addMarkerListener)
        });
    })




    // *********************DELETE: Event Listener logic for delete function******************************************
    deleteObs.addEventListener('click', function() { 
        deleteObs.disabled = true
        alert("Double Click a marker on the map to delete the observation.");

        // Set an event listener on each marker in the array
        markersArray.forEach(marker => {
            marker.addListener('dblclick', function(e) {
                if (confirm("Do you want to delete this observation?") === true) {
                    deleteObs.disabled = false
                    return observationsAdapter.removeObsFromDatabase(marker)
                }
            })
        })
    })
}




// ************ABOUT: Event Listener logic for showing directions****************
about.addEventListener('click', function() {
    aboutSection.style.display = "block";
    about.disabled = true

    aboutSubmit.addEventListener("click", function () {
        aboutSection.style.display = "none";
        about.disabled = false
    })
})





// ************FILTER: Event Listener logic for filtering by category****************
filterData.addEventListener('click', function() { 
    filter.style.display = "block";
    filterData.disabled = true

    filterSubmit.addEventListener('click', function(){
        event.preventDefault();
        markersArray.forEach(marker => {
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
        filterData.disabled = false
    })
})



// **********RESET: Resets markers on map to prevent duplicate markers****************
function resetMarkers(array) {
    array.map(marker => marker.setMap(null))
    array = []
}