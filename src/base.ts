import { showMessageBox } from "./component-ui";

export class Base {
    public showInfo(title: string, content: string, onClose?: () => void) {
        showMessageBox(content, title, [{
            text: '确认',
            type: 'btn-primary',
            onClicked: () => {
                if (onClose) {
                    onClose();
                }
            }
        }]);
    }

    public showError(title: string, content: string, onClose?: () => void) {
        showMessageBox(content, title, [{
            text: '确认',
            type: 'btn-danger',
            onClicked: () => {
                if (onClose) {
                    onClose();
                }
            }
        }]);
    }
}