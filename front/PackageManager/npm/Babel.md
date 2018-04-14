# Babel--支持ES新特性

> https://www.cnblogs.com/lsgxeva/p/7758184.html

目录

- [babel 是什么](#babel-是什么)
- [javascript 制作规范](#javascript-制作规范)
- [babel 转译器](#babel-转译器)
- [babel 的使用](#babel-的使用)
    - [创建 bebel 项目](#创建-bebel-项目)
    - [本地安装 babel 命令行工具](#本地安装-babel-命令行工具)
    - [在命令行中调用 babel](#在命令行中调用-babel)
    - [创建 .babelrc 配置文件](#创建-babelrc-配置文件)
    - [安装 babel 的转译器](#安装-babel-的转译器)
    - [配置 .babelrc 文件](#配置-babelrc-文件)
    - [.babelrc 的替代方案](#babelrc-的替代方案)
    - [编写 es6 代码](#编写-es6-代码)
    - [转译 es6 代码](#转译-es6-代码)
- [常见的几种 babel 转译器和插件](#常见的几种-babel-转译器和插件)
    - [babel-preset-env](#babel-preset-env)
    - [babel-preset-es2015](#babel-preset-es2015)
    - [babel-preset-latest](#babel-preset-latest)
    - [babel-preset-react](#babel-preset-react)
    - [兼容 ie 浏览器的转译器](#兼容-ie-浏览器的转译器)
    - [总结](#总结)
- [babel 最常见配置选项](#babel-最常见配置选项)
    - [babelrc](#babelrc)
    - [env](#env)
    - [ignore](#ignore)
    - [minified](#minified)
    - [plugins](#plugins)
    - [presets](#presets)
    - [plugins 和 presets 的顺序](#plugins-和-presets-的顺序)
- [babel 的其他](#babel-的其他)
    - [babel-node](#babel-node)
    - [babel-register](#babel-register)
    - [babel-core](#babel-core)
- [在 webpack 中使用 babel。](#在-webpack-中使用-babel)
    - [安装 webpack](#安装-webpack)
    - [安装 babel-preset-env 和 babel-loader。](#安装-babel-preset-env-和-babel-loader)
    - [创建 webpack.config.js 文件](#创建-webpackconfigjs-文件)
    - [运行 webpack。](#运行-webpack)
    - [使用 webpack 转译多个文件](#使用-webpack-转译多个文件)
- [总结](#总结-1)

凡是看到这个标题点进来的同学，相信对 babel 都有了一定的了解。babel 使用起来很简单，简单到都没有必要写一篇文章去介绍，直接看看官方文档就可以。所以我也在怀疑到底该不该写这篇文章。想来想去还是决定动手写写，原因是很简单，自己在刚开始接触 babel 也出现过懵逼的状态，所以希望这篇文档能给其他人以帮助。

## babel 是什么

babel 官网正中间一行黄色大字写着 “babel is a javascript compiler”，翻译一下就是 babel 是一个 javascript 转译器。为什么会有 babel 存在呢？原因是 javascript 在不断的发展，但是浏览器的发展速度跟不上。以 es6 为例，es6 中为 javascript 增加了箭头函数、块级作用域等新的语法和 Symbol、Promise 等新的数据类型，但是这些语法和数据类型并不能够马上被现在的浏览器全部支持，为了能在现有的浏览器上使用js新的语法和新的数据类型，就需要使用一个转译器，将 javascript 中新增的特性转为现代浏览器能理解的形式。babel 就是做这个方面的转化工作。

## javascript 制作规范

在这里有必要简单讲一下 javascript 版本，我只是大体讲下，javascript 是网景公司开发的一种脚本语言，1996 年的时候以 ECMAScript 的名字正式成为一种标准。2007 年的时候发布了版本 es5，然后在随后近 10 年里 js 并没有大的变化。所以现在的浏览器都可以很好的支持 es5。这一局面直到 2015 年被打破。2015 年 6 月，TC39（javascript 标准的制定组织）公布了新版本的 js 语言—— ES6。而且从 ES6 开始，TC39 规定每年都要发布一个 js 的新版本，新版本将包含年号，都是以 ESxxxx 的方式进行命名。所以 2015 年发布的 ES6 又叫 ES2015，2016 年发布的新的 js 版本就叫 ES2016，2017 年发布的新的 js 版本就叫 ES2017……。

因为版本都是向前兼容的，就是老版本 js 版本中规定的语法和 api 在新版本的 js 中同样也会合理的。所以我们可以想到后面的规范肯定是包含前面的规范的，也就是 ES2016 版本的 js 规范是包含 ES2015(ES6) 规范的，ES2017 是包含 ES2016 的也包含 ES2015 的。针对不同的规范， Babel 也提供了对应的转换器。

- babel-preset-es2015 将 es2015 版本的 js 转译为 es5。
- babel-preset-es2016 将 es2016 版本的 js 转译为 es5。
- babel-preset-es2017 将 es2017 版本的 js 转译为 es5。

**在转译过程中遇到更高版本的 js 语法，babel 是会直接忽略的。**

在这里在简单讲一下 js 新规范的制作过程。

js 规范的制作分 4 个阶段：

- Stage0 ：任何尚未提交为正式提案的讨论、想法、改变或对已有规范的补充建议都被认为是一个稻草人草案（“strawman” proposal），但只有 TC39 成员可以提出此阶段的草案。
- Stage1 ：此阶段，稻草人草案升级为正式化的提案，并将逐步解决多部门关切的问题，如与其他提案的相互之间会有什么影响，这一草案具体该如何实施等问题。人们需要对这些问题提供具体的解决方案。stage1 的提案通常还需要包括API描述，拥有说明性使用示例，并对语义和算法进行讨论，一般来说草案在这一阶段会经历巨大的变化。
- Stage2 ：此阶段，草案就有了初始的规范。通过 polyfill（打补丁。编写一些代码实现浏览器之前不支持的功能），开发者可以开始使用这一阶段的草案了，一些浏览器引擎也会逐步对这一阶段的规范的提供原生支持，此外通过使用构建工具（类似 babel 的工具）也可以编译源代码为现有引擎可以执行的代码，这些方法都使得这一阶段的草案可以开始被使用了。
- State3 ：此阶段的规范就属于候选推荐规范了，这一阶段之后变化就不会那么大了，要达到这一阶段需要满足以下条件：
    - 规范的编辑和指定的审阅者必须在最终规范上签字；
    - 用户也应该对该提议感兴趣；
    - 提案必须至少被一个浏览器原生支持；
    - 拥有高效的 ployfill，或者被 Babel 支持；
- Stage4 ：此阶段的提案必须有两个独立的通过验收测试的实现，进入第4阶段的提案将包含在 ECMAScript 的下一个修订版中。

针对js规范的不同阶段，babel也提供了对应的转译器：

- Stage0：preset-stage-0
- Stage1：preset-stage-1
- Stage2：preset-stage-2
- Stage3：preset-stage-3

**不同阶段的转译器之间是包含的关系，preset-stage-0 转译器除了包含了 preset-stage-1 的所有功能还增加了 transform-do-expressions 插件和 transform-function-bind 插件，同样 preset-stage-1 转译器除了包含 preset-stage-2 的全部功能外还增加了一些额外的功能……。**

## babel 转译器

为了便于说明，首先我们来定义两个概念。

1. 转译插件，转译插件是用来转译单一功能的插件，比如 transform-es2015-arrow-functions，这个插件只负责转译 es2015 新增的箭头函数。

2. 转译器，转译器是一系列转译插件的集合。比如 babel-preset-es2015 就包含了 es2015 新增语法的所有转译插件，比如包含 transform-es2015-arrow-functions（es2015 箭头函数转译插件）、transform-es2015-classes(es2015 class 类转译插件)等。

js 规范新增的每个语法都有对应的 babel 插件，因此 babel 插件众多。为了便于管理，会把某些插件集合在一起，构成一个转译器。要不然如果我们想转译 es2015 的语法就要安装一大堆插件了，有了转译器之后我们只需要安装一个转译器就可以了。babel 的转译器根据用途的不同也分了不同给的类，这些类非常多，所以 babel 看起来很混乱。不过大体上 babel 的转译器分为 3 类。

1. 语法转译器，这些转译器只负责转译 js 最新的语法，并不负责转译 js 新增的 api 和全局对象。这类转译器包括 babel-preset-env、babel-preset-es2015、babel-preset-es2016、babel-preset-es2017、babel-preset-latest 等，以后肯定还会有新的转译器加入，不过你只要理解转译器就是一堆转译插件的集合就可以了。

2. 补丁转译器，这些转译器只负责转译 js 最新的 api 和全局对象。比如浏览器不支持 String 新增的 String.padStart 方法和 Promise 全局对象。通过 babel-profill 转译，我们可以通过其他代码来让浏览器实现类似 String.padStart 和 Promise 的功能。

3. jsx 和 flow 插件，这类转译器用来转译 JSX 语法和移除类型声明的，使用 Rect 的时候你将用到它，转译器名称为 babel-preset-react。

另外你可以对 babel 已有的转译器进行改造或者创建新的转译器。如何创建 babel 转译器可以点[这里](https://babeljs.cn/docs/plugins/)。

## babel 的使用

babel 支持的使用场景非常多，可以在浏览器中使用（browser）也可以在命令行（cli），还可以是我们常见的 gulp 和 webpack 中。

以下以安装 babel-cli 为例进行说明。babel 更多的使用方法请点击[这里](https://babeljs.cn/docs/setup/)。

### 创建 bebel 项目

在本地磁盘上创建一个文件夹 es6（名字任意），在该文件夹下打开命令行工具，初始化项目。

```
D:\webpack\demo\es6>npm init -y
```

这个命令目的就是创建一个默认的 package.json 文件。

### 本地安装 babel 命令行工具

安装 babel 的命令行工具的目的是为了在命令行使用 babel。 

babel 命令行工具可以全局安装也可以本地安装，官方文档推荐本地安装，原因有2点；

1. 本地安装不同的项目可以使用不同版本的babel，你也可以单独对某个项目的babel进行升级等操作。

2. 每个项目单独安装的意味着对计算机环境没有依赖，便于移植。

在命令行中继续执行如下命令

```
npm install --save-dev babel-cli
```

如果你已经全局安装了 babel，可以使用如下的命令进行卸载

```
npm uninstall --global babel-cli
```

这样就已经在本地安装好babel了。

此时我的 package.json 文件如下（请忽略 main 字段）。

```
{
  "name": "es6",
  "version": "1.0.0",
  "description": "",
  "main": "arrow.js", //请忽略 main 字段
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.24.1"
  }
}
```

### 在命令行中调用 babel

本地安装的 babel 是不能够在直接命令行中运行的，为了在命令行中运行 babel，我们有两个方法:

1. 是需要配置下 package.json 文件的 scripts 项。比如如下代码，配置了一个 build 命令，运行该命令(npm run build)的时候就会在命令行执行 babel src -d lib。

```
{
  "name": "es6",
  "version": "1.0.0",
  "description": "",
  "main": "arrow.js",
  "scripts": {
    "build": "babel src -d lib"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.24.1"
  }
}
```

2. 是你需要可以进入 node_modules 文件夹，再进入 .bin 文件夹，然后执行在命令行中执行 babel src -d lib。

推荐使用 npm run build 的方法。

这里需要解释 babel src -d lib 这个命令的意思。这个命令目的是把 src 文件夹下的文件都转译，转译后的文件放到 lib 目录下。

**关于 babel 的命令行使用方法请点[这里](https://babeljs.cn/docs/usage/cli/)**

ps: 此时无论你是运行 npm run build 还是运行 babel src -d lib 命令（其实两个方法本质上都是一样的，都是运行 babel src -d lib）命令行都会报错，原因是现在还没有 src 文件夹。可以先不用管它，稍后我们再新建 src 文件夹。

### 创建 .babelrc 配置文件

在 cmd 中键入以下命令。

```
D:\webpack\demo\es6>type nul>.babelrc
```

这个时候你的文件夹里就多了一个 .babelrc 文件了。windows 是不能直接创建空文件名的文件的，所以必须通过命令行创建。

### 安装 babel 的转译器

这里我们以 babel-preset-env 为例。

在命令行中执行如下代码就会安装 babel-preset-env 转译器。

```	
D:\webpack\demo\es6>npm install babel-preset-env --save-dev
```

注意：babel 命令行工具（babel-cli）跟 babel 转译器是两个不同的东西，命令行工具并不具有转译代码的功能，只是为了在命令行中使用 babel。要转码必须安装转译器，比如 babel-preset-env 转译器或者 babel-preset-react 转译器。要转译的时候，还要在 .babelrc 文件或者命令行中配置这些转译器(presets)选项.

### 配置 .babelrc 文件

.babelrc 用于配置除回调以外的所有 babel api 选项。例如 plugins 和 presets。plugins 用于配置我们转译所需要的插件，presets 用于配置我们所需要的转译器。

.babelrc 不是必须的，我们在 .babelrc 中配置的选项都可以通过命令行添加，比如在命令行执行 babel src -d lib --presets=env 等价于在 .babelrc 中配置 "presets":["env"]。当然 .babelrc 要明显方便很多。

babel 在转译代码的过程中会自动读取当前目录 .babelrc 配置文件，如果当前目录没有的话就遍历整个目录树去寻找，直到找到 .babelrc 文件或者含有 "babel" 字段的 package.json 文件，然后使用这些配置选项来转译代码。

关于 .babelrc 的注意点如下。

1. 如果没有 .babelrc 文件，或者没有在其他文件中设置过 babel 的 presets 的配置选型，并且命令行中也没有配置 --presets，那么代码是不会转译的。原 es6 代码什么样，转译后的代码还是什么样。

2. 如果你的 .babelrc 或者你的命令行使用了你没有安装的转译器（presets），代码就会报错。

3. 但 .babelrc 中的配置跟你在命令行中使用的配置冲突的时候，以 .babelrc 中的配置为准。

```
{
    "presets":["env"]
}
```

关于 .babelrc 文件的更多使用方法请点击[这里](https://babeljs.cn/docs/usage/babelrc/)

### .babelrc 的替代方案

如果你不想生成 .babelrc 文件，你可以在你的 package.json 文件中对 babel 进行配置。如果你使用 gulp 或者 webpack 之类的管理工具的话，也可以在这里工具的配置选项里添加 babel 的配置选项。

以下以在 package.json 中配置为例。

```
{
  "name": "es6",
  "version": "1.0.0",
  "description": "",
  "main": "arrow.js",
  "scripts": {
    "build": "babel src -d lib --comments=true"
  },
  "babel":{
    //babel选项
    "presets":["es2015"],
    "comments":false
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.24.1",
    "babel-loader": "^7.1.1",
    "babel-preset-env": "^1.6.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "webpack": "^3.2.0"
  }
}​
```

在 package.json 中配置 babel 等同于使用 .babelrc 文件。

### 编写 es6 代码

因为我们使用的 babel 命令是 babel src -d lib 所以我们需要在目录中创建一个叫 src 的文件夹。目录结构如下：

|-node_modules<br />
|-src<br />
|-.babelrc<br />
|-package.json<br />

在 src 文件夹下我们创建一个 person.js 文件（文件名任意），编写如下 es6 代码（代码任意，只有是 es6 代码即可，方便看出编译后的效果）。编辑好代码后保存。

```
class Person{
    constructor(){
        this.name="bigbigStrong"
    }
    sayName(){
        console.log(`my name is ${this.name}`);
    }
}
var p = new Person();
p.sayName();
```

### 转译 es6 代码

在命令行工具中执行 npm run build 就可以发现目录中多了一个 lib 文件夹，lib 文件夹下有一个 person.js 的文件，这个文件就是 src 下的 person.js 文件转译后的代码。

```
D:\webpack\demo\es6>npm run build
```

转译后的代码如下：

```
"use strict";
​
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
​
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
​
var Person = function () {
    function Person() {
        _classCallCheck(this, Person);
​
        this.name = "bigbigStrong";
    }
​
    _createClass(Person, [{
        key: "sayName",
        value: function sayName() {
            console.log("my name is " + this.name);
        }
    }]);
​
    return Person;
}();
​
var p = new Person();
p.sayName();
```

## 常见的几种 babel 转译器和插件

经过上面的步骤我们已经完成了转译代码的工作，现在我们介绍下 babel 中常用的转译器和配置选项。

### babel-preset-env

转译器，最常用的转译器。通过在 .babelrc 中配置 env 选项，可以让代码兼容不同版本的浏览器或者 node。浏览器或者 node 已经支持的语法将不再转译了，不支持的才转译。如果不配置 env 选项，该转译器等同于 babel-preset-latest。更多详情和方法点[这里](https://babeljs.cn/docs/plugins/preset-env/)

```
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}
```

### babel-preset-es2015

转译器，将 es2015 版本的 js 代码转译为 es5 代码，对于 es2016 版本的代码或者 es2017 版本的代码不转译。

### babel-preset-latest

转译器，将最新版本的 js 代码转译为 es5 代码。不推荐使用，已经废除。建议使用 babel-preset-env 代替。

### babel-preset-react

转译器，剥离流类型并将 JSX 转换为 createElement 调用，主要在转译 react 代码的时候使用。

### 兼容 ie 浏览器的转译器

要兼容老版本的 ie 浏览器，可以使用对应的 es3 和 es5 插件。

- es3-member-expression-literals
- es3-property-literals
- es5-property-mutators

### 总结

转译器就是一堆转译插件的集合。babel 转译器很多，但是我们常用的就那几个。如果要转译新版本的 js 的话，只需要使用 babel-presets-env 这一个转译器就可以了。

**关于 babel 的更多转译器介绍，可以点击[这里](https://babeljs.cn/docs/plugins/#presets)查看。你可以点击每一个转译器进去查看转译器的适用场景是使用方法。**

## babel 最常见配置选项

babel 的配置选项在命令行的使用规则是 babel --name-value 比如我们使用 es2015 转译器，我们的命令就是：

```
babel src -d lib --presets=es2015
```

babel 的配置选项非常多，每个转译器也都有自己的配置选项，关于 babel 的配置选项的详细功能和使用方法，请点击[这里](https://babeljs.cn/docs/usage/api/#options)查看。我这里只介绍几个常见的。

### babelrc

默认值为 true，用于配置是否适用 .babelrc 和 .babelignore 文件，当命令行中添加 --no-babelrc 选项的时候，表示忽略 .babelrc 和 .babelignore 文件。在 .babelrc 文件中配置 babelrc 个人测试没有卵用。

### env

默认值为一个空对象 {}. env 用于配置代码需要兼容的环境，比如你的代码要在 chrome52 上运行，可以这样配置 .babelrc。

```
{
  "presets": [
    ["env", {
      "targets": {
        "chrome": 52
      }
    }]
  ]
}
```

配置代码兼容最新的 node，可以这样设置 .babelrc。

```
{
  "presets": [
    ["env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}
```

### ignore

忽略某些文件,默认值为 null，比如 src 文件夹下有 person.js 和 foo.js 两个文件，转译的时候你要忽略 src 文件夹下的 foo.js，可以这样配置 .babelrc。这样就不再转译 foo.js 文件了

```
{
    "presets":["env"],
    "ignore":["foo.js"]
}
```

与 ignore 相对应的是 only 选项，only 表示只转译某些文件。

### minified

是否压缩转译后的代码，默认值为 false

```
{
    "presets":["env"],
    "ignore":["foo.js"],
    "minified":true
}
```

### plugins

配置转译所需要的插件。使用插件的顺序是按照插件在数组中的顺序依次调用的。比如如下命令，转译的时候先使用 transform-decorators-legacy 转译，再使用 transform-class-properties 转译。

```
{
  "plugins": [
    "transform-decorators-legacy",
    "transform-class-properties"
  ]
}
```

### presets

配置你要使用的转译器。使用转译器的顺序是按照转译器在数组中的反顺序进行调用的。先使用数组最末尾的转译器，然后使用倒数第 2 个，倒数第 3 个，依次类推。比如使用下面命令的时候，先使用 stage-2 转译器转译，再 react 转译器转译，最后使用 es2015 转译器转译。

```
{
  "presets": [
    "es2015",
    "react",
    "stage-2"
  ]
}
```

### plugins 和 presets 的顺序

详情点[这里](https://babeljs.cn/docs/plugins/#pluginpreset-排序)

- 如果同时存在 plugins 和 presets，则先使用 plugins 转译。
- plugin 的调用顺序是从第一个到最后一个。
- presets 的调用的顺序是相反的，从最后一个到第一个。

## babel 的其他

### babel-node

bable-node 是 babel-cli 自带的命令，提供了一个支持 ES6 的 REPL 环境，它支持 node 的 REPL 环境的所有功能，而且可以直接运行 ES6 代码。为了体验下这个功能，我们需要全局安装 babel-cli。然后在命令行执行下面的命令。

安装

```
npm install --save-dev -g babel-cli
```

执行命令就会输出我们代码执行的结果

```
D:\webpack\demo\es6>babel-node -e  "var name='tom';console.log(`my name is ${name}`)"; //my name is tom;
```

babel-node 的详细用法点击[这里](https://babeljs.cn/docs/usage/cli/#babel-node)

### babel-register

引用自[阮一峰 babel 讲解](http://www.ruanyifeng.com/blog/2016/01/babel.html)

babel-register 模块会改写 require 命令，为它加上一个钩子。此后每当使用 require 加载 .js、.jsx、.es、.es6 后缀名文件的时候，都会先用 babel 进行转码。

安装

```
$ npm install --save-dev babel-register
```

使用的时候必须先加载 babel-register。

```
require("babel-register");
require("./index.js");
```

然后，就不需要手动对 index.js 转码了。

需要注意的是，babel-register 只会对 require 命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。

babel-register 的详细使用方法点击[这里](https://babeljs.cn/docs/usage/babel-register/)

### babel-core

babel-core 主要在 node 等环境中使用，可以用来开发自己的 babel 转译器。直接调用 babel 的 api 对某些代码或者某些文件进行转译。

安装

```
npm install babel-core --save
```

使用方法

```
var babel =require('babel-core');
babel.transform(code,options);//转译程序片段
babel.transform(filename,options,callback); //转译文件
```

babel-core的 详细使用方法点击[这里](https://babeljs.cn/docs/core-packages/)

## 在 webpack 中使用 babel。

### 安装 webpack

```
D:\webpack\demo\es6>npm install --save-dev webpack
```

### 安装 babel-preset-env 和 babel-loader。

如果你是跟着我这份教程一路看下来的，那么你 babel-preset-env 已经安装了。已经安装的话就不用再安装了。记得要安装 babel-loader 就好。

```
D:\webpack\demo\es6>npm install --save-dev babel-preset-env babel-loader
```

此时你的 package.json 如下。确保 devDependencies 中有 babel-loader、babel-preset-env 和 webpack 即可，其他的可以跟我不同。

```
{
  "name": "es6",
  "version": "1.0.0",
  "description": "",
  "main": "arrow.js",
  "scripts": {
    "build": "babel src -d lib"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.24.1",
    "babel-loader": "^7.1.1",
    "babel-preset-env": "^1.6.0",
    "babel-preset-react": "^6.24.1",
    "webpack": "^3.2.0"
  }
}
```

### 创建 webpack.config.js 文件

在根目录下创建 webpack.config.js 文件，内容如下。

```
var path = require("path");
module.exports = { 
    entry: './src/person.js', 
    output: { 
        path: path.resolve(__dirname,"lib"), 
        filename: 'person.compiled.js', 
    }, 
    module: { 
        loaders: [{ 
            test: /\.js$/, 
            exclude: /node_modules/, 
            loader: 'babel-loader',
            query:{
                presets:["env"]
            } 
        }] 
    } 
} 
```

entry 为入口文件，我们选择当前目录下，src 文件夹下的 person.js 文件作为入口。output 为输出选项，path 为输出的目录，filename 为输出文件名。query 选项为 .babelrc 中的配置选项。在 webpack 中设置了 query 字段后，就不再需要 .babelrc 文件了。

此时我们的目录结构是这样子的。

- lib
- node_modules
- src
    - person.js
    - foo.js
- package.json
- webpack.config.js

 
### 运行 webpack。

在命令行中执行 webpack，webpack 会自动读取 webpack.config.js 文件中的配置。然后对我们配置的文件进行转译。

```
D:\webpack\demo\es6>webpack
```

打开 lib 文件夹，我们发现多了一个转译后的文件 person.compiled.js。

- lib
    - person.compiled.js
- node_modules
- src
    - person.js
    - foo.js
- package.json
- webpack.config.js

### 使用 webpack 转译多个文件

我们 src 文件夹下除了有 person.js 文件外，还有一个 foo.js 文件。但是我们上面的操作只转译了 person.js 文件，为了同时转译 foo.js 文件我们需要在 person.js 文件中引入 foo.js

foo.js 文件代码如下：

```
let name="tom";
console.log(`my name is ${name}`);
```

我们在 person.js 文件顶部中添加 require("./foo");这样就可以 person.js 文件中添加对 foo.js 的依赖。修改后的 person.js 代码如下：

```
require("./foo");
class Person{
    constructor(){
        this.name="bigbigStrong"
    }
    sayName(){
        console.log(`my name is ${this.name}`);
    }
}
var p = new Person();
p.sayName();
```

这样在编译后的文件 person.compiled.js 文件里，就包含了 foo.js 的代码。

## 总结

关于 babel 的知识点大概就这些。

- babel 常用的转译器是 babel-preset-env。
- 常用的配置选项是 plugins 和 presets。
- 常用的使用场景是在 webpack 中。

    ​

