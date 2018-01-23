# 字符串的扩展

> ECMAScript 6 入门 (阮一峰) [http://es6.ruanyifeng.com/#docs/string](http://es6.ruanyifeng.com/#docs/string)

目录

- [字符的 Unicode 表示法](#字符的-unicode-表示法)
- [字符串的遍历器接口](#字符串的遍历器接口)
- [模板字符串](#模板字符串)
- [标签模板](#标签模板)

## 字符的 Unicode 表示法

- 支持双字节，用 { } 标示编码

```
"\u{20BB7}"
// "𠮷"

"\u{41}\u{42}\u{43}"
// "ABC"

let hello = 123;
hell\u{6F} // 123

'\u{1F680}' === '\uD83D\uDE80'
// true
```

- JavaScript 共有 6 种方法可以表示一个字符

```
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
```

## 字符串的遍历器接口

- 遍历 value 值
- in 遍历 key 值

```
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"

for (let codePoint in 'foo') {
  console.log(codePoint)
}
// 0
// 1
// 2
```

## 模板字符串

- 使用 ${ } 直接读取变量
- 支持换行

```
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

- ${ } 内部可以是表达式

```
let obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// "3"
```

- 可以调用函数

```
function fn() {
  return "Hello World";
}

`foo ${fn().trim()} bar`
```

- 把模板当成语句使用

```
// 写法一
let str = 'return ' + '`Hello ${name}!`';
let func = new Function('name', str);
func('Jack') // "Hello Jack!"

// 写法二
let str = '(name) => `Hello ${name}!`';
let func = eval.call(null, str);
func('Jack') // "Hello Jack!"
```

- 模板编译

```
// 模板
let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;

// 编译函数
function compile(template){
  const evalExpr = /<%=(.+?)%>/g;
  const expr = /<%([\s\S]+?)%>/g;

  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  // 替换后的字符串如下：
  // echo('<ul>');
  // for(let i=0; i < data.supplies.length; i++) {
  //   echo('<li>');
  //   echo(data.supplies[i]);
  //   echo('</li>');
  // };
  // echo('</ul>');

  let script =
  `(function parse(data){
    let output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;
  // sctipt 是一个模板，用于构建函数，构建函数时会把 template 替换后的内容替换进去。
  return script;
}

// 生成模板函数
let parse = eval(compile(template));  // compile(template) 生成创建函数的字符串模板
// 写入数据
div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });
//   <ul>
//     <li>broom</li>
//     <li>mop</li>
//     <li>cleaner</li>
//   </ul>
```

## 标签模板

- 把模板经过转换为参数，传给函数

```
let a = 5;
let b = 10;

tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);
```

- 第一个参数有 raw 属性，保存转义前的源码

```
tag`First line\nSecond line`

function tag(strings) {
  console.info(strings[0]);
  // strings[0] 实际存储为 "First line\nSecond line"
  // strings[0] 打印输出为 "First line
  // Second line"
  console.info(strings.raw[0]);
  // strings.raw[0] 实际存储为 "First line\\nSecond line"
  // strings.raw[0] 打印输出为 "First line\nSecond line"
}
```