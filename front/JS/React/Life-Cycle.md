# 生命周期

## Mounting阶段

### constructor()

- 在组件建立前被调用。
- 应该先调用 super(props)，否则 this.props 就会未定义。
- 初始化 props，state 和绑定方法。
- 如果在里面用 props 为 state 赋值，那么最好把 state 提升，也可以在 getDerivedStateFromProps() 里面用 props 为 state 赋值。

### static getDerivedStateFromProps()

- 下列三种情况下，会调用该方法
    - 组件实例化。
    - 组件的 props 发生变化。
    - 父组件重新渲染。
- this.setState() 不会触发 getDerivedStateFromProps()，但是 this.forceUpdate() 会。

### UNSAFE_componentWillMount()

- 其在 render() 之前被调用，因此在这方法里同步地设置状态将不会触发重渲。
- 官方不建议使用。
- 建议使用 constructor() 替代。
- 这个方法是唯一的服务端渲染钩子。
- 这一生命周期之前叫做 componentWillMount。这一名字在17版前都有效。

### render()

- 渲染组件，必须的。
- 纯净的，意味着其不应该改变组件的状态。
- 若 shouldComponentUpdate()返回false，render()函数将不会被调用。
- 当被调用时，其应该检查this.props 和 this.state并返回以下类型中的一个
    - React 元素。
    - 字符串和数字。这些将被渲染为 DOM 中的 text node。
    - Portals。由 ReactDOM.createPortal 创建。
    - null。什么都不渲染。
    - 布尔值。什么都不渲染。

### componentDidMount()

- 在组件建立之后立即调用。
- 在这里调用 setState() 会发生第二次 render，但是这第二次 render 会发生在浏览器渲染之前。
- 需要从远端加载数据，这是一个适合实现网络请求的地方。

## Update阶段

### UNSAFE_componentWillReceiveProps()

- 在装配了的组件接收到新属性前调用。
- 官方不建议使用。
- 建议使用 static getDerivedStateFromProps 替代。
- 在下列两种情况下，会调用
    - 组件的 props 发生改变。
    - 父组件发生重新渲染。
- 初始化 props 的时候并不会调用这个方法，this.setState() 也不会触发这个方法。
- 之前叫做 componentWillReceiveProps。这一名字在17版前都有效。

### static getDerivedStateFromProps()

- 在 update 阶段也会调用一次这个方法。
- 具体情况查看 Mounting 阶段。

### shouldComponentUpdate()

- 每当 state 发生改变的时候就重新渲染组件。
- 当初始化的时候，这个方法不会被调用。
- 当使用 forceUpdate() 的时候，这个方法也不会调用。
- 如果执行结果返回 false，Update 阶段后面的方法都跳过。

### UNSAFE_componentWillUpdate()

- 在渲染前被立即调用。
- 该方法不会在初始化渲染时调用。
- 注意你不能在这调用 this.setState()，若你需要更新状态响应属性的调整，使用 getDerivedStateFromProps() 代替。
- 这一生命周期之前叫做 componentWillUpdate。这一名字在17版前都有效。

### render()

- 在 update 阶段也会调用一次这个方法。

### getSnapshotBeforeUpdate()

- 在最新的渲染输出提交给 DOM 前将会立即调用。

### componentDidUpdate()

- 在更新发生后立即被调用。
- 该方法并不会在初始化渲染时调用。

## Unmounting阶段

### componentWillUnmount()

- 在组件被卸载和销毁之前立刻调用。
- 处理任何必要的清理工作，例如解绑定时器，取消网络请求，清理任何在 componentDidMount 环节创建的 DOM 元素。

## Error阶段

### componentDidCatch()

- 只使用错误边界来恢复异常，而不要尝试将它们用于控制流。
- 错误边界只捕捉树中发生在它们之下组件里的错误。一个错误边界并不能捕捉它自己内部的错误。