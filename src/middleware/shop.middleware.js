const services = require('../services/shop.services')
const errorType = require('../constants/error-types')

// 检查店铺名称是否存在
async function checkShopExist(ctx, next) {
    const name = ctx.request.body.name;
    const params = {
        name: name,
        userId: ctx.user.id,
    }
    const res = await services.checkShopExist(params)
    if (res) {
        ctx.ajaxReturn.msg = '该店名已存在'
        return ctx.body = ctx.ajaxReturn
    }
    await next()
}

async function checkFieldExist(ctx, next) {
    const name = ctx.request.body.name;
    const id = ctx.params.shopId;
    const params = {
        name,
        userId: ctx.userId
    }
    const checkExist = await services.checkExistByUpload(params, id);
    if (checkExist) {
        const error = new Error(errorType.SHOP_IS_EXIST);
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}

module.exports = {
    checkShopExist,
    checkFieldExist
}