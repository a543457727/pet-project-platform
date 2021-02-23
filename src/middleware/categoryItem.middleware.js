const errorType = require('../constants/error-types')
const services = require('../services/categoryItem.services')

async function checkExist(ctx, next) {
    const params = {
        name: ctx.request.body.name,
        categoryId: ctx.request.body.categoryId,
        shopId: ctx.request.body.shopId
    }
    const result = await services.uniqueName(params);
    if (result) {
        const error = new Error(errorType.GOODSCATEGORY_IS_EXIST)
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}

async function checkFieldExist(ctx, next) {
    const name = ctx.request.body.name;
    const id = ctx.params.categoryItemId;
    const checkExist = await services.checkExistByUpload({
        name
    }, id);
    if (checkExist) {
        const error = new Error(errorType.GOODSCATEGORY_IS_EXIST);
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}

module.exports = {
    checkExist,
    checkFieldExist
}