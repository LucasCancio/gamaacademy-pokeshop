import React from "react";
import { Pokemon } from "../../../models/Pokemon";

interface Props {
  list: Pokemon[];
  onAdd: (pokemon: Pokemon) => void;
}

const PokemonList: React.FC<Props> = ({ list = [], onAdd }) => {
  return (
    <section className="pokemon">
      <ul className="pokemon-list">
        {list.map((pokemon: Pokemon, index: number) => {
          return (
            <li className="pokemon-card" key={index}>
              <h3 className="pokemon-card-name">{pokemon.name}</h3>
              <img
                className="pokemon-card-image"
                src={pokemon.sprites?.front_default}
                alt="Imagem do Pokémon"
              />
              <p className="pokemon-card-price">
                <span className="cash">R$</span>{pokemon.price}
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
