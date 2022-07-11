var pokedex = {};

async function getPokemon(num) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

  let res = await fetch(url);
  let pokemon = await res.json();

  let pokemonId = pokemon["id"];
  let pokemonName = pokemon["name"];
  let pokemonType = pokemon["types"][0]["type"]["name"];
  let pokeTypes = [];
  for (let i = 0; i < pokemon["types"].length; i++) {
    pokeTypes.push(pokemon["types"][i]["type"]["name"]);
  }

  let pokemonImg = pokemon["sprites"]["front_default"];

  res = await fetch(pokemon["species"]["url"]);
  let pokemonDesc = await res.json();

  pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"];

  let pokeImg = document.getElementById("pokeimg");
  pokeImg.src = pokemonImg;

  document.getElementById("pokename").innerHTML = pokemonName.toUpperCase();
  document.getElementById("pokemonId").innerHTML = "ID: #" + `${pokemonId}`;
  document.getElementById("pokedesc").innerHTML = pokemonDesc;

  let typeContainer = document.getElementById("type");

  function PokemonTypes() {
    const newSpan = document.createElement("span");
    typeContainer.appendChild(newSpan);

    for (let i = 0; i < pokeTypes.length; i++) {
      document.getElementById("type").innerHTML = pokeTypes
        .join(", ")
        .toUpperCase();
    }
  }

  PokemonTypes();
}

let idx = 1;

window.onload = async function () {
  getPokemon(idx);
};

document.getElementById("next").addEventListener("click", () => {
  if (idx != 151) idx++;
  getPokemon(idx);
});

document.getElementById("previous").addEventListener("click", () => {
  if (idx != 1) idx--;
  getPokemon(idx);
});
