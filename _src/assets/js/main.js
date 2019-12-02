'use strict';


/* estructura array del servidor 
shows[]
    showsItem{}
            show{}
            show.name
            show.image
*/



//Array donde volcamos las series

let shows = [];



//funcion para pintar series

function paintShows() {
  const searchResult = document.querySelector('.show-result__list');
  let htmlCode = '';
  let showImage = '';
  //guardo en constantes el nombre
  const showName = showsItem.show.name;



  //tengo que recorrer el array shows
  for (const showsItem of shows) {

    if (showsItem.show.image.medium) {

    }


    htmlCode += `<li>`;
    htmlCode += `<button><img src="${showImage}"/><h3>${showName}</h3></button>`;
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
      console.log(serverData);
      paintShows();
    })
    .catch(function (err) {
      console.log('error', err);
    });
}


//INIT
//listener del servidor

const searchButton = document.querySelector(".search-form__button");
searchButton.addEventListener('click', getServerData);
