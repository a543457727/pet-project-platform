const jsonWt = require('jsonwebtoken');
const config = require('../app/config')
const errorType = require('../constants/error-types')

function jwt(params, ctx) {
    try {
        const token = jsonWt.sign(params, config.PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24,
            algorithm: 'RS256'
        })
        return token
    } catch (err) {
        const error = new Error(errorType.MAKE_TOKEN_ERROR)
        return ctx.app.emit('error', error, ctx)
    }
}

module.exports = jwt