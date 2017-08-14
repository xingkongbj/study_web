# Vim 简单操作

> 教程 http://www.runoob.com/linux/linux-vim.html
> 
> 操作手册 https://github.com/xingkongbj/study_web/blob/master/服务器/Vim/Vim用户手册中文版74.pdf

`vi 文件名`进入vim编辑器，进入时为命令模式。

模式切换示意图

![](vim-vi-workmodel.jpg)

键盘图

![](vi-vim-cheat-sheet-sch.gif)

## 命令模式切换到底线命令模式

###指令行的储存、离开等指令

语句 | 作用
--- | --- 
:w | 将编辑的数据写入硬盘档案中(常用)
:w! | 若文件属性为『只读』时，强制写入该档案。不过，到底能不能写入， 还是跟你对该档案的档案权限有关啊！
:q | 离开 vi (常用)
:q! | 若曾修改过档案，又不想储存，使用 ! 为强制离开不储存档案。
:wq | 储存后离开，若为 :wq! 则为强制储存后离开 (常用)
ZZ | 这是大写的 Z 喔！若档案没有更动，则不储存离开，若档案已经被更动过，则储存后离开！