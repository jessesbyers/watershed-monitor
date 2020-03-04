const API_KEY = "AIzaSyAv4WPYmC60DsKf3lkbaTfDVP9KzA9Ny9I"

document.addEventListener(DOMContentLoaded, function() { 

    let api = document.querySelector("script#api")
    api.setAttribute("src", `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`)
    console.log(API_KEY)
})
