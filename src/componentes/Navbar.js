import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import logo from '../assets/pokeapi_256.png';

const Navbar = (props) => {
  const [pokemon, setPokemon] = useState();

  const onChange = (e) => {
    setPokemon(e.target.value);
    console.log(e.target.value.length);
    if (e.target.value.length === 0) {
      props.SearchPokemon(null);
    }
  };

  const onClick = async (e) => {
    e.preventDefault();
    props.SearchPokemon(pokemon);
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <img src={logo} alt="Pokedex Logo" />
        <div className="favs">
          <p>{props.favs}</p>
          <FaHeart />
        </div>
      </div>

      <div className="search">
        <input
          className="txt-busqueda"
          type="text"
          placeholder="Buscar Pokemon"
          onChange={onChange}
        />

        <input onClick={onClick} className="btn" type="submit" value="buscar" />
      </div>
    </nav>
  );
};

export default Navbar;
