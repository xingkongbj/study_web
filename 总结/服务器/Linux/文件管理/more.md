## 格式

more [-dlfpcsu ] [-num ] [+/ pattern] [+ linenum] [file ... ] 

## 参数

+n      从笫n行开始显示

-n       定义屏幕大小为n行

+/pattern 在每个档案显示前搜寻该字串（pattern），然后从该字串前两行之后开始显示  

-c       从顶部清屏，然后显示

-d       提示“Press space to continue，’q’ to quit（按空格键继续，按q键退出）”，禁用响铃功能

-l        忽略Ctrl+l（换页）字符

-p       通过清除窗口而不是滚屏来对文件进行换页，与-c选项相似

-s       把连续的多个空行显示为一行

-u       把文件内容中的下画线去掉

## 操作命令

Enter    向下n行，需要定义。默认为1行

Ctrl+F   向下滚动一屏

空格键  向下滚动一屏

Ctrl+B  返回上一屏

=       输出当前行的行号

：f     输出文件名和当前行的行号

V      调用vi编辑器

!命令   调用Shell，并执行命令 

q       退出more

## 示例

### 例一：显示文件中从第3行起的内容

#### 命令：more +3 log2012.log

#### 输出：

[root@localhost test]# cat log2012.log 

2012-01

2012-02

2012-03

2012-04-day1

2012-04-day2

2012-04-day3


======[root@localhost test]# more +3 log2012.log 

2012-03

2012-04-day1

2012-04-day2

2012-04-day3


======[root@localhost test]#

### 例二：从文件中查找第一个出现"day3"字符串的行，并从该处前两行开始显示输出 

#### 命令： more +/day3 log2012.log

#### 输出：

[root@localhost test]# more +/day3 log2012.log 

...skipping

2012-04-day1

2012-04-day2

2012-04-day3

2012-05

2012-05-day1

======[root@localhost test]#

### 例三：设定每屏显示行数 

#### 命令：more -5 log2012.log

#### 输出：

[root@localhost test]# more -5 log2012.log 

2012-01

2012-02

2012-03

2012-04-day1

2012-04-day2

说明：

如下图所示，最下面显示了该屏展示的内容占文件总行数的比例，按 Ctrl+F 或者 空格键 将会显示下一屏5条内容，百分比也会跟着变化。

### 例四：列一个目录下的文件，由于内容太多，我们应该学会用more来分页显示。这得和管道 | 结合起来 

#### 命令：ls -l  | more -5

#### 输出：

[root@localhost test]#  ls -l  | more -5

总计 36

-rw-r--r-- 1 root root  308 11-01 16:49 log2012.log

-rw-r--r-- 1 root root   33 10-28 16:54 log2013.log

-rw-r--r-- 1 root root  127 10-28 16:51 log2014.log

lrwxrwxrwx 1 root root    7 10-28 15:18 log_link.log -> log.log

-rw-r--r-- 1 root root   25 10-28 17:02 log.log

-rw-r--r-- 1 root root   37 10-28 17:07 log.txt

drwxr-xr-x 6 root root 4096 10-27 01:58 scf

drwxrwxrwx 2 root root 4096 10-28 14:47 test3

drwxrwxrwx 2 root root 4096 10-28 14:47 test4

说明：

每页显示5个文件信息，按 Ctrl+F 或者 空格键 将会显示下5条文件信息。
