"use strict";

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

//-----PAINT SHOWS----//

//funcion para pintar series
function paintShows() {
  const searchResult = document.querySelector(".show-result__list");
  let htmlCode = "";

  //tengo que recorrer el array shows
  for (const showsItem of shows) {
    const showName = showsItem.show.name;
    //aqui guardo la posicion que tiene la serie
    const showIndex = shows.indexOf(showsItem);
    //aqui guardo el id que tiene la serie para más adelante saber si tengo ese
    //id en el array
    const showId = showsItem.show.id;

    let showImage = "";

    //si no tengo imagen tengo que darle una condicion para que aparezca una imagen por defecto
    if (showsItem.show.image !== null) {
      showImage = showsItem.show.image.medium;
    } else {
      showImage = "https://via.placeholder.com/210x295.png";
    }

    htmlCode += `
    <li class="show-result__showItem">
        <button class="show-result__button" data-index="${showIndex}" data-id="${showId}">
          <img class="show-result__image" src="${showImage}"/>
          <h3 class="show-result__title">${showName}</h3>
        </button>
      </li>`;
  }

  searchResult.innerHTML = htmlCode;

  //-----LISTEN SELECT FAV----//

  //listener para selecionar series favoritas dentro de series
  //dentro de pintar porque inmediatamente va detrás.
  //pintamos y escuchamos
  const listElements = document.querySelectorAll(".show-result__button");
  for (const listElement of listElements) {
    listElement.addEventListener("click", selectFavoriteShows);
  }
}

//-----SELECT FAV----//

//handle: selecciono dentro de las series la favorita
function selectFavoriteShows(event) {
  //meto aqui el index que seleciono y se lo meto al array shows
  //y lo guardo en una constante que es un objeto, y este es el que
  //voy a pushear
  const index = event.currentTarget.dataset.index;
  const showSelected = shows[index];
  const favoriteIndex = showsFavorites.indexOf(showSelected);
  const isFavorite = favoriteIndex === -1;

  //comprobar que el elemento no está en favoritos
  const id = event.currentTarget.dataset.id;
  console.log("este es el id del objeto selecionado:", id);
  console.log(showsFavorites.includes(showSelected));

  if (isFavorite) {
    showsFavorites.push(showSelected);
  } else {
    showsFavorites.splice(favoriteIndex, 1);
  }
  setLocalStorage();
  paintFavoriteShows();
}

//-----PAINT FAV----//

//funcion para pintar series favoritas
function paintFavoriteShows() {
  const searchResultFavorites = document.querySelector(
    ".show-result__list--favorites"
  );
  let htmlCode = "";

  //tengo que recorrer el array shows
  for (const showsFavorite of showsFavorites) {
    const showFavName = showsFavorite.show.name;
    //aqui guardo la posicion que tiene la serie
    const showFavIndex = showsFavorites.indexOf(showsFavorite);
    let showFavImage = "";

    //si no tengo imagen tengo que darle una condicion para que aparezca una imagen por defecto
    if (showsFavorite.show.image !== null) {
      showFavImage = showsFavorite.show.image.medium;
    } else {
      showFavImage = "https://via.placeholder.com/210x295.png";
    }

    htmlCode += `
    <li class="show-result__showItem">
        <img class="show-result__image" src="${showFavImage}"/>
        <h3 class="show-result__title">${showFavName}</h3>
        <button class="favorites__button" data-index="${showFavIndex}">Eliminar</button>
    </li>`;
  }

  searchResultFavorites.innerHTML = htmlCode;

  //-----LISTEN REMOVE FAV----//

  //listener para borrar series favoritas dentro de series
  //dentro de pintar porque inmediatamente va detrás.
  //pintamos y escuchamos

  const listRemoveElements = document.querySelectorAll(".favorites__button");
  for (const listRemoveElement of listRemoveElements) {
    listRemoveElement.addEventListener("click", handleRemoveClick);
  }
}

//-----REMOVE FAV----//

//funcion para borrar serie favorita
function handleRemoveClick() {
  const index = event.currentTarget.dataset.index;
  showsFavorites.splice(index, 1);
  setLocalStorage();
  paintFavoriteShows();
}

//-----LOCAL STORAGE----//

//aqui guardamos en el localStorage

function setLocalStorage() {
  localStorage.setItem("shows", JSON.stringify(showsFavorites));
}

//aqui cogemos los datos del localStorage

function getLocalStorage() {
  const localStorageFavShows = JSON.parse(
    localStorage.getItem("showsFavorites")
  );

  if (localStorageFavShows !== null) {
    showsFavorites = localStorageFavShows;
    paintShows();
  }
}

//-----LLAMADA AL SERVIDOR----//

//aqui llamamos al servidor
function getServerData(event) {
  event.preventDefault();
  const searchInput = document.querySelector(".search-form__input");
  fetch(`http://api.tvmaze.com/search/shows?q=${searchInput.value}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(serverData) {
      //adapto los datos del servidor para usarlos
      shows = serverData;
      paintShows();
    })
    .catch(function(err) {
      console.log("error", err);
    });
}

//INIT
//listener del servidor

const searchButton = document.querySelector(".search-form__button");
searchButton.addEventListener("click", getServerData);
