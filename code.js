// Initialise
getPokemonList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');

//Constants
const pokemonListItems = document.querySelectorAll('.pokemon-item');
const pokemonDataitems = document.querySelectorAll('.pokemon-data');
const pokemonName = document.getElementById('pokemon-name')
const pokemonWeight = document.getElementById('pokemon-weight')
const pokemonExperience = document.getElementById('pokemon-experience')
const pokemonHeight = document.getElementById('pokemon-height')

const previousButton = document.querySelector('.scroll-left');
const nextButton = document.querySelector('.scroll-right');

// Variables

let prevUrl = null;
let nextUrl = null;

// Functions

function getPokemonList(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      prevUrl = data.previous;
      nextUrl = data.next;

      for (let i = 0; i < pokemonListItems.length; i++) {
        const pokemonListItem = pokemonListItems[i];
        const results = data.results[i]
        const stringArray = results.url.split('/')
        pokemonListItem.textContent = stringArray[6] + '.' + capitaliseName(results.name)
      }
    });
};

function capitaliseName(Name) {
  let capitalFirstLetter = String(Name).substring(0, 1).toUpperCase();
  return (capitalFirstLetter + String(Name).slice(1))
}

function getPokemonData(url) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${url}/`)
    .then(res => res.json())
    .then(data => {

      document.getElementById('picfront').innerHTML = `<img src="${data.sprites.front_default}" />`;
      document.getElementById('picback').innerHTML = `<img src="${data.sprites.back_default}" />`;
      pokemonName.textContent = capitaliseName(data.name)
      pokemonWeight.textContent = `Weight: ${data.weight}`
      pokemonExperience.textContent = `Experience: ${data.base_experience}`
      pokemonHeight.textContent = `Height: ${data.height}`

      console.log(data)

    })
}

// Event handlers

const handleLeftButtonClick = () => {
  if (prevUrl) {
    getPokemonList(prevUrl);
  }
};

const handleRightButtonClick = () => {
  if (nextUrl) {
    getPokemonList(nextUrl);
  }
};

const handleListItemClick = (e) => {
  if (!e.target) return;

  const listItem = e.target;
  if (!listItem.textContent) return;

  const id = listItem.textContent.split('.')[0];
  console.log(id)
  getPokemonData(id)
};

previousButton.addEventListener('click', handleLeftButtonClick);
nextButton.addEventListener('click', handleRightButtonClick);

for (const pokemonListItem of pokemonListItems) {
  pokemonListItem.addEventListener('click', handleListItemClick);
}