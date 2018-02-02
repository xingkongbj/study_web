var Interview = function(){};
// 笔试
Interview.prototype.writtenTest = function(){
    console.log("这里是前端笔试题");
};
// 技术面试
Interview.prototype.technicalInterview = function(){
    console.log("这里是技术面试");
};
// 领导面试
Interview.prototype.leader = function(){
    console.log("领导面试");
};
// 领导面试
Interview.prototype.HR = function(){
    console.log("HR面试");
};
// 等通知
Interview.prototype.waitNotice = function(){
    console.log("等通知啊，不知道过了没有哦");
};
// 代码初始化
Interview.prototype.init = function(){
    this.writtenTest();
    this.technicalInterview();
    this.leader();
    this.HR();
    this.waitNotice();
    console.info(this);
};
// 阿里巴巴的笔试和技术面不同，重写父类方法，其他继承父类方法。
var AliInterview = function(){};
AliInterview.prototype = new Interview();
// 子类重写方法 实现自己的业务逻辑
AliInterview.prototype.writtenTest = function(){
    console.log("阿里的技术题就是难啊");
};
AliInterview.prototype.technicalInterview = function(){
    console.log("阿里的技术面就是叼啊");
};
var AliInterview = new AliInterview();
AliInterview.init();
// 阿里的技术题就是难啊
// 阿里的技术面就是叼啊
// 领导面试
// HR面试
// 等通知啊，不知道过了没有哦