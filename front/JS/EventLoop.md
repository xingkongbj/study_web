# 事件循环

> http://www.haorooms.com/post/js_xiancheng
> 
> https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/

目录


## 任务队列

- 主线程：正在执行的代码，会生成函数调用栈。
- macro-task（宏任务，新名：task）包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。
- micro-task（微任务，新名：jobs）包括: process.nextTick, Promise, Object.observe(已废弃), MutationObserver(html5新特性，队列中只能有一个)

## 任务分类

- 同步任务，语句只按语句先后顺序执行，前面未执行完，不会执行后面语句。
- 异步任务，语句不在语句先后顺序上执行，执行到该代码时，加入到相应任务队列，延后执行。

## 单线程

主线程从 script (整体代码)开始第一次循环。之后全局上下文进入函数调用栈。直到调用栈清空(只剩全局)，然后执行所有的 jobs。当所有可执行的 jobs 执行完毕之后。循环再次从 task 开始，找到其中一个任务队列执行完毕，然后再执行所有的 jobs，这样一直循环下去。

## 注意事项

- setTimeout 最小间隔不能低于 4 毫秒，否则会自动增加。
- DOM 的渲染每 16 毫秒执行一次，因为显示器是 60 Hz，16ms 刷新一次。
- process.nextTick 任务会在 jobs 里单独维护一个队列，并且在其他 jobs 任务之前执行。
- 冒泡事件会直接在子元素事件执行完成后，插入在主线程中。如果主线程不为空，那么会优先于 jobs 执行。

## 经典示例

示例详解：https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/

### 通过鼠标点击

```
<div class="outer">
  <div class="inner"></div>
</div>

// Let's get hold of those elements
var outer = document.querySelector('.outer');
var inner = document.querySelector('.inner');

// Let's listen for attribute changes on the
// outer element
new MutationObserver(function() {
  console.log('mutate');
}).observe(outer, {
  attributes: true
});

// Here's a click listener…
function onClick() {
  console.log('click');

  setTimeout(function() {
    console.log('timeout');
  }, 0);

  Promise.resolve().then(function() {
    console.log('promise');
  });

  outer.setAttribute('data-random', Math.random());
}

// …which we'll attach to both elements
inner.addEventListener('click', onClick);
outer.addEventListener('click', onClick);

// 输出结果
click
mutate
click
mutate
promise
promise
timeout
timeout
```

## 进阶--通过js执行

```
<div class="outer">
  <div class="inner"></div>
</div>

// Let's get hold of those elements
var outer = document.querySelector('.outer');
var inner = document.querySelector('.inner');

// Let's listen for attribute changes on the
// outer element
new MutationObserver(function() {
  console.log('mutate');
}).observe(outer, {
  attributes: true
});

// Here's a click listener…
function onClick() {
  console.log('click');

  setTimeout(function() {
    console.log('timeout');
  }, 0);

  Promise.resolve().then(function() {
    console.log('promise');
  });

  outer.setAttribute('data-random', Math.random());
}

// …which we'll attach to both elements
inner.addEventListener('click', onClick);
outer.addEventListener('click', onClick);
inner.click();

// 输出结果
click
click
mutate
promise
promise
timeout
timeout
```

由于点击事件是 js 执行的，inner 的 onClick 函数执行完成时，inner.click() 语句的作用域还没有退栈，主线程调用栈不是空的，导致 jobs 队列任务不会执行，mutate 和 promise 语句都未能在事件循环中执行到。从而执行了 outer 的 onClick 函数。outer 的 onClick 函数执行完成后，inner.click() 语句才退栈，继而执行 jobs 的任务。

只有一个 mutate 是由于 jobs 队列中，只能有一个 MutationObserver 任务，第二次创建时，前一个 MutationObserver 任务没有执行，顾不再创建。