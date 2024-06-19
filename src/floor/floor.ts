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
            if (isOnTopicPage()) {
                this.eventBus.add('div.container.posts section.topic-area div.ember-view', () => {
                    if (isOnTopicPage()) {
                        // console.warn('page changed');
                        this.fixFloorDom();
                    }
                });
                this.fixFloorDom();
            } else {
                this.eventBus.clear('div.container.posts section.topic-area div.ember-view');
            }
        };

        this.eventBus.add('div#main-outlet', changed);
    }

    private fixFloorDom() {
        let floors = Array.from(document.body.querySelectorAll<HTMLDivElement>('div.container.posts section.topic-area div.ember-view div.topic-post.clearfix.regular'));
        for (const floor of floors) {

            if (floor.querySelector('button#floor-button')) {
                continue;
            }
            let article = floor.querySelector('article');
            if (article) {
                let id = article.getAttribute('id')?.replace('post_', '');
                let actions = floor.querySelector('article section nav div.actions');
                actions?.appendChild(createFloor(id ? id:'??'));
            }
        }
    }

    public init() {
        this.observeUrl();
    }
}