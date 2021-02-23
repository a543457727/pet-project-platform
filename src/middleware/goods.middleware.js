const services = require('../services/goods.services')
const errorType = require('../constants/error-types')


async function checkExist(ctx, next) {
    const name = ctx.request.body.name;
    const shopId = ctx.request.body.shopId
    const result = await services.checkExist({
        name,
        shopId
    })
    if (result) {
        const error = new Error(errorType.GOOD_IS_EXIST)
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}
async function checkFieldExist(ctx, next) {
    const name = ctx.request.body.name;
    const id = ctx.params.goodsId;
    const checkExist = await services.checkExistByUpload({
        name
    }, id);
    if (checkExist) {
        const error = new Error(errorType.GOOD_IS_EXIST);
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}

module.exports = {
    checkExist,
    checkFieldExist
}