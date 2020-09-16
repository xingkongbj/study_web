import { Context } from 'koa';

export default class Home {
    public hello(ctx: Context): void {
        ctx.body = 'hello world';
    }
}
