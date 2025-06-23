const url = "https://pokeapi.co/api/v2";
const query = "/pokemon";
const urlwithQuery = url + query;
let loadNumber = 20;

const loading = document.getElementById("loading");
const header = document.getElementById("header");
const mainContain = document.getElementById("main");
const footer = document.getElementById("footer");
const popup = document.getElementById("popup");
const pokemon_list = document.getElementById("pokemons");
pokemon_list.innerHTML = "";

function initiate() {
  getPokemon();
}

function loadingPokemon(url, timeout = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(url);
    }, timeout);
  });
}

function loadMore(){
  loadNumber += 20;
  getPokemon();
}

function timeoutPromise(time) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timed out")), time);
  });
}

function showLoading() {
  mainContain.style.display = "none";
  loading.style.display = "flex";
}

function stopLoading() {
  loading.style.display = "none";
  mainContain.style.display = "block";
}

async function getPokemon() {
  showLoading();
  try {
    await Promise.race([
      loadingPokemon(`${urlwithQuery}?limit=${loadNumber}`, 500),
      timeoutPromise(500),
    ]);
    const response = await fetch(`${urlwithQuery}?limit=${loadNumber}`);
    if (!response.ok) {
      throw new Error("Pokemon list not found.");
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
      timeoutPromise(3000),
    ]);
    if (!detailResponse.ok) {
      console.error(`Could not fetch data for ${pokemon.name}`);
      continue;
    }

    const detailpokemon = await detailResponse.json();

    pokemon_list.innerHTML += templateRenderPokemon(detailpokemon);
  }
}
