import { menuNavbarBtn, closeSidebarBtn, sidebarDropdownBtn, mainContainer, modalCloseBtn, modal } from "./modules/selectores.js";
import Sidebar from "./modules/classes/Sidebar.js";
import Modal from "./modules/classes/Modal.js";

//* Sidebar/Navbar
menuNavbarBtn.addEventListener("click", Sidebar.toggleSidebar);
closeSidebarBtn.addEventListener("click", Sidebar.toggleSidebar);
sidebarDropdownBtn.addEventListener("click", Sidebar.toggleDropdown);

//* Modal
mainContainer.addEventListener("click", Modal.openModal)
modal.addEventListener("keyup", Modal.closeModal)
modalCloseBtn.addEventListener("click", Modal.closeModal)