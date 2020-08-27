// $(document).ready(function({ title = 'final fantasy vii remake' }) {
//     if (location.search) {
//         title = location.search;
//     }
//     const gameGet = get(`https://api.rawg.io/api/games?search=${title.replace(/\?/g, " ")}`);
//     getTitle(gameGet);
//     getPlatforms(gameGet);
// });
// function getTitle(object) {
//     object.then(info => {
//         const gameName = info.results[0].slug;
//         const titleName = gameName.replace(/-/g, " ");
//         const titleInfo = document.createElement('h1');
//         $(titleInfo).attr("class", "title-game");
//         titleInfo.innerHTML = titleName
//         main.append(titleInfo);
//         getDescription(gameName);
//     });
// }
// function getDescription(title) {
//     const getDescription = get(`https://api.rawg.io/api/games/${title}`);
//     getDescription.then(info => {
//         const gameDescription = info.description
//         const descriptionDiv = document.createElement('div');
//         const gameInfo = document.createElement('p');
//         $(descriptionDiv).attr("class", "description-ctn");
//         gameInfo.innerHTML = gameDescription;
//         descriptionDiv.append(gameInfo);
//         main.append(descriptionDiv);
//     });
//     getImage(title);
// }