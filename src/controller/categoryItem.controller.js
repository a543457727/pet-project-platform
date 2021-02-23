const services = require('../services/categoryItem.services');

class CategoryItemController {
    async create(ctx) {
        const result = await services.create(ctx.request.body)
        if (result) {
            ctx.ajaxReturn.msg = '创建成功';
            ctx.ajaxReturn.code = 0;
        } else {
            ctx.ajaxReturn.msg = '创建失败';
        }
        ctx.body = ctx.ajaxReturn
    }
    // 获取分页数据
    async getPagination(ctx) {
        const params = ctx.query;
        const arr = []
        for (let i in params) {
            if (['page', 'size', 'shopId'].indexOf(i) == -1) {
                arr[i] = ['like', `%${params[i]}%`]
            }
        }
        arr.shopId = params['shopId']
        params['categoryId'] ? arr.categoryId = params['categoryId'] : '';
        console.log(arr);
        const result = await services.pagination(arr, params.page, params.size)
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.data = result
        } else {
            ctx.ajaxReturn.msg = '数据查询异常'
        }
        ctx.body = ctx.ajaxReturn
    }
    // 更新
    async upload(ctx) {
        const where = {
            id: ctx.params.categoryItemId,
            shopId: ctx.request.body.shopId
        }
        const params = {};
        for (let i in ctx.request.body) {
            if (['status', 'name', 'pictureUrl'].indexOf(i) !== -1) {
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
    async deleteCategory(ctx) {
        const id = ctx.params.categoryItemId
        const result = await services.deleteCategory(id);
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = '删除成功';
        } else {
            ctx.ajaxReturn.msg = '删除数据失败';
        }
        ctx.body = ctx.ajaxReturn
    }
    async deleteCategorys(ctx) {
        const arr = ctx.request.body.arr;
        const result = await services.deleteCategorys(arr);
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = '删除成功';
        } else {
            ctx.ajaxReturn.msg = '删除失败';
        }
        ctx.body = ctx.ajaxReturn
    }
    async getAll(ctx) {
        const shopId = ctx.query.shopId;
        const result = await services.getAll(shopId)
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.data = result
        } else {
            ctx.ajaxReturn.msg = '数据查询异常'
        }
        ctx.body = ctx.ajaxReturn
    }
    async getMesByCateId(ctx) {
        const id = ctx.params.categoryId;
        const shopId = ctx.query.shopId;
        const result = await services.getMesByCateId(id, shopId);
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.data = result
        } else {
            ctx.ajaxReturn.msg = '数据查询异常'
        }
        ctx.body = ctx.ajaxReturn

    }
}

module.exports = new CategoryItemController()