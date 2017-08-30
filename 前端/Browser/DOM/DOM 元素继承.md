# DOM 元素继承

目录



## 继承关系

EventTarget => Node => Element => HTMLElement => HTMLAnchorElement => 实例化HTMLAnchorElement

## 基础类型

### EventTarget

方法 | 说明 | 备注 | 兼容性
--- | --- | --- | --- 
EventTarget.addEventListener(type, listener[, useCapture]) | 注册事件监听 | 参数<br />type<br />事件类型<br />listener<br />监听函数<br />useCapture<br />布尔值，指定事件是否在捕获或冒泡阶段执行。<br />true - 事件句柄在捕获阶段执行<br />false- 默认。事件句柄在冒泡阶段执行。 | ie9-11
EventTarget.attachEvent(eventNameWithOn, callback) | 注册事件监听 | 参数<br />eventNameWithOn<br />事件类型名称带on<br />callback<br />监听函数 | 非标准，ie6-8
EventTarget.removeEventListener(type, listener[, useCapture]) | 移除事件监听 | 参数<br />type<br />事件类型<br />listener<br />监听函数<br />useCapture<br />布尔值，指定事件是否在捕获或冒泡阶段执行。<br />true - 事件句柄在捕获阶段执行<br />false- 默认。事件句柄在冒泡阶段执行。 | ie9-11
EventTarget.detachEvent(eventNameWithOn, callback) | 移除事件监听 | 参数<br />eventNameWithOn<br />事件类型名称带on<br />callback<br />监听函数 | 非标准，ie6-8
EventTarget.dispatchEvent(event) | 触发事件 | 参数<br />event<br />事件对象 | ie9-11
EventTarget.fireEvent(eventNameWithOn[, event]) | 触发事件 | 参数<br />eventNameWithOn<br />事件类型名称带on<br />event<br />事件对象 | 非标准，ie6-8

### Node

属性 | 说明 | 兼容性
--- | --- | ---
Node.childNodes | 返回节点的子节点的数组。 |  
Node.firstChild | 返回节点的第一个子节点。 |  
Node.lastChild | 返回节点的最后一个子节点。 |  
Node.previousSibling | 返回位于相同节点树层级的前一个节点。 |  
Node.nextSibling | 返回位于相同节点树层级的下一个节点。 |  
Node.parentNode | 返回节点的父节点。 |  
Node.parentElement | 返回节点的父元素节点,如果该元素没有父节点,或者父节点不是一个元素节点.则 返回null。 |  
Node.nodeName | 返回节点的名称。大写 |  
Node.nodeType | 返回节点的类型。 |  
Node.nodeValue | 设置或返回节点的值。 |  
Node.textContent | 设置或返回节点及其后代的文本内容。返回其他文本一样返回行内的样式和脚本代码。 | ie9-11 | 
Node.ownerDocument | 返回节点的根节点。 <html> 节点 |  
Node.baseURI | 返回节点的绝对基准 URI。页面的路径 | ie无 
Node.localName | 返回不带命名空间前缀的节点名称。 | ie9-11 
Node.namespaceURI | 返回命名空间的 URI。 | ie9-11 
Node.prefix | 返回选定节点的命名空间前缀。xml有 | ie9-11 

