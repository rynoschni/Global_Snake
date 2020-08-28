"use strict";
const searchCountry = document.getElementById("searchCountry");
let countryName = document.querySelectorAll("#countryName");
let dataList = document.getElementById("data-list");
let outputList = document.getElementById("output");

// This is the original map when page loads
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 20 },
    zoom: 4,
  });
}

//get query string, used to find the country name in the HTML string
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

// Get the country name from the index.html page
var name = getQueryVariable("name");
//Event listener for DOM content, when the page loads
window.addEventListener('DOMContentLoaded', (event) => {
  console.log(name);
  // uses GET to access the API
  const url = `https://restcountries.eu/rest/v2/name/${name}`;
  get(url).then(function (response) {
    //re-assign the lat/long from response
    countryName.innerHTML = name;
    console.log('The Name is: ', name)
    console.log("The Country Name is:", countryName)
    let titleName = document.getElementById('titleName');
    titleName.innerHTML = "Welcome to " + name + "!";
    let heroName = document.getElementById('heroName');
    heroName.innerHTML = name;
    
    let latitude = response[0].latlng[0];
    let longitude = response[0].latlng[1];
    let capital = response[0].capital;
    console.log("The capitol is: ", capital);
    let currency = response[0].currencies[0].name;
    console.log("The currency is: ", currency);
    let language = response[0].languages[0].name;
    console.log("The language is: ", language);
    let callingCode = response[0].callingCodes;
    console.log("callingCode: ", callingCode);
    let Population = response[0].population;
    console.log("Population: ", Population);
    let Subregion = response[0].subregion;
    console.log("Subregion: ", Subregion);
    let flagId = document.getElementById("flag");
    flagId.src = response[0].flag;

    // Creating new map off of API query

// Weather Information based on Capitol City
    
    const weatherInfo = get(
      `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=e58d1190d081f10a3da11806b105613b&units=imperial`
    );
    weatherInfo.then((response) => {
      console.log(response);
      let capitalName = response.name;
      let temperature = response.main.temp;
      let feelsLike = response.main.feels_like;
      let humidity = response.main.humidity;
      
      let weatherItem1 = document.createElement("li");
      weatherItem1.innerHTML = "Temperature is: " + temperature + " ℉	";
      weatherOutput.appendChild(weatherItem1);
      let weatherItem2 = document.createElement("li");
      weatherItem2.innerHTML = "Temperature feels like is: " + feelsLike + " ℉	";
      weatherOutput.appendChild(weatherItem2);
      let weatherItem3 = document.createElement("li");
      weatherItem3.innerHTML = "Humidity is: " + humidity + " %";
      weatherOutput.appendChild(weatherItem3);
    });

    // APi query reponse items
    // Name, capital, latlng, currencies.name, languages.name, flag, callingCodes, population, subregion
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: 4,
    });

    // DOM Manipulation
    const newListitem1 = document.createElement("li");
    newListitem1.classList.add('none');
    newListitem1.innerHTML = "Latitude: " + latitude;
    outputList.appendChild(newListitem1);
    const newListitem6 = document.createElement("li");
    newListitem6.classList.add('none');
    newListitem6.innerHTML = "Longtitude: " + longitude;
    outputList.appendChild(newListitem6);
    const newListitem7 = document.createElement("li");
    newListitem7.classList.add('none');
    newListitem7.innerHTML = "Calling code: " + callingCode;
    outputList.appendChild(newListitem7);
    const newListitem8 = document.createElement("li");
    newListitem8.classList.add('none');
    newListitem8.innerHTML = "Population: " + Population;
    outputList.appendChild(newListitem8);
    const newListitem9 = document.createElement("li");
    newListitem9.classList.add('none');
    newListitem9.innerHTML = "Sub-region: " + Subregion;
    outputList.appendChild(newListitem9);
    // Capital
    const newListitem2 = document.createElement("li");
    newListitem2.classList.add('none');
    newListitem2.innerHTML = "Capital: " + capital;
    outputList.appendChild(newListitem2);
    // currency
    const newListitem3 = document.createElement("li");
    newListitem3.classList.add('none');
    newListitem3.innerHTML = "Currency: " + currency;
    outputList.appendChild(newListitem3);
    // language
    const newListitem4 = document.createElement("li");
    newListitem4.classList.add('none');
    newListitem4.innerHTML = "Language: " + language;
    outputList.appendChild(newListitem4);
});
});

console.log("Global Snake Awesomeness Loaded!!!!!")
console.log("Designed by Team H-Town!")
console.log("See About Us!")