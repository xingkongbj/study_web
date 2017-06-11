# Node.js URL

### 目录

- [url]()
- [URL 字符串与 URL 对象]()
- [Legacy URL API]()
    - [url.parse(urlString[, parseQueryString[, slashesDenoteHost]])]()
    - []()

# url

`url` 模块提供了一些实用函数，用于 URL 处理与解析。 可以通过以下方式使用：

    const url = require('url');

# URL 字符串与 URL 对象

一个 URL 字符串是一个结构化的字符串，它包含多个有意义的组成部分。 当被解析时，会返回一个 URL 对象，它包含每个组成部分作为属性。

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

# Legacy URL API

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