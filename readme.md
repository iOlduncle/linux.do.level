# Linux.Do Level

查看 [Linux.Do](https://linux.do) 用户信用等级以及升级条件的油猴脚本，数据来源于 [Connect.Linux.Do](https://connect.linux.do)

效果如下图

![效果图](https://raw.githubusercontent.com/iOlduncle/linux.do.level/master/screenshot/level.png)

# 编译
```shell
git clone https://github.com/iolduncle/linux.do.level.git

cd linux.do.level

npm install
npm build
```
```typescript

// 这里使用 setTimeout 是因为在有些页面下，document.querySelector() 查询不到内容，懒没有找原因，就这么将就一下。

function init() {
    window.addEventListener('load', () => {
        let timer = setTimeout(() => {
            let titleBar = document.querySelector("body section div div header div div div.panel ul.icons.d-header-icons");
            if (titleBar) {
                let button = createLevelButton();
                titleBar.prepend(button);
                clearTimeout(timer);
            }
        },500);
    });
}

```
> 因为 [Connect.Linux.Do](https://connect.linux.do) 使用的同源策略，所以没法使用 iframe 嵌套显示，使用的油猴跨域。