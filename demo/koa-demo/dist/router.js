"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// controllers
const home_1 = require("./controller/home");
const project_1 = require("./controller/project");
exports.default = (app) => {
    const { router } = app;
    const home = new home_1.default();
    const project = new project_1.default();
    router.get('/', home.hello);
    router.get('/api/v1/get', project.get);
    router.post('/api/v1/post', project.post);
    router.all('/api/v1/all', project.all);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGNBQWM7QUFDZCw0Q0FBcUM7QUFDckMsa0RBQTJDO0FBRTNDLGtCQUFlLENBQUMsR0FBZ0IsRUFBRSxFQUFFO0lBQ2hDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFFdkIsTUFBTSxJQUFJLEdBQUcsSUFBSSxjQUFJLEVBQUUsQ0FBQztJQUN4QixNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztJQUU5QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUUxQyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFDIn0=