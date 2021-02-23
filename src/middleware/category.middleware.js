const errorType = require('../constants/error-types')
const service = require('../services/category.services')

async function checkField(ctx, next) {
    const result = await service.checkExist(ctx.request.body)
    if (result) {
        const error = new Error(errorType.GOODSCATEGORY_IS_EXIST)
        return ctx.app.emit('error', error, ctx);
    }
    await next()
}

async function checkFieldExist(ctx, next) {
    const name = ctx.request.body.name;
    const id = ctx.params.categoryId;
    const checkExist = await service.checkExistByUpload({
        name
    }, id);
    if (checkExist) {
        const error = new Error(errorType.GOODSCATEGORY_IS_EXIST);
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}
module.exports = {
    checkField,
    checkFieldExist
}