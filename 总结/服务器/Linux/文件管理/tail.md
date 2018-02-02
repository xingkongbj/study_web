## 格式

tail [必要参数] [选择参数] [文件] 

## 参数

-f 循环读取

-q 不显示处理信息

-v 显示详细的处理信息

-c<数目> 显示的字节数

-n<行数> 显示行数

--pid=PID 与-f合用,表示在进程ID,PID死掉之后结束. 

-q, --quiet, --silent 从不输出给出文件名的首部 

-s, --sleep-interval=S 与-f合用,表示在每次反复的间隔休眠S秒 

## 示例

### 例一：显示文件末尾内容

#### 命令：tail -n 5 log2014.log

#### 输出：

[root@localhost test]# tail -n 5 log2014.log 

2014-09

2014-10

2014-11

2014-12

==============================[root@localhost test]#

说明：

显示文件最后5行内容


### 例二：循环查看文件内容

#### 命令：tail -f test.log

#### 输出：

[root@localhost ~]# ping 192.168.120.204 > test.log &

[1] 11891[root@localhost ~]# tail -f test.log 

PING 192.168.120.204 (192.168.120.204) 56(84) bytes of data.

64 bytes from 192.168.120.204: icmp_seq=1 ttl=64 time=0.038 ms

64 bytes from 192.168.120.204: icmp_seq=2 ttl=64 time=0.036 ms

64 bytes from 192.168.120.204: icmp_seq=3 ttl=64 time=0.033 ms

64 bytes from 192.168.120.204: icmp_seq=4 ttl=64 time=0.027 ms

64 bytes from 192.168.120.204: icmp_seq=5 ttl=64 time=0.032 ms

64 bytes from 192.168.120.204: icmp_seq=6 ttl=64 time=0.026 ms

64 bytes from 192.168.120.204: icmp_seq=7 ttl=64 time=0.030 ms

64 bytes from 192.168.120.204: icmp_seq=8 ttl=64 time=0.029 ms

64 bytes from 192.168.120.204: icmp_seq=9 ttl=64 time=0.044 ms

64 bytes from 192.168.120.204: icmp_seq=10 ttl=64 time=0.033 ms

64 bytes from 192.168.120.204: icmp_seq=11 ttl=64 time=0.027 ms

[root@localhost ~]#

说明：

ping 192.168.120.204 > test.log & //在后台ping远程主机。并输出文件到test.log；这种做法也使用于一个以上的档案监视。用Ctrl＋c来终止。

### 例三：从第5行开始显示文件

#### 命令：tail -n +5 log2014.log

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

[root@localhost test]# tail -n +5 log2014.log

2014-05

2014-06

2014-07

2014-08

2014-09

2014-10

2014-11

2014-12

==============================
