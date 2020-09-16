import * as KoaApplication from 'koa';
import * as KoaRouter from 'koa-router';

export interface AppConfig {
    [key: string]: any;
}

class Application extends KoaApplication {
    public router: KoaRouter;

    constructor() {
        super();
        this.router = new KoaRouter();
    }
}

export default Application;
