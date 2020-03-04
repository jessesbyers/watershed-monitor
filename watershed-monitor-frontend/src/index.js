const BACKEND_URL = "http://localhost:3000"
let ADD_OBS = document.getElementById("add_obs")
let VIEW_OBS = document.getElementById("view_obs")
let ADD_MAP = document.getElementById("add_map")
let VIEW_MAP = document.getElementById("view_map")
let MAP = document.getElementById("map")


//   initMap function initiates rendering of the map on the DOM, and sets event listener for adding maps
function initMap() {
    // placeholder for center of map for home view - (replace with data from Map object instance fetched from backend)
    let mapCenter =  { lat: 45, lng: -90} 
    // let mapCenter =  { lat: 45.0007, lng: -73.1836} 
    let map = new google.maps.Map(document.getElementById('map'), {zoom: 3, center: mapCenter});
    // code for adding center marker - don't need, but use for posting observation instance data
    // let marker = new google.maps.Marker({position: mapCenter, map: map});

    map.addListener('click', function(e) {
        console.log("clicked on map location for observation")
        placeMarker(e.latLng, map);
        showNewObservationForm()
        addMarkerToDatabase()
      });
}

function placeMarker(latLng, map) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    console.log(marker.getPosition().lat())
    console.log(marker.getPosition().lng())
    console.log("marker placed")
  }

  function showNewObservationForm() {
      console.log("show observation form to create new observation")
      let form = document.querySelector("form")
    //   form.innerHTML = 
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