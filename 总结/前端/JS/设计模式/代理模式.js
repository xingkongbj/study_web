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
// 调用方法：
var proxyAssis = new proxyAssis(new fillOut("2016-9-11"));
proxyAssis.state("补打卡成功");
// 忘记打卡的日期为：2016-9-11, 补打卡状态：补打卡成功