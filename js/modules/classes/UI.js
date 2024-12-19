import { cardsWrapper, pageSelect, spinner } from "../selectores.js";
import { formatDescription } from "../funciones.js";
import API from "../api/API.js";

export default class UI{
    static fillPagesSelect(count){
        const pages = Math.round(count/API.limit);
        
        for (let i = 1; i <= pages; i++) {
            const option = document.createElement("OPTION");
            option.textContent = i;
            option.value = i;
            pageSelect.appendChild(option);
        }

        pageSelect.firstElementChild.setAttribute("selected", ""); //Select the first option
    }

    static showPokemons(pokemons){
        pokemons.forEach((pokemon, index) => {
            const card = cardsWrapper.children[index];
            const { id, name, image, types, description } = pokemon;     

            //Updating the data in the UI
            card.dataset.id = id;
            card.querySelector(".card__id").textContent = `#${id}`;
            card.querySelector(".card__name").textContent = name;
            card.querySelector(".card__img").src = image;
            card.querySelector(".card__description").textContent = formatDescription(description);

            //Creating the types element
            const typesWrapper = card.querySelector(".card__types");
            this.createPokemonTypes(types, typesWrapper, "card__type")
        });

        cardsWrapper.classList.add("show");
        spinner.classList.add("hidden");
    }

    static createPokemonTypes(types, wrapper, typeClass){
        this.cleanTypesWrapper(wrapper);

        types.forEach((type, index) => {
            const typeSpan = document.createElement("SPAN");
            typeSpan.classList.add(typeClass);
            typeSpan.ariaLabel = `Pokémon Type #${index + 1}`;
            typeSpan.textContent = type.type.name;
            wrapper.appendChild(typeSpan)
        })
    }

    static cleanTypesWrapper(wrapper){
        while (wrapper.firstElementChild) {
            wrapper.removeChild(wrapper.firstElementChild);
        }
    }
}