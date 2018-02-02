## 格式

rm [选项] 文件

## 参数

-f, --force    忽略不存在的文件，从不给出提示。

-i, --interactive 进行交互式删除

-r, -R, --recursive   指示rm将参数中列出的全部目录和子目录均递归地删除。

-v, --verbose    详细显示进行的步骤

--help     显示此帮助信息并退出

--version  输出版本信息并退出


## 示例

### 例一：删除文件file，系统会先询问是否删除。 

#### 命令：rm 文件名

#### 输出：

[root@localhost test1]# ll

总计 4

-rw-r--r-- 1 root root 56 10-26 14:31 log.log

root@localhost test1]# rm log.log 

rm：是否删除 一般文件 “log.log”? y

root@localhost test1]# ll

总计 0[root@localhost test1]#

说明：

输入rm log.log命令后，系统会询问是否删除，输入y后就会删除文件，不想删除则数据n。

### 例二：强行删除file，系统不再提示。 

#### 命令：rm -f log1.log

#### 输出：

[root@localhost test1]# ll

总计 4

-rw-r--r-- 1 root root 23 10-26 14:40 log1.log

[root@localhost test1]# rm -f log1.log 

[root@localhost test1]# ll

总计 0[root@localhost test1]#

### 例三：删除任何.log文件；删除前逐一询问确认 

#### 命令：rm -i *.log

#### 输出：

[root@localhost test1]# ll

总计 8

-rw-r--r-- 1 root root 11 10-26 14:45 log1.log

-rw-r--r-- 1 root root 24 10-26 14:45 log2.log

[root@localhost test1]# rm -i *.log

rm：是否删除 一般文件 “log1.log”? y

rm：是否删除 一般文件 “log2.log”? y

[root@localhost test1]# ll

总计 0[root@localhost test1]#

### 例四：将 test1子目录及子目录中所有档案删除

#### 命令：rm -r test1

#### 输出：

[root@localhost test]# ll

总计 24drwxr-xr-x 7 root root 4096 10-25 18:07 scf

drwxr-xr-x 2 root root 4096 10-26 14:51 test1

drwxr-xr-x 3 root root 4096 10-25 17:44 test2

drwxrwxrwx 2 root root 4096 10-25 17:46 test3

drwxr-xr-x 2 root root 4096 10-25 17:56 test4

drwxr-xr-x 3 root root 4096 10-25 17:56 test5

[root@localhost test]# rm -r test1

rm：是否进入目录 “test1”? y

rm：是否删除 一般文件 “test1/log3.log”? y

rm：是否删除 目录 “test1”? y

[root@localhost test]# ll

总计 20drwxr-xr-x 7 root root 4096 10-25 18:07 scf

drwxr-xr-x 3 root root 4096 10-25 17:44 test2

drwxrwxrwx 2 root root 4096 10-25 17:46 test3

drwxr-xr-x 2 root root 4096 10-25 17:56 test4

drwxr-xr-x 3 root root 4096 10-25 17:56 test5

[root@localhost test]#

### 例五：rm -rf test2命令会将 test2 子目录及子目录中所有档案删除,并且不用一一确认

#### 命令：rm -rf  test2 

#### 输出：

[root@localhost test]# rm -rf test2

[root@localhost test]# ll

总计 16drwxr-xr-x 7 root root 4096 10-25 18:07 scf

drwxrwxrwx 2 root root 4096 10-25 17:46 test3

drwxr-xr-x 2 root root 4096 10-25 17:56 test4

drwxr-xr-x 3 root root 4096 10-25 17:56 test5

[root@localhost test]#

### 例六：删除以 -f 开头的文件

#### 命令：rm -- -f

#### 输出：

[root@localhost test]# touch -- -f

[root@localhost test]# ls -- -f

-f[root@localhost test]# rm -- -f

rm：是否删除 一般空文件 “-f”? y

[root@localhost test]# ls -- -f

ls: -f: 没有那个文件或目录

[root@localhost test]#

也可以使用下面的操作步骤:

[root@localhost test]# touch ./-f

[root@localhost test]# ls ./-f

./-f[root@localhost test]# rm ./-f

rm：是否删除 一般空文件 “./-f”? y

[root@localhost test]#

### 例七：自定义回收站功能

#### 命令：myrm(){ D=/tmp/$(date +%Y%m%d%H%M%S); mkdir -p $D; mv "$@" $D && echo "moved to $D ok"; }

#### 输出：

[root@localhost test]# myrm(){ D=/tmp/$(date +%Y%m%d%H%M%S); mkdir -p $D; 	mv "$@" $D && echo "moved to $D ok"; }

[root@localhost test]# alias rm='myrm'

[root@localhost test]# touch 1.log 2.log 3.log

[root@localhost test]# ll

总计 16

-rw-r--r-- 1 root root    0 10-26 15:08 1.log

-rw-r--r-- 1 root root    0 10-26 15:08 2.log

-rw-r--r-- 1 root root    0 10-26 15:08 3.log

drwxr-xr-x 7 root root 4096 10-25 18:07 scf

drwxrwxrwx 2 root root 4096 10-25 17:46 test3

drwxr-xr-x 2 root root 4096 10-25 17:56 test4

drwxr-xr-x 3 root root 4096 10-25 17:56 test5

[root@localhost test]# rm [123].log

moved to /tmp/20121026150901 ok

[root@localhost test]# ll

总计 16drwxr-xr-x 7 root root 4096 10-25 18:07 scf

drwxrwxrwx 2 root root 4096 10-25 17:46 test3

drwxr-xr-x 2 root root 4096 10-25 17:56 test4

drwxr-xr-x 3 root root 4096 10-25 17:56 test5

[root@localhost test]# ls /tmp/20121026150901/

1.log  2.log  3.log

[root@localhost test]#

说明：

上面的操作过程模拟了回收站的效果，即删除文件的时候只是把文件放到一个临时目录中，这样在需要的时候还可以恢复过来。
