# Hack和浏览器模式

目录

- [浏览器模式](#浏览器模式)
    - [IE 版本强制](#ie-版本强制)
    - [360 浏览器](#360-浏览器)
- [Hack](#hack)
    - [head 标签中](#head-标签中)
    - [CSS 样式中](#css-样式中)

## 浏览器模式

### IE 版本强制

IE强制chrome模式

    <meta http-equiv="X-UA-Compatible" content="chrome=1" />

IE强制最高IE版本模式

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

IE强制指定版本模式

    <meta http-equiv="X-UA-Compatible" content="IE=8" />

IE强制指定版本的兼容模式

    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />

注，IE 版本强制，忽略文档类型声明。

### 360 浏览器

极速内核

    <meta name="renderer" content="webkit" />

ie兼容内核

    <meta name="renderer" content="ie-comp" />

ie标准内核

    <meta name="renderer" content="ie-stand" />

最优方案

    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge;chrome=1" />

## Hack

### head 标签中

    <!--[if IE]>
        // 只有IE
    <![endif]-->
    
    <!--[if !IE]><!-->
        // 非IE
    <!--<![endif]-->
    
    <!--[if IE 值]>
        // 只有IE值
    <![endif]-->
    
    <!--[if 大小 IE 值]>
        // gt 大于、lt 小于、gte 大于等于、lte 小于等于，IE 值
    <![endif]-->
    
    <!--[if gt IE 8]><!-->
        // 大于IE8 和非IE 浏览器可识别
    <!--<![endif]-->

### CSS 样式中

hack | IE 6 | IE 7 | IE 8 | IE 9 | other
:- | :-: | :-: | :-: | :-: | :-:
color: red\9; | Y | Y | Y | Y | N
color: red\9\0; | N | N | N | Y | N
color: red\0; | N | N | Y | Y | N
*color: blue; | Y | Y | N | N | N
_color: green; | Y | N | N | N | N
background:red !important; | N | Y | Y | Y | Y
*background:red !important; | N | Y | N | N | N