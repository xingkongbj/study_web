# GIT

> git官方教程 https://git-scm.com/book/zh/v2

## 配置参数

    git config

- --local 设置仓库级参数
- --global 设置全局级参数
- --system 设置系统级参数
- user.name "xingkongbj" 设置用户名称
- user.email "xingkongbeijing@sina.com" 设置用户邮箱
- branch.autosetuprebase always 设置所有的分支都应该用rebase
- color.ui true 设置命令框着色
- color.status auto 设置状态颜色自动
- color.branch auto 设置分支颜色自动
- core.editor vim 设置编辑器
- merge.tool vimdiff 设置冲突比较工具
- --list 显示内容列表
- --help 显示帮助网页

## 设置常用别名

    git config --global alias.co checkout
    git config --global alias.br branch
    git config --global alias.ci commit
    git config --global alias.st status
    git config --global alias.unstage 'reset HEAD --'
    git config --global alias.last 'log -1 HEAD'
    git config --global alias.visual '!gitk'

## 创建版本库

    git init  #在该目录创建库
    git init < 路径 >  #在该路径下创建库
    git init --bare  #创建裸库，只能存储历史，不能进行修改，在服务器上使用
    git clone < 远程路径 > < 本地路径 >  #克隆服务器库到本地

## 一般操作

    git add < 文件 >  #添加文件到暂存区，.为所有文件。
    git mv < 原名称 > < 更改后名称 >  #移动文件位置或重命名
    git rm < 文件 >  #删除本地仓库和工作区文件，不需要add，如果手动删除，需要add
    git rm < 文件 > -f  #如果删除之前，文件提交过暂存区，需要添加此参数
    git rm < 文件 > --cached 删除暂存区和本地仓库文件，保留工作区文件
    git commit -m '< 说明 >'  #提交暂存区文件到本地仓库，并添加说明
    git commit -a  #提交工作区文件到本地仓库，跳过暂存区，不能提交无版本控制文件
    git commit --amend  #修改上一次提交记录，可以修改提交说明，或者某个文件，文件要加入暂存区。在上次提交记录基础上更新，并非全新提交。
    git status -s  #简短模式：A新添加，??未添加，右M修改后，左M放入暂存区
    git diff < 文件 >  #比较工作区文件与暂存区的差异
    git diff < 文件 > --cached  #比较暂存区文件与本地仓库的差异









## 项目根目录创建忽略列表文件

    mylibgit/.gitignore

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

## 取消暂存文件
 
    git reset HEAD a.md

## 还原文件

    git checkout

- -- [file] 从仓库还原
- version2 切换分支
- -b version2 创建分支并且切换到该分支
- -b version2 v2.0.0 在特定的标签上创建一个新分支

## 查看远程仓库

    git remote
    
- -v 查看其对应的 URL
- add pb https://github.com/paulboone/ticgit 添加远程仓库
- show origin 查看分支更多信息
- rename pb paul 重命名远程仓库
- rm paul 移除远程仓库

## 拉取远程仓库

    git fetch origin
    
- 这个命令会访问远程仓库，从中拉取所有你还没有的数据。 执行完成后，你将会拥有那个远程仓库中所有分支的引用，可以随时合并或查看。
- 会将数据拉取到你的本地仓库 - 它并不会自动合并或修改你当前的工作。
- git pull origin master 如果你有一个分支设置为跟踪一个远程分支，自动的抓取然后合并远程分支到当前分支。

## 推送到远程仓库

    git push origin master
    
- v1.5 推送特定标签
- --tags 推送所有标签
- :test 把本地master分支推送到远端的test分支
    
## 列出标签

    git tag
    
- -l 'v1.8.5*' 过滤列出标签
- -a v1.4 -m 'my version 1.4' 创建附注标签
- v1.4 创建轻量标签
- -a v1.2 9fceb02 给特定版本打附注标签

## 查看标签信息

    git show v1.4
    
    
## 查看分支

    git branch
    
- -v 查看分支最后一次提交记录
- --merged 查看已经合并的分支
- --no-merged 查看未合并的分支
- testing 创建分支
- -d hotfix 删除分支，删除未合并的会失败。
    
## 在当前分支合并另一个分支

    git merge hotfix