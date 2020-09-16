// 为每个独立请求生成唯一 traceId 进行上下文追踪
import { Context } from 'koa';
import { getLogger } from 'log4js';
import { nanoid } from 'nanoid'; // 异步性能较差?

export default async function traceId(ctx: Context, next: () => Promise<any>): Promise<void> {
    const traceId = nanoid(32);
    ctx.traceId = traceId;
    ctx.set('Trace-Id', traceId);

    // logger
    ctx.logger = getLogger('http');
    ctx.logger.addContext('traceId', traceId);
    await next();
    ctx.logger.info(`${ctx.method} ${ctx.path}${ctx.search} ${ctx.status}`);
}
