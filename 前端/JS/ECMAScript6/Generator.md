# Generator

> ECMAScript 6 入门 (阮一峰) [http://es6.ruanyifeng.com/#docs/generator](http://es6.ruanyifeng.com/#docs/generator)

目录



## generator

yield 表达式

- 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
- 下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
- 如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
- 如果该函数没有return语句，则返回的对象的value属性值为undefined。

```
function* demo() {
  let a = 0;
  console.info(a);
  a = yield 1;
  console.info(a);
  a = yield 2;
  console.info(a);
  a = yield 3;
  console.info(a);
  return 4;
}

let i = demo();
i.next();
// 0
// { value: 1, done: false }
i.next();
// undefined
// { value: 2, done: false }
i.next(7);
// 7
// { value: 3, done: false }
i.next();
// undefined
// { value: 4, done: true }
i.next();
// { value: undefined, done: true }

for (let i of demo()){
  console.info(i);
}
// 0,1,undefined,2,undefined,3,undefined
```