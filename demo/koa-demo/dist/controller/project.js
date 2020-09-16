"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
}
exports.default = Project;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVyL3Byb2plY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxNQUFxQixPQUFPO0lBQ2pCLEdBQUcsQ0FBQyxHQUFZO1FBQ25CLElBQUk7WUFDQSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsR0FBRyxDQUFDLElBQUksR0FBRztnQkFDUCxJQUFJLEVBQUUsQ0FBQztnQkFDUCxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLO2dCQUN2QixHQUFHLEVBQUUsRUFBRTthQUNWLENBQUM7U0FDTDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsR0FBRyxDQUFDLElBQUksR0FBRztnQkFDUCxJQUFJLEVBQUUsQ0FBQztnQkFDUCxJQUFJLEVBQUUsRUFBRTtnQkFDUixHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU87YUFDakIsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVNLElBQUksQ0FBQyxHQUFZO1FBQ3BCLElBQUk7WUFDQSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsR0FBRyxDQUFDLElBQUksR0FBRztnQkFDUCxJQUFJLEVBQUUsQ0FBQztnQkFDUCxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJO2dCQUN0QixHQUFHLEVBQUUsU0FBUzthQUNqQixDQUFDO1NBQ0w7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ1AsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPO2FBQ2pCLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFTSxHQUFHLENBQUMsR0FBWTtRQUNuQixJQUFJO1lBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixNQUFNLElBQUksbUNBQ0gsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQ2pCLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUN0QixDQUFDO1lBQ0YsR0FBRyxDQUFDLElBQUksR0FBRztnQkFDUCxJQUFJLEVBQUUsQ0FBQztnQkFDUCxJQUFJO2dCQUNKLEdBQUcsRUFBRSxTQUFTO2FBQ2pCLENBQUM7U0FDTDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsR0FBRyxDQUFDLElBQUksR0FBRztnQkFDUCxJQUFJLEVBQUUsQ0FBQztnQkFDUCxJQUFJLEVBQUUsRUFBRTtnQkFDUixHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU87YUFDakIsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVNLElBQUksQ0FBQyxHQUFZO1FBQ3BCLElBQUk7WUFDQSxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVE7WUFDMUIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixHQUFHLENBQUMsSUFBSSxHQUFHLHFCQUFxQixDQUFDO1NBQ3BDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixHQUFHLENBQUMsSUFBSSxHQUFHO2dCQUNQLElBQUksRUFBRSxDQUFDO2dCQUNQLElBQUksRUFBRSxFQUFFO2dCQUNSLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTzthQUNqQixDQUFDO1NBQ0w7SUFDTCxDQUFDO0NBQ0o7QUF0RUQsMEJBc0VDIn0=