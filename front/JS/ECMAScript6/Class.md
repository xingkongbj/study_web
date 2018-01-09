# Class

> ECMAScript 6 入门 (阮一峰) [http://es6.ruanyifeng.com/#docs/class](http://es6.ruanyifeng.com/#docs/class)

目录



## 类

ES6 的class可以看作只是一个语法糖。

- 类和模块的内部，默认就是严格模式。
- 类的内部所有定义的方法，都是不可枚举的。

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

## 继承

ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。

- 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。返回的this是子类的实例。

```
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}
```