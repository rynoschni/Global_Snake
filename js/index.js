"use strict";
// Targeting the search box value  on index.html
const searchCountry = document.getElementById("searchCountry");
//creates the matchList that we populate seach box
const matchList = document.getElementById("matchList");
//create the random search button
const randomCountryButton = document.getElementById("randomCountry");

// Add event listner to the Submit button
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  //create submit button
  const submitButton = document.getElementById("submitButton");
  //creates the ability to open search in new window on click
  var windowFeatures = "menubar=yes, width=1920, height=1080, top=0, screenX=0, screenY=0"
  var name = searchCountry.value;
  // const url = `https://restcountries.eu/rest/v2/all?fields=name`;
  // get(url).then(function (response) {
  //   //Assigning the JSON response as an array
  //   const states = response;
  //   const capName = name.charAt(0).toUpperCase() + name.slice(1);
  //   console.log('This is name:',capName);
  //   const isMatch = 0
  //   let result = states.filter((state) => {
  //     if (capName == state){
  //       isMatch = 1;
  //     }
  //   });
  //   console.log("This is the filter result:", isMatch);
  // });
  // sends the search country name to the API and opens a new page
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

// Button event that fires a random country to populate Mappage.html
randomCountryButton.addEventListener("click", function (event) {
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

//Random Toast Messages

document.addEventListener('DOMContentLoaded', (e) => {
  const myToast = document.getElementById('myToast');
  const myToastBody = document.getElementById('myToastBody');
  let toastMessages = ["Snake Jodgel just found his hiding spot in Kazakhstan! ", "Yelrac Zil defeats Snake Jodgel and found a vacation spot in Belize!", "Ron Sheid found his practice location to test his special slap in Iceland!", "DigitalNomad escaped the Hurricane in Canada!"," PsycoGoat Var jumped the fence in Ireland!", "Cave Dolon got a Corona and two Hurricanes for $20.20 in Mexico!"]
  
  setInterval(() =>{
    let randomMessage = toastMessages[Math.floor(Math.random() * toastMessages.length)];
    let myToastRandom = randomMessage;
    myToastBody.innerHTML = myToastRandom;
  $(myToast).toast({
    delay: 8000
  });
  $(myToast).toast('show');
  }, 10000);
});

console.log("Global Snake Awesomeness Loaded!!!!!")
console.log("Designed by Team H-Town!")
console.log("See About Us!")
