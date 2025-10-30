import './style.css'
import { initMetaverse } from "./metaverse/metaverse";
import { initEmoji } from "./emoji/emoji";
import { initFloor } from "./floor/floor";

function init() {
    window.addEventListener('load', (event) => {
        if (event.target === document && !event.bubbles) {
            initFloor()
            initEmoji()
            initMetaverse();
        }
    });
}

init();