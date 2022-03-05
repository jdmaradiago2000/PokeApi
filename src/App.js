import axios from 'axios';
import { useState, useEffect } from 'react';
import './styles.css'


function App() {

  const [pokemon, setPokemon] = useState ({})
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [isDc, setIsDc] = useState(true)
  const [isHc, setIsHc] = useState(true)
  const [counter, setCounter] = useState(1);
  

    useEffect(() => {
      axios.get (`https://pokeapi.co/api/v2/pokemon/${counter}/`)
        .then(res => {
          setPokemon(res.data);
          setHeight(res.data.height);
          setWeight(res.data.weight);
        }); 
    }, [counter]);

    const convertHeight = () => {
      if(isDc){
        setHeight(height/10)
        setIsDc(false);
      }else{
        setHeight(height*10)
        setIsDc(true);
      }
    }

    const convertWeight = () => {
      if(isHc){
        setWeight(weight/10)
        setIsHc(false);
      }else{
        setWeight(weight*10)
        setIsHc(true);
      }  
    }
    
    return (
      <div className="App">
        <div className="pokemon-card">
          <h1>{pokemon.name?.toUpperCase()}</h1>
          <img src={pokemon.sprites?.other.dream_world.front_default} alt="" />
          <ul>
            <li><b>Weight: </b> {weight} {isHc ? "Hectograms" : "Kilograms"} </li>
            <li><b>Height: </b> {height} {isDc ? "Decimeters" : "Meters"} </li>
            <li><b>Type: </b> {pokemon.types?.[0].type.name} </li>
          </ul>
          <button onClick={convertWeight}>Convert to Kilograms</button>
          <button onClick={convertHeight}>Convert to Meters</button>

          <button onClick={()=> setCounter (counter - 1)}>Back</button>
          <button onClick={()=> setCounter (counter + 1)}>Next</button>
        </div>
    </div>
  );
}

export default App;
