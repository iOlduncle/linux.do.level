import { GM } from "$";

interface HttpRequestResult {
    status: boolean;
    content: string;
    error: string;
}

interface MetaverseResult {
    status: boolean;
    content: HTMLDivElement | null;
    error: string;
}

export async function getLevelFromConnect(): Promise<HttpRequestResult> {
    return await new Promise<HttpRequestResult>((resolve, reject) => {
        GM.xmlHttpRequest({
            method: "GET",
            url: 'https://connect.linux.do',
            onload: (response) => {
                let regx = /<body[^>]*>([\s\S]+?)<\/body>/i;
                let contents = regx.exec(response.responseText);
                if (contents && contents.length > 1) {
                    resolve({
                        status: true,
                        content: contents[1],
                        error: ''
                    });
                } else {
                    resolve({
                        status: false,
                        content: '',
                        error: '解析 Connect 数据错误。'
                    });
                }
            },
            onerror: (e) => {
                reject({ status: false, error: e.error, content: '' });
            }
        });
    });
}

export async function getMetaverse(): Promise<MetaverseResult> {
    return await new Promise<MetaverseResult>((resolve, reject) => {
        GM.xmlHttpRequest({
            method: "GET",
            url: 'https://linux.do/pub/resources',
            onload: (response) => {
                const dom = new DOMParser().parseFromString(response.responseText, 'text/html');
                const div = dom.querySelector<HTMLDivElement>('div.published-page-content-body');
                if (div) {
                    resolve({
                        status: true,
                        content: div,
                        error: ''
                    });
                } else {
                    resolve({
                        status: false,
                        content: null,
                        error: '解析数据错误。'
                    });
                }
            },
            onerror: (e) => {
                reject({ status: false, error: e.error, content: '' });
            }
        })
    })
}
