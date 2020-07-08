import React, { useState, ChangeEvent, MouseEvent } from "react";
import { PokemonTypes } from "../../../models/PokemonTypes";

interface Props {
  setQuery: (query: string) => void;
  setType: (type: string) => void;
}
const SearchBar: React.FC<Props> = ({ setQuery, setType }) => {
  const [search, setSearch] = useState<string>("");
  const [currentTypeImage, setCurrentTypeImage] = useState<string>("");

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (!value) setQuery(value);
    setSearch(value);
  }

  function handleQuery(event: MouseEvent<HTMLButtonElement>) {
    setQuery(search);
  }
  function handleType(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    setType(value);
    if (value) {
      const [key] = Object.keys(PokemonTypes).filter(
        (key) => PokemonTypes[key].name === value
      );
      const type = PokemonTypes[key];
      setCurrentTypeImage(type.image);
    } else {
      setCurrentTypeImage("");
    }
  }

  return (
    <section className="search">
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Nome
          </label>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Pokémon..."
          value={search}
          onChange={handleSearch}
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={handleQuery}
          >
            Procurar
          </button>
        </div>
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            {currentTypeImage ? (
              <img src={currentTypeImage} className="search-type-image" alt="Tipo do pokémon" />
            ) : (
              "Tipo"
            )}
          </label>
        </div>
        <select
          className="custom-select"
          id="inputGroupSelect01"
          onChange={handleType}
        >
          <option value={""} key={0}>
            -
          </option>
          {Object.keys(PokemonTypes).map((key) => {
            const type = PokemonTypes[key];
            return (
              <option value={type.name} key={type.id}>
                {type.name}
              </option>
            );
          })}
        </select>
      </div>
    </section>
  );
};

export default SearchBar;
