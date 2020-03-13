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
        // set label number to match ID in database
        let number = function() {return this.id}

        // set marker color by category
        let iconColor = function() {
            if (this.category_id === 1) {
                return 'http://maps.google.com/mapfiles/ms/icons/red.png'
            } else if (this.category_id === 2) {
                return 'http://maps.google.com/mapfiles/ms/icons/green.png'
            } else if (this.category_id === 3) {
                return 'http://maps.google.com/mapfiles/ms/icons/yellow.png'
            }
        }
        
        // using information fetched from database to create google maps marker object
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
    attachMarkerInfoWindow(obsMarker) {
        markersArray.push(obsMarker)

        // generating text for info window attached to individual marker
        let observationDetails = `
            <h6>${this.name}</h6>
            <p>${this.latitude}, ${this.longitude}</p>
            <p>${this.description}</p>
        `

        // creating google maps info window object for marker
        let infowindow = new google.maps.InfoWindow({
        content: observationDetails
        });
    
        // event listener so info window can be opened with click on marker
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

        // clear old form values and display form
        document.querySelector("form").reset();
        form.style.display = "block";

        // event listener to update placeholder coordinates if pushpin is dragged to new location
        placeholder.addListener('dragend', function () {
            placeholder.setPosition({ lat: placeholder.position.lat(), lng: placeholder.position.lng() })
            return markerCoordinates = [placeholder.getPosition().lat(), placeholder.getPosition().lng()]
        });

        // event listener to submit form data when submit button is clicked
        submit.addEventListener('click', function () {
            event.preventDefault();

            // if (document.getElementById("form_name").value !== "" && document.getElementById("form_description").value !== "" && document.getElementById("category").value !== "") {

                // build new observation object with data from form and placeholder marker (to send to backend to create observation instance)
                let formData = {
                    name: document.getElementById("form_name").value,
                    description: document.getElementById("form_description").value,
                    category_id: parseInt(document.getElementById("category").value),
                    latitude: markerCoordinates[0],
                    longitude: markerCoordinates[1]
                }

                // observationsAdapter.addMarkerToDatabase(formData, map)    

            // } else {
            //     alert("Please fill out the form completely")
            // }


            // hide form and remove placeholder pushpin so new observation can be added to and rendered from the database
            form.style.display = "none";
            placeholder.setMap(null)
            resetMarkers(newMarkerArray)
            markerCoordinates = []
            addObs.disabled = false

            observationsAdapter.addMarkerToDatabase(formData, map)    
        })
    }

}