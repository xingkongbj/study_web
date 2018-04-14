# Babel--支持ES新特性

> https://www.cnblogs.com/lsgxeva/p/7758184.html

目录



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