import React, { useState, useEffect } from "react";
import {
  fetchAllPokemon,
  fetchAllPokemonNames,
} from "./utilities/fetchPokemon";
import { pokemonGrid } from "../src/components/pokemonGrid";
import Autocomplete from "react-autocomplete";
import "./App.css";

let App = () => {
  let [pokemonList, setPokemonList] = useState([]);
  let [currentPokemon, setCurrentPokemon] = useState("");
  let [value, setValue] = useState("");

  const pokemonNames = async () => {
    const pokemon = await fetchAllPokemon();
    setPokemonList(fetchAllPokemonNames(1));
  };

  let matchedValues = (pokemon, value) => {
    if (value.length < 3) {
      return;
    } else {
      return pokemon.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }
  };

  const menuStyle = {
    borderRadius: "15px",
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: "#FBF7F7",
    padding: "10px",
    fontSize: "20px",
    overflow: "auto",
    maxHeight: "10%", // TODO: don't cheat, let it flow to the bottom,
  };

  useEffect(() => {
    pokemonNames();
  }, [pokemonList.length > 0]);

  return (
    <div className="relative">
      {pokemonList.length !== 0 ? (
        <body className="appBackground">
        <div className="container">
          <h1 className="font-mono text-center tracking-widest text-6xl text-blue-700/25">Pokemon Intellect</h1>
          <div className="mt-20 flex justify-center">
            <Autocomplete
              items={pokemonList}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              shouldItemRender={matchedValues}
              getItemValue={(pokemon) => pokemon}
              renderItem={(pokemon, isHighlighted, value) => (
                <div
                  key={pokemon}
                  style={{ background: isHighlighted ? "grey" : "white" }}
                >
                  {pokemon}
                </div>
              )}
              inputProps={{ style: menuStyle }}
              onSelect={(pokemon) => setValue(pokemon)}
            />
          </div>
          <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded absolute bottom-5">Select Pokemon</button>
          </div>
        </div>
        </body>
      ) : null}
    </div>
  );
};

export default App;
