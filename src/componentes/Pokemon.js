import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

const Pokemon = (props) => {
  const { pokemon } = props;
  const [pokemonFav, setPokemonFav] = useState(false);

  useEffect(() => {
    compFav(pokemon.id);
  }, [pokemonFav]);

  const compFav = (id) => {
    const pokemonsFavs = JSON.parse(window.localStorage.getItem('fav')) || [];

    const fav = pokemonsFavs.indexOf(id);

    if (fav >= 0) {
      setPokemonFav(true);
    } else {
      setPokemonFav(false);
    }
  };
  // console.log(pokemon.types[0].type.name);

  return (
    <div className="pokemon">
      <img src={pokemon.sprites.front_default} alt="Pokemon Icon" />
      <div className="pokemon-info">
        <div className="top-info">
          <h3>{pokemon.name}</h3>
          <p>#{pokemon.id}</p>
        </div>
        <div className="button-info">
          <div className="types">
            {pokemon.types.map((type) => (
              <p>{type.type.name}</p>
            ))}
          </div>

          <div className={`btn-fav${pokemonFav ? ' fav-pokemon' : ''}`}>
            <FaHeart
              onClick={() => {
                props.addFavoritePokemon(pokemon.id);
                compFav(pokemon.id);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
