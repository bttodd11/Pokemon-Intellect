import React, { useState, useEffect } from "react";
import {
  fetchAllPokemon,
  fetchAllPokemonNames,
} from "./utilities/fetchPokemon";
import { pokemonGrid } from "../src/components/pokemonGrid";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
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

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  let matchedValues = (pokemon, value) => {
    if (value.length < 3) {
      return;
    } else {
      return pokemon.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }
  };

  const menuStyle = {
    borderRadius: "15px",
    boxShadow: "0 2px 4px rgb(148 163 184)",
    background: "rgb(148 163 184);",
    padding: "10px",
    fontSize: "16px",
    overflow: "auto",
    color: "rgb(148 163 184)",
    width: "80%",
    height: "90%", // TODO: don't cheat, let it flow to the bottom,
  };

  useEffect(() => {
    pokemonNames();
  }, [pokemonList.length > 0]);

  return (
    <div className="">
      {pokemonList.length !== 0 ? (
        <body className="appBackground">
          {/* This will be the homepage with the search bar and button */}
          <div className="container">
            <h1 className="font-mono text-center tracking-widest text-6xl text-slate-200">
              Pokemon Intellect
            </h1>
            <p className="font-mono text-center tracking-tighter text-2xl text-slate-500/25 mt-5">
              Creating universal knowledge of Pokemon species.{" "}
            </p>
            {/* Here I want to create a different grid layout */}
            <div class="grid grid-rows-3 grid-flow-col gap-4 mt-12 ">
              <div className="panelBackGround relative text-center row-span-3 border-solid border-2 h-80">
                <h3 className="font-mono text-xl mt-3 mb-20 text-white">Select Pokemon</h3>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-slate-300  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                      Version
                      <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-16 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1 px-2">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-1 py-1 text-sm'
                              )}
                            >
                              V1
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-1 py-1 text-sm'
                              )}
                            >
                              V2
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <Autocomplete
                  items={pokemonList}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  shouldItemRender={matchedValues}
                  getItemValue={(pokemon) => pokemon}
                  renderItem={(pokemon, isHighlighted, value) => (
                    <div
                    className="text-slate-400"
                      key={pokemon}
                      style={{ background: isHighlighted ? "rgb(248 250 252)" : "white" }}
                    >
                      {pokemon}
                    </div>
                  )}
                  inputProps={{ style: menuStyle }}
                  onSelect={(pokemon) => setValue(pokemon)}
                />
                <div className="absolute bottom-1 left-5 w-full panel">
                  <button className="w-32 bg-white hover:bg-blue-400 text-slate-300 text-sm font-bold rounded px-6 py-2">
                    Select
                  </button>
                </div>
              </div>
              <div className="panelBackGround col-span-2 border-solid border-2 h-40">2</div>
              <div className="panelBackGround col-span-2 border-solid border-2 h-40">2</div>
            </div>
          </div>
        </body>
      ) : null}
    </div>
  );
};

export default App;
