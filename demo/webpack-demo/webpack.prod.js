const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseConfig = require('./webpack.common');

module.exports = merge(baseConfig(false), {
    optimization: {
        removeAvailableModules: true, // 如果 子模块 和 父模块 都加载了同一个 A模块 的时候，开启这个选项将会告诉 webpack 跳过在 子模块 中对 A模块 的检索，这可以加快打包速度。
        minimizer: [
            new OptimizeCSSAssetsPlugin(), // css 压缩配置
            new TerserPlugin({ // js 文件压缩
                cache: true, // 启用文件缓存
                parallel: true, // 使用多进程并行运行和文件缓存来提高构建速度
                sourceMap: true, // 开启 sourceMap
            })
        ]
    },
    devtool: "source-map", // 牺牲了构建速度的 `source-map' 是最详细的。
});
