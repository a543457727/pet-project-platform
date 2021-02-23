const db = require('../utils/db');
// 用户注册
async function register(params) {
    const result = await db.add('pet_admin', params)
    return result.insertId ? true : false
}

async function getShop(id) {
    const result = await db.select('pet_shop', ['id shopId', 'name shopName', 'avatar'], {
        userId: id,
        status: 1
    })
    if (result[0]) return result
    return []
}


module.exports = {
    register,
    getShop,
}