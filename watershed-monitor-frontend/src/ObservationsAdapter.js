class ObservationsAdapter {
    constructor(baseURL) {
        this.baseURL = baseURL
    }


    // *****************FETCHES ALL EXISTING OBSERVATIONS FROM DATABASE******************************
    fetchObservations(map) {
        fetch(this.baseURL)
            .then(response => response.json())
            .then(json => {
                let observations = json.data

                // creates an observation object from each entry in the database from json data
                // calls renderMarker function on each observation object to place observations on the map
                observations.forEach(obs => {
                    let observation = new Observation(obs.id, obs.attributes.name, obs.attributes.description, obs.attributes.category_id, obs.attributes.latitude, obs.attributes.longitude)
                    observation.renderMarker(map)
                })
            })
    }



    // ********************FETCH (POST) TO PERSIST NEW OBSERVATION TO DATABASE**********************************
    // addMarkerToDatabase function called in ShowNewObservationForm function
    // sends a post request to backend to create new observation instance from newObservation object and persist it in the database
    addMarkerToDatabase(newObservation, map) {

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newObservation)
        };

        fetch(this.baseURL, configObj)
            .then(function(response) {
                return response.json()
            })
            .then(json => {
                let obs = json.data
                let observation = new Observation(obs.id, obs.attributes.name, obs.attributes.description, obs.attributes.category_id, obs.attributes.latitude, obs.attributes.longitude)
                observation.renderMarker(map)
            })
            .catch(function(error) {
                alert("ERROR! Please Try Again");
                console.log(error.message);
            });
    }


// *************FETCH (DELETE) CALL TO DELETE OBSERVATION FROM DATABASE AND REMOVE FROM MAP*********************
    removeObsFromDatabase(marker) {
        let id = parseInt(marker.label.text)
        
        // removes double click event listeners from markers
        markersArray.map(marker => {
            google.maps.event.clearListeners(marker, 'dblclick')
        })
    
        let configObj = {
            method: "DELETE",
            headers: 
                {
                "Content-Type": "application/json",
                "Accept": "application/json"
                },
        };
        
        fetch(`${this.baseURL}/${id}`, configObj) 
        .then(function(json) {
            marker.setVisible(false)
            marker.setMap(null)
        })
    }

}