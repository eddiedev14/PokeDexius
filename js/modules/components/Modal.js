import { modal, modalAudio, modalCard, modalPokemonDescription, modalPokemonHeight, modalPokemonId, modalPokemonImg, modalPokemonName, modalPokemonTypes, modalPokemonWeight, modalStats } from "../selectores.js";
import UI from "../classes/UI.js";;
import { formatDescription } from "../funciones.js";

export default class Modal{
    static showModal(data){
        const { id, name, gifImage, plainImage, description, types, modal: { weight, height, stats, sound } } = data;

        //Updating the data in the Modal
        modalPokemonName.textContent = name.split("-").join(" ");
        modalPokemonId.textContent = `#${id}`;
        modalPokemonImg.src = gifImage || plainImage || "assets/images/pokeball.webp";
        UI.createPokemonTypes(types, modalPokemonTypes, "modal__type");
        modalPokemonDescription.textContent = formatDescription(description);
        modalPokemonWeight.textContent = weight + " kg";
        modalPokemonHeight.textContent = height + " m";
        modalAudio.src = sound;

        //Load the stats
        stats.forEach((stat, index) => {
            const { base_stat } = stat;
            modalStats[index].firstElementChild.textContent = base_stat;
            modalStats[index].lastElementChild.value = base_stat;
        })

        modal.show();
    }

    static closeModal(e){
        //Si se accede por teclado y la letra es distinta a Esc retorna
        if (!e.keyCode === 27) { return }

        modalCard.classList.add("closing");
        setTimeout(() => {
            modalCard.classList.remove("closing");
            modal.close();
        }, 500);
    }
    
    static playSound(){
        modalAudio.play();
    }
}