# gulp--简易打包

> https://www.gulpjs.com.cn/

## 安装

```
// npm
npm install --save-dev gulp
```

## 命令行

```
# 默认执行default任务
gulp

# 执行多任务
gulp task1 task2
```

- -v 或 --version 会显示全局和项目本地所安装的 gulp 版本号
- --require < module path > 将会在执行之前 reqiure 一个模块。这对于一些语言编译器或者需要其他应用的情况来说来说很有用。你可以使用多个--require
- --gulpfile < gulpfile path > 手动指定一个 gulpfile 的路径，这在你有很多个 gulpfile 的时候很有用。这也会将 CWD 设置到该 gulpfile 所在目录
- --cwd < dir path > 手动指定 CWD。定义 gulpfile 查找的位置，此外，所有的相应的依赖（require）会从这里开始计算相对路径
- -T 或 --tasks 会显示所指定 gulpfile 的 task 依赖树
- --tasks-simple 会以纯文本的方式显示所载入的 gulpfile 中的 task 列表
- --color 强制 gulp 和 gulp 插件显示颜色，即便没有颜色支持
- --no-color 强制不显示颜色，即便检测到有颜色支持
- --silent 禁止所有的 gulp 日志

## 配置

在项目根目录下创建一个名为 gulpfile.js 的文件

```
var gulp = require('gulp');
// 引入文件，打包后输出
gulp.task('scss2css', function () {
  gulp.src('src/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist'));
});
// 创建默认任务，并且执行scss2css任务，然后文件改变，再次执行scss2css任务
gulp.task('default',['scss2css'], function () {
  gulp.watch('src/**/*.scss', ['scss2css']);
});
```

