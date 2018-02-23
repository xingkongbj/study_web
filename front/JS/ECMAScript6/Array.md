# 数组的扩展

> ECMAScript 6 入门 (阮一峰) [http://es6.ruanyifeng.com/#docs/array](http://es6.ruanyifeng.com/#docs/array)

目录

- [扩展运算符](#扩展运算符)

## 扩展运算符

- 主要用于函数调用。
- 如果扩展运算符后面是一个空数组，则不产生任何效果。
- 扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

```
console.log(...[1, 2, 3])
// 1 2 3
```

## 扩展运算符的应用

### 复制数组

```
const a2 = [...a1];
```

### 合并数组

```
[...arr1, ...arr2, ...arr3]
```

### 与解构赋值结合

```
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]
```

### 字符串

```
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```

```
// 能正确处理四个字节的 Unicode 字符
// 只需通过扩展运算符写入数组即可

let str = 'x\uD83D\uDE80y';
[...str].reverse().join('')
// 'y\uD83D\uDE80x'
```

### 实现了 Iterator 转数组

```
let nodeList = document.querySelectorAll('div');
let array = [...nodeList];
```

### Map 和 Set 结构，Generator 函数

扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符。