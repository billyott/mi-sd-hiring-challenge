import { convertDate } from "./utils";

//*******target elements*******

const subheader = document.getElementById('subheader');
const forecastContainer = document.getElementById('forecast-container');

const BASEURL = 'https://se-weather-api.herokuapp.com/api/v1/';
const geoEndPoint = 'geo';
const forecastEndPoint = 'forecast';


//*******functions*******

//call weather endpoint with default value for zip param
function getForecastData(geoData) {

    const date = formatDate(getCurrentDate());

    fetch(`${BASEURL}${forecastEndPoint}?latitude=${geoData.latitude}&longitude=${geoData.longitutde}&date=${date}`)
        .then(rsp => rsp.json())
        .then(data => console.log(data)) //PLACEHOLDER
        .catch(error => console.log('error', error));
}

//call geo endpoint with default value for zip param
function getGeoData(zip = '10128') {

    return fetch(BASEURL+geoEndPoint+'?zip_code='+zip)
        .then(rsp => rsp.json())
        .then(data => getForecastData(data))
        .catch(error => console.log('error', error));
}


// date functions
function getCurrentDate() {
    return new Date();
} 

function getWeekDay(date) {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return days[date.getDay()]
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    console.log(`${month}/${day}/${year}`);

    return `${month}/${day}/${year}`;
}


function init() {
    console.log("initializing");
    getGeoData();
}

init();