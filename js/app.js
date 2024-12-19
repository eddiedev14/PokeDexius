import { menuNavbarBtn, closeSidebarBtn, sidebarDropdownBtn, cardsWrapper, modalCloseBtn, modal, modalAudioBtn, modalMobileAudioBtn } from "./modules/selectores.js";
import { startPokedex } from "./modules/funciones.js";
import Sidebar from "./modules/components/Sidebar.js";
import Modal from "./modules/components/Modal.js";

document.addEventListener("DOMContentLoaded", startPokedex)

//* Sidebar/Navbar
menuNavbarBtn.addEventListener("click", Sidebar.toggleSidebar);
closeSidebarBtn.addEventListener("click", Sidebar.toggleSidebar);
sidebarDropdownBtn.addEventListener("click", Sidebar.toggleDropdown);

//* Modal
cardsWrapper.addEventListener("click", Modal.loadModal)
modal.addEventListener("keyup", Modal.closeModal)
modalCloseBtn.addEventListener("click", Modal.closeModal)
modalAudioBtn.addEventListener("click", Modal.playSound);
modalMobileAudioBtn.addEventListener("click", Modal.playSound);