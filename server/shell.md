# shell

## ls--查看文件和目录

```
ls
```

## export--定义变量

```
# 定义变量
export ZSH=/Users/xingkongbj/.oh-my-zsh

# 修改环境变量
export PATH=$HOME/bin:/usr/local/bin:$PATH
```

## source--引入文件

```
source $ZSH/oh-my-zsh.sh
```

## alias--语句别名

```
alias runios="react-native run-ios"
```

## &--前后语句同时执行

```
node node1.js & node node2.js
```

## &&--前语句成功后，执行后语句

```
node node1.js && node node2.js
```

## ||--前语句失败后，执行后语句

```
node node1.js || node node2.js
```

## |--管道参数，前语句执行结果传给后语句

```
node --v8-options | grep 'in progress'
```

## grep--结果过滤

```
node --v8-options | grep 'in progress'
```

## echo--输出内容

```
echo hello world
```