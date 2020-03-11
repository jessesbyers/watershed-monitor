
// declaring global variables to be used throughout
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


// initMap function is called in script tag on index.html as page is loaded: 
// Initiates rendering of the map on the DOM, and sets event listener for adding maps
function initMap(map) {
    console.log("start initMap")
    form.style.display = "none";
    filter.style.display = "none";
    filterData.style.display = "none"

    // placeholder for center of map for home view
    // let mapCenter =  { lat: 45, lng: -90} 
    let mapCenter =  { lat: 44.8007, lng: -73.100} 
    // set zoom 12 for local view, zoom 3 for North America
    // let map = new google.maps.Map(document.getElementById('map'), {zoom: 3, center: mapCenter});
    console.log("finish initMap")

    // event listener so user can click "Add" button when ready to create a new observation
    addObs.addEventListener('click', function() { 
        console.log("inside add obs event listener")
        alert("Click on a location on the map to add a new observation.");
        // event listener to place marker on map with click on location
        let addMarkerListener = map.addListener('click', function(e) {
            placeMarker(e.latLng, map);
            // remove listener so only one marker can be added at a time
            google.maps.event.removeListener(addMarkerListener)
        });
    })

    view.addEventListener('click', function() { 
        view.style.display = "none"
        filterData.style.display = "block"

        fetchObservations(map)
        renderMarker(obs, map)
    })

    return map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: mapCenter});

}





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
                        // console.log(marker)
                        markerLocation = [marker.getPosition().lat(), marker.getPosition().lng()]
                        // console.log(marker.getPosition().lat())
                        removeObsFromDatabase(marker)
                        // need to problem-solve how to remove listener on all markers after one is deleted
                    }

                    function removeObsFromDatabase(marker) {
                        console.log("remove from db function")
                        let id = parseInt(marker.label)
                        console.log(id)

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

// ************************ need to fix multiple entries of each new data point added!!!! ***************


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





                    // placeMarker function is called in event listener for adding observations
                    // creates marker object instance, sets coordinates of marker
                    function placeMarker(latLng, map) {
                        console.log("start placeMarker")
                        // console.log(latLng)
                        let placeholder = new google.maps.Marker({
                        position: latLng,
                        map: map
                        });
                        placeholder.setDraggable(true)
                        placeholder.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png')
                        // console.log(placeholder)
                        let markerCoordinates = [placeholder.getPosition().lat(), placeholder.getPosition().lng()]
                        console.log(markerCoordinates)

                        newMarkerArray.push(placeholder)

                        showNewObservationForm(markerCoordinates, map, placeholder)
                    }

                    // showNewObservationForm is called in placeMarker function
                    // displays form to collect observation data from user, created formData object, and hides form
                    function showNewObservationForm(markerCoordinates, map, placeholder) {
                        console.log("start showObservationForm")

                        document.querySelector("form").reset();
                        form.style.display = "block";

                        // event listener to update placeholder coordinates if marker is dragged
                        placeholder.addListener('dragend', function () {
                            placeholder.setPosition({ lat: placeholder.position.lat(), lng: placeholder.position.lng() })
                            return markerCoordinates = [placeholder.getPosition().lat(), placeholder.getPosition().lng()]
                        });

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
                            placeholder.setMap(null)
                            resetMarkers(newMarkerArray, map)
                            markerCoordinates = []

                            console.log("finish showNewObservation form")
                            console.log(markerCoordinates)

                            addMarkerToDatabase(formData, map)    
                        })



                    }


                    // addMarkerToDatabase function called in ShowNewObservationForm function
                    // sends a post request to backend to create new observation instance from formData and persist it in the database
                    function addMarkerToDatabase(formData, map) {
                        console.log("start addMarkertoDatabase")

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
                                response.json()
                            })
                            .then(function() {
                                console.log("new marker added to database")
                                console.log("finish addMarkertoDatabase")

                                fetchObservations(map)
                            })
                            .catch(function(error) {
                                alert("ERROR! Please Try Again");
                                console.log(error.message);
                            });

                    }

// function called in addMarkerToDatabase
// fetches all observation data from database
function fetchObservations(map) {
    console.log("start fetchObservations")

    fetch(`${BACKEND_URL}/observations`)
        .then(response => response.json())
        .then(json => {
            let observations = json.data
            // console.log(observations)

            observations.forEach(obs => {
                renderMarker(obs, map, markersArray)
            })
        })
        console.log("finish fetchObservations")

}

function resetMarkers(array, map) {
    console.log("start resetMarkers")
    console.log(map)


    array.map(marker => marker.setMap(null))
    console.log(array.length)
    array = []
    console.log("array reset to empty")
    console.log(array.length)
    console.log("finish resetMarkers")

}


// function called in fetchObservations
// renders a marker on the map for each observation in the database and sets an event listener on each for info window
function renderMarker(obs, map, markersArray) {
    console.log("start renderMarker")

    let iconColor = function() {
        console.log("start iconColor")

        if (obs.attributes.category.name === "Violations") {
            return 'http://maps.google.com/mapfiles/ms/icons/red.png'
        } else if (obs.attributes.category.name === "Best Practices"){
            return 'http://maps.google.com/mapfiles/ms/icons/green.png'
        } else if (obs.attributes.category.name === "Water Quality Data"){
            return 'http://maps.google.com/mapfiles/ms/icons/yellow.png'
        }
    }

    console.log(markersArray.length)
    let obsMarker = new google.maps.Marker({
        position: {lat: obs.attributes.latitude, lng: obs.attributes.longitude},
        map: map,
        label: obs.id, 
        icon: iconColor()
      });

    // console.log(obsMarker)

    console.log("finish renderMarker")

    attachMarkerInfoWindow(obs, obsMarker)
}

// called in renderMarker function
// creates an infoWindow for each marker with event listener to open on click
function attachMarkerInfoWindow(obs, obsMarker) {
    console.log("start attachMarkerInfoWindow")
    markersArray.push(obsMarker)
    console.log(markersArray.length)

    let observationDetails = `
        <h6>${obs.attributes.name}</h6>
        <p>${obs.attributes.latitude}, ${obs.attributes.longitude}</p>
        <p>${obs.attributes.description}</p>
    `
    let infowindow = new google.maps.InfoWindow({
      content: observationDetails
    });

    console.log("finish attachMarkerInfoWindow")

  
    obsMarker.addListener('click', function() {
      infowindow.open(obsMarker.get('map'), obsMarker);
    });
}

// need to create about / how to navigate site





// ------------ FETCH CALLS ---------------------------------

// takes in argument of map and uses map.id in url for fetch
// function getViolationsOnMap(map) {
//     fetch(`${BACKEND_URL}/categories/1`)
//     .then(response => response.json())
//     .then(json => {
//         console.log(json)

//     })
// }
        

// fetch(`${BACKEND_URL}/observations`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse));

// fetch(`${BACKEND_URL}/observations/1`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse));

// fetch(`${BACKEND_URL}/categories`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse));