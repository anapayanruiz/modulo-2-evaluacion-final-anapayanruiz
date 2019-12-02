'use strict';


/* estructura array del servidor 
shows[]
    showsItem{}
            show{}
            show.name
            show.image{}
                show.image.medium
*/



//Array donde volcamos las series

let shows = [];

let showsFavorites = [];



//funcion para pintar series
function paintShows() {
  const searchResult = document.querySelector('.show-result__list');
  let htmlCode = '';
  console.log(shows);

  //tengo que recorrer el array shows
  for (const showsItem of shows) {
    const showName = showsItem.show.name;
    //aqui guardo la posicion que tiene la serie
    const showIndex = shows.indexOf(showsItem);
    //aqui guardo el id que tiene la serie
    const showId = showsItem.show.id;
    let showImage = '';

    //si no tengo imagen tengo que darle una condicion para que aparezca una imagen por defecto
    if (showsItem.show.image !== null) {
      showImage = showsItem.show.image.medium;

    } else {
      showImage = "https://via.placeholder.com/210x295.png";
    }

    htmlCode += `<li>`;
    htmlCode += `<button class="show-result__button" data-index="${showIndex}" data-id="${showId}">
                    <img class="show-result__image" src="${showImage}"/>
                    <h3 class="show-result__title">${showName}</h3>
                </button>`;
    htmlCode += `</li>`;

  }

  searchResult.innerHTML = htmlCode;


  //listener para selecionar series favoritas
  //dentro de pintar porque inmediatamente va detrás. 
  //pintamos y escuchamos 
  const listElements = document.querySelectorAll('.show-result__button');
  for (const listElement of listElements) {
    listElement.addEventListener('click', handleFavoriteShows);
  }

}


//handle de series favoritas
function handleFavoriteShows(event) {
  showsFavorites.push(event.currentTarget.dataset.id);
  paintFavoriteShows();


  const clickedId = event.currentTarget.dataset.id
  const favoriteIndex = showsFavorites.indexOf(clickedId);
  console.log('selecciono fav id;', clickedId, 'selecciono fav index:', favoriteIndex);
  const isFavorite = favoriteIndex !== -1;

  console.log('Favs:', showsFavorites, 'clicked', clickedId, '¿ES favorito?', isFavorite);




}





//funcion para pintar series favoritas
function paintFavoriteShows() {

  const searchResult = document.querySelector('.show-result__list');
  let htmlCode = '';
  console.log(shows);

  //tengo que recorrer el array shows
  for (const showsItem of shows) {
    const showName = showsItem.show.name;
    //aqui guardo la posicion que tiene la serie
    const showIndex = shows.indexOf(showsItem);
    //aqui guardo el id que tiene la serie
    const showId = showsItem.show.id;
    let showImage = '';

    //si no tengo imagen tengo que darle una condicion para que aparezca una imagen por defecto
    if (showsItem.show.image !== null) {
      showImage = showsItem.show.image.medium;

    } else {
      showImage = "https://via.placeholder.com/210x295.png";
    }

    htmlCode += `<li>`;
    htmlCode += `<button class="show-result__button" data-index="${showIndex}" data-id="${showId}">
                      <img class="show-result__image" src="${showImage}"/>
                      <h3 class="show-result__title">${showName}</h3>
                  </button>`;
    htmlCode += `</li>`;

  }

  searchResult.innerHTML = htmlCode;





}











//aqui llamamos al servidor
function getServerData(event) {
  event.preventDefault();
  const searchInput = document.querySelector(".search-form__input");
  fetch(`http://api.tvmaze.com/search/shows?q=${searchInput.value}`)

    .then(function (response) {
      return response.json();
    })
    .then(function (serverData) {
      //adapto los datos del servidor para usarlos
      shows = serverData;
      paintShows();
      paintFavoriteShows();
    })
    .catch(function (err) {
      console.log('error', err);
    });
}


//INIT
//listener del servidor

const searchButton = document.querySelector(".search-form__button");
searchButton.addEventListener('click', getServerData);
