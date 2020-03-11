class Observation {
    constructor(id, name, description, category_id, latitude, longitude) {
        this.id = id
        this.name = name
        this.description = description
        this.category_id = category_id
        this.latitude = latitude
        this.longitude = longitude
    }

    // ******************RENDERS INDIVIDUAL MARKER ON MAP FROM OBSERVATION OBJECT PROPERTIES*********************
    renderMarker(map) {
        console.log(this)

        let number = function() {return this.id}

        let iconColor = function() {
            if (this.category_id === 1) {
                return 'http://maps.google.com/mapfiles/ms/icons/red.png'
            } else if (this.category_id === 2) {
                return 'http://maps.google.com/mapfiles/ms/icons/green.png'
            } else if (this.category_id === 3) {
                return 'http://maps.google.com/mapfiles/ms/icons/yellow.png'
            }
        }
        
        let obsMarker = new google.maps.Marker({
                position: {lat: this.latitude, lng: this.longitude},
                map: map,
                label: {
                    text: number.call(this),
                    fontSize: "8px"
                },
                icon: iconColor.call(this)
        })

        this.attachMarkerInfoWindow(obsMarker)
    }



    // ******************CREATES INFO WINDOW ON EACH MARKER AND SETS EVENT LISTENER TO VIEW DETAILS*********************
    // // creates an infoWindow for each marker with event listener to open on click
    attachMarkerInfoWindow(obsMarker) {
        markersArray.push(obsMarker)

        let observationDetails = `
            <h6>${this.name}</h6>
            <p>${this.latitude}, ${this.longitude}</p>
            <p>${this.description}</p>
        `
        let infowindow = new google.maps.InfoWindow({
        content: observationDetails
        });
    
        obsMarker.addListener('click', function() {
        infowindow.open(obsMarker.get('map'), obsMarker);
        });
    }



    // ******************SETS PLACEHOLDER MARKER TO GET COORDINATES FOR NEW OBSERVATION*********************
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



    // ******************DISPLAYS NEW OBSERVATION FORM AND CREATES OBSERVATION OBJECT WITH DATA*********************
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