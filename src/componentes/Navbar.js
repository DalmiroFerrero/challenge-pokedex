import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import logo from '../assets/pokeapi_256.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-top">
        <img src={logo} />
        <FaHeart />
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
