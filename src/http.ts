import { GM } from "$";

interface LevelContentResult {
    status: boolean;
    content: string;
    error: string;
}

export async function getLevelFromConnect(): Promise<LevelContentResult> {
    return await new Promise<LevelContentResult>((resolve, reject) => {
        GM.xmlHttpRequest({
            method: "GET",
            url: 'https://connect.linux.do',
            onload: (response) => {
                let regx = /<body[^>]*>([\s\S]+?)<\/body>/i;
                let contents = regx.exec(response.responseText);
                if (contents) {
                    const content = contents[1].replace('<a href="/logout" target="_self" class="text-blue-500 hover:underline" title="LINUX DO登录也会退出">退出</a>', '');
                    resolve({
                        status: true,
                        content: content,
                        error: ''
                    });
                }
            },
            onerror: (e) => {
                reject({ status: false, error: e.error, content: '' });
            }
        });
    });
}
