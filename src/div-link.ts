import { getLoadingSvg } from "./component-ui";

export class DivLink {
    public element: HTMLDivElement;
    private readonly icon: string;
    private iconSlot: Element;

    constructor(anchor: HTMLAnchorElement, title: string) {
        this.element = document.createElement('div');
        this.element.title = title;
        this.element.style.cursor = 'pointer';
        this.element.innerHTML = anchor.innerHTML;
        if (anchor.childElementCount === 1) {
            this.icon = anchor.firstElementChild!.outerHTML;
            this.iconSlot = this.element;
        } else if (anchor.childElementCount === 0) {
            this.icon = anchor.innerHTML;
            this.iconSlot = this.element;
        } else {
            const svg = this.element.querySelector('svg');
            if (svg) {
                this.icon = svg.outerHTML;
                this.iconSlot = svg.parentElement!;
            } else {
                throw new Error('没有找到图标');
            }
        }
    }

    public addClickListener(listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
        this.element.addEventListener('click', listener, options);
    }

    public setLoading(loading: boolean, size: number = 60) {
        this.iconSlot.innerHTML = loading ? getLoadingSvg(size) : this.icon;
    }

    public setClassName(className: string) {
        this.element.className = className;
    }

    public setStyle(style: string) {
        this.element.style.cssText = style;
    }

    public setAttribute(name: string, value: string) {
        this.element.setAttribute(name, value);
    }
}