import { Context } from 'koa';

export default class Project {
    public get(ctx: Context): void {
        ctx.body = 'hello world';
    }

    public post(ctx: Context): void {
        ctx.body = 'hello world';
    }

    public all(ctx: Context): void {
        ctx.body = 'hello world';
    }
}
