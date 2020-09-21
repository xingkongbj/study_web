"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const config_1 = require("./config");
require("./lib/logger");
const catch_error_1 = require("./middleware/catch-error");
const not_found_1 = require("./middleware/not-found");
const trace_1 = require("./middleware/trace");
const application_1 = require("./lib/application");
const router_1 = require("./router");
const log4js_1 = require("log4js");
console.log(process.env.NODE_ENV);
const logger = log4js_1.getLogger('app');
function error(type, err) {
    logger.error(type);
    if (typeof err === 'object') {
        if (err.stack) {
            logger.error(err.stack);
        }
        else if (err.message) {
            logger.error(`ERROR: ${err.message}`);
        }
    }
    else {
        logger.error('argument is not an object');
    }
}
// 全局未捕获的异常
process.on('uncaughtException', (err) => {
    error('uncaughtException', err);
});
// 捕获未被处理的拒绝
process.on('unhandledRejection', (err) => {
    error('unhandledRejection', err);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = new application_1.default();
    // middleware
    app.use(catch_error_1.default);
    app.use(trace_1.default);
    app.use(koaBody({
        multipart: true,
    }));
    app.use(koaStatic(`${__dirname}/static`));
    // router
    const { router } = app;
    router_1.default(app);
    app.use(router.routes());
    app.use(router.allowedMethods()); // header 增加 Allow
    // 404的处理
    app.use(not_found_1.default);
    // app
    const { port } = config_1.default.server;
    const server = http.createServer(app.callback());
    function onError(err) {
        error('serviceError', err);
        if (err.syscall !== 'listen') {
            throw err;
        }
        const bind = `Port ${port}`;
        // handle specific listen errors with friendly messages
        switch (err.code) {
            case 'EACCES':
                logger.error('startError');
                logger.error(`${bind} requires elevated privileges`);
                process.exit(1);
            case 'EADDRINUSE':
                logger.error('startError');
                logger.error(`${bind} is already in use`);
                process.exit(1);
            default:
                throw err;
        }
    }
    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? `pipe ${addr}`
            : `port ${port}`;
        logger.info(`Service is up and running,listening on ${bind}`);
    }
    server.on('error', onError);
    server.on('listening', onListening);
    server.listen(port);
}))().catch((err) => {
    error('startCatch', err);
    process.exit(-1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDZCQUE2QjtBQUM3QixvQ0FBb0M7QUFDcEMsd0NBQXdDO0FBQ3hDLHFDQUE4QjtBQUM5Qix3QkFBc0I7QUFDdEIsMERBQWtEO0FBQ2xELHNEQUE4QztBQUM5Qyw4Q0FBdUM7QUFDdkMsbURBQTRDO0FBQzVDLHFDQUFrQztBQUNsQyxtQ0FBbUM7QUFRbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWxDLE1BQU0sTUFBTSxHQUFHLGtCQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFaEMsU0FBUyxLQUFLLENBQUMsSUFBWSxFQUFFLEdBQVU7SUFDbkMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQixJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtRQUN6QixJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDWCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQjthQUFNLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDekM7S0FDSjtTQUFNO1FBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0tBQzdDO0FBQ0wsQ0FBQztBQUVELFdBQVc7QUFDWCxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDcEMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsQ0FBQyxDQUFDO0FBQ0gsWUFBWTtBQUNaLE9BQU8sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUs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