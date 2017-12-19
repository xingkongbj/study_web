# Iterator 和 for...of 循环

> ECMAScript 6 入门 (阮一峰) [http://es6.ruanyifeng.com/#docs/iterator](http://es6.ruanyifeng.com/#docs/iterator)

目录



## Iterator（遍历器）的概念

Iterator 的作用

- 为各种数据结构，提供一个统一的、简便的访问接口
- 使得数据结构的成员能够按某种次序排列
- ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费

Iterator 的遍历过程

1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
2. 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
3. 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
4. 不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。



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
