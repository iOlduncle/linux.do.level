import { createLevelButton, } from './ui';


(() => {
    function init() {
        window.addEventListener('load', () => {
            let timer = setTimeout(() => {
                let titleBar = document.querySelector("body section div div header div div div.panel ul.icons.d-header-icons");
                if (titleBar) {
                    let button = createLevelButton();
                    titleBar.prepend(button);
                    clearTimeout(timer);
                }
            },500);
        });
    }

    init();
})();