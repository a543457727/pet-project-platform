const db = require('../utils/db');
// 用户注册
async function createServer(params) {
    const result = await db.add('pet_server', params)
    return result.insertId ? true : false
}


async function checkExistByUpload(params, id) {
    const result = await db.select('pet_server', ['*'], {
        ...params,
        id: ['<>', id]
    })
    console.log('result', result);
    return result[0]
}

// 检测服务名称是否存在
async function checkExist(params) {
    const result = await db.select('pet_server', ['*'], params)
    return result[0]
}

// 获取数据
async function pagination(params, page, size) {
    const result = await db.select('pet_server', ["id", "name", "status", "createAt createTime"], params, {
        orderBy: 'createAt',
        sort: 'DESC'
    }, {
        page,
        size
    })
    const count = await db.select('pet_server', ["COUNT('*') total"], params)
    return result.length ? {
        servers: result,
        total: count[0].total
    } : [];
}

async function uploadServer(name, id) {
    const result = await db.update('pet_server', {
        name
    }, {
        id
    })
    return result.affectedRows ? true : false;
}

async function deleteServer(id) {
    const result = await db.delete('pet_server', {
        id
    })
    return result.affectedRows ? true : false;
}

async function uploadStatus(status, id) {
    const result = await db.update('pet_server', status, {
        id
    })
    return result.affectedRows ? true : false;
}

async function deleteServers(arr) {
    const result = await db.delete('pet_server', {
        id: ['IN', `(${arr.join(',')})`]
    })
    return result.affectedRows ? true : false;
}
module.exports = {
    createServer,
    checkExist,
    pagination,
    uploadServer,
    deleteServer,
    uploadStatus,
    checkExistByUpload,
    deleteServers
}