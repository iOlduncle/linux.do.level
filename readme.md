# Linux.Do Level

- 查看 [Linux.Do](https://linux.do) 用户信用等级以及升级条件的油猴脚本，数据来源于 [Connect.Linux.Do](https://connect.linux.do) 
- ~~屏蔽邀请链接，防止自己的不小心。~~(站里现在已经不能发邀请链接).
- 帖子显示楼层号。
- 快捷复制 DeepXL Api Key。
- 将自定义的表情移动到前面，自定义滚动条样式，不然在 Windows 上太丑。
> 注意：目前 Connect 官方数据**只适合2级以上用户**使用，1，2也有办法适配，但是懒，不想做。

效果如下图
##
![效果图](https://raw.githubusercontent.com/iolduncle/linux.do.level/master/screenshot/1.4.2.webp)

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
## 1.4.2
- 适配新增自定义表情，将新增表情移动到最前面。
- 自定义表情选择框滚动条样式。
# 历史更新：
## 1.4.0
- deeplx api key 打码明显，防止截图泄漏。
- 将贴吧表情包移动到第一个位置。
- 移除邀请链接屏蔽功能。
## 1.3.1
- 适配新版的 Connect ，移除应用接入管理。
- DeepXL Api Key 新增快捷复制和跳转 Connect 按钮。
- 优化一些 UI 细节，新增非 200 的错误提示。
- 由于论坛现在已经屏蔽发送邀请链接，所以在考虑在下个版本移除相应的脚本功能。还有个人比较懒，就不上更新图了，自己安装看吧。
## 1.3.0
- 增加楼层显示
- 修复一些已知问题
## 1.2.0
- 修复标题栏新增 ChatGPT 按钮后，查看等级按钮会引起标题引起其他按钮功能异常问题(***将查看等级按钮移到，左侧导航栏的 Connect 链接，现在点击 Connect 链接，提出查看等级窗体，不在跳转到 connect 页面***)
- 新增屏蔽邀请链接
## 1.1.1
- 修复标题栏添加查看等级按钮后，会影响搜索按钮和个人信息按钮功能问题。
- 查看等级按钮新增加载指示。
## 1.1.0
- 适配了 Linux.Do 的主题。
- 修复查看等级窗口会遮挡聊天窗口问题。
- 修复查看等级按钮会消失的问题。
- 修复有些页面不显示查看等级按钮问题。

> 因为 [Connect.Linux.Do](https://connect.linux.do) 使用的同源策略，所以没法使用 iframe 嵌套显示，使用的油猴跨域。