const Response = require('../constants/baseResponse')

class Fail extends Response {
    constructor(error_no = 1, message) {
        super(error_no);
        if (message) {
            this.message = message;
        }
    }
}


const genValidator = (validateFn) => {
    return async (ctx, next) => {
        const data = ctx.data;
        const url = ctx.request.url;
        const error = await validateFn(data, url.slice(url.lastIndexOf('/') + 1), ctx);
        if (error) {
            if (Array.isArray(error) && error.length > 0) {
                ctx.body = new Fail(1, error[0].message);
            } else {
                ctx.body = new Fail(1, '请求参数错误!');
            }
        } else {
            await next();
        }
    };
}
// 通用验证器
module.exports = {
    genValidator
}