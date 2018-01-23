# 组件 & Props

目录



## 函数定义/类定义组件

- 函数定义组件

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

- 类定义组件

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

## 组件渲染

- 当 React 遇到的元素是用户自定义的组件，它会将 JSX 属性作为单个对象传递给该组件,这个对象称之为 “props”。
- 组件名称必须以大写字母开头。

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

## 组合组件

