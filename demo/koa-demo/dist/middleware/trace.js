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
const log4js_1 = require("log4js");
const nanoid_1 = require("nanoid"); // 异步性能较差?
function traceId(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const traceId = nanoid_1.nanoid(32);
        ctx.traceId = traceId;
        ctx.set('Trace-Id', traceId);
        // logger
        ctx.logger = log4js_1.getLogger('http');
        ctx.logger.addContext('traceId', traceId);
        yield next();
        ctx.logger.info(`${ctx.method} ${ctx.path}${ctx.search} ${ctx.status}`);
    });
}
exports.default = traceId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZS90cmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLG1DQUFtQztBQUNuQyxtQ0FBZ0MsQ0FBQyxVQUFVO0FBRTNDLFNBQThCLE9BQU8sQ0FBQyxHQUFZLEVBQUUsSUFBd0I7O1FBQ3hFLE1BQU0sT0FBTyxHQUFHLGVBQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixHQUFHLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUU3QixTQUFTO1FBQ1QsR0FBRyxDQUFDLE1BQU0sR0FBRyxrQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUM1RSxDQUFDO0NBQUE7QUFWRCwwQkFVQyJ9