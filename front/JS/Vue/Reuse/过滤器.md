# Vue 过滤器

## 过滤器

- 过滤器可以用在两个地方：mustache 插值和 v-bind 表达式
- 过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符指示
- 因为过滤器设计目的就是用于文本转换。为了在其他指令中实现更复杂的数据变换，你应该使用计算属性

```
<!-- in mustaches -->
<span>{{ message | capitalize }}</span>
<!-- in v-bind -->
<div v-bind:id="rawId | formatId"></div>

// 本地过滤器
new Vue({
    // ...
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    }
})

// 全局过滤器
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```

- 过滤器可以串联，message | filterA 过滤后的结果会传给 filterB
- 过滤器可以接受参数，字符串 'arg1' 将传给过滤器作为第二个参数， arg2 表达式的值将被求值然后传给过滤器作为第三个参数

```
<span>{{ message | filterA | filterB }}</span>
<span>{{ message | filterA('arg1', arg2) }}</span>
```