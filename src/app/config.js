const dotenv = require('dotenv');
const fs = require('fs');


const PRIVATE_KEY = fs.readFileSync('src/app/keys/private.key');
const PUBLIC_KEY = fs.readFileSync('src/app/keys/public.key');

dotenv.config();

module.exports = {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    WX_APPID,
    WX_APPSecret

} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY