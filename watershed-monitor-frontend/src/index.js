//   intimap function initiates rendering of the map on the DOM
function initMap() {
    // placeholder for center of map for testing - eventually replace with data from Map object fetched from backend
    let mapCenter =  { lat: 44.8107, lng: -73.0836} 
    let map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: mapCenter});
    let marker = new google.maps.Marker({position: mapCenter, map: map});
}


//   test that we can fetch seed data from the backend_________________________________
const BACKEND_URL = "http://localhost:3000"
fetch(`${BACKEND_URL}/maps`)
  .then(response => response.json())
  .then(parsedResponse => console.log(parsedResponse));

fetch(`${BACKEND_URL}/maps/1`)
  .then(response => response.json())
  .then(parsedResponse => console.log(parsedResponse));

fetch(`${BACKEND_URL}/observations`)
  .then(response => response.json())
  .then(parsedResponse => console.log(parsedResponse));

fetch(`${BACKEND_URL}/observations/1`)
  .then(response => response.json())
  .then(parsedResponse => console.log(parsedResponse));

