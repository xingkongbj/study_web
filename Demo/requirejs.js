//主函数引入
<script data-main="scripts/main.js" src="scripts/require.js"></script>

// 加载一个模块
define(['./a']);
// 加载一个模块，在加载完成时，执行回调
define(['./a'], function(a) {
    a.doSomething();
});

// 加载多个模块，在加载完成时，执行回调
define(["./cart", "./inventory"], function(cart, inventory) {
    // 通过 return 直接提供接口
    return {
        color: "blue",
        size: "large",
        addToCart: function() {
            inventory.decrement(this);
            cart.add(this);
        }
    }
});

// requirejs 的简单配置
require.config({
    // require.js 的基础路径
    baseUrl: 'http://example.com/path/to/base/',

    // 路径
    paths: {
        'arale': 'https://a.alipayobjects.com/arale',
        'jquery': 'https://a.alipayobjects.com/jquery'
    },

    //声明依赖关系
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'foo': {
            deps: ['bar'],
            exports: 'Foo',
            init: function (bar) {
            }
        }
    },

    // 映射,该配置可对模块路径进行映射修改，可用于路径转换、在线调试等
    map: {
        'some/newmodule': {
            'foo': 'foo1.2'
        },
        'some/oldmodule': {
            'foo': 'foo1.0'
        }
    },

    //模块中共享配置
    //define(['module'], function (module) {
    //    Will be the value 'blue'
    //    var color = module.config().color;
    //});
    config: {
        'bar': {
            size: 'large'
        },
        'baz': {
            color: 'blue'
        }
    },

    //从CommonJS包(package)中加载模块。参见从包中加载模块。
    packages : {},

    //在放弃加载一个脚本之前等待的秒数。设为0禁用等待超时。默认为7秒。
    nodeIdCompat: 7,

    //命名一个加载上下文。这允许require.js在同一页面上加载模块的多个版本，如果每个顶层require调用都指定了一个唯一的上下文字符串。想要正确地使用，请参考多版本支持一节。
    waitSeconds: ture,

    //指定要加载的一个依赖数组。当将require设置为一个config object在加载require.js之前使用时很有用。一旦require.js被定义，这些依赖就已加载。使用deps就像调用require([])，但它在loader处理配置完毕之后就立即生效。它并不阻塞其他的require()调用，它仅是指定某些模块作为config块的一部分而异步加载的手段而已。
    context: [],

    //指定要加载的一个依赖数组。当将require设置为一个config object在加载require.js之前使用时很有用。一旦require.js被定义，这些依赖就已加载。使用deps就像调用require([])，但它在loader处理配置完毕之后就立即生效。它并不阻塞其他的require()调用，它仅是指定某些模块作为config块的一部分而异步加载的手段而已。
    deps: ['underscore', 'jquery'],

    //在deps加载完毕后执行的函数。当将require设置为一个config object在加载require.js之前使用时很有用，其作为配置的deps数组加载完毕后为require指定的函数。
    callback: function(){},

    //如果设置为true，则当一个脚本不是通过define()定义且不具备可供检查的shim导出字串值时，就会抛出错误。参考在IE中捕获加载错误一节。
    enforceDefine: true,

    //如果设置为true，则使用document.createElementNS()去创建script元素。
    xhtml: true,

    //RequireJS获取资源时附加在URL后面的额外的query参数。作为浏览器或服务器未正确配置时的“cache bust”手段很有用。
    urlArgs: "bust=" +  (new Date()).getTime(),

    //指定RequireJS将script标签插入document时所用的type=""值。默认为“text/javascript”。想要启用Firefox的JavaScript 1.8特性，可使用值“text/javascript;version=1.8”。
    scriptType : 'text/javascript'
});

//定义一个对象
define({ "foo": "bar" });
//定义一个字符串
define('I am a template. My name is {{name}}.');

// 所有模块都通过 define 来定义
define(function(require, exports, module) {
    //生成url地址
    var cssUrl = require.toUrl("./style.css");

    // 获取模块 a 的接口
    var a = require('./a');
    // 调用模块 a 的方法
    a.doSomething();

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
});

//卸载一个模块
requirejs.undef();













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