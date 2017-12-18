# Symbol

> ECMAScript 6 入门 (阮一峰) [http://es6.ruanyifeng.com/#docs/symbol](http://es6.ruanyifeng.com/#docs/symbol)

目录



## 概述

- 用于解决属性名冲突
- 属于新的原始数据类型
- 生成的对象独一无二


```
// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false

// 使用方式
let s = Symbol();

let obj = {
  [s]: function (arg) { ... }
};

obj[s](123);
```
