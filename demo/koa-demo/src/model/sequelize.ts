import { Sequelize } from 'sequelize';
import * as cls from 'cls-hooked';
import { getLogger } from 'log4js';

const logger = getLogger('sequelize');

const namespace = cls.createNamespace('my-very-own-namespace');
Sequelize.useCLS(namespace);
const sequelize = new Sequelize(
    'koa-demo',
    'root',
    'roottest',
    {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        timezone: '+08:00',
        define: {
            freezeTableName: true, // 禁止执行表名自动复数化
        },
        // 第二个实际参数不是 timing?: number 而是
        // { plain: boolean; raw: boolean; logging: Function; showWarnings: boolean; where: string; limit: number; ... }
        logging(sql: string): void {
            logger.info(sql);
        },
    },
);
const testContent = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
};

testContent();

export default sequelize;
