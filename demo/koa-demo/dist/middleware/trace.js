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
function default_1(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const traceId = nanoid_1.nanoid(32);
        ctx.traceId = traceId;
        ctx.set('Trace-Id', traceId);
        // logger
        ctx.logger = log4js_1.getLogger('http');
        ctx.logger.addContext('traceId', traceId);
        ctx.logger.info(`${ctx.method} ${ctx.path}${ctx.search} ${ctx.status}`);
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZS90cmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLG1DQUFtQztBQUNuQyxtQ0FBZ0MsQ0FBQyxVQUFVO0FBRTNDLG1CQUErQixHQUFZOztRQUN2QyxNQUFNLE9BQU8sR0FBRyxlQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0IsR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFN0IsU0FBUztRQUNULEdBQUcsQ0FBQyxNQUFNLEdBQUcsa0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUM1RSxDQUFDO0NBQUE7QUFURCw0QkFTQyJ9