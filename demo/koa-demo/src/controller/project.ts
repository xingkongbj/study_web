import { Context } from 'koa';
import { Project as T_project, sequelize } from '../model';

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

    public async getList(ctx: Context): Promise<void> {
        try {
            const data = await T_project.findAll({
                where: {
                    id: 1
                },
                attributes: ['id', 'name', 'type', 'updatedAt']
            });
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

    public async setList(ctx: Context): Promise<void> {
        try {
            sequelize.transaction(async () => {
                // 启用 CLS 后,将在事务内部创建用户
                await T_project.create({ name: 'Alice', type: false, status: 1 });
                await T_project.bulkCreate([{ name: 'Alice2', type: false, status: 2 }, { name: 'Alice3', type: false, status: 3 }]);
            });
            ctx.body = {
                code: 0,
                msg: 'success',
            };
        } catch (e) {
            ctx.body = {
                code: 1,
                msg: e.message,
            };
        }
    }
}
