## 格式

which 可执行文件名称 

## 参数

-n 　指定文件名长度，指定的长度必须大于或等于所有文件中最长的文件名。

-p 　与-n参数相同，但此处的包括了文件的路径。

-w 　指定输出时栏位的宽度。

-V 　显示版本信息

## 示例

### 例一：查找文件、显示命令路径

#### 命令：which lsmod

#### 输出：

[root@localhost ~]# which pwd

/bin/pwd

[root@localhost ~]#  which adduser

/usr/sbin/adduser

[root@localhost ~]#

说明：

which 是根据使用者所配置的 PATH 变量内的目录去搜寻可运行档的！所以，不同的 PATH 配置内容所找到的命令当然不一样的！

### 例二：用 which 去找出 which

#### 命令：which which

#### 输出：

[root@localhost ~]# which which

alias which='alias | /usr/bin/which --tty-only --read-alias --show-dot 	--show-tilde'

/usr/bin/which

[root@localhost ~]#

说明：

竟然会有两个 which ，其中一个是 alias 这就是所谓的『命令别名』，意思是输入 which 会等於后面接的那串命令！


### 例三：找出 cd 这个命令

#### 命令：which cd

#### 输出：

说明：

cd 这个常用的命令竟然找不到啊！为什么呢？这是因为 cd 是bash 内建的命令！ 但是 which 默认是找 PATH 内所规范的目录，所以当然一定找不到的！
