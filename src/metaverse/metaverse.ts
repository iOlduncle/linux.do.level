import { getLevelFromConnect, getMetaverse } from "../http";
import { createUI } from "./metaverse-ui";
import { showMessageBox } from "../component-ui";
import { Base } from "../base";
import { createWindow } from "../level/level-ui";
import { DivLink } from "../div-link";

class Metaverse extends Base {

    metaverseWindow: HTMLDivElement | undefined = undefined;
    connectWindow: HTMLElement | undefined = undefined;

    public init() {
        this.relaceMetaverseAnchor();
        this.relaceConnectAnchor()
    }

    private relaceConnectAnchor() {
        let connectAnchor = document.querySelector<HTMLAnchorElement>('a[href="https://connect.linux.do"]');
        if (connectAnchor) {
            const link = new DivLink(connectAnchor, 'LINUX DO Connect');
            link.setClassName('sidebar-section-link sidebar-row');
            link.addClickListener(async () => {
                link.setLoading(true)
                await this.onConnectLinkClicked();
                link.setLoading(false)
            });
            connectAnchor.parentElement?.appendChild(link.element);
            connectAnchor.remove();
        }
    }

    private relaceMetaverseAnchor() {
        let metaverseAnchor = document.querySelector<HTMLAnchorElement>('a[href="https://linux.do/pub/resources"]');
        if (metaverseAnchor) {
            const link = new DivLink(metaverseAnchor, '点击：社区子系统和元宇宙\nCTRL+点击：LINUX DO Connect');
            link.setClassName('btn no-text icon btn-flat');
            link.addClickListener(async (e) => {
                link.setLoading(true)
                await this.onMetaverseLinkClicked(e as MouseEvent)
                link.setLoading(false)
            });
            metaverseAnchor.parentElement?.appendChild(link.element);
            metaverseAnchor.remove();
        }
    }

    private async onMetaverseLinkClicked(event: MouseEvent) {
        if (event.ctrlKey) {
            await this.onConnectLinkClicked();
        } else {
            if (this.metaverseWindow) {
                this.closeMetaverseWindow();
                return;
            }
            const metaverse = await getMetaverse();
            if (metaverse.status) {
                if (this.connectWindow) {
                    this.closeConnectWindow();
                }
                this.metaverseWindow = createUI(metaverse.content!, () => {
                    this.closeMetaverseWindow();
                });

                const connect = this.metaverseWindow.querySelector<HTMLAnchorElement>('a[href="https://connect.linux.do"]');
                if (connect) {
                    connect.parentElement?.appendChild(this.createConnectDivLink(connect).element);
                    connect.remove();
                }

                const header = document.querySelector<HTMLDivElement>('div.panel[role=navigation]');
                if (header) {
                    header.appendChild(this.metaverseWindow)
                } else {
                    console.error('query div.panel[role=navigation] error')
                }
            } else {
                this.showError('错误', metaverse.error);
                console.error(metaverse.error);
            }
        }
    }

    private createConnectDivLink(connect: HTMLAnchorElement): DivLink {
        const link = new DivLink(connect, 'LINUX DO Connect');
        link.setClassName('metaverse-div-link');
        link.addClickListener(async () => {
            await this.onConnectLinkClicked();
        });
        return link;
    }

    private async onConnectLinkClicked() {
        if (this.connectWindow) {
            this.closeConnectWindow();
            return;
        }
        const result = await getLevelFromConnect();
        if (result.status) {
            const connect = this.loadDomFromString(result.content);
            this.createConnectWindow(connect);
            this.closeMetaverseWindow();
        } else {
            showMessageBox(result.error, '错误', [{
                text: '确认',
                type: 'btn-primary',
                onClicked: () => {
                }
            }, {
                text: '前往 Connect 查看',
                type: '',
                onClicked: () => {
                    window.open('https://connect.linux.do/', '_blank');
                }
            }])
        }
    }

    private loadDomFromString(content: string): HTMLElement {
        let parser = new DOMParser();
        return parser.parseFromString(content, 'text/html').body;
    }

    private getContentsFromDom(dom: HTMLElement): {
        status: boolean,
        error: string | null,
        title: Element | null,
        key: string | undefined,
        content: Element | null | undefined
    } {
        let title = dom.querySelector('h1.text-2xl');
        title?.querySelector('a[href^="/logout/"]')?.remove();
        let levelTable = dom.querySelector('div.bg-white.p-6.rounded-lg.mb-4.shadow table')?.parentElement;
        let key = dom.querySelector('div.bg-white.p-6.rounded-lg.mb-4.shadow p strong')?.innerHTML;
        let status = key !== undefined && levelTable !== null;
        return {
            status: status,
            key: key,
            title: title,
            content: levelTable,
            error: status ? null : '解析 Connect 数据错误。'
        };
    }

    private createConnectWindow(content: HTMLElement) {

        const connect = this.getContentsFromDom(content);
        if (connect.status) {
            this.connectWindow = createWindow(connect.title!, connect.key!, connect.content!, () => {
                this.closeConnectWindow();
            });
            document.body.appendChild(this.connectWindow);
        } else {
            this.showError('错误', connect.error!);
        }
    }

    private closeConnectWindow() {
        if (this.connectWindow) {
            this.connectWindow.remove();
            this.connectWindow = undefined;
        }
    }

    private closeMetaverseWindow() {
        if (this.metaverseWindow) {
            this.metaverseWindow.remove();
            this.metaverseWindow = undefined;
        }
    }
}

export function initMetaverse() {
    const metaverse = new Metaverse();
    metaverse.init();
}