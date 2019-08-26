const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.common');
const config = require('./config');

const { devServer } = config;
devServer.hot = true; // 模块热加载，不刷新加载
devServer.contentBase = './dist'; // 打包目录

const baseConfigObj = baseConfig(true);
baseConfigObj.plugins.push(new webpack.NamedModulesPlugin()); // 模块热加载，不刷新加载
baseConfigObj.plugins.push(new webpack.HotModuleReplacementPlugin()); // 模块热加载，不刷新加载

module.exports = merge(baseConfigObj, {
    devtool: "cheap-eval-source-map", // 构建和重构速度较快，转换过的代码（仅限行）
    devServer, // 开发服务，代理服务器接口
});
