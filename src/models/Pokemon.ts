export interface Pokemon {
  id: number;
  name: string;
  url: string;
  price: number;
  sprites?: Sprites;
  types: TypeResponse[];
  stats: StatsReponse[];
  image: string;
  isShiny: boolean;
}

interface Sprites {
  front_default: string;
  front_shiny: string;
}

interface TypeResponse {
  slot: number;
  type: Type;
}

interface Type {
  name: string;
  url: string;
  image: string;
}

interface StatsReponse {
  base_stat: number;
  effort: number;
  stat: Stat;
}

interface Stat {
  name: string;
  url: string;
}
