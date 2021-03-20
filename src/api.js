export const getPokemons = async (limit = 1, offset = 0) => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    const res = await fetch(url);
    const data = await res.json();
    
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getInfoPokemons = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};
