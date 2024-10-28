import { observeDom } from "./utils";

export type DomEvents =
    'div#main-outlet'
    | 'div.post-stream'
    | 'div.chat-drawer-outlet-container'
    | 'div.container.posts section.topic-area div.ember-view';

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

    /**
     * 监听事件
     * @param name 事件名称
     * @param listener 事件监听器
     * @param dom 如果为 null，使用事件名称查找 dom, 不为空直接使用给定的 dom
     */
    public add(name: DomEvents, listener: Function, dom: Element | null = null): void {
        if (!this.listenerMap[name]) {
            this.listenerMap[name] = [];
        }

        if (this.listenerMap[name].length === 0) {

            let observe = dom === null ? observeDom(name, () => {
                this.domEmit(name);
            }) : observeDom(dom, () => {
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

    public emit(name: DomEvents): void {
        this.domEmit(name);
    }

    public clear(name: DomEvents): void {
        if (!this.listenerMap[name]) {
            return;
        }
        this.listenerMap[name] = [];
    }
}