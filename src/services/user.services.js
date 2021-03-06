const db = require('../utils/db');

async function existByUid(uid) {
    const res = await db.select('pet_user', ['id', 'realName', 'phone', 'address', 'nick', 'createAt createTime'], {
        uid
    });
    return res[0]
}

async function wxRegister(data) {
    try {
        const res = await db.add('pet_user', data)
        const id = res.insertId
        return id
    } catch (err) {
        console.log(err);
    }
}

async function getUserInfoByUid(id) {
    try {
        const userInfo = await db.select('pet_user', ["id", "uid", "nick", "address", "phone", "realName", "avatar"], {
            id
        })
        return userInfo[0]
    } catch (error) {
        console.log(error)
    }
}

async function vtfUser(params) {
    try {
        const userInfo = await db.select('pet_user', ["id", "nick", "address", "phone", "realName", "avatar"], params)
        console.log('userInfo', userInfo);
        return userInfo[0]
    } catch (error) {
        console.log(error);
    }
}

async function checkUserExist(username) {
    try {
        const res = await db.select('pet_user', ["*"], {
            username
        })
        return res[0]
    } catch (error) {
        console.log(error);
    }
}

async function register(params) {
    try {
        const res = await db.add('pet_user', params);
        if (res.insertId) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    existByUid,
    wxRegister,
    getUserInfoByUid,
    vtfUser,
    checkUserExist,
    register
}