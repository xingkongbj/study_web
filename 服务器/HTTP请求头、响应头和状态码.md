# HTTP请求头、响应头和状态码

目录

- [请求方法](#请求方法)
- [状态码](#状态码)
- [请求头](#请求头)
- [响应头](#响应头)

## 请求方法

方法 | 描述
:- | :-
GET | 请求指定的页面信息，并返回实体主体。
HEAD | 类似于get请求，只不过返回的响应中没有具体的内容，用于获取报头
POST | 向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求可能会导致新的资源的建立和/或已有资源的修改。
PUT | 从客户端向服务器传送的数据取代指定的文档的内容。
DELETE | 请求服务器删除指定的页面。
CONNECT | HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。
OPTIONS | 允许客户端查看服务器的性能。
TRACE | 回显服务器收到的请求，主要用于测试或诊断。

## 状态码

状态码 | 英文 | 描述
:- | :-: | :-
1xx | &nbsp; | 信息，服务器收到请求，需要请求者继续执行操作。
100 | Continue / 继续 | 继续。一般在发送 post 请求时，已发送了 http header 之后服务端将返回此信息，表示确认。
101| Switching Protocols / 转换协议 | 切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到 HTTP 的新版本协议。
2xx | &nbsp; | 成功，操作被成功接收并处理。
200 | OK / 正常 | 请求成功。一般用于 GET 与 POST 请求。
201 | Created / 已创建 | 已创建。请求已经被实现，而且有一个新的资源已经依据请求的需要而建立，且其 URI 已经随 Location 头信息返回。
202 | Accepted / 接受 | 已接受。已经接受请求，但未处理完成。正如它可能被拒绝一样，最终该请求可能会也可能不会被执行。
203 | Non-Authoritative Information / 非官方信息 | 非授权信息。请求成功。但返回的 meta 信息不在原始的服务器，而是一个副本。
204 | No Content  / 无内容 | 无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档。
205 | Reset Content / 重置内容 | 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单内容。
206 | Partial Content / 局部内容 | 部分内容。服务器完成了一个包含 Range 头信息的局部请求时被发送的。
3xx | &nbsp; | 重定向，需要进一步的操作以完成请求。
300 | Multiple Choices / 多重选择 | 多种选择。被请求的文档可以在多个地方找到，并将在返回的文档中列出来。如果服务器有首选设置，首选项将会被列于定位响应头信息中。
301 | Moved Permanently / 永久移动 | 永久移动。请求的资源已被永久的移动到新 URI ，返回信息会包括新的 URI ，浏览器会自动定向到新 URI 。今后任何新的请求都应使用新的 URI 代替。
302 | Found / 找到 | 临时移动。与 301 类似。但资源只是临时被移动。客户端应继续使用原有 URI 。
303 | See Other / 参见其他信息 | 查看其它地址。与 301 类似。使用 GET 和 POST 请求查看。
304 | Not Modified / 未修改 | 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源。
305 | Use Proxy / 使用代理 | 使用代理。所请求的文档要通过定位头信息中的代理服务器获得。
306 | Unused / 废弃 | 已经被废弃的HTTP状态码。
307 | Temporary Redirect / 临时重定向 | 临时重定向。与 302 类似。使用 GET 请求重定向。
4xx | &nbsp; | 客户端错误，请求包含语法错误或无法完成请求。
400 | Bad Request / 错误请求 | 客户端请求的语法错误，服务器无法理解，请求参数有误。
401 | Unauthorized / 未授权 | 请求要求用户的身份认证。
402 | Payment Required / 付款请求 | 该状态码是为了将来可能的需求而预留的。
403 | Forbidden / 禁止 | 服务器理解请求客户端的请求，但是拒绝执行此请求。
404 | Not Found / 未找到 | 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面。
405 | Method Not Allowed / 方法未允许 | 客户端请求中的方法被禁止，请求方法(GET, POST, HEAD, PUT, DELETE, 等)对某些特定的资源不允许使用。
406 | Not Acceptable / 无法访问 | 服务器无法根据客户端请求的内容特性完成请求，请求资源的MIME类型与客户端中 Accept 头信息中指定的类型不一致。
407 | Proxy Authentication Required / 代理服务器认证要求 | 请求要求代理的身份认证，与 401 类似，但请求者应当使用代理进行授权。
408 | Request Time-out / 请求超时 | 服务器等待客户端发送的请求时间过长，超时。
409 | Conflict / 冲突 | 服务器完成客户端的PUT请求是可能返回此代码，服务器处理请求时发生了冲突
410 | Gone / 已经不存在 | 客户端请求的资源已经不存在。410 不同于 404 ，如果资源以前有现在被永久删除了可使用 410 代码，网站设计人员可通过 301 代码指定资源的新位置。
411 | Length Required / 需要数据长度) | 服务器无法处理客户端发送的不带Content-Length的请求信息。
412 | Precondition Failed / 先决条件错误 | 客户端请求信息的先决条件错误。
413 | Request Entity Too Large / 请求实体过大 | 由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个 Retry-After 的响应信息。
414 | Request-URI Too Large / 请求URI过长 | 请求的 URI 过长（URI 通常为网址），服务器无法处理。
415 | Unsupported Media Type / 不支持的媒体格式 | 服务器无法处理请求附带的媒体格式。
416 | Requested range not satisfiable / 请求范围无法满足 | 客户端包含了一个服务器无法满足的 Range 头信息的请求。
417 | Expectation Failed / 期望失败 | 服务器无法满足 Expect 的请求头信息。如果服务器得到一个带有 100-continue 值的 Expect 请求头信息，这是指客户端正在询问是否可以在后面的请求中发送附件。在这种情况下，服务器也会用该状态(417)告诉浏览器服务器不接收该附件或用 100 (SC_CONTINUE) 状态告诉客户端可以继续发送附件。
5xx | &nbsp; | 服务器错误，服务器在处理请求的过程中发生了错误。
500 | Internal Server Error / 内部服务器错误 | 服务器内部错误，无法完成请求。一般来说，这个问题都会在服务器的程序码出错时出现。
501 | Not Implemented / 未实现 | 告诉客户端服务器不支持请求中要求的功能，无法完成请求。如，客户端执行了如PUT这样的服务器并不支持的命令。 
502 | Bad Gateway / 错误的网关 | 充当网关或代理的服务器，从上游服务器接收到无效的响应。
503 | Service Unavailable / 服务无法获得 | 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的 Retry-After 头信息中。
504 | Gateway Time-out / 网关超时 | 充当网关或代理的服务器，未及时从远端服务器获取请求。
505 | HTTP Version not supported / 不支持的 HTTP 版本 | 服务器不支持请求的 HTTP 协议的版本，无法完成处理。

## 请求头

Header | 描述 | 示例
:-: | :- | :-
Accept | 指定客户端能够接收的内容类型 | Accept: text/plain, text/html
Accept-Encoding | 指定浏览器可以支持的web服务器返回内容压缩编码类型。 | Accept-Encoding: compress, gzip
Accept-Language | 浏览器可接受的语言 | Accept-Language: en,zh
Content-Type | 请求的与实体对应的MIME信息 | Content-Type: application/x-www-form-urlencoded
Content-Length | 请求的内容长度 | Content-Length: 348
Cache-Control | 指定请求和响应遵循的缓存机制 | Cache-Control: no-cache
Connection | 表示是否需要持久连接。（HTTP 1.1默认进行持久连接） | Connection: close
Cookie | HTTP请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器。 | Cookie: $Version=1; Skin=new;
Host | 指定请求的服务器的域名和端口号 | Host: www.zcmhi.com
Referer | 先前网页的地址，当前请求网页紧随其后,即来路 | Referer: http://www.zcmhi.com/archives/71.html
User-Agent | User-Agent的内容包含发出请求的用户信息 | User-Agent: Mozilla/5.0 (Linux; X11)
&nbsp; | &nbsp; | &nbsp;
Accept-Charset | 浏览器可以接受的字符编码集。 | Accept-Charset: iso-8859-5
Accept-Ranges | 可以请求网页实体的一个或者多个子范围字段 | Accept-Ranges: bytes
Authorization | HTTP授权的授权证书 | Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
Date | 请求发送的日期和时间 | Date: Tue, 15 Nov 2010 08:12:31 GMT
Expect | 请求的特定的服务器行为 | Expect: 100-continue
From | 发出请求的用户的Email | From: user@email.com
If-Match | 只有请求内容与实体相匹配才有效 | If-Match: “737060cd8c284d8af7ad3082f209582d”
If-Modified-Since | 如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回304代码 | If-Modified-Since: Sat, 29 Oct 2010 19:43:31 GMT
If-None-Match | 如果内容未改变返回304代码，参数为服务器先前发送的Etag，与服务器回应的Etag比较判断是否改变 | If-None-Match: “737060cd8c284d8af7ad3082f209582d”
If-Range | 如果实体未改变，服务器发送客户端丢失的部分，否则发送整个实体。参数也为Etag | If-Range: “737060cd8c284d8af7ad3082f209582d”
If-Unmodified-Since | 只在实体在指定时间之后未被修改才请求成功 | If-Unmodified-Since: Sat, 29 Oct 2010 19:43:31 GMT
Max-Forwards | 限制信息通过代理和网关传送的时间 | Max-Forwards: 10
Pragma | 用来包含实现特定的指令 | Pragma: no-cache
Proxy-Authorization | 连接到代理的授权证书 | Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
Range | 只请求实体的一部分，指定范围 | Range: bytes=500-999
TE | 客户端愿意接受的传输编码，并通知服务器接受接受尾加头信息 | TE: trailers,deflate;q=0.5
Upgrade | 向服务器指定某种传输协议以便服务器进行转换（如果支持） | Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11
Via | 通知中间网关或代理服务器地址，通信协议 | Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)
Warning | 关于消息实体的警告信息 | Warn: 199 Miscellaneous warning

## 响应头

Header | 描述 | 示例
:-: | :- | :-
Content-Encoding | web服务器支持的返回内容压缩编码类型。 | Content-Encoding: gzip
Content-Language | 响应体的语言 | Content-Language: en,zh
Content-Type | 返回内容的MIME类型 | Content-Type: text/html; charset=utf-8
Content-Length | 响应体的长度 | Content-Length: 348
Cache-Control | 告诉所有的缓存机制是否可以缓存及哪种类型 | Cache-Control: no-cache
Set-Cookie | 设置Http Cookie | Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1
Server | web服务器软件名称 | Server: Apache/1.3.27 (Unix) (Red-Hat/Linux)
Date | 原始服务器消息发出的时间 | Date: Tue, 15 Nov 2010 08:12:31 GMT
Expires | 响应过期的日期和时间 | Expires: Thu, 01 Dec 2010 16:00:00 GMT
&nbsp; | &nbsp; | &nbsp;
Accept-Ranges | 表明服务器是否支持指定范围请求及哪种类型的分段请求 | Accept-Ranges: bytes
Age | 从原始服务器到代理缓存形成的估算时间（以秒计，非负） | Age: 12
Allow | 对某网络资源的有效的请求行为，不允许则返回405 | Allow: GET, HEAD
Content-Location | 请求资源可替代的备用的另一地址 | Content-Location: /index.htm
Content-MD5 | 返回资源的MD5校验值 | Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ==
Content-Range | 在整个返回体中本部分的字节位置 | Content-Range: bytes 21010-47021/47022
ETag | 请求变量的实体标签的当前值 | ETag: “737060cd8c284d8af7ad3082f209582d”
Last-Modified | 请求资源的最后修改时间 | Last-Modified: Tue, 15 Nov 2010 12:45:26 GMT
Location | 用来重定向接收方到非请求URL的位置来完成请求或标识新的资源 | Location: http://www.zcmhi.com/archives/94.html
Pragma | 包括实现特定的指令，它可应用到响应链上的任何接收方 | Pragma: no-cache
Proxy-Authenticate | 它指出认证方案和可应用到代理的该URL上的参数 | Proxy-Authenticate: Basic
refresh | 应用于重定向或一个新的资源被创造，在5秒之后重定向（由网景提出，被大部分浏览器支持） | Refresh: 5; url=http://www.zcmhi.com/archives/94.html 
Retry-After | 如果实体暂时不可取，通知客户端在指定时间之后再次尝试 | Retry-After: 120
Trailer | 指出头域在分块传输编码的尾部存在 | Trailer: Max-Forwards
Transfer-Encoding | 文件传输编码 | Transfer-Encoding:chunked
Vary | 告诉下游代理是使用缓存响应还是从原始服务器请求 | Vary: *
Via | 告知代理客户端响应是通过哪里发送的 | Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)
Warning | 警告实体可能存在的问题 | Warning: 199 Miscellaneous warning
WWW-Authenticate | 表明客户端请求实体应该使用的授权方案 | WWW-Authenticate: Basic