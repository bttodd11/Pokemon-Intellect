let pokeAPIUrl = "https://pokeapi.co/api/v2/";
let originalPokemonData;


export async function fetchAllPokemon(){

    // Fetching all the Pokemon
    let fetchUrl = pokeAPIUrl + "pokemon?limit=251&offset=0";

    const response = await fetch(fetchUrl);
	const data = await response.json();
    originalPokemonData = data;}

export function fetchAllPokemonNames(gen){

    let gen1PokemonNames = [];
    let gen2PokemonNames = [];
    console.log(gen)
    if (gen == 1) {
      // Generation 1 names;
      for (let index = 0; index < 151; index++) {
        gen1PokemonNames.push(originalPokemonData.results[index].name);
      }
      console.log(gen1PokemonNames)
      return gen1PokemonNames;
    }

    if (gen == 2) {
      // Generation 1 names;
      for (let index = 152; index < 252; index++) {
        gen2PokemonNames.push(originalPokemonData.results[index].name);
      }
      console.log(gen2PokemonNames)
      return gen2PokemonNames
    }


}

