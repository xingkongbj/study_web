"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const util = require("util");
const log4js_1 = require("log4js");
const dayjs = require("dayjs");
// Node.js 没有线程，以 ${pm2.name}-${pm2.id}-${pid} 为线程名
const thread = `app-${process.env.NODE_APP_INSTANCE || null}-${process.pid}`;
log4js_1.addLayout('json', () => (event) => `${JSON.stringify(event)}\n`);
// 日期格式
// 2016-06-19 22:38:41.109 MacBook-Pro.local com.web main [DEBUG] PerformanceTest #XMDT#{traceID=81623489263571 riderID=19387465 flowID=97534}#XMDT# 日志描述
// `${yyyy-MM-dd hh:mm:ss.SSS} ${hostname} ${appkey} ${thread} [${level}] ${logger} [optional tags] ${message}`
// `%d{yyyy-MM-dd hh:mm:ss.SSS} %h ${appkey} ${thread} [%p] %c %x{token} %m%n`
const rmRegExp = /([= \n]|#XMDT#)+/g;
function magicTags(tags) {
    const pairs = [];
    Object.keys(tags).forEach((key) => {
        const k = key.replace(rmRegExp, '');
        const v = `${tags[key]}`.replace(rmRegExp, '');
        pairs.push(`${k}=${v}`);
    });
    if (pairs.length > 0) {
        return ` #XMDT#{${pairs.join(' ')}}#XMDT#`; // 有 tag 时前方留空格
    }
    return '';
}
log4js_1.addLayout('fmt', (_) => function fmtLayout(event) {
    const message = util.format(event.data[0], ...event.data.slice(1));
    return `${dayjs(event.startTime).format('YYYY-MM-DD HH:mm:ss.SSS')} ${os.hostname()} [${event.level.levelStr}] ${thread} ${event.categoryName}${magicTags(event.context)} ${message}`;
});
const { NODE_ENV } = process.env;
// 本地开发使用 console
if (!NODE_ENV || NODE_ENV === 'local') {
    log4js_1.configure({
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
}
else {
    log4js_1.configure({
        appenders: {
            out: {
                type: 'dateFile',
                filename: '~/www/logs/app.log',
                daysToKeep: 15,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBRTdCLG1DQUtnQjtBQUVoQiwrQkFBK0I7QUFFL0IsbURBQW1EO0FBQ25ELE1BQU0sTUFBTSxHQUFHLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRTdFLGtCQUFTLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBbUIsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUUvRSxPQUFPO0FBQ1AseUpBQXlKO0FBQ3pKLCtHQUErRztBQUMvRyw4RUFBOEU7QUFFOUUsTUFBTSxRQUFRLEdBQUcsbUJBQW1CLENBQUM7QUFDckMsU0FBUyxTQUFTLENBQUMsSUFBNkI7SUFDNUMsTUFBTSxLQUFLLEdBQWEsRUFBRSxDQUFDO0lBRTNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUU7UUFDdEMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUMsQ0FBQztJQUVILElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDbEIsT0FBTyxXQUFXLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGVBQWU7S0FDOUQ7SUFFRCxPQUFPLEVBQUUsQ0FBQztBQUNkLENBQUM7QUFFRCxrQkFBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQWUsRUFBRSxFQUFFLENBQUMsU0FBUyxTQUFTLENBQUMsS0FBbUI7SUFDeEUsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRSxPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQUMxTCxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBRWpDLGlCQUFpQjtBQUNqQixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsS0FBSyxPQUFPLEVBQUU7SUFDbkMsa0JBQVMsQ0FBQztRQUNOLFNBQVMsRUFBRTtZQUNQLEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsU0FBUzthQUNsQjtTQUNKO1FBQ0QsVUFBVSxFQUFFO1lBQ1IsT0FBTyxFQUFFO2dCQUNMLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDbEIsS0FBSyxFQUFFLE9BQU87YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDO2dCQUNsQixLQUFLLEVBQUUsT0FBTzthQUNqQjtTQUNKO1FBQ0QsR0FBRyxFQUFFLEtBQUs7S0FDYixDQUFDLENBQUM7Q0FDTjtLQUFNO0lBQ0gsa0JBQVMsQ0FBQztRQUNOLFNBQVMsRUFBRTtZQUNQLEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLE1BQU0sRUFBRTtvQkFDSixJQUFJLEVBQUUsS0FBSztpQkFDZDthQUNKO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxVQUFVO2dCQUNoQixRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxVQUFVLEVBQUUsQ0FBQztnQkFDYixXQUFXLEVBQUUsSUFBSTtnQkFDakIsTUFBTSxFQUFFO29CQUNKLElBQUksRUFBRSxLQUFLO2lCQUNkO2FBQ0o7U0FDSjtRQUNELFVBQVUsRUFBRTtZQUNSLE9BQU8sRUFBRTtnQkFDTCxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQ2xCLEtBQUssRUFBRSxNQUFNO2FBQ2hCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFNBQVMsRUFBRSxDQUFDLFdBQVcsQ0FBQztnQkFDeEIsS0FBSyxFQUFFLE1BQU07YUFDaEI7U0FDSjtRQUNELEdBQUcsRUFBRSxJQUFJO1FBQ1QsaUJBQWlCLEVBQUUsSUFBSTtLQUMxQixDQUFDLENBQUM7Q0FDTiJ9