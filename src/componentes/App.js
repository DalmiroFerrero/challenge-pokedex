import React, { useState, useEffect } from 'react';
import NavBar from './Navbar';
import Pokemons from './Pokemons';


function App() {
  const favs = 0;

  return (
    <div className="App">
      <NavBar favs={favs}/>
      <Pokemons />
    </div>
  );
}

export default App;
