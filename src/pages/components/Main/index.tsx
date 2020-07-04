import React, { useEffect, useState } from "react";

import "./index.css";

import api from "../../../services/pokeapi";

import { Pokemon } from "../../../Model/Pokemon";

import PokemonList from "../PokemonList";
import ShopCart from "../ShopCart";

const Main = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [cardList, setCardList] = useState<Pokemon[]>([]);
  const [pokemonQuery, setPokemonQuery] = useState<string>();

  const handleAddPokemon = (pokemon: Pokemon) => {
    setCardList([...cardList, pokemon]);
  };

  useEffect(() => {
    if(!pokemonQuery){
      api.get(`pokemon?limit=${10}&offset=${20}`).then(async (response) => {
        let items = response.data.results.map(async (item: Pokemon) => {
          const response = await api.get(item.url);
          return response.data;
        });
  
        Promise.all(items).then((response) => {
          setPokemonList(response as Pokemon[]);
        });
      });
    }else{
      
    }

   
  }, [pokemonQuery]);

  return (
    <main className="content">
      <PokemonList list={pokemonList} onAdd={handleAddPokemon} />
      <ShopCart list={cardList} />
    </main>
  );
};

export default Main;
