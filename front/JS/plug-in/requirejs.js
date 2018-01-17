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