const getPokemonData = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
    console.log(data);
  } catch (error) {
    console.error(`Ocurrió un error: ${error}`);
  }
};
