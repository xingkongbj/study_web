## 格式

mv [选项] 源文件或目录 目标文件或目录

## 参数

-b ：若需覆盖文件，则覆盖前先行备份。 

-f ：force 强制的意思，如果目标文件已经存在，不会询问而直接覆盖；

-i ：若目标文件 (destination) 已经存在时，就会询问是否覆盖！

-u ：若目标文件已经存在，且 source 比较新，才会更新(update)

-t  ： --target-directory=DIRECTORY 移动所有文件至目录，即指定mv的目标目录，该选项适用于移动多个源文件到一个目录的情况，此时目标目录在前，源文件在后。

## 示例

### 例一：文件改名

#### 命令：mv test.log test1.txt

#### 输出：

[root@localhost test]# ll

总计 20drwxr-xr-x 6 root root 4096 10-27 01:58 scf

drwxrwxrwx 2 root root 4096 10-25 17:46 test3

drwxr-xr-x 2 root root 4096 10-25 17:56 test4

drwxr-xr-x 3 root root 4096 10-25 17:56 test5

-rw-r--r-- 1 root root   16 10-28 06:04 test.log

[root@localhost test]# mv test.log test1.txt

[root@localhost test]# ll

总计 20drwxr-xr-x 6 root root 4096 10-27 01:58 scf

-rw-r--r-- 1 root root   16 10-28 06:04 test1.txt

drwxrwxrwx 2 root root 4096 10-25 17:46 test3

drwxr-xr-x 2 root root 4096 10-25 17:56 test4

drwxr-xr-x 3 root root 4096 10-25 17:56 test5

说明：

将文件test.log重命名为test1.txt

### 例二：移动文件

#### 命令：mv test1.txt test3

#### 输出：

[root@localhost test]# ll

总计 20drwxr-xr-x 6 root root 4096 10-27 01:58 scf

-rw-r--r-- 1 root root   29 10-28 06:05 test1.txt

drwxrwxrwx 2 root root 4096 10-25 17:46 test3

drwxr-xr-x 2 root root 4096 10-25 17:56 test4

drwxr-xr-x 3 root root 4096 10-25 17:56 test5

[root@localhost test]# mv test1.txt test3

[root@localhost test]# ll

总计 16drwxr-xr-x 6 root root 4096 10-27 01:58 scf

drwxrwxrwx 2 root root 4096 10-28 06:09 test3

drwxr-xr-x 2 root root 4096 10-25 17:56 test4

drwxr-xr-x 3 root root 4096 10-25 17:56 test5

[root@localhost test]# cd test3

[root@localhost test3]# ll

总计 4

-rw-r--r-- 1 root root 29 10-28 06:05 test1.txt

[root@localhost test3]#

说明：

将test1.txt文件移到目录test3中

### 例三：将文件log1.txt,log2.txt,log3.txt移动到目录test3中。 

#### 命令：

mv log1.txt log2.txt log3.txt test3

mv -t /opt/soft/test/test4/ log1.txt log2.txt 	log3.txt 

#### 输出：

[root@localhost test]# ll

总计 28

-rw-r--r-- 1 root root    8 10-28 06:15 log1.txt

-rw-r--r-- 1 root root   12 10-28 06:15 log2.txt

-rw-r--r-- 1 root root   13 10-28 06:16 log3.txt

drwxrwxrwx 2 root root 4096 10-28 06:09 test3

[root@localhost test]# mv log1.txt log2.txt log3.txt test3

[root@localhost test]# ll

总计 16drwxrwxrwx 2 root root 4096 10-28 06:18 test3

[root@localhost test]# cd test3/

[root@localhost test3]# ll

总计 16

-rw-r--r-- 1 root root  8 10-28 06:15 log1.txt

-rw-r--r-- 1 root root 12 10-28 06:15 log2.txt

-rw-r--r-- 1 root root 13 10-28 06:16 log3.txt

-rw-r--r-- 1 root root 29 10-28 06:05 test1.txt

[root@localhost test3]#

[root@localhost test3]# ll

总计 20

-rw-r--r-- 1 root root    8 10-28 06:15 log1.txt

-rw-r--r-- 1 root root   12 10-28 06:15 log2.txt

-rw-r--r-- 1 root root   13 10-28 06:16 log3.txt

drwxr-xr-x 2 root root 4096 10-28 06:21 logs

