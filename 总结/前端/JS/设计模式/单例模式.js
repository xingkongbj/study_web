// 用于节省内存，只生成一个实例

// 惰性载入单例
var LazySingle = (function(){
    // 单例实例引用
    var _instance = null;
    // 单例
    function Single(){
        /*这里定义私有属性和方法*/
        return {
            publicMethod: function () { },
            publicProperty: '1.0',
        };
    }
    // 获取单例对象接口
    return function (){
        // 如果为创建单例将创建单例
        if(!_instance) {
            _instance = Single();
        }
        // 返回单例
        return _instance;
    }
})();

// 使用方法
LazySingle().publicMethod();