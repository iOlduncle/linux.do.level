export function createUI(context: HTMLElement, onClose: () => void): HTMLDivElement {
    const plane = `
          <div class="panel-body">
            <div class="panel-body-contents">
              <div id="quick-access-all-notifications" class="quick-access-panel metaverse">
                ${ context.innerHTML }
              </div>
            </div>
          </div>`;

    const root = document.createElement('div');
    root.className = 'user-menu-dropdown-wrapper';
    root.setAttribute('tabindex', '0')
    const body = document.createElement('div');
    body.className = 'user-menu revamped menu-panel show-avatars drop-down';
    body.setAttribute('data-tab-id', 'all-notifications');
    body.setAttribute('data-max-width', '320')
    body.style.padding = '1em';


    body.innerHTML = plane;
    root.appendChild(body)
    const closeButton = document.createElement('div');
    closeButton.className = 'panel-body-bottom btn no-text btn-default show-all metaverse-show-all';
    closeButton.innerHTML = '关闭'
    closeButton.addEventListener('click', () => {
        onClose();
    })
    body.appendChild(closeButton);
    return root;
}
