import React, { useState, useEffect } from "react";
import "./index.css";

import { Pokemon } from "../../models/Pokemon";

import PokemonList from "../components/PokemonList";
import ShopCart from "../components/ShopCart";
import {
  getAllPokemon,
  getPokemonByName,
} from "../../controllers/pokemonController";

import pokeshopLogo from "../../assets/images/pokeshop-logo.png";
import gamaLogo from "../../assets/images/gama-academy-logo.jpg";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [cardList, setCardList] = useState<Pokemon[]>([]);
  const [query, setQuery] = useState<string>();

  const handleAddPokemon = (pokemon: Pokemon) => {
    setCardList([...cardList, pokemon]);
  };

  useEffect(() => {
    console.log("pokemonQuery", query);
    if (!query) {
      getAllPokemon(10, 20).then((response) => {
        setPokemonList(response as Pokemon[]);
      });
    } else {
      getPokemonByName(query).then((response) => {
        if (response) setPokemonList([response]);
      });
    }
  }, [query]);

  return (
    <>
      <header className="header">
        <section className="logo">
          <img className="logo-img" src={pokeshopLogo} alt="Logo do PokeShop" />
          <span className="logo-gama">
            <img src={gamaLogo} alt="Logo do Gama Academy" />
            Gama edition
          </span>
        </section>
        <SearchBar setQuery={setQuery} />
      </header>
      <main className="content">
        <PokemonList list={pokemonList} onAdd={handleAddPokemon} />
        <ShopCart list={cardList} />
      </main>
    </>
  );
};

export default Home;
