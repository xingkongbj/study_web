# Vue 双向绑定原理

![](theory.png)

## 流程介绍

- 对 data 数据，利用 Obeject.defineProperty() 来监听属性变动，生成 Observer，当数据变化时会通知 Dep。
- 对 template 模板，通过 Compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并且生成 Watcher 用于更新数据。
- 把 Watcher 添加到 Dep 中。当数据改变后通知 Dep 更新，Dep 执行 Watcher 更新视图。