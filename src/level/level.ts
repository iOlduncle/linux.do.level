import { getLevelFromConnect } from "../http";
import { createWindow } from "./level-ui";
import { getLoadingSvg } from "../component-ui";
export class Level {

    levelWindow: HTMLElement | undefined = undefined;
    loading: boolean = false;

    public init() {
        this.replaceConnectAnchor();
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
                            this.levelWindow = createWindow(result.content, () => {
                                this.levelWindow?.remove();
                                this.levelWindow = undefined;
                            });
                            document.body.appendChild(this.levelWindow);
                        } else {
                            console.error(result.error);
                        }
                    }

                } else {
                    this.levelWindow!.remove();
                    this.levelWindow = undefined;
                }
            });

            return;
        }
        console.error('replace connect anchor error.');
    }
}