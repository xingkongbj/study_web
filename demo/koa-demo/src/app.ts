import * as koaBody from 'koa-body';
import config from './config';
import './lib/logger';
import catchError from './middleware/catch-error';
import trace from './middleware/trace';
import Application from './lib/application';
import initRouter from './router';

console.log(process.env.NODE_ENV);

(async () => {
    const app = new Application();
    // middleware
    app.use(catchError);
    app.use(trace);
    app.use(koaBody({
        multipart: true, // 允许上传文件
    }));

    // router
    const { router } = app;
    initRouter(app);
    app.use(router.routes());
    app.use(router.allowedMethods()); // header 增加 Allow

    // app
    const { port } = config.server;
    app.listen(port, () => {
        console.log(`server is running at port ${port}`);
    });
})().catch((err) => {
    console.error(err.stack);
    process.exit(-1);
});
