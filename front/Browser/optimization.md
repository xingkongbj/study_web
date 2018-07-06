# 页面加速

## 雅虎军规

- 尽量减少 HTTP 请求个数——须权衡
- 使用 CDN（内容分发网络）
- 为文件头指定 Expires 或 Cache-Control ，使内容具有缓存性。
- 避免空的 src 和 href
- 使用 gzip 压缩内容
- 把 CSS 放到顶部
- 把 JS 放到底部
- 避免使用 CSS 表达式
- 将 CSS 和 JS 放到外部文件中
- 减少 DNS 查找次数
- 精简 CSS 和 JS
- 避免跳转
- 剔除重复的 JS 和 CSS
- 配置 ETags
- 使 AJAX 可缓存
- 尽早刷新输出缓冲
- 使用 GET 来完成 AJAX 请求
- 延迟加载
- 预加载
- 减少 DOM 元素个数
- 根据域名划分页面内容
- 尽量减少 iframe 的个数
- 避免 404
- 减少 Cookie 的大小
- 使用无 cookie 的域
- 减少 DOM 访问
- 开发智能事件处理程序
- 用 < link > 代替 @import
- 避免使用滤镜
- 优化图像
- 优化 CSS Spirite
- 不要在 HTML 中缩放图像——须权衡
- favicon.ico要小而且可缓存
- 保持单个内容小于25K
- 打包组件成复合文本