-rw-r--r-- 1 root root   29 10-28 06:05 test1.txt

[root@localhost test3]# mv -t /opt/soft/test/test4/ log1.txt log2.txt 	log3.txt 

[root@localhost test3]# cd ..

[root@localhost test]# cd test4/

[root@localhost test4]# ll

总计 12

-rw-r--r-- 1 root root  8 10-28 06:15 log1.txt

-rw-r--r-- 1 root root 12 10-28 06:15 log2.txt

-rw-r--r-- 1 root root 13 10-28 06:16 log3.txt

[root@localhost test4]#

说明：

mv log1.txt log2.txt log3.txt test3 命令将log1.txt ，log2.txt， log3.txt 三个文件移到 test3目录中去，mv -t /opt/soft/test/test4/ log1.txt log2.txt log3.txt 命令又将三个文件移动到test4目录中去


### 例四：将文件file1改名为file2，如果file2已经存在，则询问是否覆盖

#### 命令：mv -i log1.txt log2.txt

#### 输出：

[root@localhost test4]# ll

总计 12

-rw-r--r-- 1 root root  8 10-28 06:15 log1.txt

-rw-r--r-- 1 root root 12 10-28 06:15 log2.txt

-rw-r--r-- 1 root root 13 10-28 06:16 log3.txt

[root@localhost test4]# cat log1.txt 

odfdfs

[root@localhost test4]# cat log2.txt 

ererwerwer

[root@localhost test4]# mv -i log1.txt log2.txt 

mv：是否覆盖“log2.txt”? y

[root@localhost test4]# cat log2.txt 

odfdfs

[root@localhost test4]#

### 例五：将文件file1改名为file2，即使file2存在，也是直接覆盖掉。

#### 命令：mv -f log3.txt log2.txt

#### 输出：

[root@localhost test4]# ll

总计 8

-rw-r--r-- 1 root root  8 10-28 06:15 log2.txt

-rw-r--r-- 1 root root 13 10-28 06:16 log3.txt

[root@localhost test4]# cat log2.txt 

odfdfs

[root@localhost test4]# cat log3

cat: log3: 没有那个文件或目录

[root@localhost test4]# ll

总计 8

-rw-r--r-- 1 root root  8 10-28 06:15 log2.txt

-rw-r--r-- 1 root root 13 10-28 06:16 log3.txt

[root@localhost test4]# cat log2.txt 

odfdfs

[root@localhost test4]# cat log3.txt 

dfosdfsdfdss

[root@localhost test4]# mv -f log3.txt log2.txt 

[root@localhost test4]# cat log2.txt 

dfosdfsdfdss

[root@localhost test4]# ll

总计 4

-rw-r--r-- 1 root root 13 10-28 06:16 log2.txt

[root@localhost test4]#

说明：

log3.txt的内容直接覆盖了log2.txt内容，-f 这是个危险的选项，使用的时候一定要保持头脑清晰，一般情况下最好不用加上它。

### 例六：目录的移动

#### 命令：mv dir1 dir2 

#### 输出：

[root@localhost test4]# ll

-rw-r--r-- 1 root root 13 10-28 06:16 log2.txt

[root@localhost test4]# ll

-rw-r--r-- 1 root root 13 10-28 06:16 log2.txt

[root@localhost test4]# cd ..

[root@localhost test]# ll

drwxr-xr-x 6 root root 4096 10-27 01:58 scf

drwxrwxrwx 3 root root 4096 10-28 06:24 test3

drwxr-xr-x 2 root root 4096 10-28 06:48 test4

drwxr-xr-x 3 root root 4096 10-25 17:56 test5

[root@localhost test]# cd test3

[root@localhost test3]# ll

drwxr-xr-x 2 root root 4096 10-28 06:21 logs

-rw-r--r-- 1 root root   29 10-28 06:05 test1.txt

[root@localhost test3]# cd ..

[root@localhost test]# mv test4 test3

[root@localhost test]# ll

drwxr-xr-x 6 root root 4096 10-27 01:58 scf

drwxrwxrwx 4 root root 4096 10-28 06:54 test3

drwxr-xr-x 3 root root 4096 10-25 17:56 test5

[root@localhost test]# cd test3/

[root@localhost test3]# ll

drwxr-xr-x 2 root root 4096 10-28 06:21 logs

-rw-r--r-- 1 root root   29 10-28 06:05 test1.txt

