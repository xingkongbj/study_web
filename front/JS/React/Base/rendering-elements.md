# 元素渲染

目录

- [将元素渲染到 DOM 中](#将元素渲染到-dom-中)
- [更新元素渲染](#更新元素渲染)
- [React 只会更新必要的部分](#react-只会更新必要的部分)

## 将元素渲染到 DOM 中

```
const element = <h1>Hello, world</h1>;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

## 更新元素渲染

- React 元素都是不可变的。当元素被创建之后，你是无法改变其内容或属性的。
- 重新渲染，达到更新效果

## React 只会更新必要的部分

- React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分。