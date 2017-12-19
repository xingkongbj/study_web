# Promise

> ECMAScript 6 入门 (阮一峰) [http://es6.ruanyifeng.com/#docs/promise](http://es6.ruanyifeng.com/#docs/promise)

目录



## Promise 的特点

保存异步请求结果，方便后面查看，异步触发结果回调。

特点

- 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和 从 pending 变为 rejected。

缺点

- 无法取消Promise，一旦新建它就会立即执行，无法中途取消。
- 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
- 当处于pending状态时，无法得知目前进展到哪一个阶段。

## 基本用法

- 通过resolve和reject识别是否成功
- 通过resolve和reject的参数返回结果

```
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

### 由于用到了异步的请求，导致外部使用也变成异步，除非使用then去触发.

- 如果p2结果是成功，那么会等待p1的结果，并把p1结果作为p2结果。
- 如果p2结果是失败，那么不会等待p1的结果，直接失败。

```
const p1 = new Promise(function (resolve, reject) {
  // post.commentURL
});

const p2 = new Promise(function (resolve, reject) {
  // "/post/1.json"
  resolve(p1);
})
```

## Promise.prototype.then()

- 返回的是一个新的Promise实例，不是原来那个Promise实例
- 状态传递，前一个状态，决定后一个状态，前一个失败会导致后面都失败
- retrun 一个Promise实例，后面的then会捕获该Promise的状态和返回参数；否则把当前then前面的状态，和当前then的返回值，提供给后面的then

```
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function funcA(comments) {
  console.log("resolved: ", comments);
}, function funcB(err){
  console.log("rejected: ", err);
});
```

## Promise.prototype.catch()

- .then(null, rejection)的别名，用于指定发生错误时的回调函数。
- Promise 内部的错误不会影响到 Promise 外部的代码

```
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});
```

## Promise.all()

- 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
- 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

```
const p = Promise.all([p1, p2, p3]);
```

注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。

```
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]
```

## Promise.race()

- 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

```
const p = Promise.race([p1, p2, p3]);
```

## Promise.resolve()

- 如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
- 如果参数是 thenable 对象，会将这个对象转为 Promise 对象，然后就立即执行 thenable 对象的 then 方法。
- 如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
- 如果不带有任何参数，直接返回一个resolved状态的 Promise 对象。

```
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

```
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});
```

## Promise.reject()

- 生成一个 Promise 对象的实例p，状态为rejected，回调函数会立即执行。

```
const thenable = {
  then(resolve, reject) {
    reject('出错了');
  }
};

Promise.reject(thenable)
.catch(e => {
  console.log(e === thenable)
})
// true
// 不是reject抛出的“出错了”这个字符串，而是thenable对象
```

