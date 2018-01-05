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

### 
