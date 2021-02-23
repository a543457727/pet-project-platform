const db = require('../utils/db');

async function existByUid(uid) {
    const res = await db.select('pet_user', ['id', 'realName', 'phone', 'address', 'nick', 'createAt createTime'], {
        uid
    });
    console.log(res);
}

module.exports = {
    existByUid
}