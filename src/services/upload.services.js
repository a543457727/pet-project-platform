const db = require('../utils/db');

async function deleteImg(id) {
    const result = await db.delete('pet_goodsImg', {
        id
    })
    return result.affectedRows ? true : false;
}

module.exports = {
    deleteImg
}