import { observeDom } from "../utils";

export class Emoji {

    private observe = new MutationObserver(() => {

        let emojiPicker = document.querySelector('div.emoji-picker.opened');
        if (emojiPicker) {
            // dom元素存在没加载完的问题
            let timer = setInterval(() => {
                let emojiButtons = emojiPicker.querySelector("div.emoji-picker-category-buttons");
                if (emojiButtons) {
                    let last = emojiButtons.lastElementChild! as HTMLDivElement;
                    emojiButtons.insertBefore(last, emojiButtons.children[0].nextSibling);
                }
                let emojiContainer = emojiPicker.querySelector('div.emojis-container');
                if (emojiContainer) {

                    let last = emojiContainer.lastElementChild! as HTMLDivElement;
                    emojiContainer.insertBefore(last, emojiContainer.children[0].nextSibling);
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