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

//emoji-picker__sections-nav
//emoji-picker__scrollable-content
//data-section
//d-menu-portals
export class Emoji {

    private moveElementToFirstBySelector(selector: string, root: Element, click: boolean = false) {
        let node = root.querySelector(selector);
        if (node) {
            root.insertBefore(node, root.children[0].nextSibling);
            if (click && node instanceof HTMLButtonElement) {
                node.click();
            }
        }
    }

    private customs: string[] = ['飞书', '小红书', 'b站', '贴吧'];

    private observe = new MutationObserver(() => {

        let loadTimes = 0;
        let emojiPicker = document.querySelector('div.emoji-picker');
        if (emojiPicker) {
            // dom元素存在没加载完的问题
            let timer = setInterval(() => {
                let emojiButtons = emojiPicker.querySelector("div.emoji-picker__sections-nav");
                let emojiContainer = emojiPicker.querySelector('div.emoji-picker__sections');
                if (emojiButtons && emojiContainer) {
                    for (const custom of this.customs) {
                        // emojiButtons.moveElementToFirstBySelector(`button[data-section="custom-${ custom }"]`);
                        // emojiContainer.moveElementToFirstBySelector(`div[data-section="custom-${ custom }"]`);
                        this.moveElementToFirstBySelector(`div[data-section="${ custom }"]`, emojiContainer);
                        this.moveElementToFirstBySelector(`button[data-section="${ custom }"]`, emojiButtons, custom === '贴吧');
                    }
                    clearInterval(timer);
                }
                loadTimes ++;
                if (loadTimes >= 300) {
                    console.warn('emoji 加载缓慢，跳过修正，下次打开表情面板即可正常显示。')
                    clearInterval(timer);
                }
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
            let menu = document.querySelector('div#d-menu-portals');
            if (menu) {
                this.observe.observe(menu, { childList: true });
            } else {
                console.error('querySelector:div.d-editor');
            }
        } else {
            this.observe.disconnect();
        }
    }
}