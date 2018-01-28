# 继承

> http://www.w3school.com.cn/js/pro_js_inheritance_implementing.asp

目录



## ClassA

由两部分组成构造函数和原型。
构造函数的部分，每个实例是独立的。
原型的部分，每个实例是共享的。 

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

1. this 指向 a。
2. 执行构造函数 ClassA。
3. a.\_\_proto__ 指向 ClassA.prototype。

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

## 构造函数部分的继承--apply/call/bind

