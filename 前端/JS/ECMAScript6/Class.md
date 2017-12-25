# Class

> ECMAScript 6 入门 (阮一峰) [http://es6.ruanyifeng.com/#docs/class](http://es6.ruanyifeng.com/#docs/class)

目录



## class

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
