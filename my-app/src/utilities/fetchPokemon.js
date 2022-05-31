let pokeAPIUrl = "https://pokeapi.co/api/v2/";
let originalPokemonData;


export async function fetchAllPokemon(){

    // Fetching all the Pokemon
    let fetchUrl = pokeAPIUrl + "pokemon?limit=10000&offset=0";

    const response = await fetch(fetchUrl);
	const data = await response.json();
    originalPokemonData = data;
}

export function fetchAllPokemonNames(){

    let names = [];

    for(let index = 0; index < originalPokemonData.results.length; index++){
        names.push(originalPokemonData.results[index].name)
    }

    return names
}