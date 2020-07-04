import React, { useState, ChangeEvent, MouseEvent } from "react";

interface Props {
  setQuery: (query: string) => void;
}
const SearchBar: React.FC<Props> = ({ setQuery }) => {
  const [search, setSearch] = useState<string>("");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  function handleQuery(event: MouseEvent<HTMLButtonElement>) {
    setQuery(search);
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
    </section>
  );
};

export default SearchBar;