drwxr-xr-x 2 root root 4096 10-28 06:48 test4

[root@localhost test3]#

说明：

如果目录dir2不存在，将目录dir1改名为dir2；否则，将dir1移动到dir2中。

### 例七：移动当前文件夹下的所有文件到上一级目录

#### 命令：mv * ../

#### 输出：

[root@localhost test4]# ll

-rw-r--r-- 1 root root 25 10-28 07:02 log1.txt

-rw-r--r-- 1 root root 13 10-28 06:16 log2.txt

[root@localhost test4]# mv * ../

[root@localhost test4]# ll

[root@localhost test4]# cd ..

[root@localhost test3]# ll

-rw-r--r-- 1 root root   25 10-28 07:02 log1.txt

-rw-r--r-- 1 root root   13 10-28 06:16 log2.txt

drwxr-xr-x 2 root root 4096 10-28 06:21 logs

-rw-r--r-- 1 root root   29 10-28 06:05 test1.txt

drwxr-xr-x 2 root root 4096 10-28 07:02 test4

### 例八：把当前目录的一个子目录里的文件移动到另一个子目录里

#### 命令：mv test3/*.txt test5

#### 输出：

[root@localhost test]# ll

drwxr-xr-x 6 root root 4096 10-27 01:58 scf

drwxrwxrwx 4 root root 4096 10-28 07:02 test3

drwxr-xr-x 3 root root 4096 10-25 17:56 test5

[root@localhost test]# cd test3

[root@localhost test3]# ll

-rw-r--r-- 1 root root   25 10-28 07:02 log1.txt

-rw-r--r-- 1 root root   13 10-28 06:16 log2.txt

drwxr-xr-x 2 root root 4096 10-28 06:21 logs

-rw-r--r-- 1 root root   29 10-28 06:05 test1.txt

drwxr-xr-x 2 root root 4096 10-28 07:02 test4

[root@localhost test3]# cd ..

[root@localhost test]# mv test3/*.txt test5

[root@localhost test]# cd test5

[root@localhost test5]# ll

-rw-r--r-- 1 root root   25 10-28 07:02 log1.txt

-rw-r--r-- 1 root root   13 10-28 06:16 log2.txt

-rw-r--r-- 1 root root   29 10-28 06:05 test1.txt

drwxr-xr-x 2 root root 4096 10-25 17:56 test5-1

[root@localhost test5]# 	cd ..

[root@localhost test]# cd test3/

[root@localhost test3]# ll

drwxr-xr-x 2 root root 4096 10-28 06:21 logs

drwxr-xr-x 2 root root 4096 10-28 07:02 test4

[root@localhost test3]#

### 例九：文件被覆盖前做简单备份，前面加参数-b

#### 命令：mv log1.txt -b log2.txt

#### 输出：

[root@localhost test5]# ll

-rw-r--r-- 1 root root   25 10-28 07:02 log1.txt

-rw-r--r-- 1 root root   13 10-28 06:16 log2.txt

-rw-r--r-- 1 root root   29 10-28 06:05 test1.txt

drwxr-xr-x 2 root root 4096 10-25 17:56 test5-1

[root@localhost test5]# mv log1.txt -b log2.txt

mv：是否覆盖“log2.txt”? y

[root@localhost test5]# ll

-rw-r--r-- 1 root root   25 10-28 07:02 log2.txt

-rw-r--r-- 1 root root   13 10-28 06:16 log2.txt~

-rw-r--r-- 1 root root   29 10-28 06:05 test1.txt

drwxr-xr-x 2 root root 4096 10-25 17:56 test5-1

[root@localhost test5]#

说明：

-b 不接受参数，mv会去读取环境变量VERSION_CONTROL来作为备份策略。

--backup该选项指定如果目标文件存在时的动作，共有四种备份策略：

1.CONTROL=none或off : 不备份。

2.CONTROL=numbered或t：数字编号的备份

3.CONTROL=existing或nil：如果存在以数字编号的备份，则继续编号备份m+1...n：

执行mv操作前已存在以数字编号的文件log2.txt.~1~，那么再次执行将产生log2.txt~2~，以次类推。如果之前没有以数字编号的文件，则使用下面讲到的简单备份。

4.CONTROL=simple或never：使用简单备份：在被覆盖前进行了简单备份，简单备份只能有一份，再次被覆盖时，简单备份也会被覆盖。
