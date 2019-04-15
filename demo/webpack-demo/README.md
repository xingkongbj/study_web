# WebPack 4 最佳实践

## 特点

- 使用 webpack、babel 最新版本。
- 区分 dev 和 prod 模式。
- 实现多文件打包到 dist 目录。
- 使用 postcss 插件 支持类似 sass 的特性，自动匹配浏览器私有前缀。
- 支持 src/assets 目录下的内容拷贝到 dist 目录。
- 分离 css、image、js ，使用相对路径进行引用。
- 使用 babel 插件支持新的 ES 语法特性。
- 通过 performance 配置实现图片输出大小警告，传入图片小于 100K。
- 开启 manifest 缓存，保证文件不改变时，hash 保持一致，每次编译都相同。
- dev 环境：支持接口代理，同时对 headers.referer 进行转换，需要自己配置路径。
- dev 环境：支持自动打开 index.html 文件。
- prod 环境：对 css 和 js 输出文件进行压缩。
- prod 环境：使用 source-map 对 js 进行完整编译，精准定位错误。
- package.json 支持 sideEffects 配置，用于标注是否包含副作用。
- mode 为 production 时，默认开启 tree-shaking 。删除未使用的代码。
- mode 为 production 时，默认开启 Scope Hoisting“作用域提升”。可以让打包出来的代码文件更小、运行更快。

## 性能优化

- 通过 optimize-css-assets-webpack-plugin 对 css 进行压缩。
- 通过 uglifyjs-webpack-plugin 对 js 进行压缩。
- 通过 externals 阻止外部引入的文件被打包。
- 通过 optimization 把 npm 相关包打入 vendor 文件，并且根据参数控制包的大小和拆分个数。
- 通过 webpack-visualizer-plugin 在根目录生成 statistics.html 分析 bundle 构成，减少打包文件的大小。
- 把打包生成的 profile.json 上传到webpack官网 http://webpack.github.io/analyse/ 查看详细 chunk 构成和依赖，减少无关依赖的打包。
- 通过 webpack-bundle-analyzer 生成 bundle 构成图标，通过 http://localhost:8888/index.html 进行访问。
- 在私有包中不进行 babel-loader；在项目打包时，把私有包从 node_modules 的忽略中排除。本示例没有实现该功能。
- 可以通过 happypack 进行多线程打包，加快打包速度。
