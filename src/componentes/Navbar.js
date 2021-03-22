import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import logo from '../assets/pokeapi_256.png';

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <div className="navbar-top">
        <img src={logo} />
        <div className='favs'>
          <p>{props.favs}</p>
          <FaHeart />
        </div>
      </div>

      <div className="search">
        <input
          className="txt-busqueda"
          type="text"
          placeholder="Buscar Pokemon"
        />

        <input className="btn" type="button" value="buscar" />
      </div>
    </nav>
  );
};

export default Navbar;
