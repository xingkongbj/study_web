# 使用方法

目录

- [使用 Prop 传递数据](#使用-prop-传递数据)
- [camelCase vs. kebab-case](#camelcase-vs-kebab-case)
- [动态 Prop](#动态-prop)
- [字面量语法 vs 动态语法](#字面量语法-vs-动态语法)
- [单向数据流](#单向数据流)
- [Prop 验证](#prop-验证)
- [非 Prop 特性](#非-prop-特性)

## 使用 Prop 传递数据

```
<!-- 父组件 -->
<child message="hello!"></child>

// 子组件
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 就像 data 一样，prop 也可以在模板中使用
  // 同样也可以在 vm 实例中通过 this.message 来使用
  template: '<span>{{ message }}</span>'
})
```

## camelCase vs. kebab-case

- HTML 特性是不区分大小写的
- 当使用的不是字符串模板时，camelCase (驼峰式命名) 的 prop 需要转换为相对应的 kebab-case (短横线分隔式命名)

```
<!-- 在 HTML 中使用 kebab-case -->
<child my-message="hello!"></child>

Vue.component('child', {
  // 在 JavaScript 中使用 camelCase
  props: ['myMessage'],
  template: '<span>{{ myMessage }}</span>'
})
```

## 动态 Prop

```
<child :my-message="parentMsg"></child>

// 一次性绑定多个属性
todo: {
  text: 'Learn Vue',
  isComplete: false
}

<todo-item v-bind="todo"></todo-item>
<!-- 等价于 -->
<todo-item
  v-bind:text="todo.text"
  v-bind:is-complete="todo.isComplete"
></todo-item>
```

## 字面量语法 vs 动态语法

```
<!-- 传递了一个字符串 "1" -->
<comp some-prop="1"></comp>
<!-- 传递真正的数值 -->
<comp :some-prop="1"></comp>
```

## 单向数据流

- 防止子组件无意间修改了父组件的状态，父组件单向传给子组件
- 不应该在子组件内部改变 prop

Prop 作为初始值传入后，子组件想把它当作局部数据来用

```
props: ['initialCounter'],
data: function () {
  return { counter: this.initialCounter }
}
```

Prop 作为原始数据传入，由子组件处理成其它数据输出

```
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

## Prop 验证

- 不校验数据，prop 是数组
- 校验数据，prop 是对象
- type 可以是 String、Number、Boolean、Function、Object、Array、Symbol
- type 也可以是一个构造函数，使用 instanceof 检测
- prop 会在组件实例创建之前进行校验，所以在 default 或 validator 函数里，诸如 data、computed 或 methods 等实例属性还无法使用。

```
Vue.component('example', {
  props: {
    // 基础类型检测 (`null` 指允许任何类型)
    propA: Number,
    // 可能是多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数值且有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组/对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})
```

## 非 Prop 特性

- 替换/合并现有的特性，父组件属性追加在子组件后面

```
<!-- 父组件 -->
<bs-date-input
  data-3d-date-picker="true"
  class="date-picker-theme-dark"
></bs-date-input>
>
<!-- 子组件 -->
<input type="date" class="form-control">

<!-- 合并后 -->
<input type="date" data-3d-date-picker="true" class="form-control date-picker-theme-dark">
```
