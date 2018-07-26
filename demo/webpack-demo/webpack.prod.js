const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseConfig = require('./webpack.common');

module.exports = merge(baseConfig, {
    mode: 'production',
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin(), // css 压缩配置
            new UglifyJsPlugin({ // js 文件压缩
                cache: true, // 启用文件缓存
                parallel: true, // 使用多进程并行运行和文件缓存来提高构建速度
                sourceMap: true, // 开启 sourceMap
            })
        ]
    },
    devtool: "source-map", // 牺牲了构建速度的 `source-map' 是最详细的。
});
