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

# http.ServerResponse 类

# http.IncomingMessage 类

# http.METHODS

# http.STATUS_CODES

# http.createServer([requestListener])

# http.get(options[, callback])

# http.globalAgent

# http.request(options[, callback])