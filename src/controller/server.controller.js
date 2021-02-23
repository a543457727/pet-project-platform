const services = require('../services/server.services');

class ServerTypeController {
    // 创建服务
    async createServerType(ctx) {
        // const name = ctx.request.body.name;
        const result = await services.createServer(ctx.request.body)
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
        arr.shopId = params.shopId
        const result = await services.pagination(arr, page, size)
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.data = result
        } else {
            ctx.ajaxReturn.msg = '数据查询异常'
        }
        ctx.body = ctx.ajaxReturn
    }
    // 修改服务名称
    async uploadServer(ctx) {
        const name = ctx.request.body.name;
        const id = ctx.params.serverId;
        const result = await services.uploadServer(name, id);
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = '修改成功';
        } else {
            ctx.ajaxReturn.msg = '修改异常,请稍后再试';
        }
        ctx.body = ctx.ajaxReturn
    }
    // 删除单条服务
    async deleteServer(ctx) {
        const id = ctx.params.serverId
        const result = await services.deleteServer(id);
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = '删除成功';
        } else {
            ctx.ajaxReturn.msg = '删除数据失败';
        }
        ctx.body = ctx.ajaxReturn
    }
    // 删除多条服务
    async deleteServers(ctx) {
        const arr = ctx.request.body.arr;
        const result = await services.deleteServers(arr);
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = '删除成功';
        } else {
            ctx.ajaxReturn.msg = '删除失败';
        }
        ctx.body = ctx.ajaxReturn
    }
    // 更新状态
    async uploadStatus(ctx) {
        const id = ctx.params.serverId;
        const status = ctx.request.body;
        const result = await services.uploadStatus(status, id);
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = '修改状态成功';
        } else {
            ctx.ajaxReturn.msg = '修改状态成功';
        }
        ctx.body = ctx.ajaxReturn
    }

}



module.exports = new ServerTypeController();