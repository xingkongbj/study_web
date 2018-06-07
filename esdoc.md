# ESDoc

## 官网

- ESDoc：https://esdoc.org/
- JSDoc：http://usejsdoc.org/

## 介绍

ESDoc 是一个根据 javascript 文件中注释信息，生成 JavaScript 应用程序或库、模块的 API 文档的工具。具有文档覆盖率统计、系统手册、一体化测试、详细接口说明等特点。

## ESDoc 与 JSDoc 对比

JSDoc 是目前最火的文档生成工具，它存在的时间也比较长，但是功能上还欠缺一些，比如文档覆盖率、自动测试、搜索等，都没有实现。并且它的使用比较复杂，需要严格使用标签，过多依赖备注来实现。它最大的坑是同名接口无法支持。

&nbsp; | ESDoc | JSDoc
:---: | --- | ---
ES标准 | ES6 以上 | ES6
模块化 | Class、import & export | Class、import & export、CommonJS、AMD、Prototype
注释类型 | 块级注释 | 块级注释
标签 | 少量标签 | 标签完善，需要严格使用
文档内容 | 自动语义化，说明详细 | 注释中提炼
覆盖率 | 支持 | 无
测试 | 支持 | 无
手册 | 支持多个文档 | 支持多个文档
搜索 | 支持 | 无
插件 | 支持 | 支持
同名接口 | 重叠显示 | 分开显示

## 安装和使用

```
// 安装
npm install --save-dev esdoc esdoc-standard-plugin

// 使用
./node_modules/.bin/esdoc
```

## 配置文件

项目根目录 `.esdoc.json`

```
// esdoc 配置，react版
{
  "source": "./app", // 需要生成文档的 js 主目录
  "destination": "./esdocs", // 输出目录
  "includes": [
    "\\.(js|jsx|vue)$" // 包含的匹配正则
  ],
  "excludes": [
    "(bundle\\.js|export\\.js)$" // 排除的匹配正则
  ],
  "index": "./README.md",  // 首页引入文件
  "package": "./package.json", // package 配置文件
  "outputAST": true, // 输出结构树
  "plugins": [
    { "name": "esdoc-standard-plugin", // 基础插件
      "option": {
        "manual": {
          "index": "./manual/index.md",
          "files": [
            "./manual/directory.md"
          ]
        }
      }
    },
    { "name": "esdoc-jsx-plugin", "option": { "enable": true } },  // 支持 jsx 语法
    { "name": "esdoc-ecmascript-proposal-plugin", "option": { "all": true } }, // 支持 es 新语法
    { "name": "esdoc-react-plugin" }, // 支持 react 语法
    {
      "name": "esdoc-importpath-plugin", // 支持 import 路径修改
      "option": {
        "stripPackageName": true,
        "replaces": [
          {"from": "^app/page/", "to": "page/"},
          {"from": "^app/component/", "to": "component/"},
          {"from": "^app/module/", "to": "module/"},
          {"from": "^app/reactTools/", "to": "tools/"},
          {"from": "^app/middlewares/", "to": "middlewares/"}
        ]
      }
    }
  ]
}
```

## 常用标签

### @public--对外接口，一般可以省略
### @protected--内部接口，使用 "_" 可以省略
### @private--受保护接口

```
/**
 * @public
 */
class MyClass {
    /**
     * @private
     */
    _method(){...}
    
    /**
     * @protected
     */
    add(){...}
}
```

### @deprecated--接口废弃，会显示在文档中

```
/**
 * @deprecated 使用 MyClassEx 替换
 */
class MyClass{...}
```

### @ignore--忽略接口，不会显示在文档中

```
/**
 * @ignore
 */
class MyClass{...}
```

### @version--标注版本号

```
/**
 * @version 0.0.1
 */
class MyClass{...}
```

### @todo--后期需要实现功能

```
/**
 * @todo 支持修改
 */
class MyClass{...}
```

### @extends--继承自，一般能自动识别

```
/**
 * @extends {SuperClass1}
 * @extends {SuperClass2}
 */
class MyClass extends mix(SuperClass1, SuperClass2) {...}
```

### @param--参数，支持对象

```
class App extends MFEComponent {
    /**
     * 初始化
     * @param {Object} props - 传入对象
     * @param {Number} props.foo - 描述
     * @param {String} props.bar - 描述
     */
    constructor(props){...}
}
```

### @return--返回值，支持对象

```
class MyClass {
    /**
     * @return {Object} 描述
     * @property {number} foo - 描述
     * @property {number} bar - 描述
     */
    method(){...}
}
```

### @type--类型定义

```
// 单个属性
class MyClass {
    constructor() {
        /** @type {number} */
        this.p = 123;
    
        /**
         * @type {Object}
         * @property {number} res.foo - 描述
         * @property {string} res.bar - 描述
         */
        this.res = {foo: 123, bar: "abc"};
    }
}

// get/set
class MyClass {
  /** @type {string} */
  get value() {}

  /** @type {string} */
  set value(v){}
}
```

### 类型语法

数组

```
/**
 * @param {number[]} param - 描述
 */
function myFunc(param){...}
```

并存类型

```
/**
 * @param {number|string} param - 描述
 */
function myFunc(param){...}
```
