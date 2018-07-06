# React 组件 API

## React--react

- Component React 组件的基类。
- PureComponent React 组件的基类，只对 prop 和 state 浅对比。
- createElement() 根据给定的类型创建并返回新的 React element 。
- cloneElement() 以 element 作为起点，克隆并返回一个新的 React element 。
- createFactory() 根据给定的类型返回一个创建 React 元素的函数。
- isValidElement() 验证对象是否是一个React元素。
- Children 提供了处理 this.props.children 这个不透明数据结构的工具。
- Fragment 用于多重标签的最外层包裹。
- forwardRef 使父组件可以操作子组件的 ref 。

## React.Component

- render() 必须的，纯净函数，用于生成 React element 。
- constructor() React组件的构造函数将会在装配之前被调用。
- this.setState((prevState, props)=>{}) 不是立刻更新组件状态，可能是批处理或推迟更新。除非 shouldComponentUpdate() 返回 false，否则 setState() 永远都会导致重渲。
- forceUpdate() 调用 forceUpdate() 将会导致组件的 render() 方法被调用，并忽略shouldComponentUpdate()。
- defaultProps 父组件传入属性的默认值。
- displayName 用在调试信息中。
- this.props 父组件传入属性。
- this.state 状态属性，在 render() 方法中使用的属性。

## ReactDOM--react-dom

- render() 渲染一个 React 元素，并在页面中挂载。
- unmountComponentAtNode() 从 DOM 元素中移除已挂载的 React 组件，清除它的事件处理器和 state。
- findDOMNode() 如果这个组件已经被挂载到 DOM 中，函数会返回对应的浏览器中生成的 DOM 元素 。

## ReactDOMServer--react-dom/server

- renderToString() 把一个React元素渲染为原始的HTML。
- renderToStaticMarkup() 类似 renderToString，但是不会创建额外的DOM属性，例如 data-reactid 这些仅在React内部使用的属性。