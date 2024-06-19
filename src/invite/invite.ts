import { MessageBoxButton, showMessageBox } from "./invite-ui";
import { isOnTopicPage, observeDom } from "../utils";
import { DomEventBus } from "../dom-event-bus";

export class Invite {
    private fixInviteAnchors(container?: Element) {
        const selector = 'a[href^="https://linux.do/invites/"]';
        let anchors = Array.from(container ?
            container.querySelectorAll<HTMLAnchorElement>(selector) :
            document.querySelectorAll<HTMLAnchorElement>(selector));
        for (const anchor of anchors) {
            const inviteUrl = anchor.href;
            // console.log(inviteUrl);
            anchor.href = 'javascript:void(0);';
            anchor.onclick = null;
            let buttons: MessageBoxButton[] = [
                {
                    text: '我就是想被下限', type: 'btn-danger', onClicked: () => {
                        window.location.href = inviteUrl;
                    }
                },
                {
                    text: '差点就不干净了', type: '', onClicked: () => {
                    }
                }
            ];
            anchor.addEventListener('click', () => {
                showMessageBox('这是一个邀请连接，虽然你已经注册，但是跳转后，你仍会成为邀请人的下线。', '警告', buttons);
            });
        }
    }

    private observeMainOutlet() {
        let observe: MutationObserver | null = null;
        DomEventBus.getInstance().add('div#main-outlet',()=>{
            if (isOnTopicPage()) {
                this.fixInviteAnchors();
                observe = observeDom('div#main-outlet div.container.posts div.row div.ember-view', (dom) => {
                    this.fixInviteAnchors(dom);
                });
            } else {
                observe?.disconnect();
            }
        });
    }

    public init() {
        this.fixInviteAnchors();
        this.observeMainOutlet();
    }
}
