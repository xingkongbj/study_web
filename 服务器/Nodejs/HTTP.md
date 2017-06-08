# Node.js HTTP

### 目录

- [http.Agent 类](#httpagent-类)
- [http.ClientRequest 类](#httpclientrequest-类)
- [http.Server 类](#httpserver-类)
- [http.ServerResponse 类](#httpserverresponse-类)
- [http.IncomingMessage 类](#httpincomingmessage-类)
- [http.METHODS](#httpmethods)
- [http.STATUS_CODES](#httpstatus_codes)
- [http.createServer](#httpcreateserverrequestlistener)
- [http.get](#httpgetoptions-callback)
- [http.globalAgent](#httpglobalagent)
- [http.request](#httprequestoptions-callback)

# http.Agent 类

## new Agent([options])

- `options` < Object > 代理的配置选项。
    - `keepAlive` < boolean > 保持 socket 可用即使没有请求，以便它们可被将来的请求使用而无需重新建立一个 TCP 连接。默认为 `false`。
    - `keepAliveMsecs` < number > 当使用了 `keepAlive` 选项时，该选项指定 TCP `Keep-Alive` 数据包的初始延迟。 当 `keepAlive` 选项为 `false` 或 `undefined` 时，该选项无效。 默认为 `1000`。
    - `maxSockets` < number > 每个主机允许的最大 socket 数量。 默认为 `Infinity`。
    - `maxFreeSockets` < number > 在空闲状态下允许打开的最大 socket 数量。 仅当 `keepAlive` 为 `true` 时才有效。 默认为 `256`。

http.request() 使用的默认 http.globalAgent 的选项均为各自的默认值。
若要配置其中任何一个，则需要创建自定义的 http.Agent 实例。

    const http = require('http');
    const keepAliveAgent = new http.Agent({ keepAlive: true });
    options.agent = keepAliveAgent;
    http.request(options, onResponseCallback);

## agent.createConnection(options[, callback])

- `options` < Object > 包含连接详情的选项。查看 net.createConnection() 了解选项的格式。
- `callback` < Function > 接收被创建的 socket 的回调函数。
- 返回: < net.Socket >

创建一个用于 HTTP 请求的 socket 或流。

## agent.destroy()

销毁当前正被代理使用的任何 socket。

## agent.freeSockets

- < Object >

返回一个对象，包含当前正在等待被启用了 keepAlive 的代理使用的 socket 数组。 不要修改该属性。

## agent.getName(options)

- `options` < Object > 为名称生成程序提供信息的选项。
    - `host` < string > 请求发送至的服务器的域名或 IP 地址。
    - `port` < number > 远程服务器的端口。
    - `localAddress` < string > 当发送请求时，为网络连接绑定的本地接口。
- 返回: < string >

为请求选项的集合获取一个唯一的名称，用来判断一个连接是否可以被复用。 对于 HTTP 代理，返回 `host:port:localAddress`。 对于 HTTPS 代理，名称会包含 CA、证书、密码、以及其他 HTTPS/TLS 特有的用于判断 socket 复用性的选项。

## agent.maxFreeSockets

- < number >

默认为 256。 对于已启用 `keepAlive` 的代理，该属性可设置要保留的空闲 socket 的最大数量。

## agent.maxSockets

- < number >

默认为不限制。 该属性可设置代理为每个来源打开的并发 socket 的最大数量。 来源是一个 `'host:port'` 或 `'host:port:localAddress'` 组合。

## agent.requests

- < Object >

返回一个对象，包含还未被分配到 socket 的请求队列。 不要修改。

## agent.sockets

- < Object >

返回一个对象，包含当前正被代理使用的 socket 数组。 不要修改。

# http.ClientRequest 类

# http.Server 类

该类继承自 net.Server，且具有以下额外的事件：

## 'request' 事件

- `request` < http.IncomingMessage >
- `response` < http.ServerResponse >

每次接收到一个请求时触发。 注意，每个连接可能有多个请求（在 HTTP `keep-alive` 连接的情况下）。

## server.listen([port][, hostname][, backlog][, callback])

- `port` <number>
- `hostname` <string>
- `backlog` <number>
- `callback` <Function>

开始在指定的 `port` 和 `hostname` 上接受连接。 如果省略了 `hostname`，则当 IPv6 可用时，服务器会接受 未指定的 IPv6 地址（`::`）的连接，否则接受 未指定的 IPv4 地址（`0.0.0.0`）的连接。

注意，在大多数的操作系统，监听 未指定的 IPv6 地址（`::`）的连接，可能导致 `net.Server` 总是监听 未指定的 IPv4 地址（`0.0.0.0`）。

如果省略了 `port` 或值为 `0`，则操作系统会分配一个随机的端口，该端口可在 `'listening'` 事件被触发后使用 `server.address().port` 获取。

若要监听一个 UNIX socket，则需提供文件名而不是端口和主机名。

`backlog` 是等待连接的队列的最大长度。 实际长度由操作系统通过 `sysctl` 设置决定，比如 Linux 上的 `tcp_max_syn_backlog` 和 `somaxconn`。 该参数的默认值是 `511`（不是 `512`）。

该函数是异步的。 `callback` 会被添加到 'listening' 事件的监听器中。也可查看 net.Server.listen(port)。

注意，`server.listen()` 方法可能被多次调用。 每次调用都会使用提供的选项重新打开服务器。

# http.ServerResponse 类

该对象在 HTTP 服务器内部被创建。 它作为第二个参数被传入 'request' 事件。

这个类实现了（而不是继承自）可写流 接口。 它是一个有以下事件的 EventEmitter：

## response.end([data][, encoding][, callback])

- data < string > | < Buffer >
- encoding < string >
- callback < Function >

该方法会通知服务器，所有响应头和响应主体都已被发送，即服务器将其视为已完成。 每次响应都必须调用 `response.end()` 方法。

如果指定了 `data`，则相当于调用 response.write(data, encoding) 之后再调用 `response.end(callback)`。

如果指定了 `callback`，则当响应流结束时被调用。

## response.setHeader(name, value)

- `name` < string >
- `value` < string > | < [string, string] >

为一个隐式的响应头设置值。 如果该响应头已存在，则值会被覆盖。 如果要发送多个名称相同的响应头，则使用字符串数组。

    response.setHeader('Content-Type', 'text/html');
    response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);

如果响应头字段的名称或值包含无效字符，则抛出 TypeError 错误。

response.setHeader() 设置的响应头会与 response.writeHead() 设置的响应头合并，且 response.writeHead() 的优先。

    const server = http.createServer((req, res) => {
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('X-Foo', 'bar');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('ok');
    });

## response.write(chunk[, encoding][, callback])

- chunk < string > | < Buffer >
- encoding < string >
- callback < Function >
- 返回: < boolean >

如果该方法被调用且 response.writeHead() 没有被调用，则它会切换到隐式响应头模式并刷新隐式响应头。

该方法会发送一块响应主体。 它可被多次调用，以便提供连续的响应主体片段。

注意，在 `http` 模块中，当请求是头请求时，响应体被省略。类似地， `204` 和 `304` 响应不能包含消息体。

`chunk` 可以是一个字符串或一个 buffer。 如果 `chunk` 是一个字符串，则第二个参数指定如何将它编码成一个字节流。 `encoding` 默认为 `'utf8'`。 当数据块被刷新时，`callback` 会被调用。

注意：这是原始的 HTTP 主体，且与可能被使用的高级主体编码无关。

response.write() 首次被调用时，会发送缓冲的响应头信息和响应主体的第一块数据到客户端。 response.write() 第二次被调用时，Node.js 会以流的形式处理数据，并将它们分别发送。 也就是说，响应会被缓冲到响应主体的第一个数据块。

如果全部数据被成功刷新到内核缓冲区，则返回 `true`。 如果全部或部分数据还在内存中排队，则返回 `false`。 当缓冲区再次空闲时，则触发 `'drain'` 事件。
    
## response.writeHead(statusCode[, statusMessage][, headers])

- `statusCode` < number >
- `statusMessage` < string >
- `headers` < Object >

发送一个响应头给请求。 状态码是一个三位数的 HTTP 状态码，如 `404`。 最后一个参数 `headers` 是响应头。 第二个参数 `statusMessage` 是可选的状态描述。

    const body = 'hello world';
    response.writeHead(200, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'text/plain'
    });

该方法在消息中只能被调用一次，且必须在 response.end() 被调用之前调用。

如果在调用该方法之前调用 response.write() 或 response.end()，则隐式的响应头会被处理并调用该函数。

response.setHeader() 设置的响应头会与 response.writeHead() 设置的响应头合并，且 response.writeHead() 的优先。

    const server = http.createServer((req, res) => {
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('X-Foo', 'bar');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('ok');
    });

注意，Content-Length 是以字节（而不是字符）为单位的。 上面的例子行得通是因为字符串 'hello world' 只包含单字节字符。 如果响应主体包含高级编码的字符，则应使用 Buffer.byteLength() 来确定在给定编码中的字节数。 Node.js 不会检查 Content-Length 与已发送的响应主体的长度是否相同。

如果响应头字段的名称或值包含无效字符，则抛出 TypeError 错误。

# http.IncomingMessage 类

`IncomingMessage` 对象由 http.Server 或 http.ClientRequest 创建，并作为第一个参数分别递给 'request' 和 'response' 事件。 它可以用来访问响应状态、消息头、以及数据。

它实现了 可读流 接口，还有以下额外的事件、方法、以及属性。

# http.METHODS

# http.STATUS_CODES

# http.createServer([requestListener])

- `requestListener` < Function >
- 返回: < http.Server >

返回一个新建的 http.Server 实例。

`requestListener` 是一个函数，会被自动添加到 'request' 事件。

# http.get(options[, callback])

# http.globalAgent

# http.request(options[, callback])