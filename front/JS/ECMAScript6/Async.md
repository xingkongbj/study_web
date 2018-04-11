# async

> ECMAScript 6 入门 (阮一峰) [http://es6.ruanyifeng.com/#docs/async](http://es6.ruanyifeng.com/#docs/async)

目录



## 基本用法

- 类似 Generator 函数的语法糖。
- 返回一个 Promise 对象。
- 等待前面的 await 执行完，再向后执行。
- 内部所有 await 命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到 return 语句或者抛出错误，报错后面的语句不会执行。

```
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```
