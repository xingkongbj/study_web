# 跨域方式

> http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html

## document.domain + iframe

 - 实现父页面与其内部 iframe 页面通讯，一级域名不同
 - 两个页面 document.domain 设置相同的一级域名

## location.hash + iframe

 - 实现父页面A与其内部 iframe 页面B通讯
 - 需要父页面A域名提供一个中转页C
 - 父页面A创建 iframe 并且监听自身 location.hash 的变化。iframe 在地址中加入 #参数 的参数，并且指向通讯页面B
 - 通讯页面B监听自身 location.hash 的变化，给出响应，创建 iframe 在地址中加入 #回传参数 的参数，并且指向父页面域名的中转页C
 - 中转页C通过 parent.parent.location.hash 语句来修改父页面A的 location.hash 值，实现通讯

## window.name + iframe

 - name 值在不同的域名加载后依旧存在，并且可以支持长达 2MB 的 name 值
 - iframe 打开跨域 a 页面写入 window.name 并跳转到同源 b 页面
 - 由于 b 页面同源，可以获取 window.name 并且返回给主页面

## window.postMessage + iframe

 - 实现父页面A与其内部 iframe 页面B通讯
 - 双方通过 window.addEventListener('message', onMessage, false) 监听数据
 - 双方通过在对方的 window 上执行 postMessage('hello world!', "*") 发送数据，
要求 postMessage 第二个参数符合对方的域名

## CORS

 - 页面无法设置
 - 服务器返回响应头中设置 Access-Control-Allow-Origin: *
 - 服务器返回响应头中设置 Access-Control-Allow-Headers: Origin,X-Requested-With,Content-Type,Accept,Last-Modified
 - 服务器返回响应头中设置 Access-Control-Allow-Methods: PUT,POST,GET,DELETE,OPTIONS,HEAD

## JSONP

 - 动态创建 script 标签，在 src 中加入函数名称参数，并且创建该函数，函数的参数将返回数据。
 - 服务器识别 src 中函数名称参数，拼接函数名称并把数据写入函数调用参数中返回。
 -  script 标签接收服务器返回 js 文件，执行函数调用。

## WebSocket

 - 浏览器的 API ，提供全双工、双向通信、只能与 WebSocket 服务通讯。