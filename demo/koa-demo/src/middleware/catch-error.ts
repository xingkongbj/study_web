import { Context } from 'koa';
import { Logger } from 'log4js';
import HTTPError from '../lib/error';

export default async function catchError(ctx: Context, next: () => Promise<any>): Promise<void> {
    try {
        await next();
    } catch (err) {
        if (ctx.logger) {
            (ctx.logger as Logger).error(`${ctx.method} ${ctx.path} ${err.name}:${err.message}`);
        }

        let code: number = 1;
        let msg: string = 'Internal Server Error';

        if (err instanceof HTTPError) {
            ctx.status = err.status;
            code = err.code || err.status;
            msg = err.message;
        } else {
            ctx.status = 500;
            code = 500;
            msg = 'Internal Server Error';
        }

        ctx.body = {
            code,
            msg,
        };
    }
}
