"use strict";
// Targeting the search box value  on index.html
const searchCountry = document.getElementById("searchCountry");
const submitButton = document.getElementById("submitButton");
const matchList = document.getElementById("matchList");

// Add event listner to the Submit button
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var windowFeatures = "menubar=yes, width=1920, height=1080, top=0, screenX=0, screenY=0"
  var name = searchCountry.value;
  if (name != "") {
    var windowFeatures =
      "menubar=yes, width=1920, height=1080, top=0, screenX=0, screenY=0";
    window.name = "main";
    window.open("mappage.html?name=" + encodeURI(name), "main", windowFeatures);
  } else {
    alert("Please enter a country");
  }
});

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
      matchList.classList.toggle("hide");
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

console.log("Global Snake Awesomeness Loaded!!!!!")
console.log("Designed by Team H-Town!")
console.log("See About Us!")
