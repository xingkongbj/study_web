# async

> ECMAScript 6 入门 (阮一峰) [http://es6.ruanyifeng.com/#docs/async](http://es6.ruanyifeng.com/#docs/async)

目录



## 基本用法

- 类似 Generator 函数的语法糖.

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
