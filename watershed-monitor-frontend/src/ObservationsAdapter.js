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
                    let observation = new Observation(obs.id, obs.attributes.name, obs.attributes.description, obs.attributes.category_id, obs.attributes.latitude, obs.attributes.longitude)
                    observation.renderMarker(map)
                })
            })
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


// *************DELETE fetch logic*********************
    removeObsFromDatabase(marker) {
        console.log(marker)
        let id = parseInt(marker.label)
    
        markersArray.map(marker => {
            google.maps.event.clearListeners(marker, 'dblclick')
            deleteObs.innerText = "Delete Data"
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



}