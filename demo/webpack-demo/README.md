# WebPack 4 最佳实践

## 特点

- 使用 webpack 最新版本。
- 区分 dev 和 prod 模式。
- 实现多文件打包到 dist 目录。
- 使用 postcss 插件 支持类似 sass 的特性，支持 vendor 浏览器前缀。
- 支持 src/assets 目录下的内容拷贝到 dist 目录。
- 分离 css、image、js ，使用相对路径进行引用。
- 使用 babel 插件支持新的 ES 语法特性。
- 通过 performance 配置实现图片输出大小警告，传入图片小于 100K。
- 开启 manifest 缓存，保证文件不改变时，hash 保持一致，每次编译都相同。
- dev 环境：支持接口代理，同时对 headers.referer 进行转换，需要自己配置路径。
- dev 环境：支持自动打开 index.html 文件。
- prod 环境：对 css 和 js 输出文件进行压缩。
- prod 环境：使用 source-map 对 js 进行完整编译，精准定位错误。

## 性能优化


