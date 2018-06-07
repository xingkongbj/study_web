# readline--逐行读取

## readline.createInterface(options)--创建命令行输入提示

- options Object
    - input stream.Readable 要监听的可读流。该选项是必需的。
    - output stream.Writable 要写入逐行读取数据的可写流。
    - completer Function 一个可选的函数，用于 Tab 自动补全。
    - terminal boolean 如果 input 和 output 应被当作一个 TTY，且要写入 ANSI/VT100 转换的代码，则设为 true。 默认为实例化时在 output 流上检查 isTTY。
    - historySize number 保留的历史行数的最大数量。 设为 0 可禁用历史记录。 该选项只有当 terminal 被用户或内部 output 设为 true 时才有意义，否则历史缓存机制不会被初始化。 默认为 30。
    - prompt - 要使用的提示字符串。默认为 '> '。
    - crlfDelay number 如果 \r 与 \n 之间的延迟超过 crlfDelay 毫秒，则 \r 和 \n 都会被当作换行分隔符。默认为 100 毫秒。
    - removeHistoryDuplicates boolean 如果为true，当添加到历史列表中的新输入行，存在旧的相同行时，从列表中删除旧行。 默认为 false。

```
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
```

## rl.question(query, callback)--等待用户提供到 input 的输入

- query string 一个在提示符之前、要写入 output 的叙述或询问。
- callback Function 一个回调函数，它会被调用并带上用户响应 query 的输入。

```
rl.question('你最喜欢的食物是什么？ ', (answer) => {
  console.log(`你最喜欢的食物是 ${answer}`);
});
```

## rl.close()--关闭控制流

