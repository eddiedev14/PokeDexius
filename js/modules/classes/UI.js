import { sidebar, sidebarDropdownBtn, sidebarDropdown, sidebarChevronIcon } from "../selectores.js";

export default class UI{
    static toggleSidebar(){
        sidebar.classList.toggle("hidden")
    }

    static toggleDropdown(){
        sidebarDropdown.classList.toggle("hidden");
        sidebarDropdownBtn.classList.toggle("selected")
        sidebarChevronIcon.classList.toggle("rotate")
    }
}