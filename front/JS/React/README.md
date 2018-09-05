# React

> React 教程 [https://doc.react-china.org/docs/hello-world.html](https://doc.react-china.org/docs/hello-world.html)

注意事项

- 在 componentDidMount 生命周期方法内发送 AJAX 请求数据。这样才能够在请求的数据到达时使用 setState 更新组件。
- props 属性不能修改，state 属性中只存放需要 render 的变量。
- render 会在 state 改变后执行，如在标签上通过 bind 或 ()=>{} 绑定事件，会影响性能。
- 节流：在 constructor 中，调用 throttle 生成绑定函数，并在 componentWillUnmount 中取消节流。实现防止快速点击。
- 防抖：在 constructor 中，调用 debounce 生成更新函数，并在绑定函数中执行，componentWillUnmount 中取消防抖。实现函数上次执行后的一段时间内，不会再次执行。
- requestAnimationFrame 节流：在 constructor 中，调用 rafSchedule 生成更新函数，并在绑定函数中执行，componentWillUnmount 中取消防抖。实现函数更新频率不大于浏览器更新频率。
- render() 函数应该纯净，意味着其不应该改变组件的状态。
- shouldComponentUpdate() 返回 false，render() 函数将不会被调用。
- 可以通过使用一个数组让 render() 返回多个元素。
- 当返回数据是 true 或 false 或 null 时，不渲染成文字。

基础

- [JSX语法](Base/introducing-jsx.md)
- [元素渲染](Base/rendering-elements.md)
- [组件 & Props](Base/components-and-props.md)
- [State & 生命周期](Base/state-and-lifecycle.md)
- [事件处理](Base/handling-events.md)
- [条件渲染](Base/conditional-rendering.md)
- [列表 & Keys](Base/lists-and-keys.md)
- [表单](Base/forms.md)
- [状态提升](Base/lifting-state-up.md)
- [组合 vs 继承](Base/composition-vs-inheritance.md)
- [React API](React-API.md)
- [生命周期函数](Life-Cycle.md)

插件

- [Redux](Redux.md)
