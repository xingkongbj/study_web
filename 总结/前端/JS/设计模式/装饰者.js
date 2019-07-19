// 不改变原有功能的基础上，进行迭代，增加功能
// 不用关心对之前功能的影响。
// 用于扩展信息

var decorator = function (input, fn) {
    var input = document.getElementById(input);
    if (typeof input.onclick === 'function') {
        var oldClickFn = input.onclick;
        input.onclick = function () {
            oldClickFn();
            fn();
        };
    } else {
        input.onclick = fn;
    }
};

// 使用方法
decorator('tel_input', function () {
   document.getElementById('tel_demo_text').style.color = 'red';
});
decorator('tel_input', function () {
    document.getElementById('tel_demo_text').style.display = 'inline-block';
});
