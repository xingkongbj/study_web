// 比较经典的形式就是中间件
// 方便插入和删除流程，方便进行整体统一的处理，如记录日志，权限控制。
// 流程支持中断

function Handler() {
    this.next = null;
    this.setNext = function(_handler) {
        this.next = _handler;
    };
    this.handleRequest = function(money) {
    }
}

// 采购部
function CGBHandler() {}
CGBHandler.prototype = new Handler();
CGBHandler.prototype.handleRequest = function(money) {
// 处理权限最多10000
    if (money < 10000) {
        console.log("同意");
    } else {
        console.log("金额太大，只能处理一万以内的采购");
        if (this.next) {
            this.next.handleRequest(money);
        }
    }
};

// 总经理
function ZJLHandler() {}
ZJLHandler.prototype = new Handler();
ZJLHandler.prototype.handleRequest = function (money) {
    if (money < 100000) {
        console.log("十万以内的同意");
    } else {
        console.log("金额太大，只能处理十万以内的采购");
        if (this.next) {
            this.next.handleRequest(money);
        }
    }
};

// 董事长
function DSZHandler() {}
DSZHandler.prototype = new Handler();
DSZHandler.prototype.handleRequest = function(money) {
    if (money >= 100000) {
        console.log("十万以上的我来处理");
    }
};

// 客户端使用
function Client() {
    var cgb = new CGBHandler();
    var zjl = new ZJLHandler();
    var dsz = new DSZHandler();
    cgb.setNext(zjl);
    zjl.setNext(dsz);

    cgb.handleRequest(800000);
}

Client();
