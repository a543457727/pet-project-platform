// 定义一个json格式的返回值
class Response {
    constructor(error_no, data, message) {
        this.code = error_no; //错误码

        if (data) {
            this.data = data; //返回给用户的数据
        }

        if (message) {
            this.msg = message; //错误描述
        }
    }
}

module.exports = Response