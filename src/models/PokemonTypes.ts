import normalImage from "../assets/images/types/normalType.png";
import fireImage from "../assets/images/types/fireType.png";
import waterImage from "../assets/images/types/waterType.png";
import grassImage from "../assets/images/types/grassType.png";
import flyingImage from "../assets/images/types/flyingType.png";
import fightingImage from "../assets/images/types/fightingType.png";
import poisonImage from "../assets/images/types/poisonType.png";
import electricImage from "../assets/images/types/electricType.png";
import groundImage from "../assets/images/types/groundType.png";
import rockImage from "../assets/images/types/rockType.png";
import psychicImage from "../assets/images/types/psychicType.png";
import icelmage from "../assets/images/types/iceType.png";
import bugImage from "../assets/images/types/bugType.png";
import ghostImage from "../assets/images/types/ghostType.png";
import steelImage from "../assets/images/types/steelType.png";
import dragonImage from "../assets/images/types/dragonType.png";
import darkImage from "../assets/images/types/darkType.png";
import fairyImage from "../assets/images/types/fairyType.png";

export const PokemonTypes: any = Object.freeze({
  normal: { id: 1, name: "Normal", image: normalImage },
  fighting: { id: 2, name: "Fighting", image: fightingImage },
  flying: { id: 3, name: "Flying", image: flyingImage },
  poison: { id: 4, name: "Poison", image: poisonImage },
  ground: { id: 5, name: "Ground", image: groundImage },
  rock: { id: 6, name: "Rock", image: rockImage },
  bug: { id: 7, name: "Bug", image: bugImage },
  ghost: { id: 8, name: "Ghost", image: ghostImage },
  steel: { id: 9, name: "Steel", image: steelImage },
  fire: { id: 10, name: "Fire", image: fireImage },
  water: { id: 11, name: "Water", image: waterImage },
  grass: { id: 12, name: "Grass", image: grassImage },
  electric: { id: 13, name: "Electric", image: electricImage },
  psychic: { id: 14, name: "Psychic", image: psychicImage },
  ice: { id: 15, name: "Ice", image: icelmage },
  dragon: { id: 16, name: "Dragon", image: dragonImage },
  dark: { id: 17, name: "Dark", image: darkImage },
  fairy: { id: 18, name: "Fairy", image: fairyImage },
});