方法 | 说明 | 备注 | 兼容性
--- | --- | --- | --- 
Node.appendChild(node) | 向元素添加新的子节点，作为最后一个子节点。 | 参数<br />node<br />你要添加的节点对象。 | 
Node.insertBefore(newnode,existingnode) | 在指定的已有的子节点之前插入新节点。 | 参数<br />newnode<br />你想要插入的节点<br />existingnode<br />要添加新的节点前的子节点。 | 
Node.removeChild(node) | 从元素中移除子节点。 | 参数<br />node<br />想要删除的子节点。 | 
Node.replaceChild(newnode,oldnode) | 替换元素中的子节点。 | 参数<br />newnode<br />你要插入的节点对象。 <br />oldnode<br />你要移除的节点对象。  | 
Node.cloneNode(deep) | 克隆某个元素。 | 参数<br />deep<br />如果传递给它的参数是 true，它还将递归复制当前节点的所有子孙节点。否则，它只复制当前节点。 | 
Node.hasChildNodes() | 如果元素拥有子节点，则返回 true，否则 false。 |  | 
Node.normalize() | 合并元素中相邻的文本节点，并移除空的文本节点。 |  | 
Node.contains(node) | 返回一个布尔值来表示是否传入的节点是，该节点的子节点。 | 参数<br />node<br />想要查询的子节点。 | ie9-11
Node.compareDocumentPosition(node) | 比较两个元素的文档位置。 | 参数<br />node<br />你要比较的节点对象。<br />返回值<br />1：没有关系，这两个节点不属于同一个文档。<br />2：element 位于 node 后。<br />4：element 位于 node 前。<br />8：element 位于 node 内。<br />16：node 位于 element 内。<br />32: 没有关系的，或是两个节点在同一元素的两个属性。 | ie9-11
Node.isEqualNode(node) | 检查两个元素是否相等。 | 参数<br />node<br />比较的另一个节点。 | ie9-11
Node.isDefaultNamespace(namespaceURI) | 如果指定的 namespaceURI 是当前节点默认的，则返回 true，否则返回 false。 | 参数<br />namespaceURI<br />你想要检查的命名空间URI。 | ie9-11
Node.lookupPrefix(namespaceURI)  | 返回在节点上匹配指定的命名空间的前缀。 | 参数<br />namespaceURI<br />节点的命名空间 URI。 | ie9-11
Node.lookupNamespaceURI(prefix) | 返回匹配某个节点上所指定的前缀的命名空间 URI。 | 参数<br />prefix<br />节点的命名空间前缀。 | ie9-11

### Element

属性 | 说明 | 兼容性
--- | --- | ---
Element.id | 设置或返回元素的 id。 | 
Element.tagName | 返回元素的标签名。大写 | 
Element.className | 设置或返回元素的 class 属性。 | 
Element.classList | 设置或返回元素的 class 集合。 | ie10-11
Element.attributes | 返回的属性数组。 | 
Element.innerHTML | 设置或返回元素内的标签内容。 | 
Element.outerHTML | 设置或返回元素的标签内容。包括元素本身 | 
Element.children | 返回子元素集合。 | 
Element.clientHeight | 返回元素的可见高度。元素内容及其内边距所占据的空间大小。 | body 时，与 scrollHeight 相同
Element.clientWidth | 返回元素的可见宽度。元素内容及其内边距所占据的空间大小。 | body 时，与 scrollWidth 相同
Element.clientLeft | 返回元素的左边框厚度。 | 
Element.clientTop | 返回元素的上边框厚度。 | 
Element.scrollHeight | 返回内元素的实际高度。元素内容及其内边距所占据的空间大小，包括滚动条隐藏的。 | 
Element.scrollWidth | 返回内元素的实际宽度。元素内容及其内边距所占据的空间大小，包括滚动条隐藏的。 | 
Element.scrollLeft | 返回内部上部分已隐藏的高度。 | documentElement--firefox，ie7-11<br />body--chrome<br />ie兼容模式都支持
Element.scrollTop | 返回内部左部分已隐藏的宽度。 | documentElement--firefox，ie7-11<br />body--chrome<br />ie兼容模式都支持
Element.firstElementChild | 返回第一个子元素。 | ie9-11
Element.lastElementChild | 返回最后一个子元素。 | ie9-11
Element.nextElementSibling | 返回下一个兄弟子元素。 | ie9-11
Element.previousElementSibling | 返回上一个兄弟子元素。 | ie9-11
Element.childElementCount  | 返回子元素的个数。 | ie9-11

