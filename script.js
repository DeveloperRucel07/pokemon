const url_start = "https://pokeapi.co/api/v2";
const query = "/pokemon";
const urlwithQuery = url_start + query;
let loadNumber = 21;
let offset = 0;
let searchInput = document.getElementById("input_search");
const loadMoreBtn = document.getElementById("loadmore");
const startBtn = document.getElementById("startBtn");
const loading = document.getElementById("loading");
const header = document.getElementById("header");
const mainContain = document.getElementById("main");
const footer = document.getElementById("footer");
const detailPokemonId = document.getElementById("detailPokemonId");
let pokemon_list = document.getElementById("pokemons");

function initiate() {
  showLoading();
  getPokemon(urlwithQuery, offset, loadNumber);
}

function loadingPokemon(url, timeout = 500) {
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
  getPokemon(urlwithQuery, offset, loadNumber);
  offset += loadNumber;
}

function showLoading() {
  mainContain.style.display = "none";
  loading.style.display = "flex";
}

function stopLoading() {
  loading.style.display = "none";
  mainContain.style.display = "block";
}

function hasGoodConnection() {
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn) {
    const slowTypes = ['slow-2g', '2g', '3g'];
    return !slowTypes.includes(conn.effectiveType);
  }
  return true;
}


async function getPokemon(urlwithQuery, offset, loadNumber) {
  if (!hasGoodConnection()) {
    pokemon_list.innerHTML += `<p class="error">⚠️ Your connection is slow or unstable. Please try again later.</p>`;
    loadMoreBtn.setAttribute("disabled", "true");
    return;
  }
  try {
    const response = await fetch(
      `${urlwithQuery}?limit=${loadNumber}&offset=${offset}`
    );
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
      timeoutPromise(500),
    ]);
    if (!detailResponse.ok) {
      throw new Error(`Could not fetch data for ${pokemon.name}`);
    }
    const detailpokemon = await detailResponse.json();
    pokemon_list.innerHTML += templateRenderPokemon(detailpokemon);
  }
}

async function detailPokemonSearch(pokemonsFind) {
  pokemon_list.innerHTML = "";
  const detailedData = await Promise.all(
    pokemonsFind.map((pokemon) =>
      fetch(pokemon.url).then((response) => response.json())
    )
  );
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
  const isNumber = /^\d+$/.test(searchValue);
  const isValidName = searchValue.length >= 3;
  if (!isNumber && !isValidName) {
    showErrorMessage();
    return;
  } else {
    showLoading();
    try {
      tryToFindPokemon(searchValue);
    } catch (error) {
      pokemon_list.innerHTML = `<p style="color: red;">${error.message}</p>`;
    } finally {
      startBtn.innerHTML = `<a class="btn btn-light text-danger w-25" href="./index.html">Start</a>`;
      loadMoreBtn.classList.add("d-none");
      stopLoading();
    }
  }
}

async function findMatched(value) {
  const listResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10277`
  );
  const listData = await listResponse.json();
  const results = listData.results.filter((pokemon) =>
    pokemon.name.includes(value)
  );
  if (results.length === 0) {
    pokemon_list.innerHTML = `<p class="error">No matching Pokémon found.</p>`;
    return;
  }
  return detailPokemonSearch(results);
}

async function tryToFindPokemon(searchValue) {
  const value = searchValue.toLowerCase().trim();
  showLoading();
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
    if (response.ok) {
      const data = await response.json();
      return detailPokemonSearch([
        { name: data.name, url: `https://pokeapi.co/api/v2/pokemon/${data.id}` },
      ]);
    }else if(response.status === 404){
      await findMatched(value);
    }else {
      throw new Error("Something went wrong fetching Pokemon.");
    }
  } catch (error) {
    pokemon_list.innerHTML=`<p style="color:red;">${error.message}</p>`;
  } finally {
    stopLoading();
  }
}

async function ShowPokemonById(id) {
  const container = document.getElementById("pokemon_list");
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok || response.status === 404) throw new Error("Pokémon not found");
    const detailpokemon = await response.json();
    detailPokemonId.innerHTML = templateRenderDetailPokemon(detailpokemon);
  } catch (error) {
    container.innerHTML = `<p style="color:red;">${error.message}</p>`;
  } finally {
    popupElement();
    stopLoading();
  }
}

function popupElement() {
  document.getElementById("detailPokemonId").classList.add("popup_active");
}

function close_popup(event) {
  document.getElementById("detailPokemonId").classList.toggle("popup_active");
  event.stopPropagation();
}

function stop_event(event) {
  event.stopPropagation();
}

function prev(id, event) {
  let lastId = 10277;
  const newId = id > 1 ? id - 1 : lastId;
  ShowPokemonById(newId);
  event.stopPropagation();
}

function next(id, event) {
  const lastId = 10277;
  const newId = id < lastId ? id + 1 : 1;
  ShowPokemonById(newId);
  event.stopPropagation();
}
