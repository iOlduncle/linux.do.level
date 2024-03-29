import { createLevelButton, } from './ui';


(() => {

    let headerObserver: MutationObserver | undefined = undefined;

    function fixSearchButton(titleBar: HTMLUListElement) {
        let search = titleBar.childNodes[1];
        if (search) {
            titleBar.removeChild(search);
            titleBar.prepend(search);
        }
        titleBar.prepend(createLevelButton());
    }

    function fixPeopleButton(titleBar: HTMLUListElement) {
        if (titleBar.lastChild) {
            titleBar.lastChild.addEventListener('click', () => {
                if (titleBar.parentElement && titleBar.parentElement.lastChild) {
                    if (titleBar.parentElement.lastChild.nodeName === 'DIV') {
                        titleBar.parentElement.removeChild(titleBar.parentElement.lastChild);
                    }
                }
            });
        }
    }

    function addLevelButtonToTitleBar(header: HTMLElement) {
        let titleBar = header.querySelector<HTMLUListElement>('header div div div.panel ul.icons.d-header-icons');
        if (titleBar) {
            if (titleBar.querySelector<HTMLLIElement>('li#level-button')) {
                return;
            }

            fixSearchButton(titleBar);

            fixPeopleButton(titleBar);

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