const fs = require('fs');

const routeUse = function () {
    fs.readdirSync(__dirname).forEach(item => {
        if (item != 'index.js') {
            const route = require(`./${item}`);
            this.use(route.routes());
            this.use(route.allowedMethods())
        }
    })
}

module.exports = routeUse