"use strict";

const searchCountry = document.getElementById("searchCountry");
const matchList = document.getElementById("matchList");
const submitButton = document.getElementById("submitButton");


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
//Assigns an event listener to each match, if match is clicked it assigns the value to the input value
const clickedMatch = (matches) => {
  const matchArray = document.querySelectorAll("#suggestMatch");
  matchArray.forEach(function (suggestMatch) {
    suggestMatch.addEventListener("click", function (event) {
      event.preventDefault();
      searchCountry.value = suggestMatch.innerHTML;
      matchList.classList.toggle("hide");  //Ryan Add to hide search box
    });
    searchCountry.addEventListener("keydown", function(event) {  //Ryan Reopen search list on backspace
      if (event.key === "Backspace" || event.key === "Delete") {
        matchList.classList.remove("hide");
      }
    });
    searchCountry.addEventListener("click", function(event) {  //Ryan Reopen search list on backspace
      matchList.classList.remove("hide");
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



// Add event listener to the Submit button, when clicked it opens mappage.html and submits a query to the html string
submitButton.addEventListener('click', function (event) {
  event.preventDefault();
  var name = searchCountry.value;
  window.open("mappage.html?name=" + encodeURI(name), name, "width=1920, height=1080, top=0, screenX=0, screenY=0");
});


// submitButton.addEventListener("click", function (event) {
//   event.preventDefault();
//   let name = searchCountry.value;
//   let countryName = document.getElementById("countryName");
//   let dataList = document.getElementById("data-list");
//   let outputList = document.getElementById("output");

//   // uses GET to access the API
//   const url = `https://restcountries.eu/rest/v2/name/${name}`;
//   get(url).then(function (response) {
//     //re-assign the lat/long from response
    
//     let latitude = response[0].latlng[0];

//     let longitude = response[0].latlng[1];
//     let capital = response[0].capital;
//     console.log("The capitol is: ", capital);
//     let currency = response[0].currencies[0].name;
//     console.log("The currency is: ", currency);
//     let language = response[0].languages[0].name;
//     console.log("The language is: ", language);
//     let callingCode = response[0].callingCodes;
//     console.log("callingCode: ", callingCode);
//     let Population = response[0].population;
//     console.log("Population: ", Population);
//     let Subregion = response[0].subregion;
//     console.log("Subregion: ", Subregion);
//     let flagId = document.getElementById("flag");
//     flagId.src = response[0].flag;

//     // Creating new map off of API query
//     // APi query response items
//     // Name, capital, latlng, currencies.name, languages.name, flag, callingCodes, population, subregion
//     map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: latitude, lng: longitude },
//       zoom: 4,
//     });

//     // DOM Manipulation
//     // Latitude
//     const newListitem1 = document.createElement("li");
//     newListitem1.innerHTML = "Latitude: " + latitude;
//     outputList.appendChild(newListitem1);
//     // Longitude
//     const newListitem6 = document.createElement("li");
//     newListitem6.innerHTML = "Longtitude: " + longitude;
//     outputList.appendChild(newListitem6);
//     // Calling Code
//     const newListitem7 = document.createElement("li");
//     newListitem7.innerHTML = "Calling code: " + callingCode;
//     outputList.appendChild(newListitem7);
//     // Population
//     const newListitem8 = document.createElement("li");
//     newListitem8.innerHTML = "Population: " + Population;
//     outputList.appendChild(newListitem8);
//     // Subregion
//     const newListitem9 = document.createElement("li");
//     newListitem9.innerHTML = "Sub-region: " + Subregion;
//     outputList.appendChild(newListitem9);
//     // Capital
//     const newListitem2 = document.createElement("li");
//     newListitem2.innerHTML = "Capital: " + capital;
//     outputList.appendChild(newListitem2);
//     // currency
//     const newListitem3 = document.createElement("li");
//     newListitem3.innerHTML = "Currency: " + currency;
//     outputList.appendChild(newListitem3);
//     // language
//     const newListitem4 = document.createElement("li");
//     newListitem4.innerHTML = "Language: " + language;
//     outputList.appendChild(newListitem4);
//   });
// });

console.log("Awesomeness Loaded!!!!!")
console.log("Designed by Team H-Town!")
console.log("See About Us!")


