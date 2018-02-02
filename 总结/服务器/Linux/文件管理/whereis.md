## 格式

whereis [-bmsu] [BMS 目录名 -f ] 文件名

## 参数

-b   定位可执行文件。

-m   定位帮助文件。

-s   定位源代码文件。

-u   搜索默认路径下除可执行文件、源代码文件、帮助文件以外的其它文件。

-B   指定搜索可执行文件的路径。

-M   指定搜索帮助文件的路径。

-S   指定搜索源代码文件的路径。

## 示例

### 例一：将和**文件相关的文件都查找出来

#### 命令：whereis svn

#### 输出：

[root@localhost ~]# whereis tomcat

tomcat:

[root@localhost ~]# whereis svn

svn: /usr/bin/svn /usr/local/svn /usr/share/man/man1/svn.1.gz

说明：

tomcat没安装，找不出来，svn安装找出了很多相关文件

### 例二：只将二进制文件 查找出来 

#### 命令：whereis -b svn

#### 输出：

[root@localhost ~]# whereis -b svn

svn: /usr/bin/svn /usr/local/svn

[root@localhost ~]# whereis -m svn

svn: /usr/share/man/man1/svn.1.gz

[root@localhost ~]# whereis -s svn

svn:

[root@localhost ~]#

说明：

whereis -m svn 查出说明文档路径，whereis -s svn 找source源文件。
