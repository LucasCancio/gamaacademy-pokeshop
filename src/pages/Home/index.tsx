import React, { useState, useEffect } from "react";
import "./index.css";

import { Pokemon } from "../../models/Pokemon";

import PokemonList from "../components/PokemonList";
import {
  getAllPokemon,
  getPokemonByName,
  getPokemonByType,
} from "../../controllers/pokemonController";

import pokeshopLogo from "../../assets/images/pokeshop-logo.png";
import gamaLogo from "../../assets/images/gama-academy-logo.jpg";
import SearchBar from "../components/SearchBar";
import { CartList, ShopItem } from "../../models/CartList";

import { Button, Modal } from "react-bootstrap";

const Home = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [query, setQuery] = useState<string>();
  const [type, setType] = useState<number>();
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
    if (!query) {
      console.log("pokemonQuery", query);
      getAllPokemon(10, 0).then((response) => {
        setPokemonList(response as Pokemon[]);
      });
    } else {
      getPokemonByName(query)
        .then((response) => {
          if (response) setPokemonList([response]);
        })
        .catch((_) => {
          setPokemonList([]);
        });
    }
  }, [query]);

  useEffect(() => {
    if (type) {
      getPokemonByType(type).then((response) => {
        setPokemonList(response as Pokemon[]);
      });
    } else {
      setQuery(undefined);
    }
  }, [type]);

  //Checando se há algum pokemon com qtde 0
  useEffect(() => {
    if (cartList) {
      cartList.items.forEach((item, index) => {
        if (item.qtd === 0) cartList.items.splice(index, 1);
      });

      if (cartList.items.length === 0) setCartList(undefined);
      else setCartList(cartList);
    }
  }, [cartList]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setCartList(undefined);
    setShow(false);
  };
  const handleShow = () => setShow(true);

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
        <SearchBar setType={setType} setQuery={setQuery} />
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
                      src={shopItem.pokemon.image}
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
              <p>Nenhum item no carrinho...</p>
            )}
          </ul>
          <div className="shop-cart-total">
            <h3>Total</h3>
            <p className="total-price">
              <span className="cash">R$</span>
              {cartList?.total}
            </p>
          </div>
          <Button
            variant="primary"
            className={cartList ? "" : "blocked"}
            disabled={cartList ? false : true}
            onClick={handleShow}
          >
            Finalizar Compra
          </Button>
          <button className="shop-cart-button"></button>
        </section>
      </main>

      <Modal size="sm" centered show={show} onHide={handleClose}>
        <Modal.Body className="text-center">
          <h1>Parabéns</h1>
          <h3>Compra Realizada</h3>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Home;
