const url_start = "https://pokeapi.co/api/v2";
const query = "/pokemon";
const urlwithQuery = url_start + query;
let loadNumber = 20;
let searchInput = document.getElementById("input_search");
const loadMoreBtn = document.getElementById("loadmore");
const loading = document.getElementById("loading");
const header = document.getElementById("header");
const mainContain = document.getElementById("main");
const footer = document.getElementById("footer");
const popup = document.getElementById("popup");
let pokemon_list = document.getElementById("pokemons");
pokemon_list.innerHTML = "";

function initiate() {
  getPokemon(urlwithQuery, loadNumber);
}

function loadingPokemon(url, timeout = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(url);
    }, timeout);
  });
}



function timeoutPromise(time) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timed out")), time);
  });
}

function loadMore() {
  loadNumber += 20;
  getPokemon(urlwithQuery, loadNumber);
}

function showLoading() {
  mainContain.style.display = "none";
  loading.style.display = "flex";
}

function stopLoading() {
  loading.style.display = "none";
  mainContain.style.display = "block";
}

async function getPokemon(urlwithQuery, loadNumber) {
  showLoading();
  try {
    await Promise.race([
      loadingPokemon(`${urlwithQuery}?limit=${loadNumber}`, 1000),
      timeoutPromise(1000),
    ]);
    const response = await fetch(`${urlwithQuery}?limit=${loadNumber}`);
    if (!response.ok) {
      throw new Error("Pokemons could not be loaded.");
    }
    const data = await response.json();
    const pokemons = data.results;
    detailPokemon(pokemons);
  } catch (error) {
    pokemon_list.innerHTML = `<p style="color: red;">${error.message}</p>`;
  } finally {
    stopLoading();
  }
}

async function detailPokemon(pokemons) {
  for (const pokemon of pokemons) {
    const detailResponse = await Promise.race([
      fetch(pokemon.url),
      timeoutPromise(2000),
    ]);
    if (!detailResponse.ok) {
      console.error(`Could not fetch data for ${pokemon.name}`);
      continue;
    }

    const detailpokemon = await detailResponse.json();

    pokemon_list.innerHTML += templateRenderPokemon(detailpokemon);
  }
}

async function detailPokemonSearch(pokemonsFind) {
  pokemon_list.innerHTML = "";
  const detailedData = await Promise.all(
    pokemonsFind.map((pokemon) => fetch(pokemon.url).then((response) => response.json()))
  );
  console.log(detailedData);
  detailedData.forEach((pokemon) => {
    pokemon_list.innerHTML += templateRenderPokemon(pokemon);
  });
}

function showErrorMessage() {
  const errorMessage = document.getElementById("error");
  errorMessage.classList.toggle("desactive");
  setTimeout(() => {
    errorMessage.classList.toggle("desactive");
    searchInput.value = "";
    stopLoading();
  }, 2000);
}

async function searchPokemon() {
  const searchValue = searchInput.value;
  showLoading();
  if (searchValue.length < 3) {
    showErrorMessage();
  } else {
    try {
      tryToFinePokemon(searchValue);
    } catch (error) {
      pokemon_list.innerHTML = `<p style="color: red;">${error.message}</p>`;
    } finally {
      loadMoreBtn.classList.add("d-none");
      stopLoading();
    }
  }
}

async function tryToFinePokemon(searchValue) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`);
  const data = await response.json();
  const pokemonsFind = data.results.filter((pokemon) =>
    pokemon.name.includes(searchValue.toLowerCase())
  );
  if (pokemonsFind.length === 0) {
    pokemon_list.innerHTML = `<p class="error"> No Matching Pokemon found</p>`;
  }
  return detailPokemonSearch(pokemonsFind);
}

function closeModal(id, event) {
  document.getElementById("Modal"+id).classList.toggle("desactive");
  event.stopPropagation();
}