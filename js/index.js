"use strict";
// Targeting the search box value  on index.html
const searchCountry = document.getElementById("searchCountry");
const submitButton = document.getElementById("submitButton")

// Add event listner to the Submit button
submitButton.addEventListener('click', function (event) {
  event.preventDefault();
  var name = searchCountry.value;
  window.open("mappage.html?name=" + encodeURI(name), name, "width=1920, height=1080, top=0, screenX=0, screenY=0");
});


// //Assigns an event listener to each match, if match is clicked it assigns the value to the input value
// const clickedMatch = (matches) => {
//   const matchArray = document.querySelectorAll("#suggestMatch");
//   matchArray.forEach(function (suggestMatch) {
//     suggestMatch.addEventListener("click", function (event) {
//       event.preventDefault();
//       searchCountry.value = suggestMatch.innerHTML;
//       matchList.classList.toggle("hide");  //Ryan Add to hide search box
//     });
//     searchCountry.addEventListener("keydown", function(event) {  //Ryan Reopen search list on backspace
//       if (event.key === "Backspace" || event.key === "Delete") {
//         matchList.classList.remove("hide");
//       }
//     });
//     searchCountry.addEventListener("click", function(event) {  //Ryan Reopen search list on backspace
//       matchList.classList.remove("hide");
//     });
//   });
// };

// //Function to display matches under the input box
// const outputHtml = (matches) => {
//   if (matches.length > 0) {
//     const html = matches
//       .map(
//         (match) => `
//         <div>
//             <h4 id= "suggestMatch" >${match.name}</h4>
//         </div>
//         `
//       )
//       .join("");
//     matchList.innerHTML = html;
//   }
// };