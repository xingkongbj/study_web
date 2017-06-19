# ECMAScript 6 let和const命令

> ECMAScript 6 入门 (阮一峰) http://es6.ruanyifeng.com/#docs/let

目录

- [let 命令](#let-命令)
- [块级作用域](#块级作用域)
- [const 命令](#const-命令)
- [ES6 声明变量的六种方法](#es6-声明变量的六种方法)
- [顶层对象的属性](#顶层对象的属性)
- [global 对象](#global-对象)

## let 命令

let 只在 代码块内有效

    {
      let a = 10;
      var b = 1;
    }
    
    a // ReferenceError: a is not defined.
    b // 1

for 循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

    for (let i = 0; i < 3; i++) {
      let i = 'abc';
      console.log(i);
    }
    // abc
    // abc
    // abc

for 循环中当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。

    var a = [];
    for (let i = 0; i < 10; i++) {
      a[i] = function () {
        console.log(i);
      };
    }
    a[6](); // 6

let 不存在变量提升，要先声明后使用,即使调用 typeof 也会报错。

    // var 的情况
    console.log(foo); // 输出undefined
    var foo = 2;
    
    // let 的情况
    console.log(bar); // 报错ReferenceError
    let bar = 2;

在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。这在语法上，称为暂时性死区。

暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

    function bar(x = y, y = 2) {
      return [x, y];
    }
    
    bar(); // 报错

    // 不报错
    var x = x;
    
    // 报错
    let x = x;
    // ReferenceError: x is not defined

let 不允许在相同作用域内，重复声明同一个变量。

    // 报错
    function () {
      let a = 10;
      var a = 1;
    }

    // 报错
    function () {
      let a = 10;
      let a = 1;
    }

    function func(arg) {
      let arg; // 报错
    }

    function func(arg) {
      {
        let arg; // 不报错
      }
    }

## 块级作用域

    var tmp = new Date();
    
    function f() {
      console.log(tmp);
      if (false) {
        var tmp = 'hello world';
      }
    }
    
    f(); // undefined

if代码块的外部使用外层的tmp变量，内部使用内层的tmp变量。但是，函数f执行后，输出结果为undefined，原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。

var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5

变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。

块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。

在浏览器的 ES6 环境中，块级作用域内声明的函数，行为类似于var声明的变量。

    // 浏览器的 ES6 环境
    function f() { console.log('I am outside!'); }
    
    (function () {
      if (false) {
        // 重复声明一次函数f
        function f() { console.log('I am inside!'); }
      }
    
      f();
    }());
    // Uncaught TypeError: f is not a function

考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

ES6 的块级作用域允许声明函数的规则，只在使用大括号的情况下成立，如果没有使用大括号，就会报错。

块级作用域可以变为表达式，也就是说可以返回值，办法就是在块级作用域之前加上do，使它变为do表达式。

    let x = do {
      let t = f();
      t * t + 1;
    };

上面代码中，变量x会得到整个块级作用域的返回值。

## const 命令

const 声明一个只读的常量。一旦声明，常量的值就不能改变。

    const PI = 3.1415;
    PI // 3.1415
    
    PI = 3;
    // TypeError: Assignment to constant variable.

const 声明的变量不得改变值，这意味着，const 一旦声明变量，就必须立即初始化，不能留到以后赋值。

    const foo;
    // SyntaxError: Missing initializer in const declaration

const 的作用域与 let 命令相同：只在声明所在的块级作用域内有效。

    if (true) {
      const MAX = 5;
    }
    
    MAX // Uncaught ReferenceError: MAX is not defined

const 命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

    if (true) {
      console.log(MAX); // ReferenceError
      const MAX = 5;
    }

const 声明的常量，也与 let 一样不可重复声明。

    var message = "Hello!";
    let age = 25;
    
    // 以下两行都会报错
    const message = "Goodbye!";
    const age = 30;

const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const 只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。

const 只能保证这个指针是固定的，但对象本身是可变的，所以依然可以为其添加新属性。

    const a = [];
    a.push('Hello'); // 可执行
    a.length = 0;    // 可执行
    a = ['Dave'];    // 报错

## ES6 声明变量的六种方法

ES5 只有两种声明变量的方法：var 命令和 function 命令。ES6 除了添加 let 和 const 命令，后面章节还会提到，另外两种声明变量的方法： import 命令和 class 命令。所以，ES6 一共有6种声明变量的方法。

## 顶层对象的属性

顶层对象，在浏览器环境指的是window对象，在Node指的是global对象。ES5之中，顶层对象的属性与全局变量是等价的。

顶层对象的属性与全局变量挂钩，被认为是JavaScript语言最大的设计败笔之一。这样的设计带来了几个很大的问题，首先是没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）；其次，程序员很容易不知不觉地就创建了全局变量（比如打字出错）；最后，顶层对象的属性是到处可以读写的，这非常不利于模块化编程。另一方面，window对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。

## global 对象

ES5的顶层对象，本身也是一个问题，因为它在各种实现里面是不统一的。

- 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
- 浏览器和 Web Worker 里面，self也指向顶层对象，但是Node没有self。
- Node 里面，顶层对象是global，但其他环境都不支持。

同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用this变量，但是有局限性。

- 全局环境中，this会返回顶层对象。但是，Node模块和ES6模块中，this返回的是当前模块。
- 函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象。但是，严格模式下，这时this会返回undefined。
- 不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。但是，如果浏览器用了CSP（Content Security Policy，内容安全政策），那么eval、new Function这些方法都可能无法使用。

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