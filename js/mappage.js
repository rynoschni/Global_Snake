"use strict";

// Get the country name from the index.html page
var name = getQueryVariable("name");

// Submit Button Event for another country page load at top of page
anotherRandom.addEventListener("click", function (event) {
  const anotherRandom = document.getElementById('anotherRandom');
  event.preventDefault();
  const randomCountryUrl = `https://restcountries.eu/rest/v2/all?fields=name`;
  get(randomCountryUrl).then(function (response) {
    // Assigning response to array
    let nameArray = response;
    // Taking the array and returning a random country
    let randomCountry = nameArray[Math.floor(Math.random() * nameArray.length)];
    let randomCountryName = randomCountry.name;
    // Taking random country from array and populating Mappage.html with random country
    var windowFeatures =
      "menubar=yes, width=1920, height=1080, top=0, screenX=0, screenY=0";
    var name = randomCountryName;
    if (name != "") {
      var windowFeatures =
        "menubar=yes, width=1920, height=1080, top=0, screenX=0, screenY=0";
      window.name = "main";
      window.open(
        "mappage.html?name=" + encodeURI(name),
        "main",
        windowFeatures
      );
    } else {
      alert("Please enter a country");
    }
  });
});


// This is the original map when page loads
let map;
let marker;
function initMap() {
  // Initializing new google map / center is based of latitude and longitude
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



//Event listner for DOM content, when the page loads
window.addEventListener("DOMContentLoaded", (event) => {
  console.log(name);
  // uses GET to access the API
  const url = `https://restcountries.eu/rest/v2/name/${name}`;
  get(url).then(function (response) {
    //re-assign the lat/long from response
    let countryName = document.querySelectorAll("#countryName");
    countryName.innerHTML = name;
    console.log('The Name is: ', name)
    console.log("The Country Name is:", countryName)
    // Assigning country name to main hero at the top
    let titleName = document.getElementById('titleName');
    titleName.innerHTML = "Welcome to " + decodeURI(name) + "!";
    let heroName = document.getElementById('heroName');

    
    
    // reassigning HTML %20 to normal string space
    if(name.includes("%20")) {
      heroName.innerHTML = "Welcome to The " + decodeURI(name) + "!";
    } else {
      heroName.innerHTML = "Welcome to " + decodeURI(name) + "!";
    }
    // APi query reponse items
    // Name, capital, latlng, currencies.name, languages.name, flag, callingCodes, population, subregion
    // Assigning latitude / longitude / capital city / callingcode / population / subregion / flagID / flagIMG from API response
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

    // GET query from openweather API
    const weatherInfo = get(
      `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=e58d1190d081f10a3da11806b105613b&units=imperial`
    );
    // Assigning repsonse to variable
    // APi query reponse items Temperature, Capital, Temperature Feels like, Humidity
    weatherInfo.then((response) => {
      console.log(response);
      const capitalWeather = document.getElementById('capitalWeather');
      capitalWeather.innerHTML = "The Weather for " + response.name + ', ' + decodeURI(name) + ':';
      weatherImage.src = `icons/${response.weather[0].icon}.png`;
      let weatherOutput = document.getElementById('weatherOutput');
      let capitalName = response.name;
      let temperature = response.main.temp;
      let feelsLike = response.main.feels_like;
      let humidity = response.main.humidity;
      // Appending weather api resonses to list elements
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
    // Creating new map off of API query (coutry)
    // Latitude and Longitude bases on country
    var position = {lat: latitude, lng: longitude};
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: 4,
    });
    marker = new google.maps.Marker({position: position, map: map});

    // DOM Manipulation / Appending RESTcountries API information to DOM
    let outputList = document.getElementById("output");
    let outputList1 = document.getElementById("output1");
    // Latitude
    const newListitem1 = document.createElement("li");
    newListitem1.classList.add('none');
    newListitem1.innerHTML = "Latitude: " + latitude;
    outputList.appendChild(newListitem1);
    // Longtitude
    const newListitem6 = document.createElement("li");
    newListitem6.classList.add('none');
    newListitem6.innerHTML = "Longtitude: " + longitude;
    outputList.appendChild(newListitem6);
    // Calling code
    const newListitem7 = document.createElement("li");
    newListitem7.classList.add('none');
    newListitem7.innerHTML = "Calling code: " + callingCode;
    outputList.appendChild(newListitem7);
    // Population
    const newListitem8 = document.createElement("li");
    newListitem8.innerHTML = "Population: " + Population.toLocaleString();
    newListitem8.classList.add('none');
    outputList.appendChild(newListitem8);
    // Sub-region
    const newListitem9 = document.createElement("li");
    newListitem9.classList.add('none');
    newListitem9.innerHTML = "Sub-region: " + Subregion;
    outputList.appendChild(newListitem9);
    // Capital
    const newListitem2 = document.createElement("li");
    newListitem2.classList.add('none');
    newListitem2.innerHTML = "Capital: " + capital;
    outputList1.appendChild(newListitem2);
    // Currency
    const newListitem3 = document.createElement("li");
    newListitem3.classList.add('none');
    newListitem3.innerHTML = "Currency: " + currency;
    outputList1.appendChild(newListitem3);
    // Language
    const newListitem4 = document.createElement("li");
    newListitem4.classList.add('none');
    newListitem4.innerHTML = "Language: " + language;
    outputList1.appendChild(newListitem4);
    //Wiki link for more information on country
    const newListitem10 = document.createElement("a");
    newListitem10.classList.add('snakeColor');
    newListitem10.innerHTML = "Search for " + decodeURI(name)+" on Wikipedia";
    newListitem10.href = "https://en.wikipedia.org/wiki/" + name;
    newListitem10.target = "_blank"
    outputList1.appendChild(newListitem10);

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
  if (name == 'Tuvalu'){
    search  = 'island'
  }
  if (name == 'Saint%20Helena,%20Ascension%20and%20Tristan%20da%20Cunha'){
    search  = 'island'
  }
  if (name == 'Palau'){
    search  = 'island'
  }
  if (name == 'Virgin%20Islands%20(British)'){
    search  = 'island'
  }
  if (name == 'Mauritania'){
    search  = 'desert'
  }
  if (name == 'Chad'){
    search  = 'jungle'
  }
  if (name == 'South%20Sudan'){
    search  = 'jungle'
  }
  if (name == 'Liberia'){
    search  = 'lion'
  }
  if (name == 'French%20Southern%20Territories'){
    search  = 'island'
  }
  if (name == 'Mayotte'){
    search  = 'lemur'
  }
  if (name == 'Guadeloupe'){
    search  = 'island'
  }
  if (name == 'Zimbabwe'){
    search  = 'zebra'
  }
  if (name == 'Swaziland'){
    search  = 'giraffe'
  }
  if (name == 'Anguilla'){
    search  = 'coastal'
  }
  if (name == "Lao%20People's%20Democratic%20Republic"){
    search  = 'island'
  }
  if (name == "Kyrgyzstan"){
    search  = 'baltic'
  }
  if (name == "Tonga"){
    search  = 'coastal'
  }
  
  
  // Using the GET method to pass authorization and obtain url and photogrpaher name from Pexels
  imageSearch (api_key,search);
  
});
// Pexel API image search to append to main Hero at the top of Mappage.html
function imageSearch (api_key,search) {
//  AJAX reqest for pexel API
  $.ajax({
    method: 'GET',
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", api_key);
    },
    url: "https://api.pexels.com/v1/search?query="+search+"&per_page=1&page=1",
    success: function(data){
      const photoName = document.getElementById("photoName");
      const heroImg = document.getElementById("heroImg");
      heroImg.style.backgroundImage = `url(${data.photos[0].src.landscape})`
      photoName.innerHTML = "Photo by: " + `${data.photos[0].photographer}`
    },
    error: function(error){
      console.log(error)
    },
})

}