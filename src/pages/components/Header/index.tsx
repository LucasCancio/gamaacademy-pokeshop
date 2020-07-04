import React from "react";

import './index.css';

import pokeshopLogo from '../../../assets/images/pokeshop-logo.png'; 
import gamaLogo from '../../../assets/images/gama-academy-logo.jpg'; 

const Header = () => {
  return (
    <header className="header">
      <section className="logo">
        <img
          className="logo-img"
          src={pokeshopLogo}
          alt="Logo do PokeShop"
        />
        <span className="logo-gama">
          <img
            src={gamaLogo}
            alt="Logo do Gama Academy"
          />
          Gama edition
        </span>
      </section>
      <section className="search">
        <input
          className="search-textbox"
          type="search"
          placeholder="Digite o nome do Pokémon..."
          autoComplete="name"
        />
        <button className="search-button">Procurar</button>
      </section>
    </header>
  );
};

export default Header;