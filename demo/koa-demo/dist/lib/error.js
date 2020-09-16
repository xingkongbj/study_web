"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HTTPError extends Error {
    /**
     * 自定义错误类型，用于统一错误处理
     *
     * @param status {number} HTTP 响应状态码
     * @param message {string} 错误信息
     * @param code {number} 可选参数，返回的结果 code
     */
    constructor(status, message, code) {
        super(message);
        this.status = status;
        this.code = code;
    }
}
exports.default = HTTPError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBcUIsU0FBVSxTQUFRLEtBQUs7SUFLeEM7Ozs7OztPQU1HO0lBQ0gsWUFBWSxNQUFjLEVBQUUsT0FBZSxFQUFFLElBQWE7UUFDdEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWYsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztDQUNKO0FBbkJELDRCQW1CQyJ9