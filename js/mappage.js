"use strict";
const searchCountry = document.getElementById("searchCountry");
let countryName = document.getElementById("countryName");
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
//Event listner for DOM content, when the page loads
window.addEventListener('DOMContentLoaded', (event) => {
  console.log(name);
  // uses GET to access the API
  const url = `https://restcountries.eu/rest/v2/name/${name}`;
  get(url).then(function (response) {
    //re-assign the lat/long from response
    countryName.innerHTML = name;
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
    // APi query reponse items
    // Name, capital, latlng, currencies.name, languages.name, flag, callingCodes, population, subregion
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: 4,
    });

    // DOM Manipulation
    const newListitem1 = document.createElement("li");
    newListitem1.innerHTML = "Latitude: " + latitude;
    outputList.appendChild(newListitem1);
    const newListitem6 = document.createElement("li");
    newListitem6.innerHTML = "Longtitude: " + longitude;
    outputList.appendChild(newListitem6);
    const newListitem7 = document.createElement("li");
    newListitem7.innerHTML = "Calling code: " + callingCode;
    outputList.appendChild(newListitem7);
    const newListitem8 = document.createElement("li");
    newListitem8.innerHTML = "Population: " + Population;
    outputList.appendChild(newListitem8);
    const newListitem9 = document.createElement("li");
    newListitem9.innerHTML = "Sub-region: " + Subregion;
    outputList.appendChild(newListitem9);
    // Capital
    const newListitem2 = document.createElement("li");
    newListitem2.innerHTML = "Capital: " + capital;
    outputList.appendChild(newListitem2);
    // currency
    const newListitem3 = document.createElement("li");
    newListitem3.innerHTML = "Currency: " + currency;
    outputList.appendChild(newListitem3);
    // language
    const newListitem4 = document.createElement("li");
    newListitem4.innerHTML = "Language: " + language;
    outputList.appendChild(newListitem4);
});
});