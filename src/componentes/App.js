import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import Pagination from './Pagination';
import Pokemons from './Pokemons';
import { getPokemons, getInfoPokemons } from '../api';
import { Ring } from 'react-spinners-css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesTotal, setpagesTotal] = useState(0);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [pokemonsForPage, setPokemonsForPage] = useState(12);
  const [favs, setFavs] = useState(0);

  useEffect(() => {
    loadPokemons();
    changeFavs();
  }, []);

  // useEffect(() => {
  //   if (!searching) {
  //     loadPokemons();
  //   }
  // }, [page]);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      console.log(pokemonsForPage)
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

  const changeFavs = () => {
    const listfavs = JSON.parse(window.localStorage.getItem('fav')) || [];

    setFavs(listfavs.length);
  };

  const LastPage = async () => {
    setLoading(true);
    const data = await getPokemons(
      pokemonsForPage,
      pokemonsForPage * pagesTotal - pokemonsForPage
    );
    const promise = data.results.map(async (pokemon) => {
      return await getInfoPokemons(pokemon.url);
    });
    const results = await Promise.all(promise);
    setPokemons(results);
    setLoading(false);
    setPage(pagesTotal);
  };

  const NextPage = async () => {
    setLoading(true);
    const data = await getPokemons(pokemonsForPage, pokemonsForPage * page);
    const promise = data.results.map(async (pokemon) => {
      return await getInfoPokemons(pokemon.url);
    });
    const results = await Promise.all(promise);
    setPokemons(results);
    setLoading(false);
    setPage(page + 1);
  };

  const FirstPage = async () => {
    if (page === 1) return;
    setLoading(true);
    const data = await getPokemons(pokemonsForPage, 0);
    const promise = data.results.map(async (pokemon) => {
      return await getInfoPokemons(pokemon.url);
    });
    const results = await Promise.all(promise);
    setPokemons(results);
    setLoading(false);
    setPage(1);
  };

  const PreviousPage = async () => {
    if (page === 1) return;
    setLoading(true);
    const data = await getPokemons(
      pokemonsForPage,
      pokemonsForPage * page - pokemonsForPage * 2
    );
    const promise = data.results.map(async (pokemon) => {
      return await getInfoPokemons(pokemon.url);
    });
    const results = await Promise.all(promise);
    setPokemons(results);
    setLoading(false);
    setPage(page - 1);
  };

  // const ChangePokemonsPages = (cant) => {
  //   console.log(cant)
  //   setPokemonsForPage(cant);
  //   loadPokemons();
  // };

  return (
    <div className="App">
      <NavBar favs={favs} />
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
    </div>
  );
}

export default App;
