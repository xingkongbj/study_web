# Set 和 Map 数据结构

> ECMAScript 6 入门 (阮一峰) [http://es6.ruanyifeng.com/#docs/set-map](http://es6.ruanyifeng.com/#docs/set-map)

目录



## Set

- 成员的值都是唯一的，没有重复的值。


```
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4
```

## WeakSet

- 成员的值都是唯一的，没有重复的值。
- 成员只能是对象，而不能是其他类型的值。
- 弱引用，即垃圾回收机制不考虑该引用

```
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
```

## Map

- 可以使用对象做为键名，如 DOM 节点

```
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

## WeakMap

- 可以使用对象做为键名，如 DOM 节点
- 键名只能是对象，而不能是其他类型的值。
- 弱引用，即垃圾回收机制不考虑该引用