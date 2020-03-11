class Observation {
    constructor(name, description, category_id, latitude, longitude) {
        this.name = name
        this.description = description
        this.category_id = category_id
        this.latitude = latitude
        this.longitude = longitude
    }





    // placeMarker function is called in event listener for adding observations
    // creates marker object instance, sets coordinates of marker
    static placeMarker(latLng, map) {
        let placeholder = new google.maps.Marker({
        position: latLng,
        map: map
        });
        placeholder.setDraggable(true)
        placeholder.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png')

        let markerCoordinates = [placeholder.getPosition().lat(), placeholder.getPosition().lng()]

        newMarkerArray.push(placeholder)

        this.showNewObservationForm(markerCoordinates, map, placeholder)
    }




    // showNewObservationForm is called in placeMarker function
    // displays form to collect observation data from user, created formData object, and hides form
    static showNewObservationForm(markerCoordinates, map, placeholder) {

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

            let newObservation = new Observation(formData)


            form.style.display = "none";
            placeholder.setMap(null)
            resetMarkers(newMarkerArray)
            markerCoordinates = []

            observationsAdapter.addMarkerToDatabase(formData, map)    
        })
    }

}