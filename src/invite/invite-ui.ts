
export interface MessageBoxButton {
    text: string;
    type: 'btn-danger' | 'btn-primary' | '';
    onClicked: () => void;
}

export function showMessageBox(message: string, title: string, buttons: MessageBoxButton[] = [
    {
        text: '确认',
        type: 'btn-primary',
        onClicked: function () {
        }
    }
]) {

    let root = document.querySelector('div.modal-container');
    if (root) {
        let box = document.createElement('div');
        box.id = 'message-box';
        box.className = 'ember-view modal d-modal discard-draft-modal';
        box.setAttribute('data-keyboard', 'false');
        box.setAttribute('aria-modal', 'true');
        box.setAttribute('role', 'dialog');
        box.innerHTML = `
        <div class="d-modal__container">
            <div class="d-modal__header">${ title }</div>
            <div class="d-modal__body" tabindex="-1">
              <div class="instructions">
              ${ message }
              </div>
            </div>
            <div class="d-modal__footer">
            </div>
        </div>`;

        let backdrop = document.createElement('div');
        backdrop.className = 'd-modal__backdrop';
        root.appendChild(backdrop);
        let footer = box.querySelector('div.d-modal__footer');
        if (footer) {
            for (const button of buttons) {
                let btnElement = document.createElement('button');
                btnElement.className = 'btn btn-text ' + button.type;
                btnElement.setAttribute('type', 'button');
                btnElement.innerHTML = `
               <span class="d-button-label">
                    ${ button.text }
               </span>
            `;
                btnElement.addEventListener('click', () => {
                    button.onClicked();
                    box.remove();
                    backdrop.remove();
                });
                footer.appendChild(btnElement);
            }
            root.appendChild(box);
        }
    }
}

