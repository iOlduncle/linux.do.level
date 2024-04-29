# Linux.Do Level

查看 [Linux.Do](https://linux.do) 用户信用等级以及升级条件的油猴脚本，数据来源于 [Connect.Linux.Do](https://connect.linux.do) 

> 注意：目前 Connect 官方数据**只适合2级以上用户**使用

效果如下图
## 1.2.0

![效果图](https://raw.githubusercontent.com/iolduncle/linux.do.level/master/screenshot/1.2.0.webp)

## 1.1.1 之前
![效果图](https://raw.githubusercontent.com/iolduncle/linux.do.level/master/screenshot/level.webp)

# 安装
[Greasy Fork 脚本地址](https://greasyfork.org/zh-CN/scripts/490520-linux-do-level)

# 编译
```shell
git clone https://github.com/iolduncle/linux.do.level.git

cd linux.do.level

npm install
npm run build
```

# 本次更新
## 1.2.0
- 修复标题栏新增 ChatGPT 按钮后，查看等级按钮会引起标题引起其他按钮功能异常问题(***将查看等级按钮移到，左侧导航栏的 Connect 链接，现在点击 Connect 链接，提出查看等级窗体，不在跳转到 connect 页面***)
- 新增屏蔽邀请链接

# 历史更新：
## 1.1.1
- 修复标题栏添加查看等级按钮后，会影响搜索按钮和个人信息按钮功能问题。
- 查看等级按钮新增加载指示。
## 1.1.0
- 适配了 Linux.Do 的主题。
- 修复查看等级窗口会遮挡聊天窗口问题。
- 修复查看等级按钮会消失的问题。
- 修复有些页面不显示查看等级按钮问题。

> 因为 [Connect.Linux.Do](https://connect.linux.do) 使用的同源策略，所以没法使用 iframe 嵌套显示，使用的油猴跨域。