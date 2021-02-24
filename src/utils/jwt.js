const jsonWt = require('jsonwebtoken');
const config = require('../app/config')

function jwt(params) {
    try {
        const token = jsonWt.sign(params, config.PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24,
            algorithm: 'RS256'
        })
        return token
    } catch (err) {
        return err
    }
}

module.exports = jwt