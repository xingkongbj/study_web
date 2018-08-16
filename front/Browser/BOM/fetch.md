# fetch

```
Promise<Response> fetch(input[, init])
```

- 向后端请求数据。
- 返回一个 Promise 对象，参数是 Response。
- input：URL 资源或者 Request 对象。
- init：请求的参数，包括 method、headers、body、mode、credentials、cache、redirect、referrer、referrerPolicy、integrity、keepalive、signal。

## Response.type

- basic：同域下。
- opaque：跨域下，服务器返回了无效的 CORS 响应头，基本不能查看到什么信息。
- cors：跨域下，服务器返回了有效的 CORS 响应头，此时响应头中除 Cache-Control ，Content-Language ，Content-Type ，Expores ，Last-Modified 和 Progma 之外的字段都不可见。

## method

- 请求方法，如 GET、POST。

## headers

- 请求头，如 Content-Type。

## body

- 请求主体，POST 请求的主体部分。

## mode

- 请求模式。
- same-origin：表示同域下可请求成功; 反之，浏览器将拒绝发送本次 fetch，同时抛出错误 “TypeError：Failed to fetch(…)”。
- cors：表示同域和带有 CORS 响应头的跨域下可请求成功。 其他请求将被拒绝。
- cors-with-forced-preflight：表示在发出请求前，将执行 preflight 检查。
- no-cors：常用于跨域请求不带 CORS 响应头场景，此时响应类型为 “opaque”。

## credentials

- 跨域请求中需要带有 cookie 时，设置为”include”。
- omit：缺省值，默认为该值。
- same-origin：同源，表示同域请求才发送 cookie。
- include：始终发送 Cookie，即使是跨域。

## cache

- 表示如何处理缓存，遵守 http 规范。
- default：表示 fetch 请求之前将检查下 http 的缓存。
- no-store：表示 fetch 请求将完全忽略 http 缓存的存在。这意味着请求之前将不再检查下 http 的缓存，拿到响应后，它也不会更新 http 缓存。
- no-cache：如果存在缓存，那么 fetch 将发送一个条件查询 request 和一个正常的 request，拿到响应后，它会更新 http 缓存。
- reload：表示 fetch 请求之前将忽略 http 缓存的存在，但是请求拿到响应后，它将主动更新 http 缓存。
- force-cache：表示 fetch 请求不顾一切的依赖缓存，即使缓存过期了，它依然从缓存中读取。 除非没有任何缓存，那么它将发送一个正常的 request。
- only-if-cached：表示 fetch 请求不顾一切的依赖缓存，即使缓存过期了，它依然从缓存中读取。 如果没有缓存，它将抛出网络错误(该设置只在 mode 为”same-origin”时有效)。
- 如果 fetch 请求的 header 里包含 If-Modified-Since，If-None-Match，If-Unmodified-Since，If-Match，或者 If-Range 之一，且 cache 的值为 default ，那么 fetch 将自动把 cache 的值设置为 "no-store"。

## redirect

- 重定向处理方式。
- follow：自动重定向。
- error：产生重定向将自动终止并且抛出一个错误。
- manual：手动处理重定向。

## referrer

- 请求的来源。
- no-referrer：无来源。
- client：客户端。
- URL：一个 URL 地址。

## referrerPolicy

- Request 接口的 referrerPolicy 只读属性返回引用者策略，该引用策略控制在 Referer 头中发送的引用信息应包含在请求中。
- 可能的值：no-referrer，no-referrer-when-downgrade，origin，origin-when-cross-origin，unsafe-url。

## integrity

- 包含请求的子资源完整性值。

## keepalive

- 保持长连接，true。

## signal

- 中断请求的实例对象。
- 由 new AbortController().signal 属性赋值。
- 通过 new AbortController().abort() 方法中断。








