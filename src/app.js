import { convertDate } from "./utils";

//*******target elements*******

const subheader = document.getElementById('subheader');
const forecastContainer = document.getElementById('forecast-container');

const BASEURL = 'https://se-weather-api.herokuapp.com/api/v1/';
const geoEndPoint = 'geo';
const forecastEndPoint = 'forecast';

//bring in imgs - setting path not working, suspect issue with parcel?
const cloudyImg = require('../img/cloudy.png');
const rainImg = require('../img/rain.png');
const snowImg = require('../img/snow.png');
const sunnyImg = require('../img/sunny.png');
const imgs = {
    cloudy: cloudyImg,
    rain: rainImg,
    snow: snowImg,
    sunny: sunnyImg
}

//*******functions*******

//call weather endpoint with default value for zip param
function getForecastData(geoData) {

    const date = formatDate(getCurrentDate());

    fetch(`${BASEURL}${forecastEndPoint}?latitude=${geoData.latitude}&longitude=${geoData.longitutde}&date=${date}`)
        .then(rsp => rsp.json())
        .then(data => {
            console.log(data);
            updateSubheader(geoData);
            createForecastCards(data);
        })
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

function getDayOfWeek(date) {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return days[date.getDay()]
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${month}/${day}/${year}`;
}

// page manipulation functions
function updateSubheader(geoData) {
    subheader.innerHTML = `Weather Forecast For ${geoData.city}`;
}

function createForecastCards(forecastData) {

    for (let i = 0; i < 3; i++) {

        const dayOfWeek = i === 0 ? 'Today' : getDayOfWeek(new Date(convertDate(forecastData.daily.data[i].time)));
        const icon = forecastData.daily.data[i].icon;
        const highTemp = Math.round(forecastData.daily.data[i].temperatureHigh);
        const lowTemp = Math.round(forecastData.daily.data[i].temperatureLow);

        //create card structure
        const forecastCard = document.createElement('div');
        forecastCard.className = "forecast-card";
        const cardHeader = document.createElement('div');
        cardHeader.className = "card-header";
        const cardContents = document.createElement('div');
        cardContents.className = "card-contents";
        forecastCard.append(cardHeader, cardContents);

        //update header
        cardHeader.innerHTML = `${dayOfWeek}:`;

        //update contents
        cardContents.innerHTML = `
            <img class="icon" src="${imgs[icon]}"></img>
            <div class="content-info">
                <div class="weather">${icon}</div>
                <div class="temp">
                    <span class="high-temp">${highTemp}</span>° /
                    <span class="low-temp">${lowTemp}</span>° F
                </div>
            </div>
        `

        forecastContainer.append(forecastCard);
    }
}


// init
function init() {
    console.log("initializing");
    getGeoData();
}

init();