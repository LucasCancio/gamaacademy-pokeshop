import { Pokemon } from "./Pokemon";

export interface ShopList{
    items: ShopItem[];
    total: number;
}

export interface ShopItem{
    pokemon: Pokemon;
    qtd: number;
}