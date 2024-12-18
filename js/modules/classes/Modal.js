import { modal, modalCard } from "../selectores.js";

export default class Modal{
    static openModal(e){
        const card = e.target.closest('.main__card');
        if (!card) { return }
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
}