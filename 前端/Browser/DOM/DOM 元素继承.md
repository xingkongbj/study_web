# DOM 元素继承

目录



## 继承关系

EventTarget => Node => Element => HTMLElement => HTMLAnchorElement => 实例化HTMLAnchorElement

## 基础类型

### EventTarget

方法 | 说明 | 备注 | 兼容性
--- | --- | --- | --- 
EventTarget.<font color=red>addEventListener</font>(type, listener[, useCapture]) | 注册事件监听 | 参数<br />type<br />事件类型<br />listener<br />监听函数<br />useCapture<br />布尔值，指定事件是否在捕获或冒泡阶段执行。<br />true - 事件句柄在捕获阶段执行<br />false- 默认。事件句柄在冒泡阶段执行。 | ie9-11
EventTarget.attachEvent(eventNameWithOn, callback) | 注册事件监听 | 参数<br />eventNameWithOn<br />事件类型名称带on<br />callback<br />监听函数 | 非标准，ie6-8
EventTarget.removeEventListener(type, listener[, useCapture]) | 移除事件监听 | 参数<br />type<br />事件类型<br />listener<br />监听函数<br />useCapture<br />布尔值，指定事件是否在捕获或冒泡阶段执行。<br />true - 事件句柄在捕获阶段执行<br />false- 默认。事件句柄在冒泡阶段执行。 | ie9-11
EventTarget.detachEvent(eventNameWithOn, callback) | 移除事件监听 | 参数<br />eventNameWithOn<br />事件类型名称带on<br />callback<br />监听函数 | 非标准，ie6-8
EventTarget.dispatchEvent(event) | 触发事件 | 参数<br />event<br />事件对象 | ie9-11
EventTarget.fireEvent(eventNameWithOn[, event]) | 触发事件 | 参数<br />eventNameWithOn<br />事件类型名称带on<br />event<br />事件对象 | 非标准，ie6-8