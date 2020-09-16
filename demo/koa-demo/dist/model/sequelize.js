"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const log4js_1 = require("log4js");
const logger = log4js_1.getLogger('sequelize');
const sequelize = new sequelize_1.Sequelize('koa-demo', 'root', 'roottest', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    timezone: '+08:00',
    // 第二个实际参数不是 timing?: number 而是
    // { plain: boolean; raw: boolean; logging: Function; showWarnings: boolean; where: string; limit: number; ... }
    logging(sql) {
        logger.info(sql);
    },
});
exports.default = sequelize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VxdWVsaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVsL3NlcXVlbGl6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUFzQztBQUN0QyxtQ0FBbUM7QUFFbkMsTUFBTSxNQUFNLEdBQUcsa0JBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUV0QyxNQUFNLFNBQVMsR0FBRyxJQUFJLHFCQUFTLENBQzNCLFVBQVUsRUFDVixNQUFNLEVBQ04sVUFBVSxFQUNWO0lBQ0ksT0FBTyxFQUFFLE9BQU87SUFDaEIsSUFBSSxFQUFFLFdBQVc7SUFDakIsSUFBSSxFQUFFLElBQUk7SUFDVixRQUFRLEVBQUUsUUFBUTtJQUNsQiwrQkFBK0I7SUFDL0IsZ0hBQWdIO0lBQ2hILE9BQU8sQ0FBQyxHQUFXO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0NBQ0osQ0FDSixDQUFDO0FBRUYsa0JBQWUsU0FBUyxDQUFDIn0=