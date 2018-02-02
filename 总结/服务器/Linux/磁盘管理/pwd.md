## 格式

pwd [选项]

## 参数

-L 目录连接链接时，输出连接路径

-P 显示出实际路径，而非使用连接（link）路径。

## 示例

### 例一：用 pwd 命令查看默认工作目录的完整路径

#### 命令：pwd

#### 输出：

[root@localhost ~]# pwd

/root

[root@localhost ~]#

### 例二：使用 pwd 命令查看指定文件夹

#### 命令：pwd

#### 输出：

[root@localhost ~]# cd /opt/soft/

[root@localhost soft]# pwd 

/opt/soft

[root@localhost soft]#

### 例三：目录连接链接时，pwd -P  显示出实际路径，而非使用连接（link）路径；pwd显示的是连接路径

#### 命令：pwd -P

#### 输出：

[root@localhost soft]# cd /etc/init.d 

[root@localhost init.d]# pwd

/etc/init.d

[root@localhost init.d]# pwd -P

/etc/rc.d/init.d

[root@localhost init.d]#

### 例四：/bin/pwd

#### 命令：

/bin/pwd [选项]

选项：

-L 目录连接链接时，输出连接路径

-P 输出物理路径

#### 输出：

[root@localhost init.d]# /bin/pwd 

/etc/rc.d/init.d

[root@localhost init.d]# /bin/pwd --help

[root@localhost init.d]# /bin/pwd -P

/etc/rc.d/init.d

[root@localhost init.d]# /bin/pwd -L

/etc/init.d

[root@localhost init.d]#

### 例五：当前目录被删除了，而pwd命令仍然显示那个目录

#### 输出：

[root@localhost init.d]# cd /opt/soft

[root@localhost soft]# mkdir removed

[root@localhost soft]# cd removed/

[root@localhost removed]# pwd

/opt/soft/removed

[root@localhost removed]# rm ../removed -rf

[root@localhost removed]# pwd

/opt/soft/removed

[root@localhost removed]# /bin/pwd

/bin/pwd: couldn't find directory entry in “..” with matching i-node

[root@localhost removed]# cd 

[root@localhost ~]# pwd

/root

[root@localhost ~]#
