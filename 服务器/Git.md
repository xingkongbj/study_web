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

## 创建版本库

    git init

## 添加内容到下一次提交中

    git add *.c

## 克隆服务器版本，并且本地重命名

    git clone https://github.com/libgit2/libgit2 mylibgit

## 查看文件状态

    git status

- --short 简短模式：A新添加，??未添加，右M修改后，左M放入暂存区

## 提交到仓库

    git commit

- -m 'initial project version' 添加提交说明
- -a 强制提交，跳过暂存区，直接把仓库中存在版本的工作区文件提交
- --amend 提交并复写上一次的提交说明

## 项目根目录创建忽略列表文件

    mylibgit/.gitignore

- *.[oa] 忽略所有以 .o 或 .a 结尾的文件
- *~ 忽略所有以波浪符（~）结尾的文件
- 所有空行或者以 ＃ 开头的行都会被 Git 忽略
- 可以使用标准的 glob 模式匹配
- 匹配模式可以以（/）开头防止递归
- 匹配模式可以以（/）结尾指定目录
- 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反

## 比较当前文件与暂存区的差异

    git diff

- --cached, --staged 比较暂存区与仓库的差异

## 移除文件，不需要add，如果手动删除，需要add

    git rm a.txt

- -f 如果删除之前，文件提交过暂存区，需要强制删除
- --cached 删除暂存区和仓库文件，保留工作区文件

## 移动文件位置或重名

    git mv file_from file_to

## 查看历史记录

    git log

- -(n) 仅显示最近的 n 条提交
- --since, --after 仅显示指定时间之后的提交
- --until, --before 仅显示指定时间之前的提交
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