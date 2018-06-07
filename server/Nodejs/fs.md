# fs--文件系统

## flags--操作标志位

- 'r' 以读取模式打开文件。如果文件不存在则发生异常。
- 'r+' 以读写模式打开文件。如果文件不存在则发生异常。
- 'rs+' 以同步读写模式打开文件。命令操作系统绕过本地文件系统缓存。
- 'w' 以写入模式打开文件。文件会被创建（如果文件不存在）或截断（如果文件存在）。
- 'wx' 类似 'w'，但如果 path 存在，则失败。
- 'w+' 以读写模式打开文件。文件会被创建（如果文件不存在）或截断（如果文件存在）。
- 'wx+' 类似 'w+'，但如果 path 存在，则失败。
- 'a' 以追加模式打开文件。如果文件不存在，则会被创建。
- 'ax' 类似于 'a'，但如果 path 存在，则失败。
- 'a+' 以读取和追加模式打开文件。如果文件不存在，则会被创建。
- 'ax+' 类似于 'a+'，但如果 path 存在，则失败。

## fs.readFile(path[, options], callback)--异步读取文件

- path string | Buffer | URL | integer 文件名或文件描述符。
- options Object | string
    - encoding string | null 默认为 null。
    - flag string 默认为 'r'。
- callback Function
    - err Error
    - data string | Buffer

```
fs.readFile('/etc/passwd', (err, data) => {
  if (err) throw err;
  console.log(data);
});

fs.readFile('/etc/passwd', 'utf8', callback);
```

## fs.readFileSync(path[, options])--同步读取文件

- fs.readFile 类似，没有 callback，同步操作。

## fs.writeFile(file, data[, options], callback)--异步写入文件

- file string | Buffer | URL | integer 文件名或文件描述符
- data string | Buffer | Uint8Array
- options Object | string
    - encoding string | null 默认 = 'utf8'
    - mode integer 默认 = 0o666
    - flag string 默认 = 'w'
- callback Function
    - err Error

```
fs.writeFile('message.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

fs.writeFile('message.txt', 'Hello Node.js', 'utf8', callback);
```

## fs.writeFileSync(file, data[, options])--同步写入文件

- fs.writeFile 类似，没有 callback，同步操作。

## fs.chmod(path, mode, callback)--异步修改文件权限

- path string | Buffer | URL
- mode integer
- callback Function
    - err Error

```
fs.chmod('message.txt', 0o765, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
```

## fs.chmodSync(path, mode)--同步修改文件权限

- fs.chmod 类似，没有 callback，同步操作。

## fs.existsSync(path)--同步识别路径是否存在

- path string | Buffer | URL

```
fs.exists('/etc/passwd');
```

## fs.unlink(path, callback)--异步删除文件

- path string | Buffer | URL
- callback Function
    - err Error

```
fs.unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('成功删除 /tmp/hello');
});
```

## fs.unlinkSync(path)--同步删除文件

- fs.unlink 类似，没有 callback，同步操作。

## fs.stat(path, callback)--异步获取存储信息

- path string | Buffer | URL
- callback Function
    - err Error
    - stats fs.Stats

## fs.statSync(path)--同步获取存储信息

- fs.stat 类似，没有 callback，同步操作。