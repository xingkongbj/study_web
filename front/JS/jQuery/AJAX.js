$.ajax({
    type: 'get',
    // get 明文，通过url传输, 传输中文会乱码
    // post 加密，通过消息主体

    url: 'http://www.xingkonbj.com/huodong/getCurrentTime.htm',
    // get方式参数可直接写在url里面如?type=1

    data: 'type=1&name=vv',
    // 用&连接，也可使用对象形式，get请求会把data数据整合到url中

    async: false,
    // true 异步传输
    // false 同步传输，会卡死页面等待，js是单线程的

    dataType: 'json',
    // 返回的数据类型
    // json 自动把返回结果转换为对象
    // jsonp 使用跨域请求

    jsonp: 'jsoncallback',
    // jsonp 模式使用 与后台定义的参数，用于识别回调函数名称
    // 并且自动加入时间戳
    // 如，http://www.xingkongbj.com/getUserCookie.jsp?jsoncallback=success_jsonpCallback&_=1429146701350

    jsonpCallback: 'success_jsonpCallback',
    // jsonp 模式使用 定义回调函数名称，jQuery自动识别，并调用success

    success: function (data, textStatus) {
        // data 返回数据，一般为josn对象
        // textStatus 返回状态，正常是 success

        // 如果 data 为字符串，可以通过两种方式转成 JSON 对象
        // JSON 格式注意两点：1. 所有字符串都用双引号引用，不能用单引号；2. 属性名称必须是字符串，意味着都要双引号引用
        // 方法一 eval('(' + data + ')');
        // 方法二 JSON.parse(data);

        // 对象与数组
        // {}即为对象
        // []即为数组
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        // XMLHttpReques 返回 http 状态，如 404,200
        // 通常情况下 textStatus 和 errorThown 只有其中一个有值
    }
});