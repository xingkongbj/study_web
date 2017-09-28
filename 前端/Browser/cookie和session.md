# cookie 和 session

## cookie

### cookie 存在的意义

识别用户

HTTP是无状态协议，这就回出现这种现象：当你登录一个页面，然后转到登录网站的另一个页面，服务器无法认识到。或者说两次的访问，服务器不能认识到是同一个客户端的访问，这就让你重复登录，所以产生了 cookie 。

cookie：第一次访问一个服务器，不携带 cookie，这时服务器在响应（response) 下行 HTTP 报文中，命令浏览器携带 cookie 信息；浏览器再访问同一个域的时候，将把 cookie 信息携带到请求（request）上行 HTTP 请求中，从而实现了 HTTP 模拟有了状态。 

### 特点

- cookie 是不加密的
- cookie 是可以被篡改和攻击
- cookie 大小受到限制

## session

### session 存在的意义

由于 cookie 明文等一些不足所以产生了 session 。

session 依赖 cookie，就是利用 cookie，实现的“会话”，因此当 cookie 被禁用，session 也无法使用。
 
session 与 cookie 不一样在哪里呢？ session 会下发一个秘钥（cookie）（乱码），客户端每次访问都携带这个秘钥，那么服务器如果发现这个秘钥吻合，就能够显示这个用户曾经保存的信息。 
任何语言中，session 的使用，是“机理透明”的，也就是让你感觉不到这事儿和 cookie 有关。

### 特点

- session 是加密的
- session 存在于服务器的内存中

## cookie 和 session 区别

- cookie 数据存放在客户的浏览器上；session 数据放在服务器缓存中。
- cookie 是明文，不安全，别人利用 cookie 可以被篡改和攻击；而 session 存放服务器缓存中并且加密的，其他用户看不到。
- session 会在一定时间内保存在服务器上。当用户访问增多，会比较占用你服务器内存，考虑到减轻服务器性能方面，使用 cookie 。
- 单个 cookie 保存的数据不能超过 4K，很多浏览器都限制一个站点最多保存20个 cookie；session 的密钥（cookie),可以对应可以对应无限大的数据。