# let 和 const 命令

> ECMAScript 6 入门 (阮一峰) [http://es6.ruanyifeng.com/#docs/let](http://es6.ruanyifeng.com/#docs/let)

目录

- [let 命令](#let-命令)

## 变量声明的六种方法

- var
- function
- let
- const
- import
- class

## 块级作用域

- 防止计数的循环变量泄漏为全局变量，如 for 循环
- 防止内层变量覆盖外层变量
- 立即执行函数表达式（IIFE）不再必要

## let 命令

- 块级作用域
- 不存在变量提升
- 定义前调用，都是暂时性死区，使用会报错，包括 typeof
- 不允许重复声明，包括同一作用域声明 var，函数根作用域声明变量也报错

let 只在 代码块内有效

```
{
  let a = 10;
  var b = 1;
}
    
a // ReferenceError: a is not defined.
b // 1
```
for 循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

```
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```

for 循环中当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。

```
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

有些“死区”比较隐蔽，不太容易发现

```
function bar(x = y, y = 2) {
  return [x, y];
}
    
bar(); // 报错

// 不报错
var x = x;
    
// 报错
let x = x;
// ReferenceError: x is not defined
```

## const 命令

- 块级作用域
- 不存在变量提升
- 定义前调用，都是暂时性死区，使用会报错，包括 typeof
- 不允许重复声明，包括同一作用域声明 var，函数根作用域声明变量也报错
- 只读的常量，一旦声明就不能改变
- 声明时要赋值，不然报错
- 变量指向的那个内存地址不得改动，导致对象和数据内容可以修改

只声明不赋值，会报错

```
const foo;
// SyntaxError: Missing initializer in const declaration
```

常量对象可以修改

```
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

常量数组可以修改

```
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```

## 顶层对象的属性

顶层对象，在浏览器环境指的是window对象，在Node指的是global对象。ES5之中，顶层对象的属性与全局变量是等价的。

顶层对象的属性与全局变量挂钩的弊端

- 没法在编译时就报出变量未声明的错误，只有运行时才能知道
- 程序员很容易不知不觉地就创建了全局变量
- 顶层对象的属性是到处可以读写的，这非常不利于模块化编程
- 顶层对象是一个有实体含义的对象，也是不合适的

ES6 的规定

- var 和 function 声明的全局变量，依旧是顶层对象的属性
- let 、const 、class 声明的全局变量，不属于顶层对象的属性

## global 对象

ES5 的顶层对象，本身也是一个问题，因为它在各种实现里面是不统一的。

- 浏览器里面，顶层对象是 window，但 Node 和 Web Worker 没有 window。
- 浏览器和 Web Worker 里面，self 也指向顶层对象，但是 Node 没有 self。
- Node 里面，顶层对象是 global，但其他环境都不支持。

同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用 this 变量，但是有局限性。

- 全局环境中，this 会返回顶层对象。但是，Node 模块和 ES6 模块中，this 返回的是当前模块。
- 函数里面的 this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this 会指向顶层对象。但是，严格模式下，这时 this 会返回 undefined。
- 不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全政策），那么 eval、new Function 这些方法都可能无法使用。

综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法。

    // 方法一
    (typeof window !== 'undefined'
       ? window
       : (typeof process === 'object' &&
          typeof require === 'function' &&
          typeof global === 'object')
         ? global
         : this);
    
    // 方法二
    var getGlobal = function () {
      if (typeof self !== 'undefined') { return self; }
      if (typeof window !== 'undefined') { return window; }
      if (typeof global !== 'undefined') { return global; }
      throw new Error('unable to locate global object');
    };