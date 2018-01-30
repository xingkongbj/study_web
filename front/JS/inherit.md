# 继承

> http://www.w3school.com.cn/js/pro_js_inheritance_implementing.asp

目录

- [ClassA](#classa)
- [生成一个实例](#生成一个实例)
- [原型部分的继承](#原型部分的继承)
- [构造函数部分的继承--对象冒充](#构造函数部分的继承--对象冒充)
- [构造函数部分的继承--apply/call/bind](#构造函数部分的继承--applycallbind)
- [继承](#继承-1)
- [Date 的继承](#Date-的继承)

## ClassA

- 由两部分组成构造函数和原型。
- 构造函数的部分，每个实例是独立的。
- 原型的部分，每个实例是共享的。 

```
// 构造函数
function ClassA(sColor) {
    this.color = sColor;
}

// 原型
ClassA.prototype.sayColor = function () {
    alert(this.color);
};
```

## 生成一个实例

- 内部操作：
    1. this 指向一个新 { }， 该对象的\_\_proto__ 指向 ClassA.prototype。
    2. 执行构造函数 ClassA。
    3. 返回 this 指向的 { }。

```
var a = new ClassA();

console.log(a.__proto__ === ClassA.prototype);
// a 的继承对象指向 ClassA
console.log(a.constructor === ClassA);
```

## 原型部分的继承

```
function ClassB() {
    // 实现继承 ClassA 构造函数部分的继承
}

ClassB.prototype = new ClassA();
// ClassB.prototype 指向新对象时，原有的 ClassB.constructor 属性会消失。
// new ClassA().hasOwnProperty('constructor') 为 false，新生成的对象无 constructor 属性。
// 在此修复这个问题。
ClassB.constructor = ClassB;
// 不过还存在 new ClassA().hasOwnProperty('color') 为 true 问题
// 实现继承 ClassA 构造函数部分的继承,生成的属性优先级比 new ClassA().color 高，顾可以忽略
```

## 构造函数部分的继承--对象冒充

1. 把 ClassA 当做方法引入 ClassB ，此时两者共用一个 this。
2. 执行构造函数 ClassA。
3. 删除临时引入。

```
function ClassB(sColor) {
    this.newMethod = ClassA;
    this.newMethod(sColor);
    delete this.newMethod;
}
```

## 构造函数部分的继承--apply/call/bind

- 它是对象冒充的一种函数实现
- 把 ClassB 的 this 绑定到 ClassA 的 this 上，执行构造函数 ClassA。

```
function ClassB(sColor) {
    ClassA.call(this, sColor);
    // 以下两种方式效果一样，只是实现方式不同
    // ClassA.apply(this, [sColor]);
    // ClassA.bind(this, sColor)();
}
```

## 继承

- 继承由两部分组成：构造函数的继承和原型的继承。任意选择继承方式组合即可。
- 构造函数的原型中的属性--constructor，永远指向该构造函数本身。如果继承时被修改，那么在最后请修正。
- 继承是保留原来的特性，所以可以在继承后，对新的构造函数或原型属性进行扩展。

## Date 的继承

```
// 需要考虑polyfill情况
Object.setPrototypeOf = Object.setPrototypeOf ||
    function(obj, proto) {
        obj.__proto__ = proto;
        return obj;
    };
/**
 * 用了点技巧的继承，实际上返回的是Date对象
 */
function MyDate() {
    // bind属于Function.prototype，接收的参数是：object, param1, params2...
    var dateInst = new(Function.prototype.bind.apply(Date, [null].concat(Array.prototype.slice.call(arguments))))();
    // 更改原型指向，否则无法调用MyDate原型上的方法
    // ES6方案中，这里就是[[prototype]]这个隐式原型对象，在没有标准以前就是__proto__
    Object.setPrototypeOf(dateInst, MyDate.prototype);
    dateInst.abc = 1;
    return dateInst;
}
// 原型重新指回Date，否则根本无法算是继承
Object.setPrototypeOf(MyDate.prototype, Date.prototype);
MyDate.prototype.getTest = function getTest() {
    return this.getTime();
};
let date = new MyDate();
// 正常输出，譬如1515638988725
console.log(date.getTest());
```

```
// 继承的重点语句
var dateInst = new(Function.prototype.bind.apply(Date, [null].concat(Array.prototype.slice.call(arguments))))();
// 使用经典方法实现继承的时候，由于 Date 是内部对象，使用上有限制
// 提示 “this is not a Date object”
// 说明 Date 上的方法只能由 Date 的实例调用，它会识别内部的 [[class]]，浏览器无法修改。
// 所以想到了如下方案
var dateInst = new Date(...arguments);
// 能实现构造函数的只有 bind
var dateInst = new (Date.bind(null, ...arguments))();
// ES5下无法实现 ...，只能转成数组
[null].concat(Array.prototype.slice.call(arguments));
// 参数中带数组的只有 ayyly
var dateInst = new (Function.prototype.bind.apply(Date, [null].concat(Array.prototype.slice.call(arguments))))();
```