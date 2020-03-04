const BACKEND_URL = "http://localhost:3000"
let addObs = document.getElementById("add_obs")
let violations = document.getElementById("violations")
let bestPractices = document.getElementById("best_practices")
let waterData = document.getElementById("data")
let form = document.querySelector("header")

//   form.style.display = "block";


// let MAP = document.getElementById("map")


//   initMap function initiates rendering of the map on the DOM, and sets event listener for adding maps
function initMap() {
    form.style.display = "none";

    // placeholder for center of map for home view - (replace with data from Map object instance fetched from backend)
    let mapCenter =  { lat: 45, lng: -90} 
    // let mapCenter =  { lat: 45.0007, lng: -73.1836} 
    let map = new google.maps.Map(document.getElementById('map'), {zoom: 3, center: mapCenter});
    // code for adding center marker - don't need, but use for posting observation instance data
    // let marker = new google.maps.Marker({position: mapCenter, map: map});

    map.addListener('click', function(e) {
        console.log("clicked on map location for observation")
        placeMarker(e.latLng, map);

      });
}

function placeMarker(latLng, map) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    console.log("marker placed")
    let markerCoordinates = [marker.getPosition().lat(), marker.getPosition().lng()]
    showNewObservationForm(markerCoordinates)
  }

  function showNewObservationForm(markerCoordinates) {
      form.style.display = "block";
      console.log("new observation form displayed")




    //   form.style.display = "none";
    addMarkerToDatabase()
  }


  function addMarkerToDatabase() {
      console.log("add marker to database")

  }









// takes in argument of map and uses map.id in url for fetch
function getObservationsOnMap(map) {
    fetch(`${BACKEND_URL}/maps/1`)
    .then(response => response.json())
    .then(json => {
        console.log(json)
        console.log(json.data.attributes.observations)
        let observations = json.data.attributes.observations
        observations.forEach(renderObservation)
    })
}
  function renderObservation() {
      console.log("render observation function")

  }
        
//         obs => {
//           console.log(obs)
//           let position = { lat: obs.latitude, lng: obs.longitude}
//           let marker = new google.maps.Marker({position: position, map: map});

//       })
//   });

//   fetch calls for various forms of json data _________________________________

// fetch(`${BACKEND_URL}/observations`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse));

// fetch(`${BACKEND_URL}/observations/1`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse));

// fetch(`${BACKEND_URL}/maps`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse));