import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import Pagination from './Pagination';
import Pokemons from './Pokemons';
import Footer from './Footer';
import {
  getPokemons,
  getInfoPokemons,
  getSearchInfoPokemons,
  getFavInfoPokemons
} from '../api';
import { Ring } from 'react-spinners-css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesTotal, setpagesTotal] = useState(0);
  const [searching, setSearching] = useState(false);
  const [loadFavorites, setLoadFavorites] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [pokemonsForPage, setPokemonsForPage] = useState(12);
  const [favs, setFavs] = useState(0);
  // const [searchFavs, setSearchFavs] = useState(true);

  useEffect(() => {
    changeFavs();
  }, []);

  useEffect(() => {
    if (!searching && !loadFavorites) {
      loadPokemons();
    }
  }, [page]);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(
        pokemonsForPage,
        (page - 1) * pokemonsForPage
      );
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

  const SearchPokemon = async (name) => {
    try {
      if (name === null || name === undefined) return loadPokemons();
      setLoading(true);
      setNotFound(false);
      setSearching(true);
      const data = await getSearchInfoPokemons(name);
      if (!data) {
        setNotFound(true);
        setLoading(false);
        return;
      } else {
        setPokemons([data]);
        setpagesTotal(1);
        setPage(1);
        setNotFound(false);
      }
      setSearching(false);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  // const FavoritesPokemons = async () => {
  //   try {
  //     setLoading(true);
  //     if (favs.length > 1) {
  //       const promise = favs.results.map(async (id) => {
  //         return await getFavInfoPokemons(id);
  //       });
  //       const results = await Promise.all(promise);
  //       setPokemons(results);
  //       setLoading(false);
  //       setpagesTotal(Math.ceil(favs.length / pokemonsForPage));
  //       setNotFound(false);
  //       setSearchFavs(true);
  //     } else if (favs.length === 1) {
  //       const data = await getFavInfoPokemons(favs[0]);
  //       setPokemons([data]);
  //       setLoading(false);
  //       setpagesTotal(1);
  //       setNotFound(false);
  //       setSearchFavs(true);
  //     } else {
  //       setSearchFavs(false);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const changeFavs = () => {
    const listfavs = JSON.parse(window.localStorage.getItem('fav')) || [];

    setFavs(listfavs.length);
  };

  const LastPage = async () => {
    if (page === pagesTotal) return;
    setPage(pagesTotal);
  };

  const NextPage = async () => {
    if (page === pagesTotal) return;
    setPage(page + 1);
  };

  const FirstPage = async () => {
    if (page === 1) return;
    setPage(1);
  };

  const PreviousPage = async () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  // const ChangePokemonsPages = (cant) => {
  //   console.log(cant)
  //   setPokemonsForPage(cant);
  //   loadPokemons();
  // };

  return (
    <div className="App">
      <NavBar favs={favs} SearchPokemon={SearchPokemon} />
      <Pagination
        onLeftClick={PreviousPage}
        onRightClick={NextPage}
        firstPage={FirstPage}
        lastPage={LastPage}
        // ChangePokemonsPages={ChangePokemonsPages}
        page={page}
        totalPages={pagesTotal}
      />
      {loading ? (
        <div className="loading">
          <Ring />
        </div>
      ) : (
        <Pokemons changeFavs={changeFavs} pokemons={pokemons} />
      )}

      <Footer />
    </div>
  );
}

export default App;
