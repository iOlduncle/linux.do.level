// import { Invite } from "./invite/invite";
import { Level } from "./level/level";
// import { Like } from "./like/like";
import { Floor } from "./floor/floor";

import './style.css'
import { Emoji } from "./emoji/emoji";

function init() {
    window.addEventListener('load', () => {
        new Level().init();
        // new Invite().init();
        // new Like().init();
        new Floor().init();
        new Emoji().init();
    });
}

init();