const config = require('../app/config')
const services = require('../services/upload.services')
class FileController {
    async sendFilesMes(ctx) {
        // 获取图像相关信息
        const {
            destination,
            filename
        } = ctx.req.file;
        const urlPath = (`http://${config.MYSQL_HOST}:${config.APP_PORT}/` + destination + filename).replace('/public', '')
        ctx.ajaxReturn.data = {
            url: urlPath
        }
        ctx.ajaxReturn.code = 0
        ctx.ajaxReturn.msg = '图片上传成功'
        ctx.body = ctx.ajaxReturn
    }
    async deleteImg(ctx) {
        const id = ctx.params.id;
        const result = await services.deleteImg(id);
        if (result) {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = '删除成功';
        } else {
            ctx.ajaxReturn.msg = '删除失败';
        }
        ctx.body = ctx.ajaxReturn
    }
}

module.exports = new FileController();