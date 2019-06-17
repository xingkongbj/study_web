// 通过函数的执行，实例化一个对象
// 防止全局污染

function createBook(name, time, type) {
    // 创建一个对象，并对对象拓展属性和方法
    var o = {};
    o.name = name;
    o.time = time;
    o.type = type;
    o.getName = function () {
        console.info(this.name);
    };
    // 返回对象
    return o;
}

// 使用方法
var book1 = createBook('js book', 2014, 'js');
var book2 = createBook('css book', 2013, 'css');

book1.getName();
book2.getName();
