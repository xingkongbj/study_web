# 函数和 this 的上下文关系

目录

- [函数](#函数)
- [this](#this)
    - [正常函数调用，this 指向 window](#正常函数调用this-指向-window)
    - [方法调用，this 指向调用对象](#方法调用this-指向调用对象)
    - [构造器函数调用，this 指向 new 生成的对象](#构造器函数调用this-指向-new-生成的对象)
    - [apply / call 调用](#apply--call-调用)

## 函数

- 函数的上下文关系在定义时确定

```
var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() { return scope; }
  return f;
}
checkscope()();  // local scope
```

## this

- this 的上下文关系在执行时确定

### 正常函数调用，this 指向 window

```
// 在 function 里
function test() {
    var type = this === window;
    return type;
}
test();  // true
```

### 方法调用，this 指向调用对象

```
// 在对象里
var obj = {
    test: function() {
        var type = this === obj;
        return type;
    }
};
obj.test();  // true

// 在 prototype 对象的方法中
function obj() {
}
obj.prototype.test = function() {
    return this;
}
var o = new obj();
o.test() === o;  // true
```

### 构造器函数调用，this 指向 new 生成的对象

```
// 调用 new 构造对象时
function obj() {
    this.test = function() {
        return this;
    }
}
var o = new obj();
o.test() === o;  // true
```

### apply / call 调用

```
function test() {
    return this;
}
var o = {};

// apply
test.apply(o) === o;  // true

// call
test.call(o) === o;  // true
```

### dom 的事件属性中

```
<input id="a" type="text" onclick="console.info(this === document.getElementById('a'))" />
// 点击后输出 true
```