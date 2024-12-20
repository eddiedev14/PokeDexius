import { menuNavbarBtn, closeSidebarBtn, sidebarDropdownBtn, cardsWrapper, modalCloseBtn, modal, modalAudioBtn, modalMobileAudioBtn, searchForm, previousPageBtn, nextPageBtn, pageSelect } from "./modules/selectores.js";
import { startPokedex, getCardPokemonID, validateForm, loadPage } from "./modules/funciones.js";
import Sidebar from "./modules/components/Sidebar.js";
import Modal from "./modules/components/Modal.js";
import PokeDex from "./modules/api/PokeDex.js";

//* Events

document.addEventListener("DOMContentLoaded", startPokedex)

//* Sidebar/Navbar
menuNavbarBtn.addEventListener("click", Sidebar.toggleSidebar);
closeSidebarBtn.addEventListener("click", Sidebar.toggleSidebar);
sidebarDropdownBtn.addEventListener("click", Sidebar.toggleDropdown);

//* Search Form
searchForm.addEventListener("submit", validateForm);

//* Pagination
previousPageBtn.addEventListener("click", PokeDex.previousPage)
nextPageBtn.addEventListener("click", PokeDex.nextPage)
pageSelect.addEventListener("change", e => loadPage(e.target.value)) 

//* Modal
cardsWrapper.addEventListener("click", getCardPokemonID)
modal.addEventListener("keyup", Modal.closeModal)
modalCloseBtn.addEventListener("click", Modal.closeModal)
modalAudioBtn.addEventListener("click", Modal.playSound);
modalMobileAudioBtn.addEventListener("click", Modal.playSound);