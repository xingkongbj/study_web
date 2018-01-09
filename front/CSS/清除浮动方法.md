# 清除浮动方法

目录

- [使用 :after 伪元素](#使用-after-伪元素)
- [使用 clear 属性](#使用-clear-属性)
- [使用 overflow 属性](#使用-overflow-属性)
- [使用 float 属性](#使用-float-属性)

## 使用 :after 伪元素

给父级元素添加 clearfix 类，最常用方式。

```
<style>
    .news {
        background-color: gray;
        border: solid 1px black;
    }
    .news img {
        float: left;
    }
    .clearfix:after {
        content: "020";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    .clearfix {
        /* 触发 hasLayout */
        zoom: 1;
    }
</style>
<div class="news clearfix">
    <img src="news-pic.jpg"/>
</div>
```

## 使用 clear 属性

在父级元素结尾添加带 clear: both; 的空元素，无意义标签太多，不易维护。

```
<style>
    .news {
        background-color: gray;
        border: solid 1px black;
    }
    .news img {
        float: left;
    }
    .clear {
        clear: both;
    }
</style>
<div class="news">
    <img src="news-pic.jpg" />
    <div class="clear"></div>
</div>
```

## 使用 overflow 属性

给父级元素添加 overflow: hidden; 或 overflow: auto; 属性。

```
<style>
    .news {
        background-color: gray;
        border: solid 1px black;
        overflow: hidden;
        *zoom: 1;
    }
    .news img {
        float: left;
    }
</style>
<div class="news">
    <img src="news-pic.jpg" />
</div>
```

## 使用 float 属性

给父级元素添加 float 属性，会影响布局。

```
<style>
    .news {
        background-color: gray;
        border: solid 1px black;
        float: left;
    }
    .news img {
        float: left;
    }
</style>
<div class="news">
    <img src="news-pic.jpg" />
</div>
```
