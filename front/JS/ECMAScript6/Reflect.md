# Reflect

> ECMAScript 6 入门 (阮一峰) [http://es6.ruanyifeng.com/#docs/reflect](http://es6.ruanyifeng.com/#docs/reflect)

目录



## 概述

- 从 Object 对象转移一些明显属于语言内部的方法，以后 Object 上的将失效
- 配合 Proxy 使用，用于操作默认属性。
- 操作对象的13种方法


```
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
}

Reflect.get(myObject, 'foo') // 1
Reflect.get(myObject, 'bar') // 2
Reflect.get(myObject, 'baz') // 3
```

### 13种语言内部的方法

- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)

