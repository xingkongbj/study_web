"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const localConfig = require("./config.local");
exports.default = (() => {
    const { NODE_ENV } = process.env;
    let config = {};
    switch (NODE_ENV) {
        case 'local':
            config = localConfig;
            break;
        default:
            break;
    }
    return config;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQThDO0FBTTlDLGtCQUFlLENBQUMsR0FBYyxFQUFFO0lBQzVCLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0lBRWpDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUVoQixRQUFRLFFBQVEsRUFBRTtRQUNkLEtBQUssT0FBTztZQUNSLE1BQU0sR0FBRyxXQUFXLENBQUM7WUFDckIsTUFBTTtRQUNWO1lBQ0ksTUFBTTtLQUNiO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyJ9