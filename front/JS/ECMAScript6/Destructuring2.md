# 变量的解构赋值

> ECMAScript 6 入门 (阮一峰) [http://es6.ruanyifeng.com/#docs/destructuring](http://es6.ruanyifeng.com/#docs/destructuring)

目录

- [数组的解构赋值](#数组的解构赋值)
- [对象的解构赋值](#对象的解构赋值)
- [字符串的解构赋值](#字符串的解构赋值)
- [数值和布尔值的解构赋值](#数值和布尔值的解构赋值)
- [函数参数的解构赋值](#函数参数的解构赋值)
- [圆括号问题](#圆括号问题)
- [解构赋值的用途](#解构赋值的用途)

## 数组的解构赋值

- 按照顺序和格式匹配内容。
- 匹配不成功，则等于 undefined。
- ...匹配不成功，则等于 []。
- 右侧不是数组，不能结构，会报错。
- 匹配结果非 undefined，默认值不会生效。如 null
- 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

```
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []

// 报错
let [foo] = 1;

let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null

let [x = 1, y = x] = [];     // x=1; y=1
let [x = y, y = 1] = [];     // ReferenceError
```

## 对象的解构赋值

- 按照名称和格式匹配内容。
- 左侧只有属性名时，变量为属性名。左侧属性名下有属性值时，变量为属性值。
- 匹配不成功，则等于 undefined。
- 右侧不是对象，不能结构，会报错。
- 匹配结果非 undefined，默认值不会生效。如 null
- 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
- 父集属性解析为 undefined，子集属性解释时会报错。


```
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined

let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};
let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]

let obj = {};
let arr = [];
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
obj // {prop:123}
arr // [true]

var {x: y = 3} = {x: 5};
y // 5
```

## 字符串的解构赋值

```
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

let {length : len} = 'hello';
len // 5
```

## 数值和布尔值的解构赋值

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于 undefined 和 null 无法转为对象，所以对它们进行解构赋值，都会报错。

```
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true

let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

## 函数参数的解构赋值

```
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3

function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]

[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]
```

## 圆括号问题

不能使用圆括号的情况

- 变量声明语句

```
// 全部报错
let [(a)] = [1];
let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};
```
- 函数参数

```
function f([z,(x)]) { return x; }  // 报错
```

- 赋值语句的模式部分

```
({ p: a }) = { p: 42 };  // 报错
[({ p: a }), { x: c }] = [{}, {}];  // 报错
```

可以使用圆括号的情况

- 赋值语句的非模式部分

```
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```

## 解构赋值的用途

- 交换变量的值

```
let x = 1;
let y = 2;

[x, y] = [y, x];
```

- 从函数返回多个值

```
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

- 函数参数的定义

```
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

- 提取 JSON 数据

```
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

- 函数参数的默认值

```
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // 其他参数
}) {
  // 函数主体
};
```

- 遍历 Map 结构

```
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

- 输入模块的指定方法

```
const { SourceMapConsumer, SourceNode } = require("source-map");
```