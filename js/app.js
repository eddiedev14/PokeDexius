import { menuNavbarBtn, closeSidebarBtn, sidebarDropdownBtn } from "./modules/selectores.js";
import UI from "./modules/classes/UI.js";

menuNavbarBtn.addEventListener("click", UI.toggleSidebar);
closeSidebarBtn.addEventListener("click", UI.toggleSidebar);
sidebarDropdownBtn.addEventListener("click", UI.toggleDropdown);