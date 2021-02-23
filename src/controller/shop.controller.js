const services = require('../services/shop.services')
class Shop {
    async createShop(ctx) {
        const name = ctx.request.body.name;
        const avatar = ctx.request.body.avatar
        const params = {
            name: name,
            userId: ctx.user.id,
            avatar
        }
        const res = await services.createShop(params)
        if (!res) {
            ctx.ajaxReturn.msg = '店铺添加失败'
        }
        ctx.ajaxReturn.code = 0;
        ctx.ajaxReturn.msg = '店铺添加成功'
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
            if (['page', 'size'].indexOf(i) == -1) {
                arr[i] = ['like', `%${params[i]}%`]
            }
        }
        arr.userId = ctx.user.id
        const result = await services.pagination(arr, page, size)
        ctx.ajaxReturn.code = 0;
        ctx.ajaxReturn.data = result
        ctx.body = ctx.ajaxReturn
    }
    async upload(ctx) {
        const where = {
            id: ctx.params.shopId,
            userId: ctx.user.id
        }
        const params = {};
        for (let i in ctx.request.body) {
            if (['status', 'name', 'avatar'].indexOf(i) !== -1) {
                params[i] = ctx.request.body[i]
            }
        }
        const result = await services.upload(params, where);
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = '修改成功';
        } else {
            ctx.ajaxReturn.msg = '修改异常,请稍后再试';
        }
        ctx.body = ctx.ajaxReturn
    }
    // 删除分类
    async deleteShop(ctx) {
        const id = ctx.params.shopId
        const result = await services.deleteShop(id);
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = '删除成功';
        } else {
            ctx.ajaxReturn.msg = '删除数据失败';
        }
        ctx.body = ctx.ajaxReturn
    }
    async deleteShops(ctx) {
        const arr = ctx.request.body.arr;
        const result = await services.deleteShops(arr);
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = '删除成功';
        } else {
            ctx.ajaxReturn.msg = '删除失败';
        }
        ctx.body = ctx.ajaxReturn
    }
}

module.exports = new Shop()