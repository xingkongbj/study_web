// 解决对象间的依赖，通过通知的形式，进行传递

var pubsub = {};  // 定义发布者
(function (q) {
    var list = [], //回调函数存放的数组，也就是记录有多少人订阅了我们东西
        subUid = -1;
    // 发布消息,遍历订阅者
    q.publish = function (type, content) {
        // type 为文章类型，content为文章内容
        // 如果没有人订阅，直接返回
        if (!list[type]) {
            return false;
        }
        setTimeout(function () {
            var subscribers = list[type],
                len = subscribers ? subscribers.length : 0;

            while (len--) {
                // 将内容注入到订阅者那里
                subscribers[len].func(type, content);
            }
        }, 0);
        return true;
    };
    //订阅方法，由订阅者来执行
    q.subscribe = function (type, func) {
        // 如果之前没有订阅过
        if (!list[type]) {
            list[type] = [];
        }
        // token相当于订阅者的id，这样的话如果退订，我们就可以针对它来知道是谁退订了。
        var token = (++subUid).toString();
        // 每订阅一个，就把它存入到我们的数组中去
        list[type].push({
            token: token,
            func: func
        });
        return token;
    };
    //退订方法
    q.unsubscribe = function (token) {
        for (var m in list) {
            if (list[m]) {
                for (var i = 0, j = list[m].length; i < j; i++) {
                    if (list[m][i].token === token) {
                        list[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return false;
    };
})(pubsub);

// 使用方法
//将订阅赋值给一个变量，以便退订
var girlA = pubsub.subscribe('js类的文章', function (type, content) {
    console.log('girlA订阅的'+type + ": 内容内容为：" + content);
});
var girlB = pubsub.subscribe('js类的文章', function (type, content) {
    console.log('girlB订阅的'+type + ": 内容内容为：" + content);
});
var girlC = pubsub.subscribe('js类的文章', function (type, content) {
    console.log('girlC订阅的'+type + ": 内容内容为：" + content);
});

//发布通知
pubsub.publish('js类的文章', '关于js的内容');
// 输出：
// girlC订阅的js类的文章: 内容内容为：关于js的内容
// girlB订阅的js类的文章: 内容内容为：关于js的内容
// girlA订阅的js类的文章: 内容内容为：关于js的内容

// girlA退订了关于js类的文章
setTimeout(function () {
    pubsub.unsubscribe(girlA);
}, 0);

//再发布一次，验证一下是否还能够输出信息
pubsub.publish('js类的文章', "关于js的第二篇文章");
// 输出：
// girlB订阅的js类的文章: 内容内容为：关于js的第二篇文章
// girlC订阅的js类的文章: 内容内容为：关于js的第二篇文章
