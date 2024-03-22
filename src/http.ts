import { GM } from "$";

export function getLevelFromConnect(onLoad: (content: string) => void): void {
    GM.xmlHttpRequest({
        method: "GET",
        url: 'https://connect.linux.do',
        onload: (response) => {
            let regx = /<body[^>]*>([\s\S]+?)<\/body>/i;
            let contents = regx.exec(response.responseText);
            if (contents) {
                onLoad(contents[1].replace('<a href="/logout" target="_self" class="text-blue-500 hover:underline" title="LINUX DO登录也会退出">退出</a>', ''));
            }
        }
    });
}


