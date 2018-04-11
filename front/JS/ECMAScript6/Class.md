# Class

> ECMAScript 6 入门 (阮一峰) [http://es6.ruanyifeng.com/#docs/class](http://es6.ruanyifeng.com/#docs/class)

目录

- [类](#类)
- [类的静态方法](#类的静态方法)
- [new.target 属性](#newtarget-属性)
- [类的继承](#类的继承)
- [super 关键字](#super-关键字)

## 类

ES6 的 class 可以看作只是一个语法糖。

- 类和模块的内部，默认就是严格模式。
- 类的内部所有定义的方法，都是不可枚举的。
- 方法之间不能加 “,” 号，前面不需要加 function。
- constructor 方法会被默认添加。
- 类必须使用 new 调用。
- constructor 方法内部 this 是类的实例对象。
- class 的定义不存在变量提升。

```
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);

//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```

## 类的静态方法

- 只在类上有效，不会实例化。
- 静态方法可以与非静态方法重名.
- 内部只有静态方法，没有静态属性。

```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'
```

## new.target 属性

- 返回 new 命令作用于的那个构造函数，没有返回 undefined。
- 类中使用，返回该类。子类继承父类时，new.target 会返回子类。

```
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    // ...
  }
}

class Square extends Rectangle {
  constructor(length) {
    super(length, length);
  }
}

var obj = new Square(3); // 输出 false
```

## 类的继承

- ES5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先创造父类的实例对象 this（所以必须先调用 super 方法），然后再用子类的构造函数修改 this。
- 在子类的构造函数中，只有调用 super 之后，才可以使用 this 关键字，否则会报错。返回的 this 是子类的实例。
- 父类的静态方法，也会被子类继承。

```
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) { // 省略时，默认添加 constructor 和 super 的调用
    this.color = color; // ReferenceError
    super(x, y); // 继承父类
    this.color = color; // 正确
  }
}

Object.getPrototypeOf(ColorPoint) === Point
// true 判断一个类的父类
```

## super 关键字

### super 作为函数调用时，代表父类的构造函数。

- 返回的是子类 B 的实例，即 super 内部的 this 指的是 B，因此 super() 在这里相当于 A.prototype.constructor.call(this)。
- super() 只能用在子类的构造函数之中使用。

```
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A() // A
new B() // B
```

### super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

```
class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg);
  }

  myMethod(msg) {
    super.myMethod(msg);
  }
}

Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); // instance 2
```

### 在子类普通方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类实例。

```
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m() // 2
```

### 如果通过 super 对某个属性赋值，这时 super 就是 this，赋值的属性会变成子类实例的属性。

```
class A {
  constructor() {
    this.x = 1;
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}

let b = new B();
```

### 在子类的静态方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类，而不是子类的实例。

```
class A {
  constructor() {
    this.x = 1;
  }
  static print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  static m() {
    super.print();
  }
}

B.x = 3;
B.m() // 3
```