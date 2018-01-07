# ESLint--代码格式校验

> http://eslint.cn/docs/user-guide/configuring

目录



## 安装

```
# npm
npm i -g eslint
```

## 命令行

```
# 校验 file1.js 文件
eslint file1.js

# 校验 lib 下所有 .js 文件
eslint lib/**

# 指定 ~/my-eslint.json 为配置文件
eslint -c ~/my-eslint.json file.js

# 禁用 .eslintrc 和 package.json 文件中的配置。
eslint --no-eslintrc file.js

# 指定 browser,node 环境
eslint --env browser,node file.js

# 指定扩展名，默认为 .js
eslint . --ext .js,.js2

# 指定全局变量，默认为只读，加上 :true 变为可写
eslint --global require,exports:true file.js

# 指定解析器
eslint --parser Babel-ESLint file.js

# 指定解析器选项
eslint --parser-options=ecmaVersion:6  file.js

# 对检测文件进行缓存，下次只校验修改部分
eslint "src/**/*.js" --cache

# 指定缓存文件路径，默认 .eslintcache
eslint "src/**/*.js" --cache --cache-location "/Users/user/.eslintcache/"

# 指定规则文件目录
eslint --rulesdir my-rules/ file.js

# 指定插件
eslint --plugin eslint-plugin-mocha file.js

# 指定规则
eslint --rule 'quotes: [2, double]'

# 指定忽略文件，默认 .eslintignore
eslint --ignore-path tmp/.eslintignore file.js

# 设置禁止忽略文件
eslint --no-ignore file.js

# 指定忽略文件路径
eslint --ignore-pattern '/lib/'

# 从 STDIN 而不是从文件中读取和检测源码
cat myfile.js | eslint --stdin

# 指定一个文件名去处理 STDIN
cat myfile.js | eslint --stdin --stdin-filename=myfile.js

# 禁止报告警告
eslint --quiet file.js

# 警告的阈值，超过时以错误状态退出
eslint --max-warnings 10 file.js

# 将报告写到一个文件
eslint -o ./test/test.html

# 指定输出格式
eslint -f compact file.js

# 禁用颜色
eslint --no-color file.js

# 创建eslint配置
eslint --init

# 自动修复错误
eslint --fix file.js

# 将调试信息输出到控制台
eslint --debug file.js

# 输出帮助菜单
eslint -h

# 输出版本
eslint -v

# 阻止内敛注释配置
eslint --no-inline-config file.js
```

## 配置文件

### 配置方式

- js注释
- 配置文件，按先后顺序优先加载
 - .eslintrc.js--JavaScript，输出一个配置对象。
 - .eslintrc.yaml--YAML，定义配置的结构。
 - .eslintrc.yml--YAML，定义配置的结构。
 - .eslintrc.json--JSON，定义配置的结构。
 - .eslintrc--不赞成，JSON 或 YAML
 - package.json--package.json，创建一个 eslintConfig属性，定义配置的结构。

### parserOptions--语法特性

- ecmaVersion - 设置为 3， 5 (默认)， 6、7 或 8 指定你想要使用的 ECMAScript 版本。你也可以指定为 2015（同 6），2016（同 7），或 2017（同 8）使用年份命名
- sourceType - 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
- ecmaFeatures - 这是个对象，表示你想使用的额外的语言特性: 
 - globalReturn - 允许在全局作用域下使用 return 语句
 - impliedStrict - 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
 - jsx - 启用 JSX
 - experimentalObjectRestSpread - 启用对实验性的 object rest/spread properties 的支持。(重要：这是一个实验性的功能,在未来可能会改变明显。 建议你写的规则 不要依赖该功能，除非当它发生改变时你愿意承担维护成本。)

```
"parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
        "jsx": true
    }
},
```

### parser--解析器

- Esprima，默认
- Babel-ESLint - 对Babel解析器的包装使其与 ESLint 兼容。
- typescript-eslint-parser(实验) - 一个把 TypeScript 转换为 ESTree 兼容格式的解析器，这样就它就可以在 ESLint 中使用了。这样的目的是允许通过 ESLint （尽管不一定要通过所有的 ESLint 规则）来解析 TypeScript 文件

```
"parser": "esprima",
```

### env--全局变量

- browser - browser 全局变量。
- node - Node.js 全局变量和 Node.js 作用域。
- commonjs - CommonJS 全局变量和 CommonJS 作用域 (仅为使用 Browserify/WebPack 写的只支持浏览器的代码)。
- shared-node-browser - Node 和 Browser 通用全局变量。
- es6 - 支持除模块外所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
- worker - web workers 全局变量。
- amd - 定义 require() 和 define() 作为像 amd 一样的全局变量。
- mocha - 添加所有的 Mocha 测试全局变量。
- jasmine - 添加所有的 Jasmine 版本 1.3 和 2.0 的测试全局变量。
- jest - Jest 全局变量。
- phantomjs - PhantomJS 全局变量。
- protractor - Protractor 全局变量。
- qunit - QUnit 全局变量。
- jquery - jQuery 全局变量。
- prototypejs - Prototype.js 全局变量。
- shelljs - ShellJS 全局变量。
- meteor - Meteor 全局变量。
- mongo - MongoDB 全局变量。
- applescript - AppleScript 全局变量。
- nashorn - Java 8 Nashorn 全局变量。
- serviceworker - Service Worker 全局变量。
- atomtest - Atom 测试全局变量。
- embertest - Ember 测试全局变量。
- webextensions - WebExtensions 全局变量。
- greasemonkey - GreaseMonkey 全局变量。

```
"env": {
    "browser": true,
    "node": true
}
```

### globals--自定义全局变量

```
"globals": {
    "var1": true,
    "var2": false
}
```

### plugins--插件

```
"plugins": [
    "plugin1",
    "eslint-plugin-plugin2"
]
```

### rules--规则

- "off" 或 0 - 关闭规则
- "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
- "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

```
"rules": {
    "eqeqeq": "off",
    "curly": "error",
    "quotes": ["error", "double"]
}
```

### extends--继承

```
"extends": "eslint:recommended",
```

### root--根节点

停止在父级目录中寻找配置文件

```
"root": true
```