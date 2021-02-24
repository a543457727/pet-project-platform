const Multer = require('koa-multer');
const Jimp = require('jimp')
const path = require('path')

const categoryItem = Multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, `public/uploads/categoryItem/`)
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split("."); //以点分割成数组，数组的最后一项就是后缀名
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})

const goods = Multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, `public/uploads/goods/`)
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split("."); //以点分割成数组，数组的最后一项就是后缀名
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
const shops = Multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, `public/uploads/shop/`)
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split("."); //以点分割成数组，数组的最后一项就是后缀名
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})

const avatar = Multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, `public/uploads/avatar/`)
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split("."); //以点分割成数组，数组的最后一项就是后缀名
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})


const categoryItemUpload = Multer({
    storage: categoryItem
})
const goodsUpload = Multer({
    storage: goods
})
const shopUpload = Multer({
    storage: shops
})
const avatarUpload = Multer({
    storage: avatar
})

const categoryHandle = categoryItemUpload.single('file')
const goodsHandle = goodsUpload.single('file')
const shopHandle = shopUpload.single('file')
const avatarHandle = avatarUpload.single('file')

const pictureResize = async (ctx, next) => {
    const file = ctx.req.file;
    Jimp.read(file.path).then(image => {
        const destPath = path.join(file.destination, file.filename)
        const extName = path.extname(destPath);
        const fileName = destPath.replace(extName, '')
        image.resize(1280, Jimp.AUTO).write(`${fileName}-large${extName}`);
        image.resize(640, Jimp.AUTO).write(`${fileName}-middle${extName}`);
        image.resize(320, Jimp.AUTO).write(`${fileName}-small${extName}`);
    })
    await next();
}

module.exports = {
    categoryHandle,
    goodsHandle,
    shopHandle,
    pictureResize,
    avatarHandle
}