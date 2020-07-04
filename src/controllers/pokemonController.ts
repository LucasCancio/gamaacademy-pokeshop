import api from "../services/pokeapi";
import { Pokemon } from "../models/Pokemon";

async function getPokemonByName(name: string) {
  try {
    const { data } = await api.get(`pokemon/${name}`);
    return data as Pokemon;
  } catch (error) {
    console.error("Ocorreu um erro inesperado: ", error);
  }
}

async function getAllPokemon(limit: number, offset: number) {
  try {
    const response = await api.get(`pokemon?limit=${limit}&offset=${offset}`);

    let items = response.data.results.map(async (item: Pokemon) => {
      const response = await api.get(item.url);
      return response.data;
    });

    const pokemonList = (await Promise.all(items)) as Pokemon[];
    pokemonList.forEach((pokemon) => {
      pokemon.name =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      getPriceByStats(pokemon);
    });

    return pokemonList;
  } catch (error) {
    console.error("Ocorreu um erro inesperado: ", error);
  }
}

function getPriceByStats(pokemon: Pokemon) {
  const statsSum = pokemon.stats?.reduce(
    (accumulator: number, current) => (accumulator += current.base_stat),
    0
  );

  pokemon.price = statsSum ?? 0;
}

export { getPokemonByName, getAllPokemon };