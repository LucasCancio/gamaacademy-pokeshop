import React, { useState, useEffect, MouseEvent, ChangeEvent } from "react";
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

const Home = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [cardList, setCardList] = useState<Pokemon[]>([]);
  const [pokemonQuery, setPokemonQuery] = useState<string>();
  const [search, setSearch] = useState<string>("");

  const handleAddPokemon = (pokemon: Pokemon) => {
    setCardList([...cardList, pokemon]);
  };
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handlePokemonQuery = (event: MouseEvent<HTMLButtonElement>) => {
    setPokemonQuery(search);
  };

  useEffect(() => {
    console.log("pokemonQuery", pokemonQuery);
    if (!pokemonQuery) {
      getAllPokemon(10, 20).then((response) => {
        setPokemonList(response as Pokemon[]);
      });
    } else {
      getPokemonByName(pokemonQuery).then((response) => {
        if (response) setPokemonList([response]);
      });
    }
  }, [pokemonQuery]);

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
        <section className="search">
          <input
            className="search-textbox"
            type="search"
            value={search}
            onChange={handleSearch}
            placeholder="Digite o nome do Pokémon..."
            autoComplete="name"
          />
          <button className="search-button" onClick={handlePokemonQuery}>
            Procurar
          </button>
        </section>
      </header>
      <main className="content">
        <PokemonList list={pokemonList} onAdd={handleAddPokemon} />
        <ShopCart list={cardList} />
      </main>
    </>
  );
};

export default Home;
