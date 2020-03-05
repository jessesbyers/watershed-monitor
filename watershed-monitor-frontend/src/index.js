// declaring global variables to be used throughout
const BACKEND_URL = "http://localhost:3000"
let addObs = document.getElementById("add_obs")
let filterData = document.getElementById("filter_data")
let form = document.querySelector("header#form")
let filter = document.querySelector("header#filter")

let submit = document.getElementById("submit_observation")
let map
// let filter = document.getElementById("filter_data")
// let about = document.getElementById("about")




// initMap function is called in script tag on index.html as page is loaded: 
// Initiates rendering of the map on the DOM, and sets event listener for adding maps
function initMap(map) {
    form.style.display = "none";
    filter.style.display = "none";
    // placeholder for center of map for home view
    // let mapCenter =  { lat: 45, lng: -90} 
    let mapCenter =  { lat: 44.8007, lng: -73.100} 
    // set zoom 12 for local view, zoom 3 for North America
    // let map = new google.maps.Map(document.getElementById('map'), {zoom: 3, center: mapCenter});
    map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: mapCenter});
    // after map is loaded, fetch and render markers for all observations already in database

    // event listener so user can click "Add" button when ready to create a new observation
    addObs.addEventListener('click', function() { 
        // event listener to place marker on map with click on location
        let addMarkerListener = map.addListener('click', function(e) {
            console.log("clicked on map location for observation")
            placeMarker(e.latLng, map);
            // remove listener so only one marker can be added at a time
            google.maps.event.removeListener(addMarkerListener)
            console.log("addMarkerListener removed")
        });
    })

    filter_data.addEventListener('click', function() { 
        filter.style.display = "block";
        console.log("testing filter")


    })


    fetchObservations(map)
    renderMarker(obs, map)
}






// placeMarker function is called in event listener for adding observations
// creates marker object instance, sets coordinates of marker
function placeMarker(latLng, map) {
    let marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png')
    console.log("marker placed")

    let markerCoordinates = [marker.getPosition().lat(), marker.getPosition().lng()]
    showNewObservationForm(markerCoordinates, map, marker)

}

// showNewObservationForm is called in placeMarker function
// displays form to collect observation data from user, created formData object, and hides form
function showNewObservationForm(markerCoordinates, map, marker) {
    document.querySelector("form").reset();
    form.style.display = "block";
    console.log("new observation form displayed")

    submit.addEventListener('click', function () {
        event.preventDefault();

        // build object with data from form and marker to send to backend to create observation instance
        let formData = {
            name: document.getElementById("form_name").value,
            description: document.getElementById("form_description").value,
            category_id: parseInt(document.getElementById("category").value),
            latitude: markerCoordinates[0],
            longitude: markerCoordinates[1]
        }

        form.style.display = "none";
        console.log("form disappears")
        marker.setMap(null)
        addMarkerToDatabase(formData, map)    
    })
}

// addMarkerToDatabase function called in ShowNewObservationForm function
// sends a post request to backend to create new observation instance from formData and persist it in the database
function addMarkerToDatabase(formData, map) {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      };

      return fetch(`${BACKEND_URL}/observations`, configObj)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            console.log("add marker to database")
            fetchObservations(map)
        })
        .catch(function(error) {
            alert("ERROR! Please Try Again");
            console.log(error.message);
        });
}

// function called in addMarkerToDatabase
// fetches all observation data form database
function fetchObservations(map) {
    console.log("fetch observations function")

    fetch(`${BACKEND_URL}/observations`)
        .then(response => response.json())
        .then(json => {
            let observations = json.data
            observations.forEach(obs => {
                renderMarker(obs, map)
            })
        })
}

// function called in fetchObservations
// renders a marker on the map for each observation in the database and sets an event listener on each for info window
function renderMarker(obs, map) {
    console.log("render marker function")
    let obsMarker = new google.maps.Marker({
        position: {lat: obs.attributes.latitude, lng: obs.attributes.longitude},
        map: map
      });
      console.log(obs.attributes.category.name)
    // logic to show markers of each category in a different color
    if (obs.attributes.category.name === "Violations") {
        obsMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/red.png')
    } else if (obs.attributes.category.name === "Best Practices"){
        obsMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green.png')
    } else if (obs.attributes.category.name === "Water Quality Data"){
        obsMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow.png')
    }
      attachMarkerInfoWindow(obs, obsMarker)
}

// called in renderMarker function
// creates an infoWindow for each marker with event listener to open on click
function attachMarkerInfoWindow(obs, obsMarker) {
    let observationDetails = `
        <h6>${obs.attributes.name}</h6>
        <p>${obs.attributes.latitude}, ${obs.attributes.longitude}</p>
        <p>${obs.attributes.description}</p>
    `
    let infowindow = new google.maps.InfoWindow({
      content: observationDetails
    });
  
    obsMarker.addListener('click', function() {
      infowindow.open(obsMarker.get('map'), obsMarker);
    });
    console.log("InfoWindows added with event listener")
}


// need to add delete or edit function

// need to add filtering of markers

// need to create about / how to navigate site


// ------------ FETCH CALLS ---------------------------------

// takes in argument of map and uses map.id in url for fetch
// function getViolationsOnMap(map) {
//     fetch(`${BACKEND_URL}/categories/1`)
//     .then(response => response.json())
//     .then(json => {
//         console.log(json)
//         console.log(json.data.attributes.observations)
//         let observations = json.data.attributes.observations
//         observations.forEach(renderObservation)
//     })
// }
//   function renderObservation() {
//       console.log("render observation function")

//   }
        


//   fetch calls for various forms of json data _________________________________

// fetch(`${BACKEND_URL}/observations`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse));

// fetch(`${BACKEND_URL}/observations/1`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse));

// fetch(`${BACKEND_URL}/categories`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse));