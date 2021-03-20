import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';
import { getPokemons, getInfoPokemons } from '../api';

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [pagesTotal, setpagesTotal] = useState(0);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const searchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons();
      const promise = data.results.map(async (pokemon) => {
        return await getInfoPokemons(pokemon.url);
      });
      const results = await Promise.all(promise);
      setPokemons(results);
      setLoading(false);
      setpagesTotal(Math.ceil(data.count / 15));
      setNotFound(false);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    if (!searching) {
      searchPokemons();
    }
  }, [page]);

  return (
    <div className="pokemon-container">
      <div className="pokemons-list">
        {pokemons.map((pokemon) => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Pokemons;
