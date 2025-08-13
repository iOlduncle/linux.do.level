// import { Invite } from "./invite/invite";
import {Level} from "./level/level";
// import { Like } from "./like/like";
import {Floor} from "./floor/floor";

import './style.css'
import {Emoji} from "./emoji/emoji";
import {Menu} from "./menu/menu";

function init() {
    window.addEventListener('load', (event) => {
        if (event.target === document && !event.bubbles) {
            new Level().init();
            // new Invite().init();
            // new Like().init();
            new Floor().init();
            new Emoji().init();
            new Menu().init();
        }
    });
}

init();