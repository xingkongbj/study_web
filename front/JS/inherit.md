# 继承

> http://www.w3school.com.cn/js/pro_js_inheritance_implementing.asp

目录



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

1. 把 ClassA 引入 ClassB ，此时两者共用一个 this。
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