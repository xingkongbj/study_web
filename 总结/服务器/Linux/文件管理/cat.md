## 格式

cat [选项] [文件]

## 参数

-A, --show-all           等价于 -vET

-b, --number-nonblank    对非空输出行编号

-e                       等价于 -vE

-E, --show-ends          在每行结束处显示 $

-n, --number     对输出的所有行编号,由1开始对所有输出的行数编号

-s, --squeeze-blank  有连续两行以上的空白行，就代换为一行的空白行 

-t                       与 -vT 等价

-T, --show-tabs          将跳格字符显示为 ^I

-u                       (被忽略)

-v, --show-nonprinting   使用 ^ 和 M- 引用，除了 LFD 和 TAB 之外

## 示例

### 例一：把 log2012.log 的文件内容加上行号后输入 log2013.log 这个文件里

#### 命令：cat -n log2012.log log2013.log 

#### 输出：

[root@localhost test]# cat log2012.log 

2012-01

2012-02



======[root@localhost test]# cat log2013.log 

2013-01

2013-02



2013-03

======[root@localhost test]# cat -n log2012.log log2013.log 

   1  2012-01

   2  2012-02

   3

   4

   5  ======

   6  2013-01

   7  2013-02

   8

   9

  10  2013-03

  11  ======[root@localhost test]#

### 例二：把 log2012.log 和 log2013.log 的文件内容加上行号（空白行不加）之后将内容附加到 log.log 里。 

#### 命令：cat -b log2012.log log2013.log log.log

#### 输出：

[root@localhost test]# cat -b log2012.log log2013.log log.log

   1  2012-01

   2  2012-02

   3  ======

   4  2013-01

   5  2013-02

   6  2013-03

   7  ======[root@localhost test]#

### 例三：把 log2012.log 的文件内容加上行号后输入 log.log 这个文件里 

#### 命令：cat -n log2012.log > log.log

#### 输出：

[root@localhost test]# cat log.log 

[root@localhost test]# cat -n log2012.log > log.log

[root@localhost test]# cat -n log.log 

   1  2012-01

   2  2012-02

   3

   4

   5  ======

[root@localhost test]#

### 例四：使用here doc来生成文件

#### 输出：

[root@localhost test]# cat >log.txt <<EOF

> Hello

> World

> Linux

> PWD=$(pwd)

> EOF

[root@localhost test]# ls -l log.txt 

-rw-r--r-- 1 root root 37 10-28 17:07 log.txt

[root@localhost test]# cat log.txt 

Hello

World

Linux

PWD=/opt/soft/test

[root@localhost test]#


说明：

注意粗体部分，here doc可以进行字符串替换。

### 例五：tac (反向列示)

#### 命令：tac log.txt

#### 输出：

[root@localhost test]# tac log.txt 

PWD=/opt/soft/test

Linux

World

Hello

说明：

tac 是将 cat 反写过来，所以他的功能就跟 cat 相反， cat 是由第一行到最后一行连续显示在萤幕上，而 tac 则是由最后一行到第一行反向在萤幕上显示出来！
