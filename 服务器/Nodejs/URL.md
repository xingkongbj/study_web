# Node.js URL

### 目录

- [url]()
- [URL 字符串与 URL 对象]()
- [Legacy URL API]()
    - [Legacy urlObject]()
    - [urlObject.auth]()
    - [urlObject.hash]()
    - [urlObject.host]()
    - [urlObject.hostname]()
    - [urlObject.href]()
    - [urlObject.path]()
    - [urlObject.pathname]()
    - [urlObject.port]()
    - [urlObject.protocol]()
    - [urlObject.query]()
    - [urlObject.search]()
    - [urlObject.slashes]()
    - [url.format(urlObject)]()
    - [url.parse(urlString[, parseQueryString[, slashesDenoteHost]])]()
    - [url.resolve(from, to)]()

# url

`url` 模块提供了一些实用函数，用于 URL 处理与解析。 可以通过以下方式使用：

    const url = require('url');

# URL 字符串与 URL 对象

一个 URL 字符串是一个结构化的字符串，它包含多个有意义的组成部分。 当被解析时，会返回一个 URL 对象，它包含每个组成部分作为属性。

`url` 模块提供了两个 API 处理 url：Node.js 具有的 legacy API，和一个新的API，如同 Web 浏览器使用的 WHATWG URL Standard 。

注意，虽然 Legacy API还没有过时，它是保持完全与现有应用程序的向后兼容性。新的应用程序应使用 WHATWG API。

下面比较 WHATWG 和 Legacy 。对于地址 `'http://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash'`, Legacy 使用 `url.parse()` 返回对象，WHATWG 是一个 URL 对象。
    
注意，WHATWG URL 的 `origin` 属性包含 `protocol` 和 `host`，但是没有 `username` 和 `password`。

┌─────────────────────────────────────────────────────────────────────────────────────────────┐
    │                                            href                                             │
    ├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┬───────┤
    │ protocol │  │        auth         │        host         │           path            │ hash  │
    │          │  │                     ├──────────────┬──────┼──────────┬────────────────┤       │
    │          │  │                     │   hostname   │ port │ pathname │     search     │       │
    │          │  │                     │              │      │          ├─┬──────────────┤       │
    │          │  │                     │              │      │          │ │    query     │       │
    "  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string   #hash "
    │          │  │          │          │   hostname   │ port │          │                │       │
    │          │  │          │          ├──────────────┴──────┤          │                │       │
    │ protocol │  │ username │ password │        host         │          │                │       │
    ├──────────┴──┼──────────┴──────────┼─────────────────────┤          │                │       │
    │   origin    │                     │       origin        │ pathname │     search     │ hash  │
    ├─────────────┴─────────────────────┴─────────────────────┴──────────┴────────────────┴───────┤
    │                                            href                                             │
    └─────────────────────────────────────────────────────────────────────────────────────────────┘
    (请忽略字符串中的空格，它们只是为了格式化)

解析 URL 字符串使用 WHATWG API：

    const URL = require('url').URL;
    const myURL = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');

注意，在浏览器中，WHATWG `URL` 类是一个全局的变量，任何时候都可以使用。在 Node.js 中， `URL` 类必须通过 `require('url').URL` 访问。

解析 URL 字符串使用 Legacy API：

    const url = require('url');
    const myURL = url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');

# Legacy URL API

## Legacy urlObject

legacy urlObject (`require('url').Url`) 通过 `url.parse()` 函数创建并返回。

## urlObject.auth

`auth` 属性是 URL 的用户名与密码部分。 该字符串跟在 `protocol` 和双斜杠（如果有）的后面，排在 `host` 部分的前面且被一个 ASCII 的 at 符号（`@`）分隔。 该字符的格式为 `{username}[:{password}]`，`[:{password}]` 部分是可选的。

例如：`'user:pass'`

## urlObject.hash

`hash` 属性包含 URL 的碎片部分，包括开头的 ASCII 哈希字符（`#`）。

例如：`'#hash'`

## urlObject.host

`host` 属性是 URL 的完整的小写的主机部分，包括 `port`（如果有）。

例如：`'sub.host.com:8080'`

## urlObject.hostname

`hostname` 属性是 `host` 组成部分排除 `port` 之后的小写的主机名部分。

例如：`'sub.host.com'`

## urlObject.href

`href` 属性是解析后的完整的 URL 字符串，`protocol` 和 `host` 都会被转换为小写的。

例如：`'http://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash'`

## urlObject.path

`path` 属性是一个 `pathname` 与 `search` 组成部分的串接。

例如：`'/p/a/t/h?query=string'`

不会对 `path` 执行解码。

## urlObject.pathname

`pathname` 属性包含 URL 的整个路径部分。 它跟在 `host` （包括 `port`）后面，排在 `query` 或 `hash` 组成部分的前面且被 ASCII 问号（`?`）或哈希字符（`#`）分隔。

例如：`'/p/a/t/h'`

不会对路径字符串执行解码。

## urlObject.port

`port` 属性是 `host` 组成部分中的数值型的端口部分。

例如：`'8080'`

## urlObject.protocol

`protocol` 属性表明 URL 的小写的协议体制。

例如：`'http:'`

## urlObject.query

`query` 属性是不含开头 ASCII 问号（`?`）的查询字符串，或一个被 querystring 模块的 `parse()` 方法返回的对象。 `query` 属性是一个字符串还是一个对象是由传入 `url.parse()` 的 `parseQueryString` 参数决定的。

