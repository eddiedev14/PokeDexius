import { cardsWrapper, previousPageBtn, nextPageBtn, pageSelect, spinner } from "../selectores.js";
import UI from "../classes/UI.js";
import Modal from "../components/Modal.js";
import Alert from "../components/Alert.js";
import API from "./API.js";

export default class PokeDex{
    //Get Pokemon Number to fill the pages in the select
    static getPokemonCount(selectedPage){
        const url = API.URL.pokemonCountURL;
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error("An error occurred while obtaining the number of Pokémons.");
                }
                return res.json();
            })
            .then(data => UI.fillPagesSelect(data.count, selectedPage)) //Calling a UI method
            .catch(error => new Alert("¡Error!", error.message, "error")) //Show error alert
    }

    //Get the pokemon list in a range of 12
    static getPokemonList(url){
        //Hidden the cards and show the spinner
        cardsWrapper.classList.remove("show");
        spinner.classList.remove("hidden");

        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error("An error occurred while obtaining the Pokémon List");
                }
                return res.json();
            })
            .then(data => {
                const { next, previous, results } = data;

                if (results.length === 0) {
                    throw new Error("An error occurred while obtaining the Pokémon List");
                }
                
                //Updating the API Object
                API.URL.nextPageURL = next;
                API.URL.previousPageURL = previous;

                //Validate the availability of the buttons
                PokeDex.checkPaginationButtons();

                //Create an object with only the neccesary information
                const promises = results.map(result => PokeDex.getPokemonInfo(result.url));

                //Execute all the promises and finally call the UI method
                Promise.all(promises)
                    .then(pokemonInfo => UI.showPokemons(pokemonInfo))
            })
            .catch(error => new Alert("¡Error!", error.message, "error")) //Show error alert
    }

    //Get Pokémon individual info
    static getPokemonInfo(url){
        return fetch(url)
                    .then(res => res.json())
                    .then(pokemonData => {
                        return fetch(pokemonData.species.url) // Get the pokemon description
                            .then(res => res.json())
                            .then(speciesData => ({
                                id: pokemonData.id,
                                name: pokemonData.name,
                                gifImage: pokemonData.sprites.other.showdown.front_default,
                                plainImage: pokemonData.sprites.front_default,
                                types: pokemonData.types,
                                description: speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text,
                                modal: {
                                    weight: pokemonData.weight,
                                    height: pokemonData.height,
                                    stats: pokemonData.stats,
                                    sound: pokemonData.cries.latest
                                }
                            }));
                    })
    }

    //Get Pokémon to show in the modal
    static getPokemonModal(searchParam){
        const url = API.URL.pokemonURL + searchParam + "/";
        PokeDex.getPokemonInfo(url)
            .then(data => Modal.showModal(data))
            .catch(error => new Alert("¡Error!", `An error occurred while obtaining the Pokémon Information: ${error.message}`, "error"))
    }

    //Function to check the availability of the buttons
    static checkPaginationButtons(){
        previousPageBtn.disabled = !API.URL.previousPageURL;
        nextPageBtn.disabled = !API.URL.nextPageURL;
    }

    //Function to go to the next page
    static nextPage(){
        PokeDex.getPokemonList(API.URL.nextPageURL);
        pageSelect.selectedIndex += 1;
    }

    //Function to go to the next page
    static previousPage(){
        PokeDex.getPokemonList(API.URL.previousPageURL);
        pageSelect.selectedIndex -= 1; 
    }
}