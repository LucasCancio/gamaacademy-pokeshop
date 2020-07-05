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

export const PokemonTypes: any = () => {
  return Object.freeze({
    normal: { name: "Normal", image: normalImage },
    fire: { name: "Fire", image: fireImage },
    water: { name: "Water", image: waterImage },
    grass: { name: "Grass", image: grassImage },
    flying: { name: "Flying", image: flyingImage },
    fighting: { name: "Fighting", image: fightingImage },
    poison: { name: "Poison", image: poisonImage },
    electric: { name: "Electric", image: electricImage },
    ground: { name: "Ground", image: groundImage },
    rock: { name: "Rock", image: rockImage },
    psychic: { name: "Psychic", image: psychicImage },
    ice: { name: "Ice", image: icelmage },
    bug: { name: "Bug", image: bugImage },
    ghost: { name: "Ghost", image: ghostImage },
    steel: { name: "Steel", image: steelImage },
    dragon: { name: "Dragon", image: dragonImage },
    dark: { name: "Dark", image: darkImage },
    fairy: { name: "Fairy", image: fairyImage },
  });
};
