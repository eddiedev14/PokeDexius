import PokeDex from "./api/PokeDex.js";

export function startPokedex() {
    PokeDex.getPokemonCount();
    PokeDex.getPokemonList();
}

export function formatDescription(description){
    return description.charAt(0) + description.toLowerCase().split("\f").join(" ").split("\n").join(" ").substring(1);
}