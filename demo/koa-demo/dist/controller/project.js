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
const model_1 = require("../model");
class Project {
    get(ctx) {
        try {
            console.info(ctx.request.query);
            ctx.body = {
                code: 0,
                data: ctx.request.query,
                msg: '',
            };
        }
        catch (e) {
            ctx.body = {
                code: 1,
                data: '',
                msg: e.message,
            };
        }
    }
    post(ctx) {
        try {
            console.info(ctx.request.body);
            ctx.body = {
                code: 0,
                data: ctx.request.body,
                msg: 'success',
            };
        }
        catch (e) {
            ctx.body = {
                code: 1,
                data: '',
                msg: e.message,
            };
        }
    }
    all(ctx) {
        try {
            console.info(ctx.request.query);
            console.info(ctx.request.body);
            const data = Object.assign(Object.assign({}, ctx.request.query), ctx.request.body);
            ctx.body = {
                code: 0,
                data,
                msg: 'success',
            };
        }
        catch (e) {
            ctx.body = {
                code: 1,
                data: '',
                msg: e.message,
            };
        }
    }
    jump(ctx) {
        try {
            ctx.status = 301; // 默认302
            ctx.redirect('/');
            ctx.body = 'Redirecting to Home';
        }
        catch (e) {
            ctx.body = {
                code: 1,
                data: '',
                msg: e.message,
            };
        }
    }
    getList(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield model_1.Project.findAll({
                    where: {
                        id: 1
                    },
                    attributes: ['id', 'name', 'type', 'updatedAt']
                });
                ctx.body = {
                    code: 0,
                    data,
                    msg: 'success',
                };
            }
            catch (e) {
                ctx.body = {
                    code: 1,
                    data: '',
                    msg: e.message,
                };
            }
        });
    }
    setList(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                model_1.sequelize.transaction(() => __awaiter(this, void 0, void 0, function* () {
                    // 启用 CLS 后,将在事务内部创建用户
                    yield model_1.Project.create({ name: 'Alice', type: false, status: 1 });
                    yield model_1.Project.bulkCreate([{ name: 'Alice2', type: false, status: 2 }, { name: 'Alice3', type: false, status: 3 }]);
                }));
                ctx.body = {
                    code: 0,
                    msg: 'success',
                };
            }
            catch (e) {
                ctx.body = {
                    code: 1,
                    msg: e.message,
                };
            }
        });
    }
}
exports.default = Project;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVyL3Byb2plY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxvQ0FBMkQ7QUFFM0QsTUFBcUIsT0FBTztJQUNqQixHQUFHLENBQUMsR0FBWTtRQUNuQixJQUFJO1lBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ1AsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSztnQkFDdkIsR0FBRyxFQUFFLEVBQUU7YUFDVixDQUFDO1NBQ0w7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ1AsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPO2FBQ2pCLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFTSxJQUFJLENBQUMsR0FBWTtRQUNwQixJQUFJO1lBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ1AsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSTtnQkFDdEIsR0FBRyxFQUFFLFNBQVM7YUFDakIsQ0FBQztTQUNMO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixHQUFHLENBQUMsSUFBSSxHQUFHO2dCQUNQLElBQUksRUFBRSxDQUFDO2dCQUNQLElBQUksRUFBRSxFQUFFO2dCQUNSLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTzthQUNqQixDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRU0sR0FBRyxDQUFDLEdBQVk7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