方法 | 说明 | 备注 | 兼容性
--- | --- | --- | --- 
Element.getBoundingClientRect() | 返回元素的大小及其相对于浏览器的位置。包括边框和内边距 | 返回相对于浏览器的位置<br />width和height包括padding和border | 
Element.getClientRects() | 返回元素的大小及其相对于浏览器的位置的集合。 | 返回相对于浏览器的位置<br />width和height包括padding和border | 
Element.scrollIntoView(alignToTop) | 让当前的元素滚动到浏览器窗口的可视区域内。 | 参数<br />alignToTop<br />如果为true，元素的顶端将和其所在滚动区的可视区域的顶端对齐。<br />如果为false，元素的底端将和其所在滚动区的可视区域的底端对齐。 | 
Element.insertAdjacentHTML(position, text) | 将指定的文本解析为 HTML 或 XML，然后将结果节点插入到 DOM 树中的指定位置处。 | 参数<br />position<br />位置<br />beforebegin在 element 元素的前面。<br />afterbegin在 element 元素的第一个子节点前面。<br />beforeend在 element 元素的最后一个子节点后面。<br />afterend在 element 元素的后面。<br />text <br />字符串，会被解析成 HTML 或 XML。 | 
Element.getElementsByTagName(tagname) | 返回拥有指定标签名的所有子元素的集合。 | 参数<br />tagname<br />你想获取自元素的标签名。 | 
Element.getElementsByClassName(classname) | 返回文档中所有指定类名的元素集合，作为 NodeList 对象。 | 参数<br />classname<br />你需要获取的元素类名。 <br />多个类名使用空格分隔，如 test demo。 | ie9-11
Element.querySelector(selectors) | 通过css条件选择第一个符合条件的dom节点 | 参数<br />selectors<br />指定一个或多个匹配元素的 CSS 选择器。 可以使用它们的 id, 类, 类型, 属性, 属性值等来选取元素。<br />对于多个选择器，使用逗号隔开，返回一个匹配的元素。 | ie9-11
Element.querySelectorAll(selectors) | 通过css条件选择所有符合条件的dom节点 | 参数<br />selectors<br />指定一个或多个匹配元素的 CSS 选择器。 可以使用它们的 id, 类, 类型, 属性, 属性值等来选取元素。<br />对于多个选择器，使用逗号隔开，返回一个匹配的元素。 | ie9-11
Element.matches(selectors) | 如果当前元素能被指定的css选择器查找到，则返回true,否则返回false。 | 参数<br />selectors<br />指定一个或多个匹配元素的 CSS 选择器。 可以使用它们的 id, 类, 类型, 属性, 属性值等来选取元素。<br />对于多个选择器，使用逗号隔开，返回一个匹配的元素。 | ie无
Element.getAttribute(attributename) | 返回元素的指定属性值。 | 参数<br />attributename<br />你想获取的属性值的属性名。 | 
Element.setAttribute(attributename,attributevalue) | 把指定属性设置或更改为指定值。 | 参数<br />attributename<br />你要添加的属性名称。 <br />attributevalue<br />你要添加的属性值。  | 
Element.removeAttribute(attributename) | 从元素中移除指定属性。 | 参数<br />attributename<br />你想删除的属性值的属性名。 | 
Element.hasAttribute(attributename) | 如果元素拥有指定属性，则返回true，否则返回 false。 | 参数<br />attributename<br />你要检查的属性名。 | ie8-11
Element.getAttributeNode(attributename) | 返回元素指定的属性节点。 | 参数<br />attributenode<br />你想获取的属性节点的属性名。 | 
Element.setAttributeNode(attributenode) | 设置或更改指定属性节点。 | 参数<br />attributenode<br />你要添加的属性节点。 | 
Element.removeAttributeNode(attributenode) | 移除指定的属性节点，并返回被移除的节点。 | 参数<br />attributenode<br />你想移除的属性节点。 | 
Element.getElementsByTagNameNS(ns,tagname) | 返回拥有指定标签名的所有子元素的集合，通过命名空间 URI。 | 参数<br />ns<br />规定从中获取属性值的命名空间 URI。<br />tagname<br />你想获取自元素的标签名。 | ie9-11
Element.getAttributeNS(ns,name) | 返回元素的指定属性值，通过命名空间 URI。 | 参数<br />ns<br />规定从中获取属性值的命名空间 URI。 <br />name<br />规定从中获取属性值的属性。  | ie9-11
Element.setAttributeNS(ns,attributename,attributevalue) | 把指定属性设置或更改为指定值，通过命名空间 URI。 | 参数<br />ns<br />规定从中获取属性值的命名空间 URI。 <br />attributename<br />你要添加的属性名称。 <br />attributevalue<br />你要添加的属性值。  | ie9-11
Element.hasAttributeNS(ns,attributename) | 如果元素拥有指定属性，则返回true，否则返回 false，通过命名空间 URI。 | 参数<br />ns<br />规定从中获取属性值的命名空间 URI。 <br />attributename<br />你要检查的属性名。 | ie9-11
Element.getAttributeNodeNS(ns,name) | 返回元素指定的属性节点，通过命名空间 URI。 | 参数<br />ns<br />规定从中获取属性值的命名空间 URI。 <br />name<br />规定从中获取属性值的属性。  | ie9-11
Element.setAttributeNodeNS(ns,attributenode) | 设置或更改指定属性节点，通过命名空间 URI。 | 参数<br />ns<br />规定从中获取属性值的命名空间 URI。 <br />attributenode<br />你要添加的属性节点。 | ie9-11
Element.removeAttributeNodeNS(ns,attributenode) | 移除指定的属性节点，并返回被移除的节点，通过命名空间 URI。 | 参数<br />attributenode<br />你想移除的属性节点。 | 
Element.closest(selectors) | 获取匹配特定选择器且离当前元素最近的祖先元素（也可以是当前元素本身）。如果匹配不到，则返回 null。 | 参数<br />selectors<br />选择器 | ie无
Element.remove() | 将自己从所在的 DOM 树中删除。 |  | ie无
Element.setCapture(retargetToElement) | 在处理一个 mousedown 事件过程中调用这个方法来把全部的鼠标事件重新定向到这个元素，直到鼠标按钮被释放或者 document.releaseCapture() 被调用。 | 参数<br />retargetToElement<br />如果被设置为 true, 所有事件被直接定向到这个元素; 如果是 false, 事件也可以在这个元素的子元素上触发。 | chrome无
Element.scrollIntoViewIfNeeded(alignCenter) | 只在当前元素在视口中不可见的情况下，才滚<br />动浏览器窗口或容器元素，最终让它可见。 | 参数<br />alignCenter<br />对其位置<br />true<br />则表示尽量将元素显示在视口中部（垂直方向）。<br />false<br />移动最小的距离对其底部或顶部 | 只chrome

