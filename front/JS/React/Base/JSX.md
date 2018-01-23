# JSX 语法

目录



## 在 JSX 中使用表达式

- 表达式包含在 { } 中
- 可以做数学运算、属性展示和函数调用

```
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);

// <h1>Hello, Harper Perez!</h1>
```

## JSX 本身其实也是一种表达式

```
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

## JSX 属性

```
// 定义属性，使用驼峰定义属性
const element = <div tabIndex="0"></div>;

// 定义表达式属性
const element = <img src={user.avatarUrl}></img>;
```

## JSX 嵌套

```
// 标签要闭合
const element = <img src={user.avatarUrl} />;
```

## JSX 防注入攻击

React DOM 在渲染之前默认会 过滤 所有传入的值。它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS (跨站脚本) 攻击。

## JSX 代表 Objects

Babel 转译器会把 JSX 转换成一个名为 React.createElement() 的方法调用。

```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

// 等同
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```