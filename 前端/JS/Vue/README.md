# Vue

> Vue 教程 [https://www.vuefe.cn/v2/guide/index.html](https://www.vuefe.cn/v2/guide/index.html)
> 
> Vue API [https://www.vuefe.cn/v2/api/](https://www.vuefe.cn/v2/api/)
> 
> Vuex [https://vuex.vuejs.org/zh-cn/intro.html](https://vuex.vuejs.org/zh-cn/intro.html)

注意事项

- 同一类型事件只能绑定一次，如 change。
- 属性提前创建，否则不被监听，dom 也是如此。
- {{ name }} 插值时不能加入 html 标签。
- 不能绑定空内容。
- updated 生命事件，初次加载不执行，更新时才执行。
- v-if 用注释替代其位置，v-show 用 display:none 隐藏显示。
- 子组件内部，需要顶级挂载节点，且只能有一个。
- input 等表单控件修改后，需要手动同步 vue 数据。
- 使用插件时，需要通过 jquery 绑定 change 事件来获取事件。插件使用 js 修改值时，不会触发浏览器的 change 事件，只会触发 jQuery 模拟的事件。

目录

Vue

- [生命周期](生命周期.md)
- [模板语法](模板语法.md)
- [计算属性](计算属性.md)
- [Class 与 Style 绑定](Class与Style绑定.md)
- [条件渲染](条件渲染.md)
- [列表渲染](列表渲染.md)
- [事件处理器](事件处理器.md)

核心插件

- [Vuex](Vuex.md)

