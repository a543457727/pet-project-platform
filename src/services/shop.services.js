const db = require('../utils/db')


async function checkShopExist(params) {
    const result = await db.select('pet_shop', ['*'], params)
    return result[0]
}

async function createShop(params) {
    const result = await db.add('pet_shop', params)
    return result.insertId ? true : false
}
async function pagination(params, page, size) {
    const result = await db.select('pet_shop', ["id", "name", "status", 'avatar', "createAt createTime"], params, {
        orderBy: 'createAt',
        sort: 'DESC'
    }, {
        page,
        size
    })
    const count = await db.select('pet_shop', ["COUNT('*') total"], params)
    return result.length ? {
        shops: result,
        total: count[0].total
    } : []
}

async function checkExistByUpload(params, id) {
    const result = await db.select('pet_shop', ['*'], {
        ...params,
        id: ['<>', id]
    })
    return result[0]
}

async function upload(params, where) {
    const result = await db.update('pet_shop', params, where)
    return result.affectedRows ? true : false;
}


async function deleteShop(id) {
    const result = await db.delete('pet_shop', {
        id
    })
    return result.affectedRows ? true : false;
}

async function deleteShops(arr) {
    const result = await db.delete('pet_shop', {
        id: ['IN', `(${arr.join(',')})`]
    })
    return result.affectedRows ? true : false;
}

module.exports = {
    checkShopExist,
    createShop,
    pagination,
    checkExistByUpload,
    upload,
    deleteShop,
    deleteShops
}