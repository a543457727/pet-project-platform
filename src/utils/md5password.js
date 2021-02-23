const crypto = require('crypto');

const md5 = (password) => {
    const mdMethod = crypto.createHash('md5')
    const result = mdMethod.update(password.toString()).digest("hex");
    return result
}

module.exports = md5