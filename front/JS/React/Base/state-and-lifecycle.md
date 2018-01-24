# State & 生命周期

目录



## 将函数转换为类

1. 创建一个名称扩展为 React.Component 的 ES6 类。
2. 创建一个叫做 render() 的空方法。
3. 将函数体移动到 render() 方法中。
4. 在 render() 方法中，使用 this.props 替换 props。
5. 删除剩余的空函数声明。

```
// 函数定义组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// 类定义组件
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

## 为一个类添加局部状态

1. 在 render() 方法中使用 this.state.date 替代 this.props.date。
2. 添加一个类构造函数来初始化状态 this.state。
3. 从组件调用元素移除 date 属性。

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

## 将生命周期方法添加到类中

- 虽然 this.props 由React本身设置以及this.state 具有特殊的含义，但如果需要存储不用于视觉输出的东西，则可以手动向类中添加其他字段。
- 如果你不在 render() 中使用某些东西，它就不应该在状态中。

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  // 组件挂载后，生成定时器，执行 tick 函数
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  // 组件卸载之前，清除定时器
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // 设置新的 this.state.date
  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

## 正确地使用状态

- 不要直接更新状态

```
// 错误
this.state.comment = 'Hello';

// 正确
this.setState({comment: 'Hello'});
```

- 状态更新可能是异步的

```
// 错误
this.setState({
  counter: this.state.counter + this.props.increment,
});

// 正确
// prevState：先前的状态
// props：更新后的 props
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

## 状态更新合并

- 当你调用 setState() 时，React 将你提供的对象合并到当前状态。
- 合并是浅合并，更新属性全替换。

## 数据自顶向下流动

- 任何状态始终由某些特定组件所有，并且从该状态导出的任何数据或 UI 只能影响树中下方的组件。