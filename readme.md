## Project title

Global Snake 

## Description

Global Snake is a website used to find interesting information  about any country you want to travel to. The site will show weather information about the capital, satellite maps of the country, type of currency, population, and much more.

## Motivation

Information about countries you would like to travel to and the ability to learn about countries you did not know existed.

## Challenges and Solutions
Multiple API Calling
- Challenge: Taking multiple API's and returning the data to the DOM through one event listener.
- Solution: Using Object Oriented Programming to store the API GET in an object and iterating off of that object.

List UI
- Challenge: In order to improve the UI/UX of the site we needed a way to guide user's toward searching for countries included only within the API response.
- Solution: We implemented a match list that populates with suggested matches, by searching for common characters between the search string and the API response array.

Error Handling on Search Box
- Challenge: We wanted to prevent the user from searching a text entry that was not in our country API.
- Solution: We achieved this by creating a API call on the search button click that took the text in the search box, capitalized it, then took the API country data, capitalized it, and finally filtered the API data list to compare if the user text input matched our API country data.  If it did, it allowed the search and passed the entry to the next page for the search.  If it did not, it triggered a browser alert to ask for a "Country". 

Bootstrap Framework
- Challenge: We needed to build a site with responsive design and needed to set it up quickly.  Using Bootstrap created many challenges with pre-loaded CSS that we needed to overcome.
- Solution: We built the site off of the Bootstrap 4 framework.  This allowed us to have a responsive designed site within a few hours.  We used the Bootstrap Docs to learn the correct CSS classes to use.  We also needed to override some of the Bootstrap defaults, which we were able to do in custom CSS.

Multiple Custom Pages
- Challenge: We quickly decided that we needed to create multiple pages.  So we needed to
    1. Pass data from the search box to a second search data display page
    2. Have custom styling and JavaScript for these separate pages.
-  Solution:
    1. Using an event listner on the Submit button, we were able to open a new page in the same window and pass the country name to the HTML string.  When retrieving the country name on the Map page, we were able to query the HTML string for the country name 
    2. We created page specific CSS and JS files to handle this challenge.  This allowed the pages to load faster and not have unused code for that page.
      
Branding
- Challenge: Coming up with a logo and overall feel of page.
- Solution: After finding inspiration, using Illustrator to create logo and then pulling the color scheme for the web page.



## Screenshots

![Screenshot](https://github.com/rynoschni/teamHTownProject/ReadMe-Screenshots/Index.png)
![Screenshot](https://github.com/rynoschni/teamHTownProject/ReadMe-Screenshots/Country-Page.png)
![Screenshot](https://github.com/rynoschni/teamHTownProject/ReadMe-Screenshots/Country-Page-2.png)
![Screenshot](https://github.com/rynoschni/teamHTownProject/ReadMe-Screenshots/Modal.png)
![Screenshot](https://github.com/rynoschni/teamHTownProject/ReadMe-Screenshots/About-us.png)
![Screenshot](https://github.com/rynoschni/teamHTownProject/ReadMe-Screenshots/Error-Handling.png)
​![Screenshot](https://github.com/rynoschni/teamHTownProject/ReadMe-Screenshots/Toast-Message.png)
​
<b>Built with</b>

- [Bootstrap](https://getbootstrap.com/)
​
## Features

Choose any country and find information about that country.
Search any random country on the planet and find information.

​
## Installation

Clone Repository from https://github.com/rynoschni/teamHTownProject and run on your local machine.
OR --
Netlify deployment page - https://global-snake.netlify.app/
​
## API Reference

​REST Countries API - https://restcountries.eu/
Google Maps Javascript API - https://developers.google.com/maps/documentation/javascript/overview
Open Weather Map API - https://openweathermap.org/api
Pexels Image API - https://www.pexels.com/api
​
## How to use?

Starting from the homepage, the user is presented with two different options to begin discovering new countries. The first option is to use the input search box to find a specific country; this will redirect the user to a new page (Map page) and provide information relevant to the country they are searching. The second option available on the homepage is to search for a random country, this can be achieved by clicking the 'Search Random Country' button. 

An additional capability is for the user to select random countries from the Map page after searching for a country, and continue the journey of learning about new countries. Additional tabs located in the top of the website assist the user with navigation through the different pages, including the About Us page.
​
## Credits

Jai Gokhale - https://www.linkedin.com/in/jai-gokhale-81827747/

Luke Brazil - https://www.linkedin.com/in/luke-brazil-0506b71b0/

​Ryan Schniederjan - https://www.linkedin.com/in/ryan-schniederjan/

Tait Loughridge - https://www.linkedin.com/in/tait-loughridge-6a6026134/
