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
const error_1 = require("../lib/error");
function catchError(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield next();
        }
        catch (err) {
            if (ctx.logger) {
                ctx.logger.error(`${ctx.method} ${ctx.path} ${err.name}:${err.message}`);
            }
            let code = 1;
            let msg = 'Internal Server Error';
            if (err instanceof error_1.default) {
                ctx.status = err.status;
                code = err.code || err.status;
                msg = err.message;
            }
            else {
                ctx.status = 500;
                code = 500;
                msg = 'Internal Server Error';
            }
            ctx.body = {
                code,
                msg,
            };
        }
    });
}
exports.default = catchError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0Y2gtZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZS9jYXRjaC1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLHdDQUFxQztBQUVyQyxTQUE4QixVQUFVLENBQUMsR0FBWSxFQUFFLElBQXdCOztRQUMzRSxJQUFJO1lBQ0EsTUFBTSxJQUFJLEVBQUUsQ0FBQztTQUNoQjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO2dCQUNYLEdBQUcsQ0FBQyxNQUFpQixDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2FBQ3hGO1lBRUQsSUFBSSxJQUFJLEdBQVcsQ0FBQyxDQUFDO1lBQ3JCLElBQUksR0FBRyxHQUFXLHVCQUF1QixDQUFDO1lBRTFDLElBQUksR0FBRyxZQUFZLGVBQVMsRUFBRTtnQkFDMUIsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO2dCQUN4QixJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDO2dCQUM5QixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQzthQUNyQjtpQkFBTTtnQkFDSCxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztnQkFDakIsSUFBSSxHQUFHLEdBQUcsQ0FBQztnQkFDWCxHQUFHLEdBQUcsdUJBQXVCLENBQUM7YUFDakM7WUFFRCxHQUFHLENBQUMsSUFBSSxHQUFHO2dCQUNQLElBQUk7Z0JBQ0osR0FBRzthQUNOLENBQUM7U0FDTDtJQUNMLENBQUM7Q0FBQTtBQTFCRCw2QkEwQkMifQ==