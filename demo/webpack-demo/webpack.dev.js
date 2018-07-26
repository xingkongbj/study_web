const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.common');
const proxyHost = '8.8.8.8';
const proxyPort = 8888;
const proxy = {
    target: 'http://' + proxyHost + '/',
    changeOrigin: true,
    secure: false,
    bypass: function(req, res) {
        //设置代理的响应头
        if (req.headers && req.headers.referer){
            req.headers.referer = req.headers.referer.replace(/(127\.0\.0\.1|localhost):8888/, proxyHost)
        }
    }
};

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: "cheap-eval-source-map", // 构建和重构速度较快，转换过的代码（仅限行）
    devServer: { // 开发服务，代理服务器接口
        port: proxyPort, // 启动接口
        proxy: { // 启动代理
            //转发至线下服务器
            '/api/*': proxy,
        },
        contentBase: './dist', // 打包目录
        openPage: 'index.html', // 打开页面
    },
});
