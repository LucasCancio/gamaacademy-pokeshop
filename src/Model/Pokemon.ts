export interface Pokemon {
  name: string;
  url: string;
  sprites?: Sprites;
}

interface Sprites{
  front_default: string;
}
