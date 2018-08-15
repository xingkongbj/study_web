# HTTP 首部字段和状态码

目录

- [常用状态码](#常用状态码)
- [请求方法](#请求方法)
- [状态码](#状态码)
- [主体首部字段](#主体首部字段)
- [请求首部字段](#请求首部字段)
- [响应首部字段](#响应首部字段)
- [Post 常用的四种 Content-Type](#post-常用的四种-content-type)

## 常用状态码

### 200 OK / 正常

表示从客户端发来的请求在服务器端被正常处理了。

### 204 No Content / 无内容

该状态码代表服务器接收的请求已成功处理，但在返回的响应报文中不含实体的主体部分。另外，也不允许返回任何实体的主体。比如，当从浏览器发出请求处理后，返回 204 响应，那么浏览器显示的页面不发生更新。

一般在只需要从客户端往服务器发送信息，而服务器不需要发送新信息内容的情况下使用。如使用 PUT 上传的文件已经存在，使用 DELETE 删除的文件已经删除。

### 206 Partial Content / 局部内容

该状态码表示客户端进行了范围请求，而服务器成功执行了这部分的 GET 请求。响应报文中包含由 Content-Range 指定范围的实体内容。

### 301 Moved Permanently / 永久移动

永久性重定向。该状态码表示请求的资源已被分配了新的 URI，以后应使用资源现在所指的 URI。也就是说，如果已经把资源对应的 URI 保存为书签了，这时应该按 Location 首部字段提示的 URI 重新保存。

当指定资源路径的最后忘记添加斜杠 “/”，就会产生 301 状态码。

### 302 Found / 找到

临时性重定向。该状态码表示请求的资源已被分配了新的 URI，希望用户（本次）能使用新的 URI 访问。
和 301 Moved Permanently 状态码相似，但 302 状态码代表的资源不是被永久移动，只是临时性质的。换句话说，已移动的资源对应的vURI 将来还有可能发生改变。比如，用户把 URI 保存成书签，但不会像 301 状态码出现时那样去更新书签，而是仍旧保留返回 302 状态码的页面对应的 URI。

### 303 See Other / 参见其他信息

该状态码表示由于请求对应的资源存在着另一个 URI，应使用 GET 方法定向获取请求的资源。
303 状态码和 301 状态码有着相同的功能，但 303 状态码明确表示客户端应当采用 GET 方法获取资源，这点与 301 状态码有区别。

301、302 标准是禁止将 POST 方法改变成 GET 方法的，但实际使用时大家都改成了 GET。

### 304 Not Modified / 未修改

该状态码表示客户端发送附带条件的请求时，服务器端允许请求访问资源，但未满足条件的情况。304 状态码返回时，不包含任何响应的主体部分。304 虽然被划分在 3XX 类别中，但是和重定向没有关系。

采用 GET 方法的请求报文中包含If-Match，If-Modified-Since，If-None-Match，If-Range，If-Unmodified-Since 中任一个首部，才可能会返回 304 请求。 

### 307 Temporary Redirect / 临时重定向

临时重定向。该状态码与 302 Found 有着相同的含义。尽管 302 标准禁止 POST 变换成 GET，但实际使用时大家并不遵守。

307 会遵照浏览器标准，不会从 POST 变成 GET。但是，对于处理响应时的行为，每种浏览器有可能出现不同的情况。

### 400 Bad Request / 错误请求

该状态码表示请求报文中存在语法错误。当错误发生时，需修改请求的内容后再次发送请求。另外，浏览器会像 200 OK 一样对待该状态码。

### 401 Unauthorized / 未授权

该状态码表示发送的请求需要有通过 HTTP 认证（BASIC 认证、DIGEST 认证）的认证信息。另外若之前已进行过 1 次请求，则表示用户认证失败。

### 403 Forbidden / 禁止

该状态码表明对请求资源的访问被服务器拒绝了。服务器端没有必要给出拒绝的详细理由，但如果想作说明的话，可以在实体的主体部分对原因进行描述，这样就能让用户看到了。

未获得文件系统的访问授权，访问权限出现某些问题（从未授权的发送源 IP 地址试图访问）等列举的情况都可能是发生 403 的原因。

### 404 Not Found / 未找到

该状态码表明服务器上无法找到请求的资源。除此之外，也可以在服务器端拒绝请求且不想说明理由时使用。

### 500 Internal Server Error / 内部服务器错误

该状态码表明服务器端在执行请求时发生了错误。也有可能是 Web 应用存在的 bug 或某些临时的故障。

### 503 Service Unavailable / 服务无法获得

该状态码表明服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。如果事先得知解除以上状况需要的时间，最好写入 Retry-After 首部字段再返回给客户端。

## 请求方法

方法 | 描述
:--- | :---
GET | 请求指定的页面信息，并返回实体主体。
POST | 向指定资源提交数据（例如提交表单或者上传文件）。数据被包含在请求体中。
HEAD | 类似于 GET 请求，只不过返回的响应中没有具体的内容，用于获取响应首部字段。
PUT | 从客户端向服务器传送的数据，取代服务器指定文档的内容。
DELETE | 请求服务器删除指定的文档。
CONNECT | HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。
OPTIONS | 客户端查看服务器支持的方法。
TRACE | 回显服务器收到的请求，主要用于测试或诊断。

## 状态码

状态码 | 英文 | 描述
:--- | :---: | :---
1xx | &nbsp; | 信息，服务器收到请求，需要请求者继续执行操作。
100 | Continue / 继续 | 继续。一般在发送 post 请求时，已发送了 http header 之后服务端将返回此信息，表示确认。
101| Switching Protocols / 转换协议 | 切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到 HTTP 的新版本协议。
2xx | &nbsp; | 成功，操作被成功接收并处理。
200 | OK / 正常 | 请求成功。常用于 GET 与 POST 请求。
201 | Created / 已创建 | 已创建。请求已经被实现，而且有一个新的资源已经依据请求的需要而建立，且其 URI 已经随 Location 首部字段信息返回。
202 | Accepted / 接受 | 已接受。已经接受请求，但未处理完成。正如它可能被拒绝一样，最终该请求可能会也可能不会被执行。
203 | Non-Authoritative Information / 非官方信息 | 非授权信息。请求成功。但返回的 meta 信息不在原始的服务器，而是一个副本。
204 | No Content  / 无内容 | 无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档。
205 | Reset Content / 重置内容 | 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单内容。
206 | Partial Content / 局部内容 | 部分内容。服务器完成了一个包含 Range 首部字段信息的局部请求成功时发送给浏览器。
3xx | &nbsp; | 重定向，需要进一步的操作以完成请求。
300 | Multiple Choices / 多重选择 | 多种选择。被请求的文档可以在多个地方找到，并将在返回的文档中列出来。如果服务器有首选设置，首选项将会被列于定位响应首部字段信息中。
301 | Moved Permanently / 永久移动 | 永久移动。请求的资源已被永久的移动到新 URI，返回信息会包括新的 URI，浏览器会自动定向到新 URI。今后任何新的请求都应使用新的 URI 代替。
302 | Found / 找到 | 临时移动。与 301 类似。但资源只是临时被移动。客户端应继续使用原有 URI 。
303 | See Other / 参见其他信息 | 查看其它地址。与 301 类似。只能使用 GET 请求查看。
304 | Not Modified / 未修改 | 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个首部字段信息指出客户端希望只返回在指定日期之后修改的资源。
305 | Use Proxy / 使用代理 | 使用代理。所请求的文档要通过定位首部字段信息中的代理服务器获得。
306 | Unused / 废弃 | 已经被废弃的HTTP状态码。
307 | Temporary Redirect / 临时重定向 | 临时重定向。与 302 类似。使用 POST 请求重定向。
4xx | &nbsp; | 客户端错误，请求包含语法错误或无法完成请求。
400 | Bad Request / 错误请求 | 客户端请求的语法错误，服务器无法理解，请求参数有误。
401 | Unauthorized / 未授权 | 请求要求用户的身份认证。
402 | Payment Required / 付款请求 | 该状态码是为了将来可能的需求而预留的。
403 | Forbidden / 禁止 | 服务器理解请求客户端的请求，但是拒绝执行此请求。
404 | Not Found / 未找到 | 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面。
405 | Method Not Allowed / 方法未允许 | 客户端请求中的方法被禁止，请求方法(GET, POST, HEAD, PUT, DELETE, 等)对某些特定的资源不允许使用。
406 | Not Acceptable / 无法访问 | 服务器无法根据客户端请求的内容特性完成请求，请求资源的MIME类型与客户端中 Accept 首部字段信息中指定的类型不一致。
407 | Proxy Authentication Required / 代理服务器认证要求 | 请求要求代理的身份认证，与 401 类似，但请求者应当使用代理进行授权。
408 | Request Time-out / 请求超时 | 服务器等待客户端发送的请求时间过长，超时。
409 | Conflict / 冲突 | 服务器完成客户端的PUT请求是可能返回此代码，服务器处理请求时发生了冲突
410 | Gone / 已经不存在 | 客户端请求的资源已经不存在。410 不同于 404 ，如果资源以前有现在被永久删除了可使用 410 代码，网站设计人员可通过 301 代码指定资源的新位置。
411 | Length Required / 需要数据长度) | 服务器无法处理客户端发送的不带Content-Length的请求信息。
412 | Precondition Failed / 先决条件错误 | 客户端请求信息的先决条件错误。
413 | Request Entity Too Large / 请求实体过大 | 由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个 Retry-After 的响应信息。
414 | Request-URI Too Large / 请求URI过长 | 请求的 URI 过长（URI 通常为网址），服务器无法处理。
415 | Unsupported Media Type / 不支持的媒体格式 | 服务器无法处理请求附带的媒体格式。
416 | Requested range not satisfiable / 请求范围无法满足 | 客户端包含了一个服务器无法满足的 Range 首部字段信息的请求。
417 | Expectation Failed / 期望失败 | 服务器无法满足 Expect 的请求首部字段信息。如果服务器得到一个带有 100-continue 值的 Expect 请求首部字段信息，这是指客户端正在询问是否可以在后面的请求中发送附件。在这种情况下，服务器也会用该状态(417)告诉浏览器服务器不接收该附件或用 100 (SC_CONTINUE) 状态告诉客户端可以继续发送附件。
5xx | &nbsp; | 服务器错误，服务器在处理请求的过程中发生了错误。
500 | Internal Server Error / 内部服务器错误 | 服务器内部错误，无法完成请求。一般来说，这个问题都会在服务器的程序出错时出现。
501 | Not Implemented / 未实现 | 告诉客户端服务器不支持请求中要求的功能，无法完成请求。如，客户端执行了如 PUT 这样的服务器并不支持的命令。 
502 | Bad Gateway / 网关错误 | 充当网关或代理的服务器，从上游服务器接收到无效的响应。
503 | Service Unavailable / 服务无法获得 | 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的 Retry-After 首部字段信息中。
504 | Gateway Time-out / 网关超时 | 充当网关或代理的服务器，未及时从远端服务器获取请求。
505 | HTTP Version not supported / 不支持的 HTTP 版本 | 服务器不支持请求的 HTTP 协议的版本，无法完成处理。

## 通用首部字段

Header | 描述 | 示例
:---: | :--- | :---
Cache-Control | 指定请求和响应遵循的缓存机制 | Cache-Control: no-cache
Connection | 表示是否需要持久连接，或控制不再转发给代理的首部字段。（HTTP 1.1默认进行持久连接） | Connection: close
Date | 请求发送的日期和时间 | Date: Tue, 15 Nov 2010 08:12:31 GMT
Pragma | 用于禁止缓存，废弃 | Pragma: no-cache
Upgrade | 升级为其他协议 | Upgrade: HTTP/2.0, websocket
Via | 中间网关或代理服务器信息 | Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)
Warning | 关于主体的警告信息 | Warn: 199 Miscellaneous warning

## 请求首部字段

Header | 描述 | 示例
:---: | :--- | :---
Accept | 指定客户端能够接收的内容类型 | Accept: text/plain, text/html
Accept-Encoding | 指定浏览器可以支持的主体内容压缩编码类型 | Accept-Encoding: compress, gzip
Accept-Language | 浏览器可接受的自然语言 | Accept-Language: en,zh
Content-Length | 主体的长度，当主体内容压缩时不使用 | Content-Length: 348
Content-Type | 主体的 MIME 类型和编码格式 | Content-Type: text/html; charset=utf-8
&nbsp; | 以上为主体部分 | &nbsp;
Accept-Charset | 浏览器可以接受的字符编码集。 | Accept-Charset: iso-8859-5
Authorization | 连接到服务器的授权认证（用户名:密码）经过Base64编码 | Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
Expect | 请求的特定的服务器行为 | Expect: 100-continue
From | 发出请求的用户的 Email | From: user@email.com
Host | 指定请求的服务器的域名和端口号 | Host: www.zcmhi.com
If-Match | 只有请求内容与实体相匹配才有效 | If-Match: “737060cd8c284d8af7ad3082f209582d”
If-Modified-Since | 如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回 304 代码 | If-Modified-Since: Sat, 29 Oct 2010 19:43:31 GMT
If-None-Match | 如果内容未改变返回 304 代码，参数为服务器先前发送的 Etag，与服务器回应的 Etag 比较判断是否改变 | If-None-Match: “737060cd8c284d8af7ad3082f209582d”
If-Range | 如果实体未改变，服务器发送客户端丢失的部分，否则发送整个实体。参数也为 Etag | If-Range: “737060cd8c284d8af7ad3082f209582d”
If-Unmodified-Since | 只在实体在指定时间之后未被修改才请求成功 | If-Unmodified-Since: Sat, 29 Oct 2010 19:43:31 GMT
Max-Forwards | 限制信息通过代理和网关传送的时间 | Max-Forwards: 10
Proxy-Authorization | 连接到代理的授权认证（用户名:密码）经过Base64编码 | Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
Range | 只请求实体的一部分，指定范围 | Range: bytes=500-999
Referer | 先前网页的地址，当前请求网页紧随其后,即来路 | Referer: http://www.zcmhi.com/archives/71.html
TE | 客户端愿意接受的传输编码，并通知服务器接受接受尾加首部字段信息 | TE: trailers,deflate;q=0.5
User-Agent | User-Agent的内容包含发出请求的用户信息 | User-Agent: Mozilla/5.0 (Linux; X11)
Cookie | HTTP请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器。 | Cookie: $Version=1; Skin=new;

## 响应首部字段

Header | 描述 | 示例
:---: | :--- | :---
Allow | 允许的请求方法。不允许则返回 405，并附带该首部字段 | Allow: GET, HEAD
Content-Encoding | 主体的压缩编码类型 | Content-Encoding: gzip
Content-Language | 主体的自然语言  | Content-Language: en,zh
Content-Location | 报文主体对应的 URI | Content-Location: /index.htm
Content-MD5 | 返回资源的MD5校验值 | Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ==
Content-Range | 在整个返回体中本部分的字节位置 | Content-Range: bytes 21010-47021/47022
Expires | 主体过期的日期和时间 | Expires: Thu, 01 Dec 2010 16:00:00 GMT
Last-Modified | 主体的最后修改时间 | Last-Modified: Tue, 15 Nov 2010 12:45:26 GMT
Content-Length | 主体的长度，当主体内容压缩时不使用 | Content-Length: 348
Content-Type | 主体的 MIME 类型和编码格式 | Content-Type: text/html; charset=utf-8
&nbsp; | 以上为主体部分 | &nbsp;
Accept-Ranges | 表明服务器是否支持指定范围请求及哪种类型的分段请求 | Accept-Ranges: bytes
Age | 从原始服务器到代理缓存形成的估算时间（以秒计，非负） | Age: 12
ETag | 请求变量的实体标签的当前值 | ETag: “737060cd8c284d8af7ad3082f209582d”
Location | 用来重定向接收方到非请求URL的位置来完成请求或标识新的资源 | Location: http://www.zcmhi.com/archives/94.html
Proxy-Authenticate | 它指出认证方案和可应用到代理的该URL上的参数 | Proxy-Authenticate: Basic
Retry-After | 如果实体暂时不可取，通知客户端在指定时间之后再次尝试 | Retry-After: 120
Server | web服务器软件名称 | Server: Apache/1.3.27 (Unix) (Red-Hat/Linux)
Vary | 告诉下游代理是使用缓存响应还是从原始服务器请求 | Vary: *
WWW-Authenticate | 表明客户端请求实体应该使用的授权方案 | WWW-Authenticate: Basic
Set-Cookie | 设置Http Cookie | Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1
refresh | 应用于重定向或一个新的资源被创造，在5秒之后重定向（由网景提出，被大部分浏览器支持） | Refresh: 5; url=http://www.zcmhi.com/archives/94.html 
Trailer | 报文主体之后（分块长度0 之后）出现了首部字段 | Trailer: Expires
Transfer-Encoding | 传输报文主体时采用的编码方式 | Transfer-Encoding: chunked

## Post 常用的四种 Content-Type

### 提交表单

- application/x-www-form-urlencoded 用于 form 表单的提交。
- 主体中的参数与 URL 中的参数格式相同。

```
请求头
POST http://www.example.com HTTP/1.1
Content-Type: application/x-www-form-urlencoded;charset=utf-8

请求主体
title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3
```

### 表单上传文件

- multipart/form-data 用于表单提交时包含文件内容。
- 通过 boundary 定义的分割符，区分内容。

```
请求头
POST http://www.example.com HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryrGKCBY7qhFd3TrwA

请求主体
------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="text"

title
------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="file"; filename="chrome.png"
Content-Type: image/png

PNG ... content of chrome.png ...
------WebKitFormBoundaryrGKCBY7qhFd3TrwA--
```

### 传输 JSON 数据

- application/json 用于后端识别 json 数据。
- 请求主体需要手动转换为 json 格式。

```
请求头
POST http://www.example.com HTTP/1.1
Content-Type: application/json;charset=utf-8

请求主体
{"title":"test","sub":[1,2,3]}
```

### 传输 XML 数据

- text/xml 用于后端识别 xml 数据。
- 请求主体需要手动转换为 xml 格式。

```
请求头
POST http://www.example.com HTTP/1.1
Content-Type: text/xml

请求主体
<!--?xml version="1.0"?-->
<methodcall>
    <methodname>examples.getStateName</methodname>
    <params>
        <param>
            <value><i4>41</i4></value>
        
    </params>
</methodcall>
```