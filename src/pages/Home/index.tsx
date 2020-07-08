import React, { useState, useEffect, ChangeEvent } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import "./cart.css";

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
import Pagination from "react-js-pagination";

import { Modal } from "react-bootstrap";

const Home = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [query, setQuery] = useState<string>();
  const [type, setType] = useState<number>();
  const [cartList, setCartList] = useState<CartList>();

  const [activePage, setActivePage] = useState<number>(1);
  const [totalItens, setTotalItens] = useState<number>(0);

  const itemsPerPage = 12;

  function handlePokemonCart(
    event: ChangeEvent<HTMLInputElement>,
    pokemon: Pokemon,
    qtdeAtual: number
  ) {
    const value = Number(event.target.value);
    if (value > qtdeAtual) handleAddPokemon(pokemon);
    else handleRemovePokemon(pokemon);
  }

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
    const indexOfLast = activePage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;

    if (!query) {
      getAllPokemon(itemsPerPage, indexOfFirst).then((response) => {
        const pokemonRespose = response as Pokemon[];
        setPokemonList(pokemonRespose);
        setTotalItens(pokemonRespose.length);
      });
    } else {
      getPokemonByName(query)
        .then((response) => {
          if (response) {
            setPokemonList([response]);
            setTotalItens(1);
          }
        })
        .catch((_) => {
          setPokemonList([]);
          setTotalItens(0);
        });
    }
  }, [activePage, query, totalItens]);

  useEffect(() => {
    const indexOfLast = activePage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;

    if (type) {
      const indexOfLast = activePage * itemsPerPage;
      const indexOfFirst = indexOfLast - itemsPerPage;

      getPokemonByType(type).then((response) => {
        const pokemonResponse = (response as Pokemon[]).splice(
          indexOfFirst,
          itemsPerPage
        );
        if (response) setPokemonList(pokemonResponse);
        setTotalItens(pokemonResponse.length);
      });
    } else {
      getAllPokemon(itemsPerPage, indexOfFirst).then((response) => {
        const pokemonRespose = response as Pokemon[];
        setPokemonList(pokemonRespose);
        setTotalItens(pokemonRespose.length);
      });
    }
  }, [activePage, type]);

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

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      <header className="header">
        <section className="logo">
          <img className="logo-img" src={pokeshopLogo} alt="Logo do PokeShop" />
          <span className="logo-gama">
            <img src={gamaLogo} alt="Logo do Gama Academy" />
            <span>Gama</span> edition
          </span>
        </section>
        <SearchBar setType={setType} setQuery={setQuery} />
      </header>
      <main className="content">
        <div>
          <PokemonList list={pokemonList} onAdd={handleAddPokemon} />
          <span className="justify-content-center d-flex">
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              activePage={activePage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={totalItens}
              hideNavigation
              onChange={handlePageChange}
            />
          </span>
        </div>
        <div className="bootstrap snippet">
          <div className="col-md-9 col-sm-8 content">
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-info panel-shadow">
                  <div className="panel-body d-flex flex-column justify-content-center">
                    <div>
                      <table className="table">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Preço</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartList ? (
                            cartList.items.map((shopItem, index) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    <img
                                      src={shopItem.pokemon.image}
                                      className="img-cart"
                                      alt="Imagem do pokemon"
                                    />
                                  </td>
                                  <td>
                                    <strong>{shopItem.pokemon.name}</strong>
                                  </td>
                                  <td>
                                    <form className="form-inline">
                                      <input
                                        className="form-control"
                                        type="number"
                                        value={shopItem.qtd}
                                        onChange={(e) =>
                                          handlePokemonCart(
                                            e,
                                            shopItem.pokemon,
                                            shopItem.qtd
                                          )
                                        }
                                        min="0"
                                      />
                                    </form>
                                  </td>
                                  <td>R${shopItem.pokemon.price}</td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={4}>
                                <strong>Nenhum item no carrinho...</strong>
                              </td>
                            </tr>
                          )}
                          <tr>
                            <td colSpan={3} className="text-right">
                              <strong>Total</strong>
                            </td>
                            <td>R${cartList?.total || 0}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <button
                      className={
                        "btn btn-success " + (cartList ? "" : "blocked")
                      }
                      disabled={cartList ? false : true}
                      onClick={handleShow}
                    >
                      <span className="glyphicon glyphicon-arrow-left"></span>
                      &nbsp;Comprar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="footer">
        <span className="copyright">
          © 2020 Copyright:
          <a href=""> Lucas Camargo Cancio, Inc,</a>
          All rights reserved
        </span>
        <section className="social-midias">
          <a
            href="https://github.com/LucasCancio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/lucas-camargo-cancio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </section>
      </footer>
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
