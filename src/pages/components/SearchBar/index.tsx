import React, { useState, ChangeEvent, MouseEvent } from "react";
import { PokemonTypes } from "../../../models/PokemonTypes";

interface Props {
  setQuery: (query: string) => void;
  setType: (type: number) => void;
}
const SearchBar: React.FC<Props> = ({ setQuery, setType }) => {
  const [search, setSearch] = useState<string>("");

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
    setType(Number(value));
  }

  return (
    <section className="search">
      <input
        className="search-textbox"
        type="search"
        value={search}
        onChange={handleSearch}
        placeholder="Digite o nome do Pokémon..."
        autoComplete="name"
      />
      <button className="search-button" onClick={handleQuery}>
        Procurar
      </button>
      <select onChange={handleType}>
        <option value="0">-Todos-</option>
        {Object.keys(PokemonTypes).map((key) => {
          const type = PokemonTypes[key];
          return (
            <option value={type.id} key={type.id}>
              {type.name}
            </option>
          );
        })}
      </select>
    </section>
  );
};

export default SearchBar;
