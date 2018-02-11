# 正则的扩展

> ECMAScript 6 入门 (阮一峰) [http://es6.ruanyifeng.com/#docs/regex](http://es6.ruanyifeng.com/#docs/regex)

目录



## RegExp 构造函数：flags 属性

- 允许修改，修饰符

```
new RegExp(/abc/ig, 'i').flags
// "i"
```

## u 修饰符：unicode 属性

- 正确处理四个字节的 UTF-16 编码

```
/^\uD83D/u.test('\uD83D\uDC2A') // false
/^\uD83D/.test('\uD83D\uDC2A') // true
```

## y 修饰符：sticky 属性

- g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。

```
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]
r2.exec(s) // null
```

## s 修饰符：dotAll 属性

- 正则表达式中，点（.）是一个特殊字符，代表任意的单个字符，但是有两个例外。一个是四个字节的 UTF-16 字符，这个可以用u修饰符解决；另一个是行终止符。
- dotAll 模式，即点（.）代表一切字符。

## 后行断言

- “先行断言”指的是，x只有在y前面才匹配，必须写成/x(?=y)/。
- “先行否定断言”指的是，x只有不在y前面才匹配，必须写成/x(?!y)/。
- “后行断言”正好与“先行断言”相反，x只有在y后面才匹配，必须写成/(?<=y)x/。
- “后行否定断言”则与“先行否定断言”相反，x只有不在y后面才匹配，必须写成/(?<!y)x/。
- 没有“后行断言”时，由于执行顺序是从左到右，第一个括号是贪婪模式，第二个括号只能捕获一个字符。
- 而“后行断言”时，由于执行顺序是从右到左，第二个括号是贪婪模式，第一个括号只能捕获一个字符。

## Unicode 属性类

- \p{...} 允许正则表达式匹配符合 Unicode 某种属性的所有字符。
- \P{…}是\p{…}的反向匹配，即匹配不满足条件的字符。
- 对于某些属性，可以只写属性名，或者只写属性值。

```
// 匹配一个希腊文字母
const regexGreekSymbol = /\p{Script=Greek}/u;
regexGreekSymbol.test('π') // true

// 匹配所有数字
const regex = /^\p{Number}+$/u;
regex.test('²³¹¼½¾') // true
regex.test('㉛㉜㉝') // true
regex.test('ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ') // true
```

## 具名组匹配

```
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year; // 1999
const month = matchObj.groups.month; // 12
const day = matchObj.groups.day; // 31
```

## 解构赋值和替换

```
// 解构赋值
let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
one  // foo
two  // bar

// 字符串替换
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
'2015-01-02'.replace(re, '$<day>/$<month>/$<year>')
// '02/01/2015'

// 字符串替换使用函数
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
'2015-01-02'.replace(re, (
   matched, // 整个匹配结果 2015-01-02
   capture1, // 第一个组匹配 2015
   capture2, // 第二个组匹配 01
   capture3, // 第三个组匹配 02
   position, // 匹配开始的位置 0
   S, // 原字符串 2015-01-02
   groups // 具名组构成的一个对象 {year, month, day}
 ) => {
 let {day, month, year} = args[args.length - 1];
 return `${day}/${month}/${year}`;
});

```

## 引用

- 如果要在正则表达式内部引用某个“具名组匹配”，可以使用\k<组名>的写法。
- 数字引用（\1）依然有效。

```
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
RE_TWICE.test('abc!abc') // true
RE_TWICE.test('abc!ab') // false
```