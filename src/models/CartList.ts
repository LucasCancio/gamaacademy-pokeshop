import { Pokemon } from "./Pokemon";

export interface CartList{
    items: ShopItem[];
    total: number;
}

export interface ShopItem{
    pokemon: Pokemon;
    qtd: number;
}