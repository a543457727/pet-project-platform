const services = require('../services/variety.services')
class VarietyController {
    async createVariety(ctx) {
        const params = ctx.request.body;
        params.shopId = 1
        const result = await services.createVariety(params)
        if (result) {
            ctx.ajaxReturn.msg = '创建成功';
            ctx.ajaxReturn.code = 0;
        } else {
            ctx.ajaxReturn.msg = '创建失败';
        }
        ctx.body = ctx.ajaxReturn
    }
    async getPagination(ctx) {
        const {
            page,
            size
        } = ctx.query;
        const params = ctx.query;
        const arr = []
        for (let i in params) {
            if (['page', 'size', 'shopId'].indexOf(i) == -1) {
                arr[i] = ['like', `%${params[i]}%`]
            }
        }
        arr.shopId = params['shopId']
        const result = await services.pagination(arr, page, size)
        ctx.ajaxReturn.code = 0;
        ctx.ajaxReturn.data = result
        ctx.body = ctx.ajaxReturn
    }
    async uploadVariety(ctx) {
        const id = ctx.params.varietyId;
        const params = {
            bigWeight: ctx.request.body.bigWeight,
            name: ctx.request.body.name,
            smallWeight: ctx.request.body.smallWeight,
        }
        const result = await services.uploadVariety(params, id);
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = '修改成功';
        } else {
            ctx.ajaxReturn.msg = '修改异常,请稍后再试';
        }
        ctx.body = ctx.ajaxReturn
    }
    // 单条删除操作
    async deleteVariety(ctx) {
        const id = ctx.params.varietyId
        const result = await services.deleteVariety(id);
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = '删除成功';
        } else {
            ctx.ajaxReturn.msg = '删除数据失败';
        }
        ctx.body = ctx.ajaxReturn
    }
    // 批量删除操作
    async deleteVarietys(ctx) {
        const arr = ctx.request.body.arr
        const id = 1
        const result = await services.deleteVarietys(arr, id);
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = '删除成功';
        } else {
            ctx.ajaxReturn.msg = '删除数据失败';
        }
        ctx.body = ctx.ajaxReturn
    }
}

module.exports = new VarietyController()