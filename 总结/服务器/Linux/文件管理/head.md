## 格式

head [参数] [文件]

## 参数

-q 隐藏文件名

-v 显示文件名

-c<字节> 显示字节数

-n<行数> 显示的行数

## 示例

### 例一：显示文件的前n行

#### 命令：head -n 5 log2014.log

#### 输出：

[root@localhost test]# cat log2014.log 

2014-01

2014-02

2014-03

2014-04

2014-05

2014-06

2014-07

2014-08

2014-09

2014-10

2014-11

2014-12

==============================

[root@localhost test]# head -n 5 log2014.log 

2014-01

2014-02

2014-03

2014-04

2014-05[root@localhost test]#

### 例二：显示文件前n个字节

#### 命令：head -c 20 log2014.log

#### 输出：

[root@localhost test]# head -c 20 log2014.log

2014-01

2014-02

2014

[root@localhost test]#

### 例三：文件的除了最后n个字节以外的内容 

#### 命令：head -c -32 log2014.log

#### 输出：

[root@localhost test]# head -c -32 log2014.log

2014-01

2014-02

2014-03

2014-04

2014-05

2014-06

2014-07

2014-08

2014-09

2014-10

2014-11

2014-12[root@localhost test]#

### 例四：输出文件除了最后n行的全部内容

#### 命令：head -n -6 log2014.log

#### 输出：

[root@localhost test]# head -n -6 log2014.log

2014-01

2014-02

2014-03

2014-04

2014-05

2014-06

2014-07[root@localhost test]#
