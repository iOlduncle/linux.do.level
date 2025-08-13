import {DomEventBus} from "../dom-event-bus";

export class Menu {
    public init(): void {
        this.moveTopMenu();
    }

    private moveTopMenu(): void {
        const menus = document.querySelector<HTMLDivElement>('div.above-site-header-outlet.header-submenus.ember-view');
        const sidebarContainer = document.querySelector<HTMLDivElement>('section.sidebar-container');

        if (sidebarContainer === null) {
            console.error('query sidebar container error');
            return;
        }
        if (menus) {
            const menuItems = Array.from(menus.querySelectorAll<HTMLAnchorElement>('a.menu-item.vdm'));
            if (menuItems) {
                for (const menuItem of menuItems) {
                    const icon = menuItem.querySelector('svg');
                    const submenu = menuItem.querySelector<HTMLDivElement>('div.d-header-dropdown');
                    menuItem.innerHTML = '';
                    menuItem.appendChild(icon!)
                    menuItem.appendChild(submenu!)
                    menuItem.classList.add('menu-item-extended');
                }
            }
            sidebarContainer.prepend(menus)

            DomEventBus.getInstance().add('div.sidebar-wrapper', () => {
                const wrapper = document.querySelector('div.sidebar-wrapper');
                if (wrapper && wrapper.hasChildNodes()) {
                    document.querySelector<HTMLDivElement>('section.sidebar-container')?.prepend(menus)
                }
            })

        } else {
            console.error('Menu not found.');
        }
    }
}