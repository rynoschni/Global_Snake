"use strict";



const searchCountry = document.getElementById("searchCountry");
let countryName = document.querySelectorAll("#countryName");
const heroImg = document.getElementById("heroImg");
const photoName = document.getElementById("photoName");
let dataList = document.getElementById("data-list");
let outputList = document.getElementById("output");
let weatherButton = document.getElementById("weatherButton");
let weatherOutput = document.getElementById('weatherOutput');
let cardTitle = document.getElementById('cardTitle');



// This is the original map when page loads
let map;
let marker;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 20 },
    zoom: 4,
  });
}

//get query string, used to find the country name in the HTML string
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

// Get the country name from the index.html page
var name = getQueryVariable("name");

//Event listner for DOM content, when the page loads
window.addEventListener("DOMContentLoaded", (event) => {
  console.log(name);
  // uses GET to access the API
  const url = `https://restcountries.eu/rest/v2/name/${name}`;
  get(url).then(function (response) {
    //re-assign the lat/long from response
    countryName.innerHTML = name;
    console.log('The Name is: ', name)
    console.log("The Country Name is:", countryName)
    let titleName = document.getElementById('titleName');
    titleName.innerHTML = "Welcome to " + decodeURI(name) + "!";
    let heroName = document.getElementById('heroName');

    
    
    
    if(name.includes("%20")) {
      heroName.innerHTML = "Welcome to The " + decodeURI(name) + "!";
    } else {
      heroName.innerHTML = "Welcome to " + decodeURI(name) + "!";
    }
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
    const weatherInfo = get(
      `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=e58d1190d081f10a3da11806b105613b&units=imperial`
    );
    weatherInfo.then((response) => {
      console.log(response);
      const capitalWeather = document.getElementById('capitalWeather');
      capitalWeather.innerHTML = "The Weather for " + response.name + ', ' + decodeURI(name) + ':';
      weatherImage.src = `icons/${response.weather[0].icon}.png`;
      let capitalName = response.name;
      let temperature = response.main.temp;
      let feelsLike = response.main.feels_like;
      let humidity = response.main.humidity;
      
      let weatherItem1 = document.createElement("li");
      weatherItem1.classList.add("none");
      weatherItem1.innerHTML = "Temperature is: " + temperature.toFixed() + " ℉	";
      weatherOutput.appendChild(weatherItem1);
      let weatherItem2 = document.createElement("li");
      weatherItem2.classList.add("none");
      weatherItem2.innerHTML = "Temperature feels like is: " + feelsLike.toFixed() + " ℉	";
      weatherOutput.appendChild(weatherItem2);
      let weatherItem3 = document.createElement("li");
      weatherItem3.classList.add("none");
      weatherItem3.innerHTML = "Humidity is: " + humidity + " %";
      weatherOutput.appendChild(weatherItem3);
    });
    // APi query reponse items
    // Name, capital, latlng, currencies.name, languages.name, flag, callingCodes, population, subregion
    var position = {lat: latitude, lng: longitude};
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: 4,
    });
    marker = new google.maps.Marker({position: position, map: map});

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
    newListitem8.innerHTML = "Population: " + Population.toLocaleString();
    newListitem8.classList.add('none');
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

  //On document ready, we will change the background picture of the hero element with image from Pexels
  // titleName.innerHTML
  var api_key = '563492ad6f91700001000001fd27eec53df544ec959a1d51252c000e';
  // What we would like to search Pexels API for
  var search = name;
  // Handling Fringe Cases for Pexel Photos
  if (name == 'United%20States%20of%20America'){
    search  = 'Lincoln'
  }
  if (name == 'Palestine,%20State%20of'){
    search  = ''
  }
  // Using the GET method to pass authorization and obtain url and photogrpaher name from Pexels
  imageSearch (api_key,search);
  
});

function imageSearch (api_key,search) {
 
  $.ajax({
    method: 'GET',
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", api_key);
    },
    url: "https://api.pexels.com/v1/search?query="+search+"&per_page=1&page=1",
    success: function(data){
      heroImg.style.backgroundImage = `url(${data.photos[0].src.landscape})`
      photoName.innerHTML = "Photo by: " + `${data.photos[0].photographer}`
    },
    error: function(error){
      console.log(error)
    },
})

}
// const proxy = 'https://cors-anywhere.herokuapp.com/';
// const getPexel = (name) => {
//   fetch(`${proxy}http://api.pexels.com/v1/${name}`, {
//     headers:{
//       'Authorization': '563492ad6f91700001000001fd27eec53df544ec959a1d51252c000e'
//     }
//   })
//     .then(response => response.json())
//     .then(response => console.log(response))
  
// }
// const temperature = response.main.temp;
// const feelsLike = response.main.feels_like;
// const humidity = repsonse.main.humidity;
// Weather information
// openweather api key = e58d1190d081f10a3da11806b105613b


//Pexel Key
//563492ad6f91700001000001fd27eec53df544ec959a1d51252c000e 
