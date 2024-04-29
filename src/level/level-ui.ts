
export function createWindow(content: string, onClose: () => void): HTMLElement {

    let root = document.createElement('div');
    root.setAttribute('id', 'level-window');
    root.className = 'level-window';
    root.style.right = document.querySelector('div.chat-drawer.is-expanded') ? '430px' : '15px';
    root.innerHTML = `
     <div class="title">
         <span class="close" id="close-button">
              <svg class="fa d-icon d-icon-times svg-icon svg-string" xmlns="http://www.w3.org/2000/svg">
                  <use href="#times"></use>
              </svg>
         </span>
         <div id="content" class="content"></div>
     </div>`;

    let container = root.querySelector<HTMLDivElement>('div#content');
    if (container) {
        container.innerHTML = content;
    }

    let close = root.querySelector<HTMLSpanElement>('span#close-button');
    if (close) {
        close.addEventListener('click', () => {
            onClose();
        });
    }

    let chatContainer = document.querySelector('div.chat-drawer-outlet-container');
    if (chatContainer) {
        let observer = new MutationObserver(_ => {
            let chat = document.querySelector('div.chat-drawer.is-expanded');
            root.style.right = chat ? '430px' : '15px';
        });
        observer.observe(chatContainer, { childList: true })
    }

    return root;
}

// export const defaultSvg = `<svg class="fa d-icon d-icon-link svg-icon prefix-icon svg-string" xmlns="http://www.w3.org/2000/svg"><use href="#link"></use></svg>`;