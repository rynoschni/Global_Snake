"use strict";
const searchCountry = document.getElementById("searchCountry");
const matchList = document.getElementById("matchList");
const submitButton = document.getElementById("submitButton");
// This is the original map when page loads
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 0, lng:20 },
    zoom: 4
  });
}

//Function to access API, filter results and assign value to DOM
const getCountries = (searchText) => {
  // uses GET to access the API
  const url = `https://restcountries.eu/rest/v2/all?fields=name`;
  get(url).then(function (response) {
    //Assigning the JSON response as an array
    const states = response;

    // Get Matches to current text input
    let matches = states.filter((state) => {
      const regex = new RegExp(`^${searchText}`, "gi");
      return state.name.match(regex);
    });
    //clear the matches if there is no text in input box
    if (searchText.length === 0) {
      matches = [];
      matchList.innerHTML = "";
    }
    //display the matches and assign clicked match
    outputHtml(matches);
    //function to assign clicked match to input box
    clickedMatch(matches);
  });
};
//Assigns an event listner to each match, if match is clicked it assigns the value to the input value
const clickedMatch = (matches) => {
  const matchArray = document.querySelectorAll("#suggestMatch");
  matchArray.forEach(function (suggestMatch) {
    suggestMatch.addEventListener("click", function (event) {
      event.preventDefault();
      searchCountry.value = suggestMatch.innerHTML;
    });
  });
};

//Function to display matches under the input box
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
        <div>
            <h4 id= "suggestMatch" >${match.name}</h4>
        </div>
        `
      )
      .join("");
    matchList.innerHTML = html;
  }
};

//Passes content (value) of the input box to the getCountries function
searchCountry.addEventListener("keyup", () =>
  getCountries(searchCountry.value)
);


submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  let name = searchCountry.value;
  // uses GET to access the API
  const url = `https://restcountries.eu/rest/v2/name/${name}`;
  get(url).then(function (response) {
    //re-assign the lat/long from response
    let latitude = response[0].latlng[0];
    let longitude = response[0].latlng[1];
    // Creating new map off of API query
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: latitude, lng:longitude },
        zoom: 4
    });    
    });
});





