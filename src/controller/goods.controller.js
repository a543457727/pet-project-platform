const {
    url
} = require('../router/file.router');
const services = require('../services/goods.services')

class Goods {
    async create(ctx) {
        const params = {
            name: ctx.request.body.name,
            shopId: ctx.request.body.shopId,
            categoryItemId: ctx.request.body.categoryItemId,
            price: ctx.request.body.price,
            "`desc`": ctx.request.body.desc || '',
            stock: ctx.request.body.stock || 0,
            flag: ctx.request.body.flag
        }
        const result = await services.create(params)
        if (ctx.request.body.pictureUrl.length > 0) {
            const picResult = await services.saveImg(ctx.request.body.pictureUrl, result);
        }
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
            if (['page', 'size', 'shopId', 'categoryItemId'].indexOf(i) == -1) {
                arr[i] = ['like', `%${params[i]}%`]
            }
        }
        arr.shopId = params.shopId
        params.categoryItemId ? arr.categoryItemId = params.categoryItemId : '';
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
            id: ctx.params.goodsId,
            shopId: ctx.request.body.shopId
        }
        const params = {};
        const existArr = ['flag', 'name', 'desc', 'price', 'stock', 'categoryItemId', 'shopId']
        for (let i in ctx.request.body) {
            if (existArr.indexOf(i) !== -1 && i != 'desc') {
                params[i] = ctx.request.body[i]
            } else if (i == 'desc') {
                params["`desc`"] = ctx.request.body[i]
            }

        }
        const result = await services.upload(params, where);
        let imgList = ctx.request.body.pictureUrl;
        if (imgList && imgList.length > 0) {
            imgList = imgList.filter(v => {
                return v.id ? false : true
            })
            if (imgList.length > 0) {
                const imgArr = [];
                imgList.forEach(img => {
                    imgArr.push(img.url);
                });
                console.log(imgArr);
                const picResult = await services.saveImg(imgArr, where.id);
            }
        }
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = '修改成功';
        } else {
            ctx.ajaxReturn.msg = '修改异常,请稍后再试';
        }
        ctx.body = ctx.ajaxReturn
    }
    // 删除单条商品
    async deleteGood(ctx) {
        const id = ctx.params.goodsId
        const result = await services.deleteGood(id);
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = '删除成功';
        } else {
            ctx.ajaxReturn.msg = '删除数据失败';
        }
        ctx.body = ctx.ajaxReturn
    }
    // 删除多条商品
    async deleteGoods(ctx) {
        const arr = ctx.request.body.arr;
        const result = await services.deleteGoods(arr);
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = '删除成功';
        } else {
            ctx.ajaxReturn.msg = '删除失败';
        }
        ctx.body = ctx.ajaxReturn
    }
    async getGoodsById(ctx) {
        const id = ctx.params.goodsId;
        const shopId = ctx.query.shopId;
        const result = await services.getGoodsById(id, shopId)
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.data = result[0]
        } else {
            ctx.ajaxReturn.msg = '数据查询异常'
        }
        ctx.body = ctx.ajaxReturn

    }
}

module.exports = new Goods()