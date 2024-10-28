import { DomEventBus } from "../dom-event-bus";
import { createFloor } from "./floor-ui";
import { isOnTopicPage } from "../utils";

export class Floor {

    private readonly eventBus: DomEventBus;

    constructor() {
        this.eventBus = DomEventBus.getInstance();
    }

    private observeUrl() {
        const changed = () => {
            // console.log('div#main-outlet changed.');
            if (isOnTopicPage()) {
                // let postView = document.querySelector('div.post-stream')?.parentElement;
                // this.eventBus.add('div.post-stream', () => {
                //     console.log('div.post-stream changed.');
                //     if (isOnTopicPage()) {
                //         this.fixFloorDom();
                //     }
                // }, postView);

                this.eventBus.add('div.post-stream', () => {
                    if (isOnTopicPage()) {
                        this.fixFloorDom();
                    }
                });
                this.fixFloorDom();
            } else {
                this.eventBus.clear('div.container.posts section.topic-area div.ember-view');
            }
        };

        this.eventBus.add('div#main-outlet', changed);

        if (isOnTopicPage()) {
            this.eventBus.emit('div#main-outlet');
        }
    }

    private fixFloorDom() {
        let timer = setInterval(() => {
            let floors = Array.from(document.querySelectorAll<HTMLDivElement>('div.container.posts section.topic-area div.ember-view div.topic-post'));
            for (const floor of floors) {
                if (floor.querySelector('button#floor-button')) {
                    continue;
                }
                let article = floor.querySelector('article');
                if (article) {
                    let id = article.getAttribute('id')?.replace('post_', '');
                    let actions = floor.querySelector('article section nav div.actions');
                    const button = createFloor(id ? id : '??');
                    actions?.appendChild(button);
                }
            }
            clearInterval(timer);
        });
    }

    public init() {
        this.observeUrl();
    }
}