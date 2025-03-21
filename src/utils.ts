type ObserveDomChanged = (dom: Element) => void;

export function observeDom(selector: string | Element, onChanged: ObserveDomChanged, option?: MutationObserverInit): MutationObserver | null {

    let dom = typeof selector === "string" ? document.querySelector(selector) : selector;
    if (dom) {
        const observer = new MutationObserver(() => {
            onChanged(dom);
        });
        observer.observe(dom, option ? option : { childList: true });
        return observer;
    } else {
        console.error(`query dom error: [${ selector }]`);
        return null;
    }
}

export function random(min: number, max: number) {
    const range = max - min;
    const rand = Math.random();
    return (min + Math.round(rand * range));
}

export function isOnTopicPage(): boolean {
    return window.location.href.includes('https://linux.do/t/topic');
}