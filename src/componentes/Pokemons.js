import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';
import { getPokemons, getInfoPokemons } from '../api';
// import { favPokemonsProvider, useFavsPokemons } from '../Context/FavContext';

const Pokemons = (props) => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [pagesTotal, setpagesTotal] = useState(0);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [pokemonsForPage, setPokemonsForPage] = useState(12);

  const searchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(pokemonsForPage, 0);
      const promise = data.results.map(async (pokemon) => {
        return await getInfoPokemons(pokemon.url);
      });
      const results = await Promise.all(promise);
      setPokemons(results);
      setLoading(false);
      setpagesTotal(Math.ceil(data.count / pokemonsForPage));
      setNotFound(false);
    } catch (e) {
      console.log(e);
    }
  };

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

  useEffect(() => {
    if (!searching) {
      searchPokemons();
    }
  }, [page]);

  return (
    <div className="pokemon-container">
      <div className="list-container">
        <div className="pokemons-list">
          {pokemons.map((pokemon) => (
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
