import * as KoaApplication from 'koa';
import * as KoaRouter from 'koa-router';

class Application extends KoaApplication {
    router = new KoaRouter();
}

export default Application;
