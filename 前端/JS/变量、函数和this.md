# 变量、函数和 this

目录

- [变量提升](#变量提升)
- [函数提升](#函数提升)
- [函数上下文关系](#函数上下文关系)
- [this 上下文关系](#this-上下文关系)
    - [正常函数调用，this 指向 window](#正常函数调用this-指向-window)
    - [方法调用，this 指向调用对象](#方法调用this-指向调用对象)
    - [构造器函数调用，this 指向 new 生成的对象](#构造器函数调用this-指向-new-生成的对象)
    - [apply / call 调用](#apply--call-调用)
    - [dom 的事件属性中](#dom-的事件属性中)

    
## 变量提升

- 变量的定义在代码预解析时，在作用域顶部定义
- 无 var 没有变量提升

```
console.log(a);  // undefined，如果没有定义会直接报错
var a = 'aaa';
console.log(a);  // aaa

// 下面代码全等于上面代码
var a;  // 变量提升，函数作用域范围内
console.log(a);  // undefined
a = 'aaa';
console.log(a);  // aaa

console.log(a);  // 直接报错
a = 'aaa';
```

## 函数提升

- 函数的定义在代码预解析时，在作用域顶部定义
- 函数赋值在作用域顶部

```
console.log(f1);  // f1() { console.info('函数'); }
var f1 = function() { console.info('变量'); }
console.log(f1);  // ƒ () { console.info('变量'); }
function f1() { console.info('函数'); }
console.log(f1);  // ƒ () { console.info('变量'); }

// 下面代码全等于上面代码
var f1;  // 定义提升
function f1() { console.info('函数'); }  // 函数顶部赋值
console.log(f1);  // f1() { console.info('函数'); }
f1 = function() { console.info('变量'); }
console.log(f1);  // ƒ () { console.info('变量'); }
console.log(f1);  // ƒ () { console.info('变量'); }
```

## 函数上下文关系

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

## this 上下文关系

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
// 点击后输出 true
<input id="a" type="text" onclick="console.info(this === document.getElementById('a'))" />

// 点击后输出 true
<input id="a" type="text" />
<script type="text/javascript">
    document.getElementById('a').addEventListener("click", function(）{
        console.info(this === document.getElementById('a'));
    });
</script>

// 点击后输出 true
<input id="a" type="text" />
<script type="text/javascript">
    document.getElementById('a').onclick = function(）{
        console.info(this === document.getElementById('a'));
    });
</script>
```