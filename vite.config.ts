import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        monkey({
            entry: 'src/main.ts',
            userscript: {
                icon: 'https://cdn.linux.do/user_avatar/linux.do/io.oi/48/98155_2.png',
                namespace: 'https://linux.do/u/io.oi/s/level',
                match: ['https://linux.do/*'],
                grant: 'GM.xmlHttpRequest',
                author: 'LINUX.DO',
                description: 'Linux.Do 查看用户信任级别以及升级条件，数据来源于 https://connect.linux.do',
                version: '1.4.3',
                license: 'MIT',
                connect: ['connect.linux.do']
            },
        }),
    ],
});