例如：`'query=string'` or `{'query': 'string'}`

如果返回一个字符串，则不会对查询字符串执行解码。 如果返回一个对象，则键和值都会被解码。

## urlObject.search

`search` 属性包含 URL 的整个查询字符串部分，包括开头的 ASCII 问号字符（`?`）。

例如：`'?query=string'`

不会对查询字符串执行解码。

## urlObject.slashes

`slashes` 属性是一个 `boolean`，如果 `protocol` 中的冒号后面跟着两个 ASCII 斜杠字符（`/`），则值为 `true`。

## url.format(urlObject)

- `urlObject` < Object > | < string > 一个 URL 对象（就像 `url.parse()` 返回的）。 如果是一个字符串，则通过 `url.parse()` 转换为一个对象。

`url.format()` 方法返回一个从 `urlObject` 格式化后的 URL 字符串。

如果 `urlObject` 不是一个对象或字符串，则 `url.parse()` 抛出 TypeError。

格式化过程如下：

- 创建一个新的空字符串 `result`。
- 如果 `urlObject.protocol` 是一个字符串，则它会被原样添加到 `result`。
- 否则，如果 `urlObject.protocol` 不是 `undefined` 也不是一个字符串，则抛出 Error。
- 对于不是以 : 结束的 `urlObject.protocol`，: 会被添加到 `result`。
- 如果以下条件之一为真，则 `//` 会被添加到 `result`：
    - `urlObject.slashes` 属性为真；
    - `urlObject.protocol` 以 `http`、`https`、`ftp`、`gopher` 或 `file` 开头；
- 如果 `urlObject.auth` 属性的值为真，且 `urlObject.host` 或 `urlObject.hostname` 不为 `undefined`，则 `urlObject.auth` 会被添加到 `result`，且后面带上 `@`。
- 如果 `urlObject.host` 属性为 `undefined`，则：
    - 如果 `urlObject.hostname` 是一个字符串，则它会被添加到 `result`。
    - 否则，如果 `urlObject.hostname` 不是 `undefined` 也不是一个字符串，则抛出 Error。
    - 如果 `urlObject.port` 属性的值为真，且 `urlObject.hostname` 不为 `undefined`：
        - `:` 会被添加到 `result`。
        - `urlObject.port` 的值会被添加到 `result`。
- 否则，如果 `urlObject.host` 属性的值为真，则 `urlObject.host` 的值会被添加到 `result`。
- 如果 `urlObject.pathname` 属性是一个字符串且不是一个空字符串：
    - 如果 `urlObject.pathname` 不是以 `/` 开头，则 `/` 会被添加到 `result`。
    - `urlObject.pathname` 的值会被添加到 `result`。
- 否则，如果 `urlObject.pathname` 不是 `undefined` 也不是一个字符串，则抛出 Error。
- 如果 `urlObject.search` 属性为 `undefined` 且 `urlObject.query` 属性是一个 `Object`，则 `?` 会被添加到 `result`，后面跟上把 `urlObject.query` 的值传入 querystring 模块的 `stringify()` 方法的调用结果。
- 否则，如果 `urlObject.search` 是一个字符串：
    - 如果 `urlObject.search` 的值不是以 `?` 开头，则 `?` 会被添加到 `result`。
    - `urlObject.search` 的值会被添加到 `result`。
- 否则，如果 `urlObject.search` 不是 `undefined` 也不是一个字符串，则抛出 Error。
- 如果 `urlObject.hash` 属性是一个字符串：
    - 如果 `urlObject.hash` 的值不是以 `#` 开头，则 `#` 会被添加到 `result`。
    - `urlObject.hash` 的值会被添加到 `result`。
- 否则，如果 `urlObject.hash` 属性不是 `undefined` 也不是一个字符串，则抛出 Error。
- 返回 `result`。

## url.parse(urlString[, parseQueryString[, slashesDenoteHost]])

- `urlString` < string > 要解析的 URL 字符串。
- `parseQueryString` < boolean > 如果为 `true`，则 `query` 属性总会通过 querystring 模块的 `parse()` 方法生成一个对象。 如果为 `false`，则返回的 URL 对象上的 `query` 属性会是一个未解析、未解码的字符串。 默认为 `false`。
- `slashesDenoteHost` < boolean > 如果为 `true`，则 `//` 之后至下一个 `/` 之前的字符串会被解析作为 `host`。 例如，`//foo/bar` 会被解析为 `{host: 'foo', pathname: '/bar'}` 而不是 `{pathname: '//foo/bar'}`。 默认为 `false`。

`url.parse()` 方法会解析一个 URL 字符串并返回一个 URL 对象。

如果 `urlString` 不是字符串， 抛出 `TypeError` 错误。

如果 `auth` 属性存在但无法解析， 抛出 `URIError` 错误。

## url.resolve(from, to)

- `from` < string > 解析时相对的基本 URL。
- `to` < string > 要解析的超链接 URL。

`url.resolve()` 方法会以一种 Web 浏览器解析超链接的方式把一个目标 URL 解析成相对于一个基础 URL。

例子：

    url.resolve('/one/two/three', 'four');         // '/one/two/four'
    url.resolve('http://example.com/', '/one');    // 'http://example.com/one'
    url.resolve('http://example.com/one', '/two'); // 'http://example.com/two'