# CSP内容安全策略

## CSP 介绍

CSP 全称为 Content Security Policy，即内容安全策略，是一种开发者定义的安全策略声明，可以阻止恶意内容在受信 web 页面上下文中的执行，减少 XSS、clickjacking、code inject 等攻击。其主要以“白名单”的形式指定可信的内容来源，或是控制一些安全相关的选项。

## CSP 策略类型

- Content-Security-Policy: 对违反策略的资源进行拦截阻止
- Content-Secuirty-Policy-Report-Only: 对违例进行上报，不会阻止

## CSP 策略语法

```
Content-Security-Policy: default-src 'self'; script-src 'self' *.example.com;
```

- 可以由多个指令组成，使用分好进行间隔。
- 一条指令包含一个指令名和一个内容源列表，均使用空格间隔。
- 内容源列表即为白名单。

## CSP 使用方式

### html 的 meta 标签

- meta 标签后设置生效
- 不能动态修改
- 不支持 Content-Security-Policy-Report-Only 和 report-uri，frame-ancestors，sandbox

```
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
```

### http 响应头

```
Content-Security-Policy: default-src 'self'
```

## CSP 指令

### 引入

关键字 | 说明
--- | ---
default-src | 未指定指令时，使用该指令的列表。
script-src | 脚本
style-src | 样式
img-src | 图片
font-src | @font-face
media-src | < audio > < video > < track >
object-src | < object > < embed > < applet >
frame-src | < iframe > < frame >
worker-src | Worker、SharedWorker、ServiceWorker
manifest-src | manifest.json
connect-src | XHR、fetch、WebSocket、EventSource

### 文档

关键字 | 说明
--- | ---
base-uri < sourc-list > | 约束 < base > 元素能指定的 URL
plugin-types < MIME types > | plugin-types application/pdf;
sandbox < value > | 含义和 < iframe > 元素的 sandbox 属性值相同。

### 导航

关键字 | 说明
--- | ---
form-action < source-list > | 指定表单可提交的 URL
frame-ancestors < source-list > | 可以通过 < frame > < iframe > < object > < embed > < applet > 被嵌入的页面
navigation-to < source-list > | 所有类型的导航、跳转（a、form、window.location、window.open 等）

### 上报

关键字 | 说明
--- | ---
report-uri < uri > | CSP 违例上报的地址

## CSP 内容源

### 关键字

关键字 | 说明
--- | ---
'none' | 不匹配任何 URL。 
'self' | 代表和文档同源，包括相同的 URL、协议和端口号。
'unsafe-inline' | 允许使用内联资源，如内联的 < script > 元素、javascript: URL、内联的事件处理函数和内联的 < style > 元素。非安全。
'unsafe-eval' | 允许使用 eval() 等通过字符串创建代码的方法。非安全。

### 主机

关键字 | 说明
--- | ---
http://*.foo.com | 匹配所有使用 http: 协议加载 foo.com 任何子域名的尝试。
mail.foo.com:443 | 匹配所有访问 mail.foo.com 的 443 端口 的尝试。
https://store.foo.com | 匹配所有使用 https: 协议访问 store.foo.com 的尝试。

### 协议

关键字 | 说明
--- | ---
https: | https 协议。
weixin: | 自定义协议。

### 随机

关键字 | 说明
--- | ---
'nonce-cXdlcjEyMzQ' | < script nonce="cXdlcjEyMzQ" >

### 哈希

关键字 | 说明
--- | ---
'sha256-abc123' | < script integrity="sha256-abc123" >