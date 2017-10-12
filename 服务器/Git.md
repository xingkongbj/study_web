# Git

> Git官方教程 https://git-scm.com/book/zh/v2
> 
> 图文教程 http://www.admin10000.com/document/5374.html
> 
> 详细API http://www.yiibai.com/git/

目录

- [介绍](#介绍)
    - [Git 与 SVN 比较](#git-与-svn-比较)
- [操作流程图](#操作流程图)
    - [修改 3 个文件的示例](#修改-3-个文件的示例)
    - [多次提交示例](#多次提交示例)
- [创建SSH Key](#创建ssh-key)
- [配置参数](#配置参数)
- [设置常用别名](#设置常用别名)
- [创建版本库](#创建版本库)
- [一般操作](#一般操作)
- [远程仓库](#远程仓库)
- [标签](#标签)
- [分支](#分支)
- [忽略跟踪文件列表](#忽略跟踪文件列表)
- [查看历史记录](#查看历史记录)

## 介绍

### Git 与 SVN 比较

- SVN是集中式版本控制系统，版本库是集中放在中央服务器的，提交和获取记录都通过服务器。
- Git是分布式版本控制系统，没有中央服务器，每个人的电脑就是一个完整的版本库。
- SVN存储差异
- Git存储快照

## 操作流程图

![](flow-process.jpg)

- 每次提交会产生一个 commit 对象，用于保存提交信息及 tree 信息。
- 产生一个 tree 对象，用于保存目录结构和 blob 对象列表。
- 每个修改文件产生一个 blob 对象，用于保存文件快照。

### 修改 3 个文件的示例

![](commit-and-tree.png)

### 多次提交示例

![](commits-and-parents.png)

## 创建SSH Key

- 进入本地账号的根目录
- 创建 .ssh 目录并进入
- 执行 ssh-keygen  -t rsa –C “youremail@example.com”
- -t 指定密钥类型
- -C 指定注释文字，一般用邮箱
- 生成的 id_rsa.pub 文件为公钥
- 生成的 id_rsa 文件为私钥
- 把 id_rsa.pub 公钥配置到 git 服务器

## 配置参数

```
git config --local  # 设置仓库级参数，该目录有效
git config --global  # 设置全局级参数，该用户有效
git config --system  # 设置系统级参数，所有用户有效
git config user.name "< 用户名称 >"  # 设置用户名称
git config user.email "< 用户邮箱 >"  # 设置用户邮箱
git config branch.autosetuprebase always  # 设置所有的分支都应该用rebase
git config color.ui true  # 设置命令框着色
git config color.status auto  # 设置状态颜色自动
git config color.branch auto  # 设置分支颜色自动
git config core.editor vim  # 设置编辑器
git config merge.tool vimdiff  # 设置冲突比较工具
git config --list  # 显示内容列表
```

## 设置常用别名

```
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

## 创建版本库

```
git init  # 在该目录创建库
git init < 路径 >  # 在该路径下创建库
git init --bare  # 创建裸库，只能存储历史，不能进行修改，在服务器上使用
git clone < 远程路径 > < 本地路径 >  # 克隆服务器库到本地
git clone -o < 库名 > < 远程路径 > < 本地路径 >  # 克隆服务器库到本地，并且修改库名
```

## 一般操作

```
mkdir < 目录名 >  # 创建目录
pwd  # 查看当前目录的路径
cat < 文件 >  # 查看文件内容

git checkout -- < 版本号 > < 文件 >  # 还原文件，只能还原有版本控制文件。可以用于工作区误删文件，恢复使用。
                                   # 只修改工作区，对暂存区无效。如果之前提交过暂存区，那么就恢复到暂存区的版本。工作区记录会丢失。
git add < 文件 >  # 添加文件到暂存区，.为所有文件。
# 使用git reset，如果提交记录没有上传到服务器，会丢失。
git reset HEAD < 文件 >  # 取消暂存文件，不指定文件即清空暂存区，工作区不变。
git reset --hard HEAD^  # 回退到上一个版本，或者使用HEAD~。上上个版本用 HEAD^^
git reset --hard HEAD~100  # 回退到上100个版本
git reset --hard < 版本号 >  # 跳到某个版本
git mv < 原名称 > < 更改后名称 >  # 移动文件位置或重命名
git rm < 文件 >  # 删除本地仓库和工作区文件，不需要add，如果手动删除，需要add
git rm < 文件 > -f  # 如果删除之前，文件提交过暂存区，需要添加此参数
git rm < 文件 > --cached  # 删除暂存区和本地仓库文件，保留工作区文件
git commit -m '< 说明 >'  # 提交暂存区文件到本地仓库，并添加说明
git commit -a  # 提交工作区文件到本地仓库，跳过暂存区，不能提交无版本控制文件
git commit --amend  # 修改上一次提交记录，可以修改提交说明，或者某个文件，文件要加入暂存区。在上次提交记录基础上更新，并非全新提交。
git status -s  # 简短模式：A新添加，??未添加，右M修改后，左M放入暂存区
git diff < 文件 >  # 比较工作区文件与暂存区的差异
git diff < 文件 > --cached  # 比较暂存区文件与本地仓库的差异
git reflog  # 查看带版本号的提交记录，一行简单日志
git stash  # 保存工作区，并且清理工作区
git stash list  # 查看已保存的工作区记录
git stash apply  # 恢复已保存的工作区，不清除该条记录
git stash apply stash@{1}  # 恢复指定已保存的工作区，不清除该条记录
git stash pop  # 恢复已保存的工作区，清除该条记录
git stash pop stash@{1}  # 恢复指定已保存的工作区，清除该条记录
git stash drop  # 删除第一条已保存的工作区记录
git stash drop stash@{1}  # 删除指定已保存的工作区
git stash clear  # 清空已保存的工作区记录
git blame < 文件 >  # 查看每行的最后修改人和时间
git blame -L 12,+10 < 文件 >  # 查看从12行到22行，行修改记录
```

## 远程仓库

```
origin  #默认库名
master  #默认分支名

git remote  #查看远程仓库
git remote -v  #查看远程仓库对应的 URL
git remote show < 库名 >  #查看远程仓库更多信息，包括远程分支与本地分支的对应关系
git remote add < 库名 > < 库对应的 URL >  #添加远程仓库到本地的引用
git remote rename < 旧库名 > < 新库名 >  #重命名远程仓库的本地引用名称
git remote rm < 库名 >  #移除远程仓库本地引用
git fetch < 库名 >  < 分支名 >  #拉取远程仓库信息到你的本地引用，它并不会自动合并或修改你当前的工作。
git fetch --all < 库名 >  #拉取所有远程仓库分支到本地引用
git pull < 库名 > < 分支名 >  #拉取然后合并远程分支到当前分支，如果你有一个分支设置为跟踪一个远程分支
git pull < 远程库名 >:< 本地库名 > < 远程分支名 >:< 本地分支名 >  #拉取远程仓库完整写法
git pull --rebase  #拉取远程仓库信息到你的本地引用，并通过变基的方式，合并到本地分支。
git rebase --abort  #产生冲突时，终止变基操作
git push < 库名 > < 分支名 >  #推送本地仓库的分支到远程仓库的分支
git push < 本地库名 >:< 远程库名 > < 本地分支名 >:< 远程分支名 >  #推送本地仓库完整写法
git push -u < 库名 > < 分支名 >  #推送本地仓库的分支到远程仓库的分支，第一次要用-u，设置默认值
git push --all < 库名 >  #推送所有分支到远程服务器
git push --force  #覆盖远程服务器的提交历史，多人开发禁止使用
```

## 标签

```
git tag  #列出标签
git tag -l 'v1.8.5*'  #过滤显示标签
git tag < 标签名称 >  #创建轻量标签
git tag -a < 标签名称 > -m '< 说明 >'  #创建附注标签，信息完整，包括个人信息
git tag -a < 标签名称 > < 提交标志前7位 >  #根据提交记录，创建附注标签
git show < 标签名称 >  #显示标签信息
git push < 库名 > < 标签名称 >  #提交标签到远程仓库
git push < 库名 > --tags  #提交所有标签到远程仓库
git checkout -b < 分支名 > < 标签名称 > #用标签版本创建新分支并切换。标签并不能像分支一样来回移动，你不能真的检出一个标签，只能用新分支来代替标签。
```

## 分支

```
Fast-forward  #快进模式，直接修改指针

git branch  #列出本地分支
git branch -r  #列出远程分支
git branch -a  #列出本地和远程分支
git branch < 分支名 >  #创建分支
git branch -v  #查看分支最后一次提交记录
git branch -vv  #查看分支最后一次提交记录，信息更多
git branch --merged  #查看已经合并的分支
git branch --no-merged  #查看未合并的分支
git branch -m < 旧分支名 > < 新分支名 >  #分支重命名
git branch -d < 分支名 >  #删除本地分支，删除未合并的会失败
git branch -d  -r < 分支名 >  #删除远程分支的本地引用，不会推送服务器
git push origin :< 分支名 >  #删除远程分支
git push origin --delete < 分支名 >  #删除远程分支
git fetch -p  #删除远端分支已经删除的分支
# 切换分支时，没有版本控制的文件会保留，其他分支也能看到。
# 两个分支文件相同时，提交暂存区后，可以再任意分支去提交。同时工作区的文件也有相同效果。
git checkout < 分支名 >  #切换分支，只能切换远程存在或者本地存在的分支
git checkout -b < 分支名 >  #创建分支并且切换到该分支，本地分支不能重名
git checkout -b < 本地分支名 > < 远程库名 >/< 远程分支名 >  #创建分支并且切换分支，分支以远程分支为基础，本地分支名不能重复
git checkout -t < 本地分支名 > < 远程库名 >/< 远程分支名 >  #本地分支跟踪远程分支，并且本地分支无跟踪远程分支，远程分支无跟踪本地分支
git branch -u < 远程库名 >/< 远程分支名 > < 本地分支名 >  #修改pull跟踪，本地分支名可不写
git branch --set-upstream-to=< 远程库名 >/< 远程分支名 > < 本地分支名 >  #设置现有分支的pull跟踪的另一种语法
git branch --track < 本地分支名 > < 远程库名 >/< 远程分支名 > #新建一个分支，与指定的远程分支建立追踪关系
git branch --unset-upstream < 本地分支名 >  #取消pull跟踪
git branch --set-upstream < 本地分支名 > < 远程库名 >/< 远程分支名 >  #设置现有分支的pull跟踪
#合并时，只是针对两个分支的快照与两个分支的共同祖先快照，做一个简单的三方合并。
git merge < 分支名 >  #合并指定分支到当前分支，先切换到当前分支
git merge –no-ff -m '< 说明 >' < 分支名 > #合并指定分支到当前分支，禁止 Fast-forward 模式，删除被合并的分支后，可以保留该分支的信息
git add < 文件 >  #解决冲突添加标记到暂存区，.为所有文件。
git merge --abort # 有冲突时，撤销合并
#变基合并，提交记录是一条直线，没有并行分支。坏处原来的分支记录模糊不清。只能用于没有提交到远程服务器的本地分支。
git checkout experiment  #先切换到分支
git rebase master  #把主线变基过去
git checkout master  #切换到主线
git merge experiment  #进行快速合并

git rebase --continue  #解决变基冲突后，继续变基合并
git rebase --onto master server client  #取出 client 分支，找出处于 client 分支和 server 分支的共同祖先之后的修改，然后把它们在 master 分支上重放一遍。client 分支和 server 分支对于 master 分支的共同修改不会合并。
git rebase master server  #直接变基，不用切换到 server 分支

冲突文件格式
<<<<<<< HEAD:文件名
当前分支内容
=======
想要同步其他分支操作的内容
>>>>>>> 分支名:文件名
```

## 忽略跟踪文件列表

```
# 文件位置
< 本地仓库路径 >/.gitignore
    
# 忽略以 a 为后缀的文件
*.a     
    
# 即使忽略以 a 为后缀的文件，但是不能忽略 lib.a
!lib.a

# 只忽略当前目录下的 TODO 目录，但不忽略 subdir/TODO 目录
/TODO
    
# 忽略 build 目录下的所有内容，不加 / 易可
build/
    
# 忽略 doc/notes.txt 文件，但不忽略 doc/server/arch.txt 文件
doc/*.txt
    
# 忽略 doc 目录下的所有以 pdf 为后缀的文件，包括 doc/directory 目录下的文件
doc/**/*.pdf
```

- *.[oa] 忽略所有以 .o 或 .a 结尾的文件
- *~ 忽略所有以波浪符（~）结尾的文件
- 所有空行或者以 ＃ 开头的行都会被 Git 忽略
- 可以使用标准的 glob 模式匹配
- 匹配模式可以以（/）开头防止递归
- 匹配模式可以以（/）结尾指定目录
- 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反

## 查看历史记录

    git log

- -(n) 仅显示最近的 n 条提交
- --after 仅显示指定时间之后的提交
- --before 仅显示指定时间之前的提交
- --author 仅显示指定作者相关的提交
- --committer 仅显示指定提交者相关的提交
- --grep 仅显示含指定关键字的提交
- -S 仅显示添加或移除了某个关键字的提交
- -p 按补丁格式显示每个更新之间的差异
- --decorate 查看各个分支当前所指的对象
- --all 查看所有分支历史纪录
- --oneline 将每次提交记录汇总成一行
- --stat 显示每次更新的文件修改统计信息
- --shortstat 只显示 --stat 中最后的行数修改添加移除统计
- --name-only 仅在提交信息后显示已修改的文件清单
- --name-status 显示新增、修改、删除的文件清单
- --abbrev-commit 仅显示 SHA-1 的前几个字符，而非所有的 40 个字符
- --relative-date 使用较短的相对时间显示（比如，“2 weeks ago”）
- --graph 显示 ASCII 图形表示的分支合并历史
- --pretty= 使用其他格式显示历史提交信息。可用的选项包括 oneline，short，full，fuller 和 format:"%h"（后跟指定格式）
    - %H 提交对象（commit）的完整哈希字串
    - %h 提交对象的简短哈希字串
    - %T 树对象（tree）的完整哈希字串
    - %t 树对象的简短哈希字串
    - %P 父对象（parent）的完整哈希字串
    - %p 父对象的简短哈希字串
    - %an 作者（author）的名字
    - %ae 作者的电子邮件地址
    - %ad 作者修订日期（可以用 --date= 选项定制格式）
    - %ar 作者修订日期，按多久以前的方式显示
    - %cn 提交者(committer)的名字
    - %ce 提交者的电子邮件地址
    - %cd 提交日期
    - %cr 提交日期，按多久以前的方式显示
    - %s 提交说明
