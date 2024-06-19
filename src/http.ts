import { GM } from "$";
// import { http } from "@tauri-apps/api";
// import { ResponseType } from "@tauri-apps/api/http";

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


// export async function getLevelFromConnect(): Promise<string | null> {
//     const logoutText = '<a href="/logout" target="_self" class="text-blue-500 hover:underline" title="LINUX DO登录也会退出">退出</a>';
//     let response = await http.fetch<string>('https://connect.linux.do', {
//         method: "GET",
//         responseType: ResponseType.Text,
//         headers:{
//             'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
//             'Cookie': document.cookie
//         }
//     });
//     let regx = /<body[^>]*>([\s\S]+?)<\/body>/i;
//     let contents = regx.exec(response.data.replace(logoutText,''));
//     return contents ? contents[1] : null;
// }
