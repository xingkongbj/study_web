// 不改变原有功能的基础上，进行封装，增加功能

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
   document.getElementById('tel_demo_text').style.display = 'none';
});
decorator('name_input', function () {
    document.getElementById('name_demo_text').style.display = 'none';
});
decorator('address_input', function () {
    document.getElementById('address_demo_text').style.display = 'none';
});
