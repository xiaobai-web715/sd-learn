const multer = require('multer')
const { decode } = require('iconv-lite')
const path = require('path')

const allowExts = ['.txt', '.log', '.xls', '.xlsx', '.csv', '.doc', '.docx', '.ppt', '.jpg', '.png', '.gif', '.jpeg', '.bmp']
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    // 用来确定上传文件存储在那个文件里面(这里就是一个绝对路径根据当前文件的位置的一个绝对路径)
        cb(null, path.join(__dirname, '..', '/tmp'))
    },
    filename: function (req, file, cb) {
    // 用来确定存储进入文件家当中的文件名称
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // cb(null, decode(file.originalname) + '-' + uniqueSuffix);
        const { originalname } = file
        let filename = originalname
        let ext = ''
        const pos = originalname.lastIndexOf('.')
        const name = originalname.substring(0, pos)
        if (pos > -1) {
            const originExt = originalname.substring(pos) || ''
            if (allowExts.includes(originExt.toLowerCase())) ext = originExt
        }
        filename = decode(Buffer.from(name), 'ascii') + ext

        cb(null, filename)
    }
})
const fileFilter = (req, file, cb) => {
    cb(null, true)
}
const upload = multer({
    storage, // 在哪里存储文件
    fileFilter // 来控制接受哪些文件的函数
    // limits, //上传数据的限制
    // preservePath, //保留文件的完整路径而不是base name
})
module.exports = upload
