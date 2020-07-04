import React from "react";
import { Pokemon } from "../../../Model/Pokemon";

interface Props {
  list: Pokemon[];
}

const ShopCart: React.FC<Props> = ({ list }) => {
  return (
    <section className="shop-cart">
      <h1 className="shop-cart-title">Carrinho</h1>
      <ul className="shop-cart-itens">
        {list.map((pokemon: Pokemon, index: number) => {
          return (
            <li className="cart-item" key={index}>
              <img
                className="item-image"
                src={pokemon.sprites?.front_default}
                alt="Imagem do item"
              />
              <span className="item-name">{pokemon.name}</span>
              <span className="item-price">
                <span className="cash">R$</span>1000
              </span>
            </li>
          );
        })}
      </ul>
      <div className="shop-cart-total">
        <h3>Total</h3>
        <p className="total-price">
          <span className="cash">R$</span>1000
        </p>
      </div>
      <button className="shop-cart-button">Finalizar Compra</button>
    </section>
  );
};

export default ShopCart;
