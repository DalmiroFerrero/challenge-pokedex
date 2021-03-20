import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

const Pokemon = (props) => {
  const [infoPokemon, setInfoPokemon] = useState([]);

  const { pokemon } = props;

  const { id, name, sprites, types } = infoPokemon;

  useEffect(() => {
    fetch(pokemon)
      .then((response) => response.json())
      .then((data) => {
        setInfoPokemon(data);
      });
  }, []);

  return (
    <div className="pokemon">
      <img src={sprites.front_default} alt="Pokemon Icon" />
      <div>
        <h3>{name}</h3>
      </div>
      <div>
        <p>{id}</p>
        <FaHeart />
      </div>
    </div>
  );
};

export default Pokemon;
