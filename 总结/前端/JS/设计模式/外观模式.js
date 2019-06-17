// 对外提供统一的接口，内部进行兼容处理

function addEvent(dom, type, fn){
    if (dom.addEventListener) {
        dom.addEventListener(type, fn, false);
    } else if (dom.attachEvent) {
        dom.attachEvent('on' + type, fn);
    } else {
        dom['on' + type] = fn;
    }
}
// 使用方法
var myInput = document.getElementById('myinput');
addEvent(myInput, 'click', function () {
   console.log('绑定第一个事件');
});
