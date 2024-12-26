import { limitPageLabel, cardsWrapper, allCards, pageSelect, spinner } from "../selectores.js";
import { formatDescription } from "../funciones.js";
import API from "../api/API.js";

export default class UI{
    static fillPagesSelect(count, selectedPage){
        const pages = Math.round(count/API.limit);
        const fragment = document.createDocumentFragment();
        
        for (let i = 1; i <= pages; i++) {
            const option = document.createElement("OPTION");
            option.textContent = i;
            option.value = i;
            fragment.appendChild(option);
        }

        pageSelect.appendChild(fragment)
        pageSelect.value = selectedPage
        limitPageLabel.textContent = `of ${pages}`;
    }

    static showPokemons(pokemons){
        pokemons.forEach((pokemon, index) => {
            const card = allCards[index];
            const { id, name, gifImage, plainImage, types, description } = pokemon;     

            //Updating the data in the UI
            card.dataset.id = id;
            card.querySelector(".card__id").textContent = `#${id}`;
            card.querySelector(".card__name").textContent = name.split("-").join(" ");
            card.querySelector(".card__img").src = gifImage || plainImage || "assets/images/pokeball.webp";
            card.querySelector(".card__description").textContent = formatDescription(description);

            //Creating the types element
            const typesWrapper = card.querySelector(".card__types");
            UI.createPokemonTypes(types, typesWrapper, "card__type")
        });

        //Method to handle the visibility of the cards when the response obtains less than 12 pokemons
        UI.handleCardsVisibility(pokemons.length)
        cardsWrapper.classList.add("show");
        spinner.classList.add("hidden");
    }

    static createPokemonTypes(types, wrapper, typeClass){
        UI.cleanTypesWrapper(wrapper);

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

    static handleCardsVisibility(pokemonsCount){
        const hiddenCards = document.querySelectorAll(".main__card.hidden");
        if (pokemonsCount < API.limit) {
            for (let i = pokemonsCount; i < API.limit; i++) {
                allCards[i].classList.add("hidden");
            }
        } else {
            hiddenCards.forEach(card => card.classList.remove("hidden"));
        }
    }
}