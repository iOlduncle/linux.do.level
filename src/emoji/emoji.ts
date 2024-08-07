import { observeDom } from "../utils";

// declare global {
//     interface Element {
//         moveElementToFirstBySelector(selector: string): void;
//     }
// }
//
// Element.prototype.moveElementToFirstBySelector = (selector: string): void => {
//     const select = Element.prototype.querySelector(selector);
//     if (select) {
//         Element.prototype.insertBefore(select, Element.prototype.children[0].nextSibling);
//     }
// }

export class Emoji {

    private moveElementToFirstBySelector(selector: string, root: Element) {
        let node = root.querySelector(selector);
        if (node) {
            root.insertBefore(node, root.children[0].nextSibling);
        }
    }

    private customs: string[] = ['飞书', '小红书', 'b站', '贴吧'];

    private observe = new MutationObserver(() => {

        let emojiPicker = document.querySelector('div.emoji-picker.opened');
        if (emojiPicker) {
            // dom元素存在没加载完的问题
            let timer = setInterval(() => {
                let emojiButtons = emojiPicker.querySelector("div.emoji-picker-category-buttons");
                let emojiContainer = emojiPicker.querySelector('div.emojis-container');
                if (emojiButtons && emojiContainer) {
                    for (const custom of this.customs) {
                        // emojiButtons.moveElementToFirstBySelector(`button[data-section="custom-${ custom }"]`);
                        // emojiContainer.moveElementToFirstBySelector(`div[data-section="custom-${ custom }"]`);
                        this.moveElementToFirstBySelector(`button[data-section="custom-${ custom }"]`, emojiButtons);
                        this.moveElementToFirstBySelector(`div[data-section="custom-${ custom }"]`, emojiContainer);
                    }
                }
                clearInterval(timer);
            });
        }
    });

    public init() {
        observeDom('div#reply-control', (replay) => {
            this.onReplayOpen(replay);
        });
    }

    private onReplayOpen(replay: Element) {
        if (replay.className.includes('open')) {
            let editor = replay.querySelector('div.d-editor');
            if (editor) {
                this.observe.observe(editor, { childList: true });
            } else {
                console.error('querySelector:div.d-editor');
            }
        } else {
            this.observe.disconnect();
        }
    }
}