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
const page404 = '/404.html';
function notFound(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        // logger
        ctx.logger = log4js_1.getLogger('http');
        ctx.logger.info(`notFound：${ctx.method} ${ctx.path}${ctx.search}`);
        if (ctx.status === 404) {
            ctx.redirect(page404);
        }
    });
}
exports.default = notFound;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90LWZvdW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmUvbm90LWZvdW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsbUNBQW1DO0FBRW5DLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQztBQUU1QixTQUE4QixRQUFRLENBQUMsR0FBWTs7UUFDL0MsU0FBUztRQUNULEdBQUcsQ0FBQyxNQUFNLEdBQUcsa0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNuRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO1lBQ3BCLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekI7SUFDTCxDQUFDO0NBQUE7QUFQRCwyQkFPQyJ9