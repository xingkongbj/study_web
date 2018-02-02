var single = (function(){
    var unique;
    function getInstance(){
        // 如果该实例存在，则直接返回，否则就对其实例化
        if( unique === undefined ){
            unique = new Construct();
        }
        return unique;
    }
    function Construct(){
        // ... 生成单例的构造函数的代码
    }
    return {
        getInstance : getInstance
    }
})();