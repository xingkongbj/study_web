# webpack.config.js

    const config = {
        // 入口 js
        entry: {
            // 名称： 入口 js 路径
            app: './src/app.js',
            vendors: './src/vendors.js'
        },

        // 输出文件
        output: {
            // 输出名称
            // [name] 为 entry 的属性名
            // [hash] 为 编译时的 hash
            // [id] 为 chunk 的 id
            // [chunkhash] 为每个 chunk 的 hash
            filename: '[name].js',

            // 输出目录的绝对路径
            // __dirname 为 nodejs 中当前目录的位置
            path: __dirname + '/dist',

            // 引入资源的位置
            publicPath: "http://cdn.example.com/assets/[hash]/"
        },

        // loader 用于对模块的源代码进行转换
        module: {
            // 规则列表
            rules: [
                { test: /\.ts$/, use: 'ts-loader' },
                {
                    // 匹配文件后缀
                    test: /\.css$/,
                    // 使用的 loader
                    // 根据先后顺序转换，并把转换后的结果传递给下一个 loader
                    use: [
                          { loader: 'style-loader' },
                          {
                            // loader 名称
                            loader: 'css-loader',
                            // loader 选项
                            options: {
                              modules: true
                            }
                          }
                    ]
                }
            ]
        },

        // 插件 用于解决 loader 无法实现的功能
        // 要通过 new 实例化对象，可以传入参数
        plugins: [
            new webpack.optimize.UglifyJsPlugin(),
            new HtmlWebpackPlugin({ template: './src/index.html' })
        ]
    };
    
    // 设置 output 的 publicPath
    __webpack_public_path__ = process.env.ASSET_PATH;