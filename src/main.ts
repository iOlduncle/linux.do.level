import { createLevelButton, } from './ui';


(() => {

    let headerObserver: MutationObserver | undefined = undefined;

    function addLevelButtonToTitleBar(header: HTMLElement) {
        let titleBar = header.querySelector<HTMLUListElement>('header div div div.panel ul.icons.d-header-icons');
        if (titleBar && !titleBar.querySelector<HTMLLIElement>('li#level-button')) {
            titleBar.prepend(createLevelButton());
        } else {
            console.warn('query title bar fail.');
        }
    }

    function addHeaderObserver(header: HTMLElement) {
        if (headerObserver) {
            headerObserver.disconnect();
        }
        headerObserver = new MutationObserver((_) => {
            addLevelButtonToTitleBar(header);
        });
        headerObserver.observe(header, { childList: true });
        addLevelButtonToTitleBar(header);
    }

    function init() {
        window.addEventListener('load', () => {
            let header = document.querySelector<HTMLElement>('body section div div.d-header-wrap.drop-down-mode.ember-view');
            if (header) {
                addHeaderObserver(header);
            } else {
                let section = document.querySelector<HTMLElement>('section.ember-application');
                if (section) {
                    let mainObserver = new MutationObserver(_ => {
                        addHeaderObserver(section.querySelector<HTMLElement>('body section div div.d-header-wrap.drop-down-mode.ember-view')!);
                        mainObserver.disconnect();
                    });
                    mainObserver.observe(section, { childList: true });
                }
            }
        });

        window.addEventListener('unload', () => {
            if (headerObserver) {
                headerObserver.disconnect();
            }
        })
    }

    init();
})();