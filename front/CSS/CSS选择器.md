# CSS 选择器

## 基本选择器

选择器 | 类型 | 描述 | 兼容性
:--- | :--- | :--- | :---:
&#42; | 通配选择器 | 所有元素 | all
E | 元素选择器 | E 标签 | all
&#35;id | ID选择器 | ID 属性 为 id 的元素 | all
.class | 类选择器 | class 属性为 class 的元素 | all
p.red | 混合选择器 | 有 red 类的 p 标签 | all
.important.warning | 类选择器 | 同时有 important 和 warning 类的元素 | all
selector1, selectorN | 群组选择器 | 将每一个选择器匹配的元素集合并 | all

## 层次选择器

选择器 | 类型 | 描述 | 兼容性
:--- | :--- | :--- | :---:
h1 em | 后代选择器（包含选择器） | h1 标签内部的 em 标签，中间可以嵌套其他标签 | all
h1>strong | 子选择器 | h1 标签的子元素 strong 标签，中间不能嵌套其他标签 | all
h1+p | 相邻兄弟选择器 | h1 后面相邻的同级 p 标签，中间不能相隔其他标签 | all
p~ul | 通用选择器 | p 后面的同级元素中的ul ，不管两个间是否有其他同级元素 | all <br /> css3

## 动态伪类选择器

选择器 | 类型 | 描述 | 兼容性
:--- | :--- | :--- | :---:
a:link | 链接伪类选择器 | 未被访问的链接 | all
a:visited | 链接伪类选择器 | 已访问的链接 | all
a:hover	| 用户行为选择器 | 鼠标悬浮时的链接 | all
a:active | 用户行为选择器 | 鼠标点击按下时的链接 | all
input:focus | 用户行为选择器 | 元素获取焦点 | all

## UI元素状态伪类选择器

选择器 | 类型 | 描述 | 兼容性
:--- | :--- | :--- | :---:
input:checked | 选中状态伪类选择器 | 元素被选中 | IE9-11 <br /> css3
button:enabled | 启用状态伪类选择器 | 元素启用 | IE9-11 <br /> css3
button:disabled | 不可用状态伪类选择器 | 元素禁用 | IE9-11 <br /> css3

## 结构伪类选择器

选择器 | 描述 | 兼容性
:--- | :--- | :---:
p:first-child | p 标签是父元素的第一个子元素 | IE9-11 <br /> css3
p:last-child | p 标签是父元素的最后一个子元素 | IE9-11 <br /> css3
p:only-child | p 标签是父元素唯一的子元素 | IE9-11 <br /> css3
p:nth-child(n) | p 标签是父元素的第 n 个子元素 | IE9-11 <br /> css3
p:nth-last-child(n) | p 标签是父元素的倒数第 n 个子元素 | IE9-11 <br /> css3
p:nth-child(odd) | p 标签是父元素的奇数行子元素 | IE9-11 <br /> css3
p:nth-child(even) | p 标签是父元素的偶数行子元素 | IE9-11 <br /> css3
p:nth-child(3n+1) | p 标签是父元素的第 3n+1 个子元素 | IE9-11 <br /> css3
p:first-of-type | p 标签是父元素的第一个 p 标签子元素 | IE9-11 <br /> css3
p:last-of-type | p 标签是父元素的最后一个 p 标签子元素 | IE9-11 <br /> css3
p:only-of-type | p 标签是父元素唯一的 p 标签子元素 | IE9-11 <br /> css3
p:nth-of-type(n) | p 标签是父元素的第 n 个 p 标签子元素 | IE9-11 <br /> css3
p:nth-last-of-type(n) | p 标签是父元素的倒数第 n 个 p 标签子元素 | IE9-11 <br /> css3
p:nth-of-type(odd) | p 标签是父元素的 p 标签子元素奇数行 | IE9-11 <br /> css3
p:nth-of-type(even) | p 标签是父元素的 p 标签子元素偶数行 | IE9-11 <br /> css3
p:nth-of-type(3n+1) | p 标签是父元素的第 3n+1 个 p 标签子元素 | IE9-11 <br /> css3
E:root | 选择匹配元素E所在文档的根元素,根元素始终是 html | IE9-11 <br /> css3
E:empty | 选择没有子元素的元素，而且该元素也不包含任何文本节点 | IE9-11 <br /> css3

## 属性选择器

选择器 | 描述 | 兼容性
:--- | :--- | :---:
[attribute] | 带有 attribute 属性的标签 | all
[attribute="value"] | 带有 attribute 属性，并且属性为 value 的标签 | all
[attribute~="value"] | 带有 attribute 属性，并且属性包含 value 单词的标签 | all
[attribute&brvbar;="value"] | 带有 attribute 属性，并且属性以 value 单词开头的标签 | all
[attribute^="value"] | 带有 attribute 属性，并且属性以 value 字符串开头的标签 | all <br /> css3
[attribute$="value"] | 带有 attribute 属性，并且属性以 value 字符串结尾的标签 | all <br /> css3
[attribute*="value"] | 带有 attribute 属性，并且属性包含 value 字符串的标签 | all <br /> css3

## 伪元素选择器

选择器 | 描述 | 兼容性
:--- | :--- | :---:
::first-line | 文本的首行，只能与块级元素关联 <br /> font <br /> color <br /> background <br /> text-decoration <br /> vertical-align <br /> text-transform <br /> line-height <br /> clear <br /> word-spacing <br /> letter-spacing | all
::first-letter | 文本的第一个字母 <br /> font <br /> color <br /> background <br /> text-decoration <br /> vertical-align <br /> text-transform <br /> line-height <br /> clear <br /> margin <br /> padding <br /> border <br /> float | all
::before | 在其他子元素之前添加内容 <br /> content:url(logo.gif); | all
::after | 在其他子元素之后添加内容 <br /> content:url(logo.gif); | all
::selection | 被用户选取的元素部分 | IE9-11 <br /> css3

## 其他选择器

选择器 | 描述 | 兼容性
:--- | :--- | :---:
:lang(zh) | 带有 lang 属性，并且属性为 zh 的元素 | all
E:target | URL 带有后面跟有锚名称 #，指向 E 元素 | IE9-11 <br /> css3
E:not(F) | 匹配所有除元素 F 外的 E元 素 | IE9-11 <br /> css3


注：兼容性不考虑 IE6，Chrome 和 Firefox 都支持