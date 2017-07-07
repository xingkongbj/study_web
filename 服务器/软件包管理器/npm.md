# npm 简单教程

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

    npm install <Module Name>
    
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
- homepage - 包的官网 url 。
- author - 包的作者姓名。
- contributors - 包的其他贡献者姓名。
- dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
- repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
- main - main 字段是一个模块ID，它是一个指向你程序的主要项目。就是说，如果你包的名字叫 express，然后用户安装它，然后require("express")。
- keywords - 关键字

## 卸载模块

    npm uninstall <Module Name>
    
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

语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。 

- 如果只是修复bug，需要更新Z位。
- 如果是新增了功能，但是向下兼容，需要更新Y位。
- 如果有大变动，向下不兼容，需要更新X位。

## 其他命令

- NPM提供了很多命令，例如install和publish，使用npm help可查看所有命令。
- 使用npm help <command>可查看某条命令的详细帮助，例如npm help install。
- 在package.json所在目录下使用npm install . -g可先在本地安装当前命令行程序，可用于发布前的本地测试。
- 使用npm update <package>可以把当前目录下node_modules子目录里边的对应模块更新至最新版本。
- 使用npm update <package> -g可以把全局安装的对应命令行程序更新至最新版。
- 使用npm cache clear可以清空NPM本地缓存，用于对付使用相同版本号发布新版本代码的人。
- 使用npm unpublish <package>@<version>可以撤销发布自己发布过的某个版本代码。

## 使用淘宝 NPM 镜像

    npm install -g cnpm --registry=https://registry.npm.taobao.org  #而后可以使用 cnpm 代替 npm