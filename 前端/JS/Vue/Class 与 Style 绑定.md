# Class 与 Style 绑定

目录

- [绑定 HTML Class](#绑定-html-class)
    - [对象语法](#对象语法)
    - [数组语法](#数组语法)
    - [用在组件上](#用在组件上)
- [绑定内联样式](#绑定内联样式) 
    - [对象语法](#对象语法) 
    - [数组语法](#数组语法)
    - [自动添加前缀](#自动添加前缀)
    - [多重属性](#多重属性)

## 绑定 HTML Class

### 对象语法

- 绑定一个对象，通过 true 和 false 属性值，确定是否显示属性名。
- 可以使用 computed 。

```
<div class="static"
     :class="{ active: isActive, 'text-danger': hasError }">
</div>

data: {
  isActive: true,
  hasError: false
}

结果：
<div class="static active"></div>
```

### 数组语法

- 绑定一个数组，返回数组的值。
- 可以使用三元表达式。

```
<div v-bind:class="[activeClass, errorClass]">

data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}

结果：
<div class="active text-danger"></div>
```

### 用在组件上

- 父组件引用时的 class 会被追加在结果展示的最后。

```
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
});

<my-component class="baz boo"></my-component>

结果：
<p class="foo bar baz boo">Hi</p>
```

## 绑定内联样式

### 对象语法

- CSS 属性名可以用驼峰式或短横分隔命名
- 通过属性名和属性值组対展示。
- 可以使用 computed 。

```
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

data: {
  activeColor: 'red',
  fontSize: 30
}

结果：
<div :style="color: red; fontSize: 30px;"></div>
```


### 数组语法

- 数组中每个值都为样式对象，不能为单一属性值。

```
<div v-bind:style="[baseStyles, overridingStyles]">
```

### 自动添加前缀

- Vue 会为一些 CSS 属性自动添加前缀，如 transform。

### 多重属性

- Vue 自动识别支持的属性，并把最后一个支持的渲染。

```
<div v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }">
```