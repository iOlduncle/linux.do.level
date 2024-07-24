import { getLevelFromConnect } from "../http";
import { createWindow } from "./level-ui";
import { getLoadingSvg, showMessageBox } from "../component-ui";

export class Level {

    levelWindow: HTMLElement | undefined = undefined;
    loading: boolean = false;

    public init() {
        this.replaceConnectAnchor();
    }

    private loadDomFromString(content: string): HTMLElement {
        let parser = new DOMParser();
        return parser.parseFromString(content, 'text/html').body;
    }

    private showErrorAndGotoConnect(error: string) {
        showMessageBox(error, '错误', [{
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
        }]);
    }

    private getContentsFromDom(dom: HTMLElement): {
        status: boolean,
        error: string | null,
        title: Element | null,
        key: string | undefined,
        content: Element | null | undefined
    } {
        let title = dom.querySelector('h1.text-2xl');
        title?.querySelector('a[href="/logout"]')?.remove();
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

    private replaceConnectAnchor() {
        let connectAnchor = document.querySelector<HTMLAnchorElement>('a[href="https://connect.linux.do"]');
        if (connectAnchor) {
            connectAnchor.href = 'javascript:void(0);';
            connectAnchor.addEventListener('click', async () => {
                if (!this.loading && this.levelWindow === undefined) {
                    this.loading = true;
                    let icon = connectAnchor.querySelector('span.sidebar-section-link-prefix.icon');
                    if (icon) {
                        let defaultIcon = icon.innerHTML;
                        icon.innerHTML = getLoadingSvg();
                        let result = await getLevelFromConnect();
                        this.loading = false;
                        icon.innerHTML = defaultIcon;
                        if (result.status) {
                            let dom = this.loadDomFromString(result.content);
                            let body = this.getContentsFromDom(dom);

                            if (body.status) {
                                this.levelWindow = createWindow(body.title!, body.key!, body.content!, () => {
                                    this.close();
                                });
                                document.body.appendChild(this.levelWindow);
                            } else {
                                this.showErrorAndGotoConnect(body.error!);
                            }
                        } else {
                            this.showErrorAndGotoConnect(result.error);
                        }
                    }

                } else {
                    this.close();
                }
            });

            return;
        }
        console.error('replace connect anchor error.');
    }

    private close() {
        this.levelWindow!.remove();
        this.levelWindow = undefined;
    }
}