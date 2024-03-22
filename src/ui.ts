import './style.css';
import { getLevelFromConnect } from "./http";

let levelWindow: HTMLElement | undefined = undefined;

export function createLevelButton(): HTMLLIElement {

    let li = document.createElement('li');
    li.className = 'header-dropdown-toggle chat-header-icon';
    li.innerHTML = `
        <div class="widget-component-connector">
            <a class="icon btn-flat" tabindex="2" title="查看我的等级">
                <svg class="fa d-icon d-icon-d-chat svg-icon svg-string" xmlns="http://www.w3.org/2000/svg"><use href="#discourse-sparkles"></use></svg>
            </a>
        </div>
    `;
    li.addEventListener('click', () => {
        getLevelFromConnect(content => {
            if (levelWindow) {
                levelWindow.remove();
                levelWindow = undefined;
            } else {
                levelWindow = createWindow(content);
                document.body.appendChild(levelWindow);
            }
        });
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

    let div = root.querySelector<HTMLDivElement>('#content');
    if (div) {
        div.innerHTML = content;
    }

    let close = root.querySelector<HTMLSpanElement>('#close-button');
    if (close) {
        close.addEventListener('click', () => {
            root.remove();
            levelWindow = undefined;
        });
    }

    return root;
}