import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';

const Pokemons = (props) => {
  

  

  const addFavoritePokemon = (id) => {
    let favPokemons = JSON.parse(window.localStorage.getItem('fav')) || [];

    const act = [...favPokemons];

    const fav = act.indexOf(id);
    if (fav >= 0) {
      act.splice(fav, 1);
    } else {
      act.push(id);
    }

    window.localStorage.setItem('fav', JSON.stringify(act));

    props.changeFavs();
  };

  

  return (
    <div className="pokemon-container">
      <div className="list-container">
        <div className="pokemons-list">
          {props.pokemons.map((pokemon) => (
            <Pokemon
              key={pokemon.id}
              pokemon={pokemon}
              addFavoritePokemon={addFavoritePokemon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pokemons;
