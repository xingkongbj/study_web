# 安装环境

## 安装 node

下载对应版本并安装 [node](https://nodejs.org/en/download/) 。

## 安装 Git

- Windows：下载并安装 [git](https://git-scm.com/download/win)。
- Mac：`brew install git`
- Linux (Ubuntu, Debian)：`sudo apt-get install git-core`
- Linux (Fedora, Red Hat, CentOS)：`sudo yum install git-core`

## 安装 Hexo

`npm install -g hexo-cli`

# 创建网站

请执行下列命令，Hexo 将会在指定文件夹中新建所需要的文件。

```
hexo init <文件夹名称> # 文件夹名称为网站的根目录名称。执行此命令，需要在一个新创建文件夹下。
cd <文件夹名称> # 进入初始化的文件夹
npm install # 安装环境需要的相关程序
```

创建后，目录如下

```
.
├── _config.yml  网站的配置文件
├── package.json npm包配置文件
├── scaffolds    模板文件夹
├── source       资源文件夹
|   ├── _drafts
|   └── _posts   博客文章
└── themes       主题文件夹
```

# 网站配置说明

## 网站

```
title: Hexo # 网站标题
subtitle:  # 网站副标题
description:  # 网站描述
keywords:  # 网站关键词
author: John Doe  # 网站作者
language:  # 网站使用的语言
timezone:  # 网站时区
```

## 网址

```
url: http://yoursite.com # 网址
root: / # 网站根目录
permalink: :year/:month/:day/:title/ # 文章的永久链接格式
permalink_defaults:  # 永久链接中各部分的默认值
```

## 目录

```
source_dir: source # 资源文件夹，这个文件夹用来存放内容。
public_dir: public # 公共文件夹，这个文件夹用于存放生成的站点文件。
tag_dir: tags # 标签文件夹
archive_dir: archives # 归档文件夹
category_dir: categories # 分类文件夹
code_dir: downloads/code # Include code 文件夹
i18n_dir: :lang # 国际化（i18n）文件夹
skip_render:  # 跳过指定文件的渲染，您可使用 glob 表达式来匹配路径。
```

## 文章

```
new_post_name: :title.md # 新文章的文件名称
default_layout: post # 预设模板
titlecase: false # 把标题转换为标题大写
external_link: true # 在新标签中打开链接
filename_case: 0 # 把文件名称转换为 (1) 小写或 (2) 大写
render_drafts: false # 显示草稿
post_asset_folder: false # 启动 Asset 文件夹
relative_link: false # 把链接改为与根目录的相对位址
future: true # 显示未来的文章
highlight: # 代码块的设置
  enable: true # 开启高亮
  line_number: true # 行号
  auto_detect: false # 自动检测
  tab_replace:  # tab 替换
```

## 首页

```
index_generator:
  path: '' # 首页路径
  per_page: 10 # 单页显示个数
  order_by: -date # 排序
```

## 分类 & 标签

```
default_category: uncategorized # 默认分类
category_map:  # 分类别名
tag_map:  # 标签别名
```

## 日期 / 时间格式

```
date_format: YYYY-MM-DD # 日期格式
time_format: HH:mm:ss # 时间格式
```

## 分页

```
per_page: 10 # 每页显示的文章量 (0 = 关闭分页功能)
pagination_dir: page # 分页目录
```

## 主题

```
theme: landscape
```

## 部署

```
deploy: 
  type: git
  repo: git@github.com:xingkongbj/github.io.git
  branch: master
```

# Hexo 命令

## 新建文章

```
hexo new [模板] <标题>
```

## 生成网站页面

```
hexo g # hexo generate 简写
# -d, --deploy 	文件生成后立即部署网站
# -w, --watch 	监视文件变动
```

## 发表草稿

```
hexo publish [模板] <标题>
```

## 本地查看 http://localhost:4000/

```
hexo s # hexo server 简写
# -p, --port 	重设端口
# -s, --static 	只使用静态文件
# -l, --log 	启动日记记录，使用覆盖记录格式
```

## 发布

```
hexo d # hexo deploy 简写
# -g, --generate 	部署之前预先生成静态文件
```

## 渲染文件

```
hexo render <file1> [file2] ...
# -o, --output 	设置输出路径
```

## 清除缓存

```
hexo clean
```

## 启动模式

```
hexo --safe # 安全模式，不会载入插件和脚本
hexo --debug # 调试模式，输出调试信息并写入 debug.log
hexo --silent # 简洁模式，隐藏终端信息
hexo --config custom.yml # 更改自定义配置文件的路径，持续生效
hexo --draft # 显示 source/_drafts 文件夹中的草稿文章
hexo --cwd /path/to/cwd # 自定义当前工作目录的路径
```

# 部署

安装 hexo-deployer-git

```
npm install hexo-deployer-git --save
```

```
# 网站配置文件 _config.yml
deploy:
  type: git # 方式
  repo: git@github.com:xingkongbj/xingkongbj.github.io.git # git 路径
  branch: master # 分支
``` 
 
# 网站基本配置

```
# 网站配置文件 _config.yml
title: xingkongbj-寒松 # 网站标题
subtitle: To live is to change the world # 网站副标题，可以写一个名言
description: 寒松的主页 # 网站描述
keywords: web vue react webpack js es6 css html # 网站关键词
author: 寒松 # 您的名字
timezone: Asia/Shanghai # 网站时区

url: https://xingkongbj.github.io/ # 网址
permalink: /blog/:year/:month/:day/:title.html # 文章的永久链接格式

highlight: # 代码块的设置
  auto_detect: true # 自动检测
```

# 安装 Next 主题

```
cd your-hexo-site # 进入 Hexo 刚创建的主目录
git clone https://github.com/theme-next/hexo-theme-next themes/next
```

## 网站配置

```
# 网站配置文件 _config.yml
# 主题设置
theme: next

# 语言设置
language: zh-CN
```

## 主题配置

```
# 主题配置文件 themes/next/_config.yml

# 网站图标
favicon:
  small: favicon.ico
  medium: favicon.ico
  apple_touch_icon: favicon.ico
  #safari_pinned_tab: /images/logo.svg
  #android_manifest: /images/manifest.json
  #ms_browserconfig: /images/browserconfig.xml
  
# 页脚
footer:
  icon:
      name: heart
      animated: true
      color: "#ff0000"
  copyright: xingkongbj - 寒松
  powered:
    enable: true
    version: false
  theme:
    enable: true
    version: false

# seo
canonical: true
seo: true
index_with_subtitle: true

# 主菜单
menu:
  home: / || home
  sitemap: /sitemap.xml || sitemap
  categories: /categories/ || th
  archives: /archives/ || archive
  tags: /tags/ || tags
  about: /about/ || user
  #schedule: /schedule/ || calendar
  #commonweal: /404/ || heartbeat

# 主题样式
#scheme: Muse
scheme: Mist
#scheme: Pisces

# 联系方式
social:
  GitHub: https://github.com/xingkongbj || github
  E-Mail: mailto:xingkongbj@qq.com || envelope
social_icons:
  transition: true
  
# 首页文章简介
auto_excerpt:
  enable: true
  length: 150

# 侧边栏头像
avatar:
  url: images/common/favicon.ico # 头像图片
  rounded: ture # 是否圆形
  opacity: 1 # 透明度
  rotated: ture # 是否悬浮旋转

# 高亮代码
highlight_theme: night

# 字体
font:
  enable: true
  global:
    external: true
    family: Monda
    size:
  headings:
    external: true
    family: Roboto Slab
    size:
  posts:
    external: true
    family:
  logo:
    external: true
    family: Lobster Two
    size: 24
  codes:
    external: true
    family: PT Mono
    size:
    
# 数学公式
math:
  enable: true
  
# 友情链接
#links_layout: block
links_layout: inline
links:
  Github: https://xingkongbj.github.io/
```

## 开启RSS

```
npm install hexo-generator-feed --save
```

## 自带库

需要进入 Next 主题中的 github 地址克隆到 source，并且根据其中的说明进行配置。

- fancybox--支持全浏览器查看图片 
- pace--页面加载进度
- canvas_nest--背景网状动画



