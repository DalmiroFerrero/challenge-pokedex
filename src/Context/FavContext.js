import React, { useState, useEffect, useMemo } from 'react';

const favsPokemons = React.createContext();

const localStorageKey = 'favorite_pokemon';

export const favPokemonsProvider = (props) => {
  const [favorites, setFavorites] = useState([]);

  const loadFavoritePokemons = () => {
    const pokemons =
      JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(pokemons);
  };

  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  const updateFavoritePokemons = (name) => {
    const updated = [...favorites];

    const isFavorite = updated.indexOf(name);

    if (isFavorite >= 0) {
      updated.splice(isFavorite, 1);
    } else {
      updated.push(name);
    }
    setFavorites(updated);
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated));
  };

  const value = useMemo(() => {
    return ({
      favorites,
      updateFavoritePokemons
    })
  }, [favorites])

  return <favsPokemons.Provider value={value} {...props} />
};

export const useFavsPokemons = () => {
  const context = React.createContext(favsPokemons);
  if(!context) {
    throw new Error('useFavPokemons debe estar dentro del proveedor favsPokemons');
  }
  return context
}