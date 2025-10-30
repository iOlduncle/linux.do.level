import { DomEventBus } from "../dom-event-bus";
import { createFloor } from "./floor-ui";
import { isOnTopicPage, observeDom } from "../utils";

class Floor {

    private readonly eventBus: DomEventBus;
    private floorObservers: { [key: string]: MutationObserver };

    constructor() {
        this.eventBus = DomEventBus.getInstance();
        this.floorObservers = {};
    }

    private observeUrl() {
        const changed = () => {
            const timer = setInterval(() => {
                if (isOnTopicPage()) {
                    this.eventBus.add('div.post-stream', () => {
                        if (isOnTopicPage()) {
                            this.fixFloorDom();
                        }
                    });
                    this.fixFloorDom();
                } else {
                    this.clearFloorObservers();
                    this.eventBus.clear('div.post-stream');
                }
                clearInterval(timer);
            });
        };

        this.eventBus.add('div#main-outlet', changed);

        if (isOnTopicPage()) {
            this.eventBus.emit('div#main-outlet');
        }
    }

    private clearFloorObservers() {
        for (const key in this.floorObservers) {
            this.floorObservers[key].disconnect();
        }
        this.floorObservers = {};
    }

    private fixFloorDom() {
        let timer = setInterval(() => {
            let floors = Array.from(document.querySelectorAll<HTMLDivElement>('div.post-stream > div'));
            for (const floor of floors) {
                this.fix(floor);
            }
            clearInterval(timer);
        });
    }

    private fix(floor: HTMLDivElement) {

        const number = floor.getAttribute('data-post-number');
        if (number) {
            if (floor.className !== 'post-stream--cloaked') {
                if (floor.querySelector('button#floor-button')) {
                    return;
                }
                const actions = floor.querySelectorAll('article section nav div.actions');
                // const floorLink = new DivLink(`<span class='d-button-label floor-text'>#${number}</span>`, `${}`);
                // floorLink.setClassName('btn no-text btn-icon btn-flat');
                // floorLink.setAttribute('','')

                const floorButton = createFloor(number);
                if (actions.length > 0) {
                    const i = actions.length === 2 ? 1 : 0;
                    actions[i].appendChild(floorButton);
                } else {
                    console.error('query actions error.');
                }

                if (!this.floorObservers[number]) {
                    const observer = observeDom(floor, () => {
                        this.fix(floor);
                    }, { childList: true });
                    this.floorObservers[number] = observer!;
                }
            }
        }

    }

    public init() {
        this.observeUrl();
    }
}

export function initFloor() {
    new Floor().init();
}