// 为其他对象提供一种代理以控制对这个对象的访问
// 通过代理函数的实现，完成被代理函数的调用，防止外部对内部进行修改。并且可以实现多个实例。
// Object.create()函数也可以实现代理的效果，但是内部可以被修改。

// 补打卡事件
var fillOut = function (lateDate) {
    this.lateDate = lateDate;
};
// 这是bigBoss
var bigBoss = function (fillOut) {
    this.state = function (isSuccess) {
        console.log("忘记打卡的日期为：" + fillOut.lateDate + ", 补打卡状态：" + isSuccess);
    }
};
// 助理代理大boss 完成补打卡审批
var proxyAssis = function (fillOut) {
    this.state = function (isSuccess) {
        (new bigBoss(fillOut)).state(isSuccess); // 替bigBoss审批
    }
};

// 使用方法
var proxyAssis = new proxyAssis(new fillOut("2016-9-11"));
proxyAssis.state("补打卡成功");
// 忘记打卡的日期为：2016-9-11, 补打卡状态：补打卡成功
