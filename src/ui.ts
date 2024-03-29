import './style.css';
import { getLevelFromConnect } from "./http";

let levelWindow: HTMLElement | undefined = undefined;

export function createLevelButton(): HTMLLIElement {

    const loadingHTML = `
        <div class="widget-component-connector">
          <a class="icon btn-flat" tabindex="2" title="查看我的等级">
            <svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-ring">
              <circle cx="50" cy="50" r="30" stroke="#B3B5B4" stroke-width="10" fill="none"/>
              <circle cx="50" cy="50" r="30" stroke="#808281" stroke-width="10" fill="none" transform="rotate(144 50 50)">
                <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"/>
                <animate attributeName="stroke-dasharray" calcMode="linear" values="18.84955592153876 169.64600329384882;94.2477796076938 94.24777960769377;18.84955592153876 169.64600329384882" keyTimes="0;0.5;1" dur="1" begin="0s" repeatCount="indefinite"/>
              </circle> 
            </svg>
          </a>
        </div>`;

    const defaultHTML = `
        <div class="widget-component-connector">
          <a class="icon btn-flat" tabindex="2" title="查看我的等级">
            <svg class="fa d-icon d-icon-d-chat svg-icon svg-string" xmlns="http://www.w3.org/2000/svg"><use href="#discourse-sparkles"></use></svg>
          </a>
        </div>`;
    let li = document.createElement('li');
    li.className = 'header-dropdown-toggle chat-header-icon';
    li.setAttribute('id', 'level-button');
    li.innerHTML = `
        <div class="widget-component-connector">
            <a class="icon btn-flat" tabindex="2" title="查看我的等级">
                <svg class="fa d-icon d-icon-d-chat svg-icon svg-string" xmlns="http://www.w3.org/2000/svg"><use href="#discourse-sparkles"></use></svg>
            </a>
        </div>
    `;
    let loading = false;
    li.addEventListener('click', async () => {

        if (!loading && !levelWindow) {
            loading = true;
            li.innerHTML = loadingHTML;
            let result = await getLevelFromConnect();
            loading = false;
            li.innerHTML = defaultHTML;
            if (result.status) {
                levelWindow = createWindow(result.content);
                document.body.appendChild(levelWindow);
            } else {
                console.error(result.error);
            }
        } else if (levelWindow && !loading) {
            levelWindow.remove();
            levelWindow = undefined;
        }
    });

    return li;
}

export function createWindow(content: string): HTMLElement {

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
            root.remove();
            levelWindow = undefined;
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