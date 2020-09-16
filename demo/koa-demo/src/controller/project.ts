import { Context } from 'koa';

export default class Project {
    public get(ctx: Context): void {
        try {
            console.info(ctx.request.query);
            ctx.body = {
                code: 0,
                data: ctx.request.query,
                msg: '',
            };
        } catch (e) {
            ctx.body = {
                code: 1,
                data: '',
                msg: e.message,
            };
        }
    }

    public post(ctx: Context): void {
        try {
            console.info(ctx.request.body);
            ctx.body = {
                code: 0,
                data: ctx.request.body,
                msg: 'success',
            };
        } catch (e) {
            ctx.body = {
                code: 1,
                data: '',
                msg: e.message,
            };
        }
    }

    public all(ctx: Context): void {
        try {
            console.info(ctx.request.query);
            console.info(ctx.request.body);
            const data = {
                ...ctx.request.query,
                ...ctx.request.body,
            };
            ctx.body = {
                code: 0,
                data,
                msg: 'success',
            };
        } catch (e) {
            ctx.body = {
                code: 1,
                data: '',
                msg: e.message,
            };
        }
    }

    public jump(ctx: Context): void {
        try {
            ctx.status = 301; // 默认302
            ctx.redirect('/');
            ctx.body = 'Redirecting to Home';
        } catch (e) {
            ctx.body = {
                code: 1,
                data: '',
                msg: e.message,
            };
        }
    }
}
