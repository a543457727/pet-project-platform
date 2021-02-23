const errorType = require('../constants/error-types')
const service = require('../services/variety.services')

async function checkFields(ctx, next) {
    const name = ctx.request.body.name;
    const checkExist = await service.checkExist({
        name
    });
    if (checkExist) {
        const error = new Error(errorType.SERVERNAME_IS_EXIST);
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}

async function checkExistByUpload(ctx, next) {
    const name = ctx.request.body.name;
    const id = ctx.params.varietyId;
    const checkExist = await service.checkExistByUpload({
        name
    }, id);
    if (checkExist) {
        const error = new Error(errorType.SERVERNAME_IS_EXIST);
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}

module.exports = {
    checkFields,
    checkExistByUpload
}