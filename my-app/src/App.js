import { fetchAllPokemon, fetchAllPokemonNames }  from './utilities/fetchPokemon';
import './App.css';

let App = () => {

  const pokemonNames = async() => {
    
    const pokemon = await fetchAllPokemon()

    let names = fetchAllPokemonNames();

    console.log(names)
    

  }
  
  pokemonNames()



  return (
    <div className="App">
    </div>
  );
}

export default App;
