const pageList = [
    {
        "src": "./src/js/index.jsx",
        "name": "index",
        "title": "页面一"
    },
    {
        "src": "./src/js/index2.jsx",
        "name": "index2",
        "title": "页面二"
    },
];

const getHost = function (env = 'dev') {
    let url = '';
    switch (env) {
        case 'dev':
            url = 'dev.com';
            break;
        case 'test':
            url = 'test.com';
            break;
        case 'stage':
            url = 'stage.com';
            break;
        case 'online':
            url = 'online.com';
            break;
    }
    return url;
};

const proxyHost = getHost('test');
const proxyPort = 8080;
const proxy = {
    target: `http://${proxyHost}/`, // 目标服务器 host
    changeOrigin: true, // 否需要改变原始主机头为目标URL
    secure: false, // 是否验证SSL证书
    bypass(req) {
        if (req.headers && req.headers.referer) {
            req.headers.referer = req.headers.referer.replace(/(127\.0\.0\.1|localhost):8080/, proxyHost);
        }
    },
};
const devServer = {
    port: proxyPort, // 启动接口
    host: 'localhost',
    proxy: { // 启动代理
        '/api/**': proxy, // 转发至线下服务器
    },
    openPage: 'index.html', // 打开页面
};

module.exports = {
    pageList,
    devServer,
};
