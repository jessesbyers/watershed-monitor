class ObservationsAdapter {
    constructor(baseURL) {
        this.baseURL = baseURL
    }


    // function called in addMarkerToDatabase
    // fetches all observation data from database
    fetchObservations(map) {
        fetch(this.baseURL)
            .then(response => response.json())
            .then(json => {
                let observations = json.data

                observations.forEach(obs => {
                    this.renderMarker(obs, map, markersArray)
                })
            })
    }




    // // function called in fetchObservations
    // // renders a marker on the map for each observation in the database and sets an event listener on each for info window
    renderMarker(obs, map) {

        let iconColor = function() {

            if (obs.attributes.category.name === "Violations") {
                return 'http://maps.google.com/mapfiles/ms/icons/red.png'
            } else if (obs.attributes.category.name === "Best Practices"){
                return 'http://maps.google.com/mapfiles/ms/icons/green.png'
            } else if (obs.attributes.category.name === "Water Quality Data"){
                return 'http://maps.google.com/mapfiles/ms/icons/yellow.png'
            }
        }

        let obsMarker = new google.maps.Marker({
            position: {lat: obs.attributes.latitude, lng: obs.attributes.longitude},
            map: map,
            label: obs.id, 
            icon: iconColor()
        });

        this.attachMarkerInfoWindow(obs, obsMarker)
    }




    // // called in renderMarker function
    // // creates an infoWindow for each marker with event listener to open on click
    attachMarkerInfoWindow(obs, obsMarker) {
        markersArray.push(obsMarker)

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
    }




    // addMarkerToDatabase function called in ShowNewObservationForm function
    // sends a post request to backend to create new observation instance from formData and persist it in the database
    addMarkerToDatabase(newObservation, map) {

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newObservation)
        };

        return fetch(this.baseURL, configObj)
            .then(function(response) {
                // response.json()
            })
            .then(function() {
                observationsAdapter.fetchObservations(map)
            })
            .catch(function(error) {
                alert("ERROR! Please Try Again");
                console.log(error.message);
            });
    }
}