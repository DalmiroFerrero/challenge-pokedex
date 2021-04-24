import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import Pokemons from './Pokemons';

function App() {
  const [favs, setFavs] = useState(0);

  useEffect(() => {
    changeFavs();
  }, []);

  const changeFavs = () => {
    const listfavs = JSON.parse(window.localStorage.getItem('fav')) || [];

    setFavs(listfavs.length);
  };

  return (
    <div className="App">
      <NavBar favs={favs} />
      <Pokemons changeFavs={changeFavs} />
    </div>
  );
}

export default App;
