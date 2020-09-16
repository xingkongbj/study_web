export default class HTTPError extends Error {
    public status!: number;

    public code?: number;

    /**
     * 自定义错误类型，用于统一错误处理
     *
     * @param status {number} HTTP 响应状态码
     * @param message {string} 错误信息
     * @param code {number} 可选参数，返回的结果 code
     */
    constructor(status: number, message: string, code?: number) {
        super(message);

        this.status = status;

        this.code = code;
    }
}
