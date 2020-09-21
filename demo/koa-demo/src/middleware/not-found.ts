import { Context } from 'koa';
import { getLogger } from 'log4js';

const page404 = '/404.html';

export default async function notFound(ctx: Context): Promise<void> {
    // logger
    ctx.logger = getLogger('http');
    ctx.logger.info(`notFound：${ctx.method} ${ctx.path}${ctx.search}`);
    if (ctx.status === 404) {
        ctx.redirect(page404);
    }
}
