"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const cls = require("cls-hooked");
const log4js_1 = require("log4js");
const logger = log4js_1.getLogger('sequelize');
const namespace = cls.createNamespace('my-very-own-namespace');
sequelize_1.Sequelize.useCLS(namespace);
const sequelize = new sequelize_1.Sequelize('koa-demo', 'root', 'roottest', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    timezone: '+08:00',
    define: {
        freezeTableName: true,
    },
    // 第二个实际参数不是 timing?: number 而是
    // { plain: boolean; raw: boolean; logging: Function; showWarnings: boolean; where: string; limit: number; ... }
    logging(sql) {
        logger.info(sql);
    },
});
const testContent = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        logger.info('Connection has been established successfully.');
    }
    catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
});
testContent();
exports.default = sequelize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VxdWVsaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVsL3NlcXVlbGl6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHlDQUFzQztBQUN0QyxrQ0FBa0M7QUFDbEMsbUNBQW1DO0FBRW5DLE1BQU0sTUFBTSxHQUFHLGtCQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFdEMsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQy9ELHFCQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzVCLE1BQU0sU0FBUyxHQUFHLElBQUkscUJBQVMsQ0FDM0IsVUFBVSxFQUNWLE1BQU0sRUFDTixVQUFVLEVBQ1Y7SUFDSSxPQUFPLEVBQUUsT0FBTztJQUNoQixJQUFJLEVBQUUsV0FBVztJQUNqQixJQUFJLEVBQUUsSUFBSTtJQUNWLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLE1BQU0sRUFBRTtRQUNKLGVBQWUsRUFBRSxJQUFJO0tBQ3hCO0lBQ0QsK0JBQStCO0lBQy9CLGdIQUFnSDtJQUNoSCxPQUFPLENBQUMsR0FBVztRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztDQUNKLENBQ0osQ0FBQztBQUNGLE1BQU0sV0FBVyxHQUFHLEdBQVMsRUFBRTtJQUMzQixJQUFJO1FBQ0EsTUFBTSxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO0tBQ2hFO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDWixNQUFNLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzdEO0FBQ0wsQ0FBQyxDQUFBLENBQUM7QUFFRixXQUFXLEVBQUUsQ0FBQztBQUVkLGtCQUFlLFNBQVMsQ0FBQyJ9