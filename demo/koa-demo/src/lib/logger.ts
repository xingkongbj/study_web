import * as os from 'os';
import * as util from 'util';

import {
    configure,
    addLayout,
    LoggingEvent,
    CustomLayout,
} from 'log4js';

import * as dayjs from 'dayjs';

// Node.js 没有线程，以 ${pm2.name}-${pm2.id}-${pid} 为线程名
const thread = `app-${process.env.NODE_APP_INSTANCE || null}-${process.pid}`;

addLayout('json', () => (event: LoggingEvent) => `${JSON.stringify(event)}\n`);

// 日期格式
// 2016-06-19 22:38:41.109 MacBook-Pro.local com.web main [DEBUG] PerformanceTest #XMDT#{traceID=81623489263571 riderID=19387465 flowID=97534}#XMDT# 日志描述
// `${yyyy-MM-dd hh:mm:ss.SSS} ${hostname} ${appkey} ${thread} [${level}] ${logger} [optional tags] ${message}`
// `%d{yyyy-MM-dd hh:mm:ss.SSS} %h ${appkey} ${thread} [%p] %c %x{token} %m%n`

const rmRegExp = /([= \n]|#XMDT#)+/g;
function magicTags(tags: { [prop: string]: any }): string {
    const pairs: string[] = [];

    Object.keys(tags).forEach((key: string) => {
        const k = key.replace(rmRegExp, '');
        const v = `${tags[key]}`.replace(rmRegExp, '');
        pairs.push(`${k}=${v}`);
    });

    if (pairs.length > 0) {
        return ` #XMDT#{${pairs.join(' ')}}#XMDT#`; // 有 tag 时前方留空格
    }

    return '';
}

addLayout('fmt', (_: CustomLayout) => function fmtLayout(event: LoggingEvent): string {
    const message = util.format(event.data[0], ...event.data.slice(1));
    return `${dayjs(event.startTime).format('YYYY-MM-DD HH:mm:ss.SSS')} ${os.hostname()} [${event.level.levelStr}] ${thread} ${event.categoryName}${magicTags(event.context)} ${message}`;
});

const { NODE_ENV } = process.env;

// 本地开发使用 console
if (!NODE_ENV || NODE_ENV === 'local') {
    configure({
        appenders: {
            out: {
                type: 'console',
            },
        },
        categories: {
            default: {
                appenders: ['out'],
                level: 'debug',
            },
            sequelize: {
                appenders: ['out'],
                level: 'debug',
            },
        },
        pm2: false,
    });
} else {
    configure({
        appenders: {
            out: {
                type: 'dateFile',
                filename: '~/www/logs/app.log',
                daysToKeep: 15, // 保存 15 天
                keepFileExt: true,
                layout: {
                    type: 'fmt',
                },
            },
            sequelize: {
                type: 'dateFile',
                filename: '~/www/logs/sequelize.log',
                daysToKeep: 3,
                keepFileExt: true,
                layout: {
                    type: 'fmt',
                },
            },
        },
        categories: {
            default: {
                appenders: ['out'],
                level: 'info',
            },
            sequelize: {
                appenders: ['sequelize'],
                level: 'warn',
            },
        },
        pm2: true,
        disableClustering: true,
    });
}
