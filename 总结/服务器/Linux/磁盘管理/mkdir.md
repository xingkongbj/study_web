## 格式

mkdir [选项] 目录

## 参数

-m, --mode=模式，设定权限<模式> (类似 chmod)，而不是 rwxrwxrwx 减 umask

-p, --parents  可以是一个路径名称。此时若路径中的某些目录尚不存在,加上此选项后,系统将自动建立好那些尚不存在的目录,即一次可以建立多个目录; 

-v, --verbose  每次创建新目录都显示信息

--help   显示此帮助信息并退出

--version  输出版本信息并退出


## 示例

### 例一：创建一个空目录

#### 命令：mkdir test1

#### 输出：

[root@localhost soft]# cd test

[root@localhost test]# mkdir test1

[root@localhost test]# ll

总计 4drwxr-xr-x 2 root root 4096 10-25 17:42 test1

[root@localhost test]#

### 例二：递归创建多个目录

#### 命令：mkdir -p test2/test22

#### 输出：

[root@localhost test]# mkdir -p test2/test22

[root@localhost test]# ll

总计 8drwxr-xr-x 2 root root 4096 10-25 17:42 test1

drwxr-xr-x 3 root root 4096 10-25 17:44 test2

[root@localhost test]# cd test2/

[root@localhost test2]# ll

总计 4drwxr-xr-x 2 root root 4096 10-25 17:44 test22

[root@localhost test2]#

### 例三：创建权限为777的目录 

#### 命令：mkdir -m 777 test3

#### 输出：

[root@localhost test]# mkdir -m 777 test3

[root@localhost test]# ll

总计 12drwxr-xr-x 2 root root 4096 10-25 17:42 test1

drwxr-xr-x 3 root root 4096 10-25 17:44 test2

drwxrwxrwx 2 root root 4096 10-25 17:46 test3

[root@localhost test]#

说明：

test3 的权限为rwxrwxrwx

### 例四：创建新目录都显示信息

#### 命令：mkdir -v test4

#### 输出：

[root@localhost test]# mkdir -v test4

mkdir: 已创建目录 “test4”

[root@localhost test]# mkdir -vp test5/test5-1

mkdir: 已创建目录 “test5”

mkdir: 已创建目录 “test5/test5-1”

[root@localhost test]#

### 例五：一个命令创建项目的目录结构

#### 命令：mkdir -vp scf/{lib/,bin/,doc/{info,product},logs/{info,product},service/deploy/{info,product}}

#### 输出：

[root@localhost test]# mkdir -vp scf/{lib/,bin/,doc/{info,product},logs/{info,product},service/deploy/{info,product}}

mkdir: 已创建目录 “scf”

mkdir: 已创建目录 “scf/lib”

mkdir: 已创建目录 “scf/bin”

mkdir: 已创建目录 “scf/doc”

mkdir: 已创建目录 “scf/doc/info”

mkdir: 已创建目录 “scf/doc/product”

mkdir: 已创建目录 “scf/logs”

mkdir: 已创建目录 “scf/logs/info”

mkdir: 已创建目录 “scf/logs/product”

mkdir: 已创建目录 “scf/service”

mkdir: 已创建目录 “scf/service/deploy”

mkdir: 已创建目录 “scf/service/deploy/info”

mkdir: 已创建目录 “scf/service/deploy/product”

[root@localhost test]# tree scf/

scf/

|-- bin

|-- doc

|   |-- info

|   `-- product

|-- lib

|-- logs

|   |-- info

|   `-- product

`-- service

   	 	`-- deploy

  	    	|-- info

        	`-- product



12 directories, 0 files

[root@localhost test]#
