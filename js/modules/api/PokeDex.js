import UI from "../classes/UI.js";
import Alert from "../components/Alert.js";
import API from "./API.js";

class PokeDex{
    //Get Pokemon Number to fill the pages in the select
    getPokemonCount(){
        const url = API.URL.pokemonCountURL;
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error("An error occurred while obtaining the number of Pokémons.");
                }
                return res.json();
            })
            .then(data => UI.fillPagesSelect(data.count)) //Calling a UI method
            .catch(error => new Alert("¡Error!", error.message, "error")) //Show error alert
    }

    //Get the pokemon list in a range of 12
    getPokemonList(){
        const url = API.URL.pokemonListURL;

        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error("An error occurred while obtaining the Pokémon List");
                }
                return res.json();
            })
            .then(data => {
                const { next, previous, results } = data;
                
                //Updating the API Object
                API.URL.nextPageURL = next;
                API.URL.previousPageURL = previous;

                //Create an object with only the neccesary information
                const promises = results.map(result => this.getPokemonInfo(result.url));

                //Execute all the promises and finally call the UI method
                Promise.all(promises)
                    .then(pokemonInfo => UI.showPokemons(pokemonInfo))
                    .catch(error => new Alert("¡Error!", error.message, "error")) //Show error alert
            })
            .catch(error => new Alert("¡Error!", error.message, "error")) //Show error alert
    }

    getPokemonInfo(url){
        return fetch(url)
                    .then(res => res.json())
                    .then(pokemonData => {
                        return fetch(pokemonData.species.url) // Get the pokemon description
                            .then(res => res.json())
                            .then(speciesData => ({
                                id: pokemonData.id,
                                name: pokemonData.name,
                                image: pokemonData.sprites.other.showdown.front_default,
                                types: pokemonData.types,
                                description: speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text,
                                modal: {
                                    weight: pokemonData.weight,
                                    height: pokemonData.height,
                                    stats: pokemonData.stats,
                                    sound: pokemonData.cries.latest
                                }
                            }));
                    });
    }
}

export default new PokeDex();