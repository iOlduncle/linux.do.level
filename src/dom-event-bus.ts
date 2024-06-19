import { observeDom } from "./utils";

export type DomEvents = 'div#main-outlet' | 'div.chat-drawer-outlet-container' | 'div.container.posts section.topic-area div.ember-view';

export class DomEventBus {
    private static instance: DomEventBus;
    private readonly listenerMap: { [name: string]: Function[] }
    private readonly observeMap: { [name: string]: MutationObserver }

    private constructor() {
        this.listenerMap = {};
        this.observeMap = {};
    }

    public static getInstance(): DomEventBus {
        if (!this.instance) {
            this.instance = new DomEventBus();
        }
        return this.instance;
    }

    public add(name: DomEvents, listener: Function): void {
        if (!this.listenerMap[name]) {
            this.listenerMap[name] = [];
        }

        if (this.listenerMap[name].length === 0) {
            let observe = observeDom(name, () => {
                this.domEmit(name);
            });

            if (observe) {
                this.observeMap[name] = observe;
            }
        }

        this.listenerMap[name].push(listener);
    }

    private domEmit(event: DomEvents): void {
        const listeners = this.listenerMap[event];
        if (listeners) {
            for (const listener of listeners) {
                listener();
            }
        }
    }

    public clear(name: DomEvents): void {
        if (!this.listenerMap[name]) {
            return;
        }
        this.listenerMap[name] = [];
    }
}