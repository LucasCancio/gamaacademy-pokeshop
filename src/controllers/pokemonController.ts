import api from "../services/pokeapi";

async function getPokemonByName(name: string) {
  return await api.get(`pokemon/${name}`);
}

async function getAllPokemon(limit: number, offset: number) {
  return await api.get(`pokemon?limit=${limit}&offset=${offset}`);
}

export { getPokemonByName, getAllPokemon };
