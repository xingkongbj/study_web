const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'none', // 设置环境变量，优先级最高 'production' 自动压缩代码 | 'development' | 'none'
    entry: { // 入口文件，可以有多个，对象的 key 为输出的 name
        'index': './src/js/index.jsx',
        'index2': ['./src/js/index2.jsx'] // 一个bundle可以有多个chunk
    },
    output: { // 输出文件
        path: path.resolve(__dirname, 'dist'), // 编译后输出路径
        // filename: 'bundle.js', // 只支持单页面
        filename: 'js/[name].[chunkhash].js', // 支持多页面
        // [name]模块名称
        // [id]模块标识符
        // [hash]compilation 生命周期的 hash
        // [chunkhash]chunk 内容的 hash
        // [query]模块的 query
        // [hash],[chunkhash]支持指定长度[hash:16]
        // 在使用 ExtractTextWebpackPlugin 时，可以用 [contenthash] 来获取提取文件的 hash（既不是 [hash] 也不是 [chunkhash]）。
        publicPath: '', // js的公共路径
    },
    module: { // 模块配置
        rules: [ // 由下至上，由右至左执行
            {
                test: /\.css$/, // 正则匹配文件路径
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', // 解析 @import 和 url() 为 import/require() 方式处理
                        options: {
                            importLoaders: 1 // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                        }
                    },
                    {
                        loader: 'postcss-loader', // 在 css 中类似 babel 的功能
                        options: {
                            plugins: (loader) => [
                                require('precss')(), // 囊括了许多插件来支持类似 Sass 的特性，比如 CSS 变量，套嵌，mixins 等。
                                require('autoprefixer')() // 添加了 vendor 浏览器前缀，它使用 Can I Use 上面的数据，需要在 package.json 中配置 browserslist。
                            ]
                        }
                    }

                ],
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('precss')(),
                                require('autoprefixer')()
                            ]
                        }
                    },
                    'less-loader', // 解析 less 文件，类似的还有 sass-loader 和 postcss-loader
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: /node_modules/,
                loader: 'file-loader', // 把加载任何文件解析成打包文件，支持重命名，类似的还有 url-loader 支持 data URL 但不支持路径
                options: { // 解析时的参数
                    name: 'image/[name].[hash].[ext]', // 可配置信息很多，可以查询api
                    publicPath: '../' // 引用目录，由于从css加载，需要返回上一级
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                exclude: /node_modules/,
                loader: 'file-loader', // 把加载任何文件解析成打包文件，支持重命名
                options: { // 解析时的参数
                    name: 'fonts/[name].[hash].[ext]', // 可配置信息很多，可以查询api
                },
            },
            {
                test: /\.js?x$/,
                exclude: /node_modules/, // 排除目录
                loader: 'babel-loader', // 编译js文件，使之支持es新的语法特性
                options:{
                    presets: ['env', 'react'], // 支持按需加载，自动支持最新 ES 版本，转换 react 语法
                    plugins: ['transform-runtime'] // 保证 babel-polyfill 不会污染全局环境，供编译模块复用工具函数，减少打包体积， babel-runtime 生产环境使用
                }
            }
        ]
    },
    resolve: { // 解析模块请求的选项，不适用于对 loader 解析
        extensions: ['.js', '.json', '.jsx', '.css', '.less', '.sass'], // import 时尝试的扩展名
        alias: { // 模块别名列表，方便直接引入目录
            css: path.resolve(__dirname, 'src/css/'),
            js: path.resolve(__dirname, 'src/js/')
        }
    },
    externals: { // 防止将某些 import 的包被打入，从外部引入
        jquery: 'jQuery'
    },
    optimization: { // 性能配置
        runtimeChunk: true, // 开启 manifest 缓存，每个入口单独创建
        splitChunks: {
            chunks: 'async', // 提取的 chunk 类型，all: 所有，async: 异步，initial: 初始
            // minSize: 30000, // 默认值，新 chunk 产生的最小限制 整数类型（以字节为单位）
            // maxSize: 0, // 默认值，新 chunk 产生的最大限制，0为无限 整数类型（以字节为单位）
            // minChunks: 1, // 默认值，新 chunk 被引用的最少次数
            // maxAsyncRequests: 5, // 默认值，按需加载的 chunk，最大数量
            // maxInitialRequests: 3, // 默认值，初始加载的 chunk，最大数量
            // name: true, // 默认值，控制 chunk 的命名
            cacheGroups: { // 配置缓存组
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10, // 优先级
                    reuseExistingChunk: false, // 允许复用已经存在的代码块
                    test: /node_modules\/(.*)\.js/,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            },
        },
    },
    performance: { // 性能提示，可以提示过大文件
        hints: "warning", // 性能提示开关 false | "error" | "warning"
        maxAssetSize: 100000, // 生成的文件最大限制 整数类型（以字节为单位）
        maxEntrypointSize: 100000, // 引入的文件最大限制 整数类型（以字节为单位）
        assetFilter: function(assetFilename) {
            // 提供资源文件名的断言函数
            return (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetFilename));
        }
    },
    plugins: [ // 插件，按上下顺序执行
        new CopyWebpackPlugin([  // src/assets 下文件直接复制到 dist 目录下
            { from:'src/assets/' }
        ]),
        new MiniCssExtractPlugin({ // 分离 css
            filename: "css/[name].[chunkhash].css"
        }),
        new HtmlWebpackPlugin({ // 动态生成页面
            template: path.resolve(__dirname, './src/default_index.ejs'),
            title: 'index',
            filename:'index.html',
            chunks:['index'], // js 入口文件
            minify: {
                removeComments: true,        // 去注释
                collapseWhitespace: true,    // 压缩空格
                removeEmptyAttributes: true  // 去除空引号属性
            },
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/default_index.ejs'),
            title: 'index2',
            filename:'index2.html',
            chunks:['index2'],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeEmptyAttributes: true
            },
        }),
    ],
};
