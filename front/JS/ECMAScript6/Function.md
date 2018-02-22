# 函数的扩展

> ECMAScript 6 入门 (阮一峰) [http://es6.ruanyifeng.com/#docs/function](http://es6.ruanyifeng.com/#docs/function)

目录

- [函数参数的默认值](#函数参数的默认值)
- [作用域](#作用域)
- [rest 参数](#rest-参数)
- [箭头函数](#箭头函数)
- [嵌套的箭头函数](#嵌套的箭头函数)

## 函数参数的默认值

- 在函数体中，不能用 let 或 const 再次声明参数变量，否则会报错
- 使用参数默认值时，函数不能有同名参数
- 参数默认值是惰性求值的
- 默认值的参数，应该是函数的尾参数；否则无法只省略该参数，除非显式输入undefined

```
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}
// 无参数时，默认传入{}
// x 无值时，默认 0
// y 无值时，默认 0
```

## 作用域

- 设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。
- 如果参数的默认值是一个函数，该函数的作用域也遵守这个规则。

```
let foo = 'outer';
function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}
bar(); // outer
```

```
var x = 1;
// 传入的 x 和 函数 y 中的 x 都指向 foo 的第一个参数 x 
function foo(x, y = function() { x = 2; }) {
  // 使用 var 在内部创建了局部作用域，此时函数 y 中的 x 还指向 foo 的第一个参数 x
  var x = 3;
  // 修改 foo 的第一个参数 x，但此时 foo 中已无法获取到
  y();
  console.log(x);
}

foo() // 3
// 全局 x 没有被修改
x // 1
```

## rest 参数

- 把剩余参数转化成数组
- 只能放在最后一个参数

```
function add(...values) {
  let sum = 0;
  for (var val of values) {
    sum += val;
  }
  return sum;
}
add(2, 5, 3) // 10
```

## 箭头函数

- 一个参数时，左侧小括号可以省略
- 右侧有 return 或者非单行语句时，加大括号
- 右侧没有 return 并且返回对象时，加小括号

```
var sum = (num1, num2) => { return num1 + num2; }

let getTempItem = id => ({ id: id, name: "Temp" });
```

注意事项

- 函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。
- 不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。
- 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
- 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

```
// 只存在最外层的 this
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
```

除了 this ，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。

## 嵌套的箭头函数

```
// (...funcs) 把传入的 plus1, mult2 转化为 [plus1, mult2]，并返回一个函数，假定叫函数 A
// val 为函数 A 传入的参数 5
// funcs.reduce((a, b) => b(a), val) 为函数 A 的执行结果

// funcs 为 [plus1, mult2]
// val 为 5
// a 为 val 或 b(a) 的执行结果
// b 为 funcs 中的循环项

const pipeline = (...funcs) =>
  val => funcs.reduce((a, b) => b(a), val);

const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);

addThenMult(5)
// 12
```

## 双冒号运算符

- 用来取代call、apply、bind调用
- 如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。
- 双冒号运算符的运算结果，返回一个对象，可以采用链式写法。

```
foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);

let log = ::console.log;
// 等同于
let log = console.log.bind(console);

let { find, html } = jake;
document.querySelectorAll("div.myClass")
::find("p")
::html("hahaha");
```

## 函数参数的尾逗号

- 允许函数的最后一个参数有尾逗号，使得函数参数与数组和对象的尾逗号规则，保持一致了