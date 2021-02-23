const conn = require('../app/database');
const db = require('../utils/db')

// 验证用户名或者店铺是否已经注册过
async function checkExist(username, shopName) {
    const result = await db.select('pet_admin', ["*"], {
        username
    })
    return result.length > 0 ? false : true
}

// 验证账号密码是否正确
async function checkExistByUsername(username, password) {
    const result = await db.select('pet_admin', ["id", "username"], {
        username,
        password
    })
    return result[0]
}

async function checkAuth(table, id) {
    try {
        const result = await db.select(`pet_${table}`, ["*"], {
            id: id
        })
        return result[0]
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    checkExist,
    checkExistByUsername,
    checkAuth,
}