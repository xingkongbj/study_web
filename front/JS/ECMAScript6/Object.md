# 对象的扩展

> ECMAScript 6 入门 (阮一峰) [http://es6.ruanyifeng.com/#docs/object](http://es6.ruanyifeng.com/#docs/object)

目录

- [简洁写法](#简洁写法)
- [属性名表达式](#属性名表达式)
- [Object.assign](#objectassign)
    - [注意事项](#注意事项)
    - [常见用途](#常见用途)
- [属性的可枚举性和遍历](#属性的可枚举性和遍历)
    - [可枚举性](#可枚举性)
    - [属性的遍历](#属性的遍历)
- [super 关键字](#super-关键字)
- [对象的扩展运算符](#对象的扩展运算符)
    - [解构赋值](#解构赋值)
    - [扩展运算符](#扩展运算符)

## 简洁写法

```
const foo = 'bar';
const baz = {
    foo,
    method() {
        return "Hello!";
    }
};

// 等同于
const baz = {
    foo: foo,
    method: function() {
        return "Hello!";
    }
};
```

## 属性名表达式

```
let propKey = 'foo';

let obj = {
  [propKey]: true,
  ['h' + 'ello']() {
    return 'hi';
  }
};
```

## Object.assign

### 注意事项

- 浅拷贝，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
- 同名属性的替换，一旦遇到同名属性，直接替换。
- 可以用来处理数组，但是会把数组视为对象。
- 只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。

### 常见用途

- 为对象添加属性。
- 为对象添加方法。
- 克隆对象，只能克隆原始对象自身的值，不能克隆它继承的值。
- 合并多个对象。
- 为属性指定默认值。

## 属性的可枚举性和遍历

### 可枚举性

四个操作会忽略 enumerable 为 false 的属性，其中，只有 for...in 会返回继承的属性。

- for...in循环：只遍历对象自身的和继承的可枚举的属性。
- Object.keys()：返回对象自身的所有可枚举的属性的键名。
- JSON.stringify()：只串行化对象自身的可枚举的属性。
- Object.assign()： 忽略 enumerable 为 false 的属性，只拷贝对象自身的可枚举的属性。

ES6 规定，所有 Class 的原型的方法都是不可枚举的。

我们只关心对象自身的属性。所以，尽量不要用 for...in 循环，而用 Object.keys() 代替。

### 属性的遍历

ES6 一共有 5 种方法可以遍历对象的属性。

- for...in：遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
- Object.keys(obj)：返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
- Object.getOwnPropertyNames(obj)：返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
- Object.getOwnPropertySymbols(obj)：返回一个数组，包含对象自身的所有 Symbol 属性的键名。
- Reflect.ownKeys(obj)：返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

## super 关键字

- 关键字 super，指向当前对象的原型对象。
- super 关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。
- 目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。

```
const proto = {
  foo: 'hello'
};

const obj = {
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
```

## 对象的扩展运算符

### 解构赋值

- 只能有一个，并且放在最后

```
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

### 扩展运算符

- 取出参数对象的所有可遍历属性，拷贝到当前对象之中。

```
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }
```