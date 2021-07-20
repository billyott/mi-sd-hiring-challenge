import { convertDate } from "./utils";

//test api calls

// fetch("https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=10128")
//   .then(rsp => rsp.json())
//   .then(data => console.log(data))
//   .catch(error => console.log('error', error));

//   fetch("https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=34.09&longitude=-104.2&date=01/24/2021")
//   .then(rsp => rsp.json())
//   .then(data => console.log(data))
//   .catch(error => console.log('error', error));

//*******target elements*******

const subheader = document.getElementById('subheader');
const forecastContainer = document.getElementById('forecast-container');

const BASEURL = 'https://se-weather-api.herokuapp.com/api/v1/';
const geoEndPoint = 'geo?zip_code=';
const forecastEndPoint = 'forecast';


//*******functions*******

//call geo endpoint with default value for zip param
function getGeoData(zip = '10128') {

    return fetch(BASEURL+geoEndPoint+zip)
        .then(rsp => rsp.json())
        .then(data => data)
        .catch(error => console.log('error', error));
}

//call weather endpoint with default value for zip param
function getForecastData(geoData, date = '') {
    fetch(BASEURL+geoEndPoint+zip)
        .then(rsp => rsp.json())
        .then(data => console.log(data))
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


function init() {
    console.log("initializing");
    getGeoData();
}

init();