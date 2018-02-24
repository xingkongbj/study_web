# Symbol

> ECMAScript 6 入门 (阮一峰) [http://es6.ruanyifeng.com/#docs/symbol](http://es6.ruanyifeng.com/#docs/symbol)

目录

- [概述](#概述)
- [消除魔术字符串](#消除魔术字符串)

## 概述

- 用于解决属性名冲突，属于新的原始数据类型。
- 生成的值独一无二，相同参数生成的值也不一样。
- 函数前不能使用 new 命令。
- 不能与其他类型的值进行运算。
- 作为对象属性名时，不能用点运算符。

```
// 相同参数生成的值也不一样
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

## 消除魔术字符串

魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，就是把它写成一个变量。

```
const shapeType = {
  triangle: 'Triangle'
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });
```

很适合改用 Symbol 值。

```
const shapeType = {
  triangle: Symbol()
};
```