### HTMLElement

属性 | 说明 | 兼容性
--- | --- | ---
HTMLElement.accessKey | 设置或返回元素的快捷键。 | 
HTMLElement.style | 设置或返回元素的 CSSStyleDeclaration 对象。 | 
HTMLElement.title | 设置或返回元素的 title 属性。 | 
HTMLElement.tabIndex | 设置或返回元素的 tab 键控制次序。 | 
HTMLElement.dir | 设置或返回元素的文本方向。 | 
HTMLElement.lang | 设置或返回元素的语言代码。 | 
HTMLElement.spellcheck | 设置或返回是否对元素内容进行拼写检查。 | 
HTMLElement.contentEditable | 设置或返回元素的可编辑状态。 | 
HTMLElement.isContentEditable | 返回元素的内容是否可被编辑。 | 
HTMLElement.offsetParent | 返回元素的偏移容器。(父集有CSS定位属性的元素或body元素) | 
HTMLElement.offsetHeight | 返回元素的高度。包括border | 
HTMLElement.offsetWidth | 返回元素的宽度。包括border | 
HTMLElement.offsetLeft | 返回元素的水平偏移位置。元素的左外边框至父级元素的左内边框之间的像素距离。 | 
HTMLElement.offsetTop | 返回元素的垂直偏移位置。元素的上外边框至父级元素的上内边框之间的像素距离。 | 
HTMLElement.innerText | 设置或返回元素的纯文本内容。不包括标签，会忽略行内的样式和脚本 | 
HTMLElement.outerText | 设置或返回元素的纯文本内容。包括标签，设置的时候标签会删除，返回时同innerText。 | 
HTMLElement.dataset | 返回元素的自定义data特性(data-*)。 | ie11
HTMLElement.hidden | 设置或返回元素是否隐藏。 | ie11
HTMLElement.draggable | 设置或返回元素的可拖动状态。 | ie10-11

方法 | 说明 | 备注 | 兼容性
--- | --- | --- | --- 
HTMLElement.focus() | 获取焦点。 | 
HTMLElement.blur() | 失去焦点。 | 
HTMLElement.click() | 点击。 | 