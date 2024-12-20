import PokeDex from "./api/PokeDex.js";
import API from "./api/API.js";
import Alert from "./components/Alert.js";
import { searchInput } from "./selectores.js";

//Function to start the web app
export function startPokedex() {
    //* Verify the query params
    const params = new URLSearchParams(window.location.search);
    let page = 1; // Default Page

    // If there isn't params the page will loaded with the default page
    if (params.size === 0) {
        PokeDex.getPokemonList(API.URL.pokemonListURL);
    } else {
        // If there are params, continue with the validation
        page = params.get("page");

        // Validate if page is not valid (it isn't a number or is lower than 1)
        if (!page || isNaN(page) || page <= 0) {
            new Alert("¡Error!", "El parámetro de la página no es válido", "error");
            return;
        }

        // Load the selected page
        loadPage(page);
    }

    //Finally, the method to obtain the number of pokemon is called to update the select with the selected page.
    PokeDex.getPokemonCount(page);
}

//Function to format the description text
export function formatDescription(description){
    return description.charAt(0) + description.toLowerCase().split("\f").join(" ").split("\n").join(" ").substring(1);
}

//Function to get the Pokemon ID from the selected card
export function getCardPokemonID(e){
    const card = e.target.closest('.main__card');
    if (!card) { return }
    const pokemonID = card.dataset.id;
    PokeDex.getPokemonModal(pokemonID)
}

//Function to validate the form
export function validateForm(e) {
    e.preventDefault();
    const regex = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g;
    const searchParam = searchInput.value;
    
    if (searchParam === "") {
        new Alert("¡Error!", "Please enter something in the input search", "validation");
        return;
    }

    if (regex.test(searchParam)) {
        new Alert("¡Error!", "The search value cannot contain special characters", "validation");
        return;
    }

    const formattedSearchParam = searchParam.toLowerCase().split(" ").join("-");
    PokeDex.getPokemonModal(formattedSearchParam);
}

//Function to load a specific page
export function loadPage(page) {
    const offset = API.limit * (page - 1);
    const url = API.URL.pokemonListURL + "&offset=" + offset;
    PokeDex.getPokemonList(url)
}