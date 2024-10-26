// Variables
const form = document.querySelector('.form');
const input = document.querySelector('#input-search');
const pokeContainer = document.querySelector('.poke-container');

// ===============================================================================
//=============================== MAPPER =========================================
// ===============================================================================

const mapper = (pokemon) => {
  return {
    image: pokemon.sprites.front_default,
    name: pokemon.name,
    types: pokemon.types,
    height: (pokemon.height / 10).toFixed(1),
    weight: (pokemon.weight / 10).toFixed(1),
  };
};

// ===============================================================================
// ============================== CARD TEMPLATE  =================================
// ===============================================================================

const pokeCard = (pokemon) => {
  const { image, name, types, height, weight } = mapper(pokemon);

  return `
  <div class="poke-info">
  <div class="poke-data">
  <h2 id="poke-name">${name.toUpperCase()}</h2>
  <img id="poke-img" src="${image}" alt="${name}" />

      <div class="poke-type">
        ${types
          .map(
            (type) =>
              `<span class="${
                type.type.name
              } type">${type.type.name.toUpperCase()}</span>`,
          )
          .join('')}
      </div>
      <p id="poke-height">Altura: ${height} m</p>
      <p id="poke-weight">Peso: ${weight} kg</p>
    </div>
  </div>
  `;
};

// ===============================================================================
//=============================== RENDER POKE CARD ===============================
// ===============================================================================

const renderPokeCard = (pokeData) => {
  if (!pokeData) {
    pokeContainer.innerHTML =
      '<p class="error">Este ID no coincide con ningún Pokémon!</p>';
    return;
  }
  pokeContainer.innerHTML = pokeCard(pokeData);
};

// ===============================================================================
//=============================== SEARCH POKEMON =================================
// ===============================================================================

const searchPokemon = async (e) => {
  e.preventDefault();
  const inputValue = input.value.trim();

  if (!inputValue) {
    pokeContainer.innerHTML =
      '<p class="error">Por favor, ingresa el ID de un Pokémon.</p>';
    return;
  }

  try {
    const pokeData = await getPokemonData(inputValue);
    renderPokeCard(pokeData);
  } catch (error) {
    pokeContainer.innerHTML =
      '<p class="error">Este ID no coincide con ningún Pokémon!</p>';
  }

  form.reset();
};

// ===============================================================================
//=================================== INIT =======================================
// ===============================================================================

const init = () => {
  form.addEventListener('submit', searchPokemon);
};

init();
