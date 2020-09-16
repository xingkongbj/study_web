import { Sequelize } from 'sequelize';
import { getLogger } from 'log4js';

const logger = getLogger('sequelize');

const sequelize = new Sequelize(
    'koa-demo',
    'root',
    'roottest',
    {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        timezone: '+08:00',
        // 第二个实际参数不是 timing?: number 而是
        // { plain: boolean; raw: boolean; logging: Function; showWarnings: boolean; where: string; limit: number; ... }
        logging(sql: string): void {
            logger.info(sql);
        },
    },
);

export default sequelize;
