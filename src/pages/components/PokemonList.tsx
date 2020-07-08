import React from "react";
import { Pokemon } from "../../models/Pokemon";
import pokemonNotFound from "../../assets/images/pokemon-notfound.png";
import { FaCartPlus } from "react-icons/fa";

interface Props {
  pokemons: Pokemon[];
  loading: boolean;
  onCartAdd: (pokemon: Pokemon) => void;
}

const PokemonList: React.FC<Props> = ({ pokemons, loading, onCartAdd }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className="pokemon-list">
      {pokemons ? (
        pokemons.map((pokemon: Pokemon, index: number) => {
          return (
            <li className="pokemon" key={`pokemon-${index}`}>
              <div className="pokemon-header">
                <h4 className="pokemon-id">Nº {pokemon.id}</h4>
                <div>
                  <h3 className="pokemon-name">{pokemon.name}</h3>
                  <div className="pokemon-types">
                    {pokemon.types?.map((type, index) => {
                      return (
                        <img
                          className="pokemon-type"
                          key={`type-${index}`}
                          src={type.type.image || pokemonNotFound}
                          alt={type.type.name}
                          title={type.type.name}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="pokemon-body">
                <img
                  className="pokemon-image"
                  src={pokemon.image}
                  alt="Imagem do Pokémon"
                />
              </div>
              <div className="pokemon-footer">
                <p className="pokemon-price">
                  <span className="cash">R${pokemon.price}</span>
                </p>
                <button
                  className="pokemon-button btn btn-link"
                  onClick={() => onCartAdd(pokemon)}
                >
                  <FaCartPlus />
                </button>
              </div>
            </li>
          );
        })
      ) : (
        <></>
      )}
    </ul>
  );
};

export default PokemonList;
