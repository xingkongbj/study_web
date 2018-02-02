## 格式

locate [选择参数] [样式]

## 参数

-e   将排除在寻找的范围之外。

-1  如果 是 1．则启动安全模式。在安全模式下，使用者不会看到权限无法看到		的档案。这会始速度减慢，因为 locate 必须至实际的档案系统中取得档案的		权限资料。

-f   将特定的档案系统排除在外，例如我们没有到理要把 proc 档案系统中的档案		放在资料库中。

-q  安静模式，不会显示任何错误讯息。

-n 至多显示 n个输出。

-r 使用正规运算式 做寻找的条件。

-o 指定资料库存的名称。

-d 指定资料库的路径

-h 显示辅助讯息

-V 显示程式的版本讯息

## 示例

### 例一：查找和pwd相关的所有文件

#### 命令：locate pwd

#### 输出：

peida-VirtualBox ~ # locate pwd

/bin/pwd

/etc/.pwd.lock

/sbin/unix_chkpwd

/usr/bin/pwdx

/usr/include/pwd.h

/usr/lib/python2.7/dist-packages/twisted/python/fakepwd.py

/usr/lib/python2.7/dist-packages/twisted/python/fakepwd.pyc

/usr/lib/python2.7/dist-packages/twisted/python/test/test_fakepwd.py

/usr/lib/python2.7/dist-packages/twisted/python/test/test_fakepwd.pyc

/usr/lib/syslinux/pwd.c32

/usr/share/help/C/empathy/irc-join-pwd.page

/usr/share/help/ca/empathy/irc-join-pwd.page

/usr/share/help/cs/empathy/irc-join-pwd.page

/usr/share/help/de/empathy/irc-join-pwd.page

/usr/share/help/el/empathy/irc-join-pwd.page

### 例二：搜索etc目录下所有以sh开头的文件 

#### 命令：locate /etc/sh

#### 输出：

peida-VirtualBox ~ # locate /etc/sh

/etc/shadow

/etc/shadow-

/etc/shells

peida-VirtualBox ~ #

### 例三：搜索etc目录下，所有以m开头的文件

#### 命令：locate /etc/m

#### 输出：

peida-VirtualBox ~ # locate /etc/m

/etc/magic

/etc/magic.mime

/etc/mailcap

/etc/mailcap.order

/etc/manpath.config

/etc/mate-settings-daemon

