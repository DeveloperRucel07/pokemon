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

function initiate(){
    getPokemon();
}

function fetchWithTimeout(url, timeout = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(
        () =>
          reject(new Error("Page could not be loaded — request timed out.")),
        timeout
      )
    ),
  ]);
}

function showLoading() {
  header.style.display = "none";
  mainContain.style.display = "none";
  footer.style.display = "none";
  loading.style.display = "flex";
}

function stopLoading() {
  loading.style.display = "none";
  header.style.display = "block";
  mainContain.style.display = "block";
  footer.style.display = "block";
}

async function getPokemon() {
  showLoading();
  try {
    const response = await fetchWithTimeout(
      `${urlwithQuery}?limit=${loadNumber}`, 5000
    );
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


async function detailPokemon(pokemons){
    for (const pokemon of pokemons) {
      const detailResponse = await fetchWithTimeout(pokemon.url, 5000);
      if (!detailResponse.ok) {
        console.error(`Could not fetch data for ${pokemon.name}`);
        continue;
      }

      const detailpokemon = await detailResponse.json();

      pokemon_list.innerHTML+= templateRenderPokemon(detailpokemon);
    }
}


function showPopup(id){
    
}

function close_popup(event) {
  popup.classList.toggle("desactive");
  event.stopPropagation();
}