# npm 简单教程

> 教程 http://www.runoob.com/nodejs/nodejs-npm.html

npm 是随同 Node.js 一起安装的包管理工具

## 使用场景

- 允许用户从 NPM 服务器下载别人编写的第三方包到本地使用。
- 允许用户从 NPM 服务器下载并安装别人编写的命令行程序到本地使用。 
- 允许用户将自己编写的包或命令行程序上传到 NPM 服务器供别人使用。

## 查看版本

    npm -v
    
## npm 升级

    sudo npm install npm -g
    
## 安装 Node.js 模块

    npm install <Module Name>@<指定版本> # 安装指定版本 latest为最新版本
    npm install <Module Name> -S, --save # 安装包信息将加入到 dependencies（生产阶段的依赖）
    npm install <Module Name> -D, --save-dev # 安装包信息将加入到devDependencies（开发阶段的依赖），所以开发阶段一般使用它
    npm install <Module Name> -O, --save-optional # 安装包信息将加入到optionalDependencies（可选阶段的依赖）
    npm install <Module Name> -E, --save-exact # 精确安装指定模块版本
    
## 全局安装与本地安装

    npm install <Module Name>  # 本地安装
    npm install <Module Name> -g  # 全局安装
    
本地安装

- 将安装包放在 ./node_modules 下（运行 npm 命令时所在的目录），如果没有 node_modules 目录，会在当前执行 npm 命令的目录下生成 node_modules 目录。 
- 可以通过 require() 来引入本地安装的包。

全局安装

- 将安装包放在 /usr/local 下或者你 node 的安装目录。
- 可以直接在命令行里使用。

## 查看安装信息

    npm list  #查看所有信息，加 -g 查看全局安装信息
    npm list <Module Name>  #查看该模块信息
    
## Package.json 属性说明

- name - 包名。
- version - 包的版本号。
- description - 包的描述。
- main - main 字段是一个路径，指向主文件。
- scripts - npm run 时运行的脚本。
- license - 许可协议。
- repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
- keywords - 关键字
- author - 作者。
- contributors - 包的其他贡献者姓名。
- bugs - 提 bug 的地址。
- homepage - 包的官网 url 。
- dependencies - 发布时依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在用户根目录的 node_module 目录下。
- devDependencies - 开发时依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在项目根目录的 node_module 目录下。
- peerDependencies - 运行时依赖包版本限制列表。
- files - 数组表示模块包含的文件或目录。
- bin - 安装可执行命令。
- config - 模块配置。
- engines - node 的版本范围。
- os - 支持的操作系统。
- cpu - 支持的 cpu 框架。

## 卸载模块

    npm uninstall <Module Name>

## 运行脚本

    npm run <Script Name>
    
## 查看目录下信息

    npm ls
    
## 更新模块

    npm update <Module Name>
    
## 搜索模块

    npm search <Module Name>
    
## 创建模块

    npm init
    
## 在 npm 资源库中注册用户（使用邮箱注册）

    npm adduser
    
## 发布模块

    npm publish
    
## 版本号

语义版本号分为 X.Y.Z 三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。 

- 如果只是修复 bug，需要更新 Z 位。
- 如果是新增了功能，但是向下兼容，需要更新 Y 位。
- 如果有大变动，向下不兼容，需要更新 X 位。

## 其他命令

- NPM 提供了很多命令，例如 install 和 publish，使用 npm help 可查看所有命令。
- 使用 npm help <command> 可查看某条命令的详细帮助，例如 npm help install。
- 在 package.json 所在目录下使用 npm install . -g 可先在本地安装当前命令行程序，可用于发布前的本地测试。
- 使用 npm update <package> 可以把当前目录下 node_modules 子目录里边的对应模块更新至最新版本。
- 使用 npm update <package> -g 可以把全局安装的对应命令行程序更新至最新版。
- 使用 npm cache clear 可以清空 NPM 本地缓存，用于对付使用相同版本号发布新版本代码的人。
- 使用 npm unpublish <package>@<version> 可以撤销发布自己发布过的某个版本代码。

## 使用淘宝 NPM 镜像

    npm install -g cnpm --registry=https://registry.npm.taobao.org  #而后可以使用 cnpm 代替 npm
    
## 常用脚本

常用脚本可以简写，如 npm run test 写成 npm test。

npm run script1.js & npm run script2.js 表示 script1 和 script2 同时执行。

npm run script1.js && npm run script2.js 表示 script1 执行成功后执行 script2。

- test - 测试
- build - 编译
- start - 启动
- restart - 重启--先执行 stop 再执行 restart 最后执行 start
- stop - 停止
- install - 安装
- uninstall - 卸载
- publish - 发布

## hook

钩子--用于在命令执行前后，执行相关语句，写入 scripts 中。pre+脚本在命令之前运行，post+脚本在命令之后运行。如 preclean->clean->postclean。