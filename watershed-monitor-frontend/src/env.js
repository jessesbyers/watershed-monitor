// not working yet

const API_KEY = "AIzaSyAv4WPYmC60DsKf3lkbaTfDVP9KzA9Ny9I"

function setApi() {
    let api = document.querySelector("script#api")
    api.setAttribute("src", `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`)
    console.log(API_KEY)
    console.log(api)
}
