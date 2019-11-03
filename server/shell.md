# shell

## alias--指令别名

```
alias runios="react-native run-ios"
alias rn=react-native
```

## echo--输出变量

```
echo hello world

# 显示变量
echo $LANG
echo ${LANG}

# 内部变量定义
ZSH=/Users/xingkongbj/.oh-my-zsh
```

## export--设置全局变量

```
# 定义全局变量
export ZSH=/Users/xingkongbj/.oh-my-zsh

# 修改全局变量，PATH是环境变量
export PATH=$HOME/bin:/usr/local/bin:$PATH
```

## unset--取消变量

```
unset ZSH
```

## ""、''、``的作用

```
# $name 会识别为变量
myname="$name its me"

# $name 会识别为字符串
myname='$name its me'

# locate crontab 优先执行
ls -l `locate crontab`
ls -l $(locate crontab)
```

## 常用环境变量

```
# 用户根目录，常用cd ~ 切换
HOME

# 当前 SHELL 文件位置
SHELL

# 历史命令记录条数
HISTSIZE

# 邮件保存位置
MAIL

# 可执行文件的搜索目录，用:分隔
PATH

# 系统编码格式
LANG

# 随机数
RANDOM
```

## source--引入文件

```
source $ZSH/oh-my-zsh.sh
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

## exit--退出

```
# 0为成功
exit 1
```

## netstat--查看网络连接

```
netstat -an|grep 80
```

## lsof--查看端口服务

```
lsof -i :9999
```

## ps--查看进程

```
ps -ef|grep nginx
```

## kill--关闭进程

```
# 正常退出
kill -QUIT 进程号
kill -3 进程号

# 快速停止
kill -INT 进程号
kill -2 进程号
kill -TERM 进程号
kill -15 进程号

# 强制退出
kill -KILL nginx
kill -9 nginx
```

## >/dev/null--输出到黑洞

```
>/dev/null # 默认是1，标准输出，即屏幕显示
2>/dev/null # 错误输出到黑洞
2>&1 # 把错误输出2重定向到标准输出1
```
