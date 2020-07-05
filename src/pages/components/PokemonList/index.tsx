import React, { useState } from "react";
import { Pokemon } from "../../../models/Pokemon";

interface Props {
  list: Pokemon[];
  onAdd: (pokemon: Pokemon) => void;
  onChangeShiny: (pokemon: Pokemon) => void;
}

const PokemonList: React.FC<Props> = ({ list = [], onAdd, onChangeShiny }) => {
  return (
    <section className="pokemon">
      <ul className="pokemon-list">
        {list.map((pokemon: Pokemon, index: number) => {
          return (
            <li className="pokemon-card" key={`pokemon-${index}`}>
              <h3 className="pokemon-card-name">{pokemon.name}</h3>
              <h4>Nº {pokemon.id}</h4>
              <button onClick={() => onChangeShiny(pokemon)}>Shiny On/Off</button>
              <img
                className="pokemon-card-image"
                src={
                  pokemon.isShiny
                    ? pokemon.sprites?.front_shiny
                    : pokemon.sprites?.front_default
                }
                alt="Imagem do Pokémon"
              />
              {pokemon.types?.map((type, index) => {
                return (
                  <img
                    className="pokemon-card-type"
                    key={`type-${index}`}
                    src={type.type.image}
                    alt={type.type.name}
                  />
                );
              })}

              <p className="pokemon-card-price">
                <span className="cash">R$</span>
                {pokemon.price}
              </p>
              <button
                className="pokemon-card-button"
                onClick={() => onAdd(pokemon)}
              >
                Adicionar ao Carrinho
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PokemonList;
