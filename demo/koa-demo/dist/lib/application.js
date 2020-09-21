"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KoaApplication = require("koa");
const KoaRouter = require("koa-router");
class Application extends KoaApplication {
    constructor() {
        super(...arguments);
        this.router = new KoaRouter();
    }
}
exports.default = Application;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2FwcGxpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXNDO0FBQ3RDLHdDQUF3QztBQUV4QyxNQUFNLFdBQVksU0FBUSxjQUFjO0lBQXhDOztRQUNJLFdBQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO0lBQzdCLENBQUM7Q0FBQTtBQUVELGtCQUFlLFdBQVcsQ0FBQyJ9