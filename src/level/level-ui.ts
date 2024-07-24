import { DomEventBus } from "../dom-event-bus";

function createCodeElement(key: string): HTMLDivElement {

    let copied: boolean = false;
    let root = document.createElement('div');
    root.className = 'bg-white p-6 rounded-lg mb-4 shadow';
    root.innerHTML = `
        <h2>DeepLX Api Key</h2>
        <div class="code-box">
            <span class="hljs language-text">${ key }</span>
        </div>
    `;

    let copyButton = document.createElement('span');
    copyButton.className = 'copy';
    copyButton.innerHTML = '复制';
    copyButton.addEventListener('click', async () => {
        if (!copied) {
            await navigator.clipboard.writeText(key);
            copied = true;
            copyButton.innerHTML = '已复制';
            let timer = setTimeout(() => {
                copied = false;
                copyButton.innerHTML = '复制';
                clearInterval(timer);
            }, 2000);
        }
    });

    root.querySelector('div.code-box')?.appendChild(copyButton);

    let connectButton = document.createElement('a');
    connectButton.className = 'btn btn-primary connect-button';
    connectButton.href = 'https://connect.linux.do';
    connectButton.target = '_blank';
    connectButton.innerHTML = '前往 Connect 站';
    root.appendChild(connectButton);
    return root;
}

export function createWindow(title: Element, key: string, levelTable: Element, onClose: () => void): HTMLElement {

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

    let window = root.querySelector('div#content');

    if (window) {
        window.appendChild(title);
        window.appendChild(createCodeElement(key));
        window.appendChild(levelTable);
    }

    let close = root.querySelector<HTMLSpanElement>('span#close-button');
    close?.addEventListener('click', onClose);

    DomEventBus.getInstance().add('div.chat-drawer-outlet-container', () => {
        let chat = document.querySelector('div.chat-drawer.is-expanded');
        root.style.right = chat ? '430px' : '15px';
    });

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
