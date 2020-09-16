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
const koaBody = require("koa-body");
const config_1 = require("./config");
require("./lib/logger");
const catch_error_1 = require("./middleware/catch-error");
const trace_1 = require("./middleware/trace");
const application_1 = require("./lib/application");
const router_1 = require("./router");
console.log(process.env.NODE_ENV);
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = new application_1.default();
    // middleware
    app.use(catch_error_1.default);
    app.use(trace_1.default);
    app.use(koaBody({
        multipart: true,
    }));
    // router
    const { router } = app;
    router_1.default(app);
    app.use(router.routes());
    app.use(router.allowedMethods()); // header 增加 Allow
    // app
    const { port } = config_1.default.server;
    app.listen(port, () => {
        console.log(`server is running at port ${port}`);
    });
}))().catch((err) => {
    console.error(err.stack);
    process.exit(-1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG9DQUFvQztBQUNwQyxxQ0FBOEI7QUFDOUIsd0JBQXNCO0FBQ3RCLDBEQUFrRDtBQUNsRCw4Q0FBdUM7QUFDdkMsbURBQTRDO0FBQzVDLHFDQUFrQztBQUVsQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFbEMsQ0FBQyxHQUFTLEVBQUU7SUFDUixNQUFNLEdBQUcsR0FBRyxJQUFJLHFCQUFXLEVBQUUsQ0FBQztJQUM5QixhQUFhO0lBQ2IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLENBQUM7SUFDcEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFLLENBQUMsQ0FBQztJQUNmLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQ1osU0FBUyxFQUFFLElBQUk7S0FDbEIsQ0FBQyxDQUFDLENBQUM7SUFFSixTQUFTO0lBQ1QsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUN2QixnQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDekIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLGtCQUFrQjtJQUVwRCxNQUFNO0lBQ04sTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLGdCQUFNLENBQUMsTUFBTSxDQUFDO0lBQy9CLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDQUFDIn0=