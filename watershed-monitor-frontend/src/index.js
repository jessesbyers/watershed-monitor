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