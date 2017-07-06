//判断是否有cmd模块加载器
if (typeof define === "function" && define.cmd) {
    // 有 Sea.js 等 CMD 模块加载器存在
}

// 加载一个模块
seajs.use('./a');
// 加载一个模块，在加载完成时，执行回调
seajs.use('./a', function(a) {
    a.doSomething();
});

// 加载多个模块，在加载完成时，执行回调
seajs.use(['jquery', './main'], function($, main) {
    $(document).ready(function() {
        main.init();
    });
});

// seajs 的简单配置
seajs.config({
    // 变量
    vars: {
        'locale': 'zh-cn'
    },
    // 映射,该配置可对模块路径进行映射修改，可用于路径转换、在线调试等
    map: [
        ['http://example.com/js/app/', 'http://localhost/js/app/']
    ],
    // 预加载项,可以在普通模块加载前，提前加载并初始化好指定模块。
    preload: [
        Function.prototype.bind ? '' : 'es5-safe',
        this.JSON ? '' : 'json'
    ],
    // 调试模式
    debug: true,
    // Sea.js 的基础路径
    base: 'http://example.com/path/to/base/',
    // 文件编码
    charset: 'utf-8',
    // 路径
    paths: {
        'arale': 'https://a.alipayobjects.com/arale',
        'jquery': 'https://a.alipayobjects.com/jquery'
    },
    // 别名
    alias: {
        'class': 'arale/class/1.0.0/class',
        'jquery': 'jquery/jquery/1.10.1/jquery'
    }
});

//定义一个对象
define({ "foo": "bar" });
//定义一个字符串
define('I am a template. My name is {{name}}.');

// 所有模块都通过 define 来定义
define(function(require, exports, module) {
    // 在 http://example.com/js/a.js 的 factory 中：
    require.resolve('./b');
    // => http://example.com/js/b.js

    // 在 http://example.com/js/a.js 的 factory 中：
    require.resolve('../c');
    // => http://example.com/c.js

    // 假设 base 路径是：http://example.com/assets/
    // 在模块代码里：
    require.resolve('gallery/jquery/1.9.1/jquery');
    // => http://example.com/assets/gallery/jquery/1.9.1/jquery.js

    // 绝对路径是普通路径：
    require.resolve('http://cdn.com/js/a');
    // => http://cdn.com/js/a.js

    // 根路径是普通路径：
    require.resolve('/js/b');
    // => http://example.com/js/b.js

    // 获取模块 a 的接口
    var a = require('./a');
    // 调用模块 a 的方法
    a.doSomething();

    // 异步加载一个模块，在加载完成时，执行回调
    require.async('./b', function(b) {
        b.doSomething();
    });
    // 异步加载多个模块，在加载完成时，执行回调
    require.async(['./c', './d'], function(c, d) {
        c.doSomething();
        d.doSomething();
    });

    // 对外提供 foo 属性
    exports.foo = 'bar';
    // 对外提供 doSomething 方法
    exports.doSomething = function() {};
    /*exports 仅仅是 module.exports 的一个引用。在 factory 内部给 exports 重新赋值时，并不会改变 module.exports 的值。因此给 exports 赋值是无效的，不能用来更改模块接口。*/
    // 通过 return 直接提供接口，同exports
    return {
        foo: 'bar',
        doSomething: function() {}
    };

    // 对外提供接口
    module.exports = {
        name: 'a',
        doSomething: function() {}
    };
    //模块的唯一标识,define 的第一个参数就是模块标识。一般情况下（没有在 define 中手写 id 参数时），module.id 的值就是 module.uri，两者完全相同。
    module.id;
    //根据模块系统的路径解析规则得到的模块绝对路径。
    module.uri;
    //一个数组，表示当前模块的依赖。
    module.dependencies;
});

//事件
//resolve       -- 将 id 解析成为 uri 时触发
//load          -- 开始加载文件时触发
//fetch         -- 具体获取某个 uri 时触发
//request       -- 发送请求时触发
//define         -- 执行 define 方法时触发
//exec         -- 执行 module.factory 时触发
//config         -- 调用 seajs.config 时触发
//error          -- 加载脚本文件出现 404 或其他错误时触发
// 给 fetch 事件添加一个回调
seajs.on('fetch', function(data) {

});

// 从 fetch 事件的回调中移除掉 fn 函数
seajs.off('fetch', fn);

// 移除掉 fetch 事件的所有回调
seajs.off('fetch');

// 移除掉所有事件的所有回调
seajs.off();

// 触发 fetch 事件
seajs.emit('fetch', { uri: uri, fetchedList: fetchedList });

//可以查看 seajs 所有配置以及一些内部变量的值，可用于插件开发
seajs.data;

//几乎可以获取了 Sea.js 内部的所有核心方法
seajs.Module;

//可以查阅当前模块系统中的所有模块信息。
seajs.cache;

//会利用模块系统的内部机制对传入的字符串参数进行路径解析。
seajs.resolve;