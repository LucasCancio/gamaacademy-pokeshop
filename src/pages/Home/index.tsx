import React, { useState, useEffect } from "react";
import "./index.css";

import { Pokemon } from "../../models/Pokemon";

import PokemonList from "../components/PokemonList";
import {
  getAllPokemon,
  getPokemonByName,
} from "../../controllers/pokemonController";

import pokeshopLogo from "../../assets/images/pokeshop-logo.png";
import gamaLogo from "../../assets/images/gama-academy-logo.jpg";
import SearchBar from "../components/SearchBar";
import { CartList, ShopItem } from "../../models/CartList";

const Home = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [query, setQuery] = useState<string>();

  const [cartList, setCartList] = useState<CartList>();

  const handleAddPokemon = (pokemon: Pokemon) => {
    if (pokemon) {
      let isNewPokemon = true;
      let currentItems: ShopItem[];
      const newItem = { qtd: 1, pokemon };

      if (!cartList) {
        currentItems = [newItem];
      } else {
        currentItems = cartList.items;

        currentItems.map((item) => {
          if (item.pokemon.id === pokemon.id) {
            item.qtd++;
            isNewPokemon = false;
          }
          return item;
        });

        if (isNewPokemon) currentItems.push(newItem);
      }

      const total = currentItems.reduce((prev, cur) => {
        return prev + cur.pokemon.price * cur.qtd;
      }, 0);

      setCartList({ items: currentItems, total });
    }
  };

  function handleRemovePokemon(pokemon: Pokemon) {
    if (cartList) {
      let items = cartList.items;
      items.map((item) => {
        if (item.pokemon.id === pokemon.id) {
          item.qtd--;
        }
        return item;
      });

      items = items.filter((pokevalue) => pokevalue.qtd !== 0);

      const total: number = items.reduce((prev, cur) => {
        return prev + cur.pokemon.price * cur.qtd;
      }, 0);

      setCartList({ items, total });
    }
  }

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

  //Checando se há algum pokemon com qtde 0
  useEffect(() => {
    if (cartList != null) {
      cartList.items.forEach((item, index) => {
        if (item.qtd === 0) cartList.items.splice(index, 1);
      });
      setCartList(cartList);
    }
  }, [cartList]);

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
        <section className="shop-cart">
          <h1 className="shop-cart-title">Carrinho</h1>
          <ul className="shop-cart-itens">
            {cartList ? (
              cartList.items.map((shopItem, index) => {
                return (
                  <li className="cart-item" key={index}>
                    <img
                      className="item-image"
                      src={shopItem.pokemon.sprites?.front_default}
                      alt="Imagem do item"
                    />
                    <span className="item-name">{shopItem.pokemon.name}</span>
                    <span className="item-price">
                      <span className="cash">R$</span>
                      {shopItem.pokemon.price}
                    </span>
                    <span>Quantidade: {shopItem.qtd}</span>
                    <div>
                      <button
                        onClick={() => handleRemovePokemon(shopItem.pokemon)}
                      >
                        Remover
                      </button>
                      <button
                        onClick={() => handleAddPokemon(shopItem.pokemon)}
                      >
                        Adicionar
                      </button>
                    </div>
                  </li>
                );
              })
            ) : (
              <></>
            )}
          </ul>
          <div className="shop-cart-total">
            <h3>Total</h3>
            <p className="total-price">
              <span className="cash">R$</span>
              {cartList?.total}
            </p>
          </div>
          <button className="shop-cart-button">Finalizar Compra</button>
        </section>
      </main>
    </>
  );
};

export default Home;
