# 模块加载

目录

- [简介](#简介)
- [CommonJs 使用示例](#commonjs-使用示例)
- [AMD 使用示例](#amd-使用示例)
- [ES6 Module 使用示例](#es6-module-使用示例)

## 简介

- CommonJs：服务器端，同步加载，如 Nodejs。
- AMD：浏览器环境，异步加载，如 RequireJS。
- ES6 Module：由于浏览器目前支持性不好，用于 webpack 打包前语法。
- AMD 与 CMD 区别：AMD 提前执行依赖模块的代码；CMD 延迟执行依赖模块的代码，即调用时才执行。CMD 代表 SeaJS，浏览器环境。

## CommonJs 使用示例

输出函数

```
// square.js
module.exports = (width) => {
  return {
    area: () => width ** 2
  };
};

// index.js
const square = require('./square.js');
const mySquare = square(2);
console.log(`正方形的面积是 ${mySquare.area()}`);
```

输出对象

```
// circle.js
const { PI } = Math;
module.exports.area = (r) => PI * r ** 2;
module.exports.circumference = (r) => 2 * PI * r;

// index.js
const circle = require('./circle.js');
console.log(`半径为 4 的圆的面积是 ${circle.area(4)}`);
```

## AMD 使用示例

普通方式

```
// circle.js
define(function() {
  const { PI } = Math;
  // 通过 return 直接提供接口
  return {
    area: (r) => PI * r ** 2,
    circumference: (r) => 2 * PI * r,
  }
});

// index.js
requirejs(['./circle.js'], function (circle) {
  console.log(`半径为 4 的圆的面积是 ${circle.area(4)}`);
});
```

CommonJS 的简单包装

```
// circle.js
define(function(require, exports, module) {
  const { PI } = Math;
  // 通过 return 直接提供接口
  module.exports = {
    area: (r) => PI * r ** 2,
    circumference: (r) => 2 * PI * r,
  }
});

// index.js
requirejs(['./circle.js'], function (circle) {
  console.log(`半径为 4 的圆的面积是 ${circle.area(4)}`);
});
```

## ES6 Module 使用示例

输出对象

```
// circle.js
const { PI } = Math;
export var area = (r) => PI * r ** 2;
export var circumference = (r) => 2 * PI * r;

// index.js
import * as circle from './circle.js';
console.log(`半径为 4 的圆的面积是 ${circle.area(4)}`);
```