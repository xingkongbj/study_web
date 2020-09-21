import * as http from 'http';
import * as koaBody from 'koa-body';
import * as koaStatic from 'koa-static';
import config from './config';
import './lib/logger';
import catchError from './middleware/catch-error';
import notFound from './middleware/not-found';
import trace from './middleware/trace';
import Application from './lib/application';
import initRouter from './router';
import { getLogger } from "log4js";

interface netError extends Error {
    syscall: string;
    message: string;
    code: string;
}

console.log(process.env.NODE_ENV);

const logger = getLogger('app');

function error(type: string, err: Error) {
    logger.error(type);
    if (typeof err === 'object') {
        if (err.stack) {
            logger.error(err.stack);
        } else if (err.message) {
            logger.error(`ERROR: ${err.message}`);
        }
    } else {
        logger.error('argument is not an object');
    }
}

// 全局未捕获的异常
process.on('uncaughtException', (err) => {
    error('uncaughtException', err);
});
// 捕获未被处理的拒绝
process.on('unhandledRejection', (err: Error) => {
    error('unhandledRejection', err);
});


(async () => {
    const app = new Application();
    // middleware
    app.use(catchError);
    app.use(trace);
    app.use(koaBody({
        multipart: true, // 允许上传文件
    }));
    app.use(koaStatic(`${__dirname}/static`));

    // router
    const { router } = app;
    initRouter(app);
    app.use(router.routes());
    app.use(router.allowedMethods()); // header 增加 Allow
    // 404的处理
    app.use(notFound);

    // app
    const { port } = config.server;
    const server = http.createServer(app.callback());
    function onError(err: netError) {
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

})().catch((err) => {
    error('startCatch', err);
    process.exit(-1);
});
