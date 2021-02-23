const {
    param
} = require('../router/auth.router');
const services = require('../services/category.services');

class CategoryController {
    // 创建商品分类
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
    // 获取分类
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
        arr.shopId = params['shopId'];
        const result = await services.pagination(arr, page, size)
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
        const result = await services.upload(ctx.request.body.name, ctx.params.categoryId);
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = '修改成功';
        } else {
            ctx.ajaxReturn.msg = '修改异常,请稍后再试';
        }
        ctx.body = ctx.ajaxReturn
    }
    // 更新分类状态
    async uploadStatus(ctx) {
        const id = ctx.params.categoryId;
        const status = ctx.request.body.status;
        const result = await services.uploadStatus(status, id);
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = '修改状态成功';
        } else {
            ctx.ajaxReturn.msg = '修改状态成功';
        }
        ctx.body = ctx.ajaxReturn
    }
    async deleteCategory(ctx) {
        const id = ctx.params.categoryId
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
        ctx.ajaxReturn.data = result;
        ctx.ajaxReturn.code = 0;
        ctx.body = ctx.ajaxReturn
        console.log(result);
    }
}

module.exports = new CategoryController()