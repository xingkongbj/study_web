# nvm 简单教程

## 安装前

安装 nvm 之后最好先删除下已安装的 node 和全局 node 模块

```
npm ls -g --depth=0 #查看已经安装在全局的模块，以便删除这些全局模块后再按照不同的 node 版本重新进行全局安装
sudo rm -rf /usr/local/lib/node_modules #删除全局 node_modules 目录
sudo rm /usr/local/bin/node #删除 node
cd  /usr/local/bin && ls -l | grep "../lib/node_modules/" | awk '{print $9}'| xargs rm #删除全局 node 模块注册的软链
```

## 安装

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
# 或者
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

# 安装完后要重启控制台。验证安装，默认会在“/home/个人账户”目录下会生成.nvm的隐藏目录，所有的node会以沙箱的方式装到该目录下。
command -v nvm
```

## 使用

```
nvm install stable  // 安装当前最稳定版本
nvm version         // 查看nvm版本
nvm install 4.6.2   // 安装node4.6.2版本（附带安装npm）
nvm uninstall 4.6.2 // 卸载node4.6.2版本
nvm ls              // 查看node版本
nvm ls-remote       // 列出所以远程服务器的版本（官方node version list）
nvm use 4.6.2       // 将node版本切换到4.6.2版本
nvm root　　　　     // 查看nvm安装路径 
nvm install latest  // 下载最新的node版本和与之对应的npm版本
nvm current         // 显示当前的node版本
nvm alias <name> <version> // 给不同的版本号添加别名
nvm unalias <name>  // 删除已定义的别名
nvm reinstall-packages <version> // 在当前版本node环境下，重新全局安装指定版本号的npm包
nvm run app1.js     // 用nvm替代npm运行程序
```