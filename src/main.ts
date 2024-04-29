import { Invite } from "./invite/invite";
import { Level } from "./level/level";
import './style.css';
// import { Like } from "./like/like";

(() => {
    function init() {
        window.addEventListener('load', () => {
            new Level().init();
            new Invite().init();
            // new Like().init();
        });
    }

    init();
})();