import React, { useState, useEffect, ChangeEvent } from "react";
import { FaLinkedin, FaGithub, FaCheck } from "react-icons/fa";
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

import { Fade } from 'react-awesome-reveal';

import { Modal } from "react-bootstrap";

const Home = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  //Paginação
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);

      const res = await getAllPokemon(386, 0);
      setPokemonList(res || []);
      setCurrentPokemons(res);
      setTotalItens(res?.length || 0);

      setLoading(false);
    };

    fetchPokemon();
  }, []);

  const [totalItens, setTotalItens] = useState<number>(0);

  //Pokemon atual

  const [currentPokemons, setCurrentPokemons] = useState<Pokemon[]>();

  //Mudar pagina
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const [query, setQuery] = useState<string>();
  const [typeName, setTypeName] = useState<string>();
  const [cartList, setCartList] = useState<CartList>();

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
    const indexOfLastPokemon = currentPage * itemsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;

    let pokemons: Pokemon[] = [];
    let currentPokemons: Pokemon[] = [];

    if (typeName && !query) {
      pokemons = getPokemonByType(pokemonList, typeName);
    } else if (query && !typeName) {
      pokemons = getPokemonByName(pokemonList, query);
    } else if (query && typeName) {
      pokemons = getPokemonByType(pokemonList, typeName);
      pokemons = getPokemonByName(pokemons, query);
    } else {
      pokemons = pokemonList;
    }
    currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    setCurrentPokemons(currentPokemons);
    setTotalItens(pokemons.length);
  }, [currentPage, pokemonList, query, totalItens, typeName]);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [totalItens]);

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
            <span>Gama</span> edition
          </span>
        </section>
        <SearchBar setType={setTypeName} setQuery={setQuery} />
      </header>
      <main className="content">
        <div className="pokemon-content">
          <Fade delay={200}>
            <PokemonList
              pokemons={currentPokemons || []}
              loading={loading}
              onCartAdd={handleAddPokemon}
            />
          </Fade>
          <span className="justify-content-center d-flex">
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={totalItens}
              hideNavigation
              onChange={paginate}
            />
          </span>
        </div>
        {currentPokemons && currentPokemons.length > 0 ? (
          <div className="bootstrap snippet shop-cart">
            <div className="content">
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
        ) : (
          <></>
        )}
      </main>
      <footer className="footer">
        <span className="copyright">
          © 2020 Copyright:
          <a href="!#"> Lucas Camargo Cancio, Inc,</a>
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
        <Modal.Body className="text-center modal-sucess">
          <FaCheck className="modal-sucess-icon" />
          <h1>Obrigado por comprar conosco!</h1>
          <p>Total: R$ {cartList?.total}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Home;
