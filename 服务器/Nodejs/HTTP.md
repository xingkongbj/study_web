# Node.js HTTP

### 目录

 - [http.Agent类](#httpagent类)
 - 
 -  

# http.Agent类

## new Agent([options])

 - `options` < Object > 代理的配置选项。
    - `keepAlive` < boolean > 保持 socket 可用即使没有请求，以便它们可被将来的请求使用而无需重新建立一个 TCP 连接。默认为 `